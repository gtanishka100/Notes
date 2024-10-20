import React from "react";
import "./AddNote.css";

function AddNote({ newNote, setNewNote, addNote, setIsAddingNote }) {
  return (
    <div className="add-note-container">
      <div className="note-header">
        <button className="back-btn" onClick={() => setIsAddingNote(false)}>
          Back
        </button>
        <button className="save-btn" onClick={addNote}>
          Save
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
      />
      <textarea
        placeholder="Write your note here..."
        value={newNote.content}
        onChange={(e) =>
          setNewNote((prevNote) => ({ ...prevNote, content: e.target.value }))
        }
        className="note-textarea"
      ></textarea>
    </div>
  );
}

export default AddNote;
