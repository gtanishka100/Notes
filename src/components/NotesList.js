import "./NotesList.css";

function NotesList({ notes, onNoteClick, onDeleteNote }) {
  return (
    <div className="notes-container">
      {notes.length ? (
        notes.map((note, index) => (
          <div key={index} className="note" onClick={() => onNoteClick(note)}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              className="delete-button"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteNote(note._id);
              }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="no-notes">No notes available</p>
      )}
    </div>
  );
}

export default NotesList;
