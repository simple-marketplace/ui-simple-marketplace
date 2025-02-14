"use client";

import React, { useState } from "react";

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const items = ["Apple", "Banana", "Cherry", "Date", "Grapes", "Orange"];

  const search = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <div className="searchWrapper">
      <input
        type="text"
        value={inputValue}
        onChange={search}
        className="searchInput"
      />

      <button type="button" className="searchButton">
        Search
      </button>
      {items.length > 0 && (
        <ul className="absolute  mt-1 w-96 bg-white border border-gray-300 rounded-md shadow-lg">
          {items.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
