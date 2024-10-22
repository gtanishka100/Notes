import React, { useState, useEffect } from "react";
import "./../App.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import AddButton from "../components/AddButton";
import AddNote from "../components/AddNote";
import EditNote from "../components/EditNote";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortCriterion, setSortCriterion] = useState("title");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    const sessionId = localStorage.getItem("session-id");

    try {
      const response = await fetch(
        "https://notes-backend-ts.onrender.com/api/notes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notes");
      }

      if (data.success && data.data.notes) {
        setNotes(data.data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      toast.error("Failed to fetch notes: " + error.message);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const editNote = (note) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  const deleteNote = async (noteId) => {
    const sessionId = localStorage.getItem("session-id");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://notes-backend-ts.onrender.com/api/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      setNotes(notes.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(noteId);
    }
  };

  const filteredNotes = notes?.filter(
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

  const addNote = async () => {
    if (newNote.title.trim() === "" || newNote.content.trim() === "") {
      toast.error("Title and content are required!");
      return;
    }

    setIsLoading(true);
    const sessionId = localStorage.getItem("session-id");

    try {
      const response = await fetch(
        "https://notes-backend-ts.onrender.com/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`,
          },
          body: JSON.stringify({
            title: newNote.title,
            content: newNote.content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create note");
      }

      // Add the new note to the state
      setNotes((prevNotes) => [...prevNotes, data.data.note]);
      setNewNote({ title: "", content: "" });
      setIsAddingNote(false);
      toast.success("Note created successfully!");
    } catch (error) {
      toast.error("Failed to create note: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEditedNote = async (updatedNote) => {
    setIsLoading(true);
    const sessionId = localStorage.getItem("session-id");

    try {
      const response = await fetch(
        `https://notes-backend-ts.onrender.com/api/notes/${updatedNote._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`,
          },
          body: JSON.stringify({
            title: updatedNote.title,
            content: updatedNote.content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update note");
      }

      // Update the note in the local state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? data.data.note : note
        )
      );

      setIsEditing(false);
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error("Failed to update note: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {isAddingNote ? (
        <AddNote
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
          setIsAddingNote={setIsAddingNote}
          isLoading={isLoading}
        />
      ) : isEditing ? (
        <EditNote
          selectedNote={selectedNote}
          onSave={saveEditedNote}
          setIsEditing={setIsEditing}
          isLoading={isLoading}
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
            onDeleteNote={handleDeleteNote}
            isLoading={isLoading}
          />
          <AddButton
            onClick={() => setIsAddingNote(true)}
            disabled={isLoading}
          />
        </>
      )}
    </div>
  );
}

export default NotesPage;
