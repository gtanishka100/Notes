import React, { useState } from "react";
import "./EditNote.css";
import { toast } from "react-toastify";

function EditNote({ selectedNote, onSave, setIsEditing, isLoading }) {
  const [modifiedTitle, setModifiedTitle] = useState(selectedNote.title);
  const [modifiedContent, setModifiedContent] = useState(selectedNote.content);

  const handleSave = () => {
    if (modifiedTitle.trim() === "" || modifiedContent.trim() === "") {
      toast.error("Title and content are required!");
      return;
    }
    onSave({
      title: modifiedTitle,
      content: modifiedContent,
      _id: selectedNote._id,
    });
  };

  return (
    <div className="backdrop">
      <div className="edit-note-container">
        <h2>Edit Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={modifiedTitle}
          onChange={(e) => setModifiedTitle(e.target.value)}
          className="edit-title-input"
          disabled={isLoading}
        />
        <textarea
          placeholder="Write your note here..."
          value={modifiedContent}
          onChange={(e) => setModifiedContent(e.target.value)}
          className="edit-textarea"
          disabled={isLoading}
        />
        <div className="button-group">
          <button onClick={() => setIsEditing(false)} disabled={isLoading}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
