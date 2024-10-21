import "./../App.css";
import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import AddButton from "../components/AddButton";
import AddNote from "../components/AddNote";
import EditNote from "../components/EditNote";

function NotesPage() {
  const getInitialNotes = () => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  };

  const [notes, setNotes] = useState(getInitialNotes);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortCriterion, setSortCriterion] = useState("title");

  const updateLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const addNote = () => {
    if (newNote.title.trim() !== "" && newNote.content.trim() !== "") {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      updateLocalStorage(updatedNotes);
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
    updateLocalStorage(updatedNotes);
    setIsEditing(false);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortCriterion === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

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
          <select
            onChange={(e) => setSortCriterion(e.target.value)}
            value={sortCriterion}
          >
            <option value="title">Sort by Title</option>
            <option value="date">Sort by Date</option>
          </select>
          <NotesList
            notes={sortedNotes}
            onNoteClick={editNote}
            onDeleteNote={deleteNote}
          />
          <AddButton onClick={() => setIsAddingNote(true)} />
        </>
      )}
    </div>
  );
}

export default NotesPage;
