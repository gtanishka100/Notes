import React from "react";
import "./AddNote.css";

function AddNote({ newNote, setNewNote, addNote, setIsAddingNote, isLoading }) {
  return (
    <div className="add-note-container">
      <div className="note-header">
        <button
          className="back-btn"
          onClick={() => setIsAddingNote(false)}
          disabled={isLoading}
        >
          Back
        </button>
        <button className="save-btn" onClick={addNote} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) =>
          setNewNote((prevNote) => ({ ...prevNote, title: e.target.value }))
        }
        className="note-input"
        disabled={isLoading}
      />
      <textarea
        placeholder="Write your note here..."
        value={newNote.content}
        onChange={(e) =>
          setNewNote((prevNote) => ({ ...prevNote, content: e.target.value }))
        }
        className="note-textarea"
        disabled={isLoading}
      ></textarea>
    </div>
  );
}

export default AddNote;
