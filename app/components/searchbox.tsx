"use client";
import React, { useEffect, useState } from "react";

export default function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async function () {
      let res: any = await fetch(`/api/search/products?name=${inputValue}`);
      res = await res.json();
      const newItems = res.map((obj: any) => obj.Name);
      setItems(newItems);
    })();
  }, [inputValue]);

  return (
    <div className="searchWrapper">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="searchInput"
      />

      <button type="button" className="searchButton">
        Search
      </button>
      {items.length > 0 && (
        <ul className="absolute mt-1 w-96 bg-white border border-gray-300 rounded-md shadow-lg">
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
