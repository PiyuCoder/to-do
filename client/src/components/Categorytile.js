import React, { useState } from "react";
import "../styles/category_tile.css";
export default function Categorytile({ categories, categoryClickHandler }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleClick = (cat) => {
    categoryClickHandler(cat);
    setActiveCategory(cat);
  };

  return (
    <div className="flex category-inner">
      {categories.map((cat) => (
        <div
          className={`flex tile ${activeCategory === cat.name ? "active" : ""}`}
          key={cat.id}
          onClick={() => handleClick(cat.name)}
        >
          <div className="category-tile">
            <img src={cat.image} alt={cat.name} />
          </div>
          <h3>{cat.name}</h3>
        </div>
      ))}
    </div>
  );
}
