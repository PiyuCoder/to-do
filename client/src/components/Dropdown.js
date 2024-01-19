import React, { useEffect } from "react";

export default function Dropdown({
  categories,
  setCategory,
  clasName,
  categori,
}) {
  return (
    <select
      className={clasName}
      onChange={(e) => setCategory(e.target.value)}
      defaultValue={categori}
    >
      <option>Select</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
