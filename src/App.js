import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NotesList from "./components/NotesList";
import AddButton from "./components/AddButton";

function App() {
  const [notes, setNotes] = useState(["Reminders", "React Important topics"]);
  const [newNote, setNewNote] = useState("");
  const [search, setSearch] = useState("");

  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <NotesList notes={filteredNotes} />
      <AddButton addNote={addNote} />
    </div>
  );
}

export default App;
