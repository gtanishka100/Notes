import React, { useState } from "react";
import "./EditNote.css";

function EditNote({ selectedNote, onSave, setIsEditing }) {
  const [modifiedTitle, setModifiedTitle] = useState(selectedNote.title);
  const [modifiedContent, setModifiedContent] = useState(selectedNote.content);

  const handleSave = () => {
    if (modifiedTitle.trim() !== "" && modifiedContent.trim() !== "") {
      onSave({ title: modifiedTitle, content: modifiedContent });
      setIsEditing(false);
    }
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
        />
        <textarea
          placeholder="Write your note here..."
          value={modifiedContent}
          onChange={(e) => setModifiedContent(e.target.value)}
          className="edit-textarea"
        />
        <div className="button-group">
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
