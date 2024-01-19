import React, { useContext } from "react";

import { AuthContext } from "../context/userContext.js";
import { deleteAllTask } from "../api/api.js";

export default function Buttons({ data, setData }) {
  const { token } = useContext(AuthContext);

  async function clearAllTasks() {
    try {
      if (data.length > 0) {
        const res = await deleteAllTask(token);
        // Update the state to reflect the changes in the UI
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fnBtn">
      <button onClick={clearAllTasks}>Clear All</button>
    </div>
  );
}
