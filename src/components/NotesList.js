import "./NotesList.css";

function NotesList({ notes }) {
  return (
    <div className="notes-container">
      {notes.length ? (
        notes.map((note, index) => (
          <div key={index} className="note">
            <p>{note}</p>
          </div>
        ))
      ) : (
        <p className="no-notes">No notes available</p>
      )}
    </div>
  );
}

export default NotesList;
