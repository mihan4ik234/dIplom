// src/components/AddProductButton.jsx
import React from 'react';
import './AddProductButton.css';

function AddProductButton({ onClick }) {
  return (
    <button className="add-product-button" onClick={onClick}>
      Добавить товар
    </button>
  );
}

export default AddProductButton;
