import "./AddButton.css";

function AddButton({ addNote }) {
  return (
    <div className="bottom-bar">
      <button className="add-btn" onClick={addNote}>
        +
      </button>
    </div>
  );
}

export default AddButton;
