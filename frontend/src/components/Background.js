import React from "react";
import './Background.css';

export default function Background({ src, alt, text }) {
  return (
    <div className="image-container">
      <img src={src} alt={alt} className="image" />
      <div className="image-text">{text}</div>
    </div>
  );
}
