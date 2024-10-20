import React from "react";
import "./DeleteButton.css";

function DeleteButton({ onDelete }) {
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <button className="delete-button" onClick={handleDeleteClick}>
      Delete
    </button>
  );
}

export default DeleteButton;
