import React, { useEffect, useState } from "react";
import Icon from "../common/Icon";

export default function CollectionModal({ isOpen, records, initialSelection, onClose, onSave }) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [selectedTitles, setSelectedTitles] = useState(initialSelection);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resourceLink, setResourceLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDetails("");
      setSelectedTitles(initialSelection);
      setUploadedFiles([]);
      setResourceLink("");
      setError("");
    }
  }, [initialSelection, isOpen]);

  if (!isOpen) return null;

  const toggleResource = (title) => {
    setSelectedTitles((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter a collection name to continue.");
      return;
    }
    onSave({
      id: `${Date.now()}-${name.trim()}`,
      name: name.trim(),
      details: details.trim(),
      resourceTitles: [
        ...selectedTitles,
        ...uploadedFiles.map((file) => file.name),
        ...(resourceLink.trim() ? [resourceLink.trim()] : []),
      ],
    });
  };

  return (
    <div className="modal-backdrop collection-modal-backdrop" onClick={onClose}>
      <form className="collection-modal-card" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <header className="modal-header">
          <div className="header-title">
            <Icon name="bookmark" size={22} />
            <div>
              <h3>Create Collection</h3>
              <p>Organize resources into a focused research set</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </header>

        <div className="collection-modal-body">
          <label className="collection-field">
            Collection Name <span className="required-mark" aria-hidden="true">*</span>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Antarctic Climate Evidence"
              autoFocus
              required
            />
            {error && <small className="collection-error">{error}</small>}
          </label>

          <label className="collection-field">
            Collection Details <span className="optional-label">Optional</span>
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Add context or a short description..."
              rows="3"
            />
          </label>

          <fieldset className="collection-resource-picker">
            <legend>Add Resources</legend>
            <p>Select the resources to include in this collection.</p>
            <div className="collection-resource-list">
              {records.map((record) => (
                <label className="collection-resource-option" key={record.title}>
                  <input
                    type="checkbox"
                    checked={selectedTitles.includes(record.title)}
                    onChange={() => toggleResource(record.title)}
                  />
                  <span>
                    <b>{record.title}</b>
                    <small>{record.type} <i /> {record.date}</small>
                  </span>
                </label>
              ))}
            </div>
            <div className="collection-resource-actions">
              <label className="collection-upload-button">
                <Icon name="upload" size={15} />
                Upload Resource
                <input
                  type="file"
                  multiple
                  onChange={(event) => setUploadedFiles(Array.from(event.target.files || []))}
                />
              </label>
              <label className="collection-link-field">
                Paste Link
                <input
                  type="url"
                  value={resourceLink}
                  onChange={(event) => setResourceLink(event.target.value)}
                  placeholder="Paste resource link here"
                />
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <small className="collection-uploaded-files">
                {uploadedFiles.length} uploaded file{uploadedFiles.length === 1 ? "" : "s"} selected
              </small>
            )}
            <small className="collection-selection-count">
              {selectedTitles.length + uploadedFiles.length + (resourceLink.trim() ? 1 : 0)} resource{selectedTitles.length + uploadedFiles.length + (resourceLink.trim() ? 1 : 0) === 1 ? "" : "s"} selected
            </small>
          </fieldset>
        </div>

        <footer className="modal-footer collection-modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Save Collection</button>
        </footer>
      </form>
    </div>
  );
}
