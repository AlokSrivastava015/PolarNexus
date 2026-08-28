import { useEffect, useState } from "react";
import Preloader from "./components/common/Preloader";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/dashboard/Dashboard";
import ResourcePage from "./components/resources/ResourcePage";
import AiToolPage from "./components/ai/AiToolPage";
import { aiSections } from "./data/mockData";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("Home");
  const [authView, setAuthView] = useState("login");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      {user ? (
        section === "Home" ? (
            <Home
              username={user}
              onLogout={() => {
                setUser(null);
                setSection("Home");
              }}
              onNavigate={setSection}
            />
        ) : aiSections.includes(section) ? (
            <AiToolPage
              section={section}
              username={user}
              onHome={() => setSection("Home")}
              onLogout={() => {
                setUser(null);
                setSection("Home");
              }}
              onNavigate={setSection}
            />
        ) : (
            <ResourcePage
              section={section}
              username={user}
              onHome={() => setSection("Home")}
              onLogout={() => {
                setUser(null);
                setSection("Home");
              }}
              onNavigate={setSection}
            />
        )
      ) : (
        authView === "signup" ? <Signup onLogin={() => setAuthView("login")} onSignup={(name) => { setUser(name); setSection("Home"); }} /> : <Login onSignup={() => setAuthView("signup")} onLogin={(name) => { setUser(name); setSection("Home"); }} />
      )}
    </>
  );
}
