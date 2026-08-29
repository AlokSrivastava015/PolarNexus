import json
import os
from typing import Any
from urllib import error, request, parse

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8001/api/v1")
TEST_EMAIL = os.getenv("TEST_EMAIL")
TEST_PASSWORD = os.getenv("TEST_PASSWORD")


def fail(message: str, exit_code: int = 1) -> None:
    print(message)
    raise SystemExit(exit_code)


def request_json(method: str, url: str, *, token: str | None = None, payload: dict[str, Any] | None = None, params: dict[str, Any] | None = None) -> tuple[int, Any]:
    if params:
        query = parse.urlencode(params)
        url = f"{url}?{query}"

    data = None
    headers: dict[str, str] = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if payload is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(payload).encode("utf-8")

    req = request.Request(url, data=data, headers=headers, method=method)
    try:
        with request.urlopen(req, timeout=60) as response:
            text = response.read().decode("utf-8")
            try:
                body = json.loads(text)
            except ValueError:
                body = {"raw": text}
            return response.status, body
    except error.HTTPError as exc:
        try:
            body = json.loads(exc.read().decode("utf-8"))
        except ValueError:
            body = {"raw": exc.read().decode("utf-8", errors="replace")}
        return exc.code, body


def main() -> None:
    print("1) Backend health check")
    health_status, health_body = request_json("GET", f"{API_BASE_URL.replace('/api/v1', '')}/health")
    print(f"   HTTP {health_status}")
    print(f"   Body: {health_body}")
    if health_status != 200:
        fail("Health check failed before auth or RAG validation.")

    if not TEST_EMAIL or not TEST_PASSWORD:
        fail("Missing TEST_EMAIL or TEST_PASSWORD environment variables.")

    print("\n2) Login")
    login_status, login_body = request_json(
        "POST",
        f"{API_BASE_URL}/auth/login",
        payload={"username_or_email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    print(f"   HTTP {login_status}")
    print(f"   Body: {login_body}")
    token = login_body.get("access_token") if isinstance(login_body, dict) else None
    if login_status != 200 or not token:
        fail("Login failed; verify TEST_EMAIL and TEST_PASSWORD.")

    print("\n3) Verify /auth/me")
    me_status, me_body = request_json("GET", f"{API_BASE_URL}/auth/me", token=token)
    print(f"   HTTP {me_status}")
    print(f"   Body: {me_body}")
    if me_status != 200:
        fail("Authentication failed at /auth/me.")

    print("\n4) Find an available resource")
    resources_status, resources_body = request_json(
        "GET",
        f"{API_BASE_URL}/resources",
        token=token,
        params={"page": 1, "page_size": 20, "sort": "latest"},
    )
    print(f"   HTTP {resources_status}")
    items = (resources_body or {}).get("items", []) if isinstance(resources_body, dict) else []
    print(f"   Resource count: {len(items)}")
    resource_id = None
    if items:
        resource_id = items[0].get("id")
        print(f"   Using first resource ID: {resource_id}")
    else:
        print("   No resources returned; the backend may not have any indexed resource rows yet.")

    print("\n5) Execute RAG query")
    query_payload = {
        "question": "What is PolarNexus?",
        "conversation_id": None,
        "resource_ids": [resource_id] if resource_id else [],
    }
    rag_status, rag_body = request_json("POST", f"{API_BASE_URL}/ai/rag/query", token=token, payload=query_payload)
    print(f"   HTTP {rag_status}")
    print(f"   Body: {json.dumps(rag_body, indent=2)[:2000]}")

    if rag_status != 200:
        print("   RAG query did not return 200. This usually means the resource list is empty, the document is not indexed, or the DB migration is incomplete.")
        return

    if not isinstance(rag_body, dict):
        fail("RAG response body was not JSON.")

    answer = rag_body.get("answer", "")
    sources = rag_body.get("sources", []) or []
    print(f"\n6) RAG summary")
    print(f"   answer: {answer[:600]}")
    print(f"   source_count: {len(sources)}")
    for source in sources:
        print(f"   source: {source.get('title')} | id={source.get('resource_id')} | score={source.get('score')}")

    if not sources:
        print("   No sources were returned. This is expected when no resource is indexed or when the selected resource has no stored chunks.")


if __name__ == "__main__":
    main()
