import React from "react";

export default function Background({ src, alt, text, w, h }) {
  return (
    <div  >
      <img src={src}
        alt={alt}
        width={w}
        height={h}
        className='object-contain' />
      <div  >{text}</div>
    </div>
  );
}
