import React from 'react';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className="Button">
    Load more
  </button>
);

export default Button;
