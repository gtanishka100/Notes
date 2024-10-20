import "./AddButton.css";

function AddButton({ onClick }) {
  return (
    <div className="bottom-bar">
      <button className="add-btn" onClick={onClick}>
        +
      </button>
    </div>
  );
}

export default AddButton;
