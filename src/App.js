import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import AddButton from "./components/AddButton";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";

function App() {
  const [notes, setNotes] = useState([
    { title: "Reminders", content: "Buy groceries" },
    { title: "React", content: "Important topics" },
  ]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    if (newNote.title.trim() !== "" && newNote.content.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote({ title: "", content: "" });
      setIsAddingNote(false);
    }
  };

  const editNote = (note) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  const saveEditedNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note === selectedNote ? updatedNote : note
    );
    setNotes(updatedNotes);
    setIsEditing(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {isAddingNote ? (
        <AddNote
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
          setIsAddingNote={setIsAddingNote}
        />
      ) : isEditing ? (
        <EditNote
          selectedNote={selectedNote}
          onSave={saveEditedNote}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <Header />
          <SearchBar search={search} setSearch={setSearch} />
          <NotesList notes={filteredNotes} onNoteClick={editNote} />
          <AddButton onClick={() => setIsAddingNote(true)} />
        </>
      )}
    </div>
  );
}

export default App;
