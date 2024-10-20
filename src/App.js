import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import AddButton from "./components/AddButton";
import AddNote from "./components/AddNote";

function App() {
  const [notes, setNotes] = useState(["Reminders", "React Important topics"]);
  const [newNote, setNewNote] = useState("");
  const [search, setSearch] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
      setIsAddingNote(false);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(search.toLowerCase())
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
      ) : (
        <>
          <Header />
          <SearchBar search={search} setSearch={setSearch} />
          <NotesList notes={filteredNotes} />
          <AddButton onClick={() => setIsAddingNote(true)} />
        </>
      )}
    </div>
  );
}

export default App;
