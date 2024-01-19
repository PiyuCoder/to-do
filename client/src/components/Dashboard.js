import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/userContext";
import "../styles/dashboard.css";
import Dropdown from "./Dropdown";
import Categorytile from "./Categorytile";
import { categories } from "../api/category";
import Tasklist from "./Tasklist";
import Buttons from "./Buttons";
import { saveTask } from "../api/api";

export default function Dashboard() {
  const { token, data, setData, isLoading } = useContext(AuthContext);

  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [clickedCategory, setClickedCategory] = useState("All");

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      saveClickHandler();
    }
  }

  const categoryClickHandler = (clickedCategory) => {
    setClickedCategory(clickedCategory);
  };

  //Save new task here
  const saveClickHandler = async () => {
    try {
      if (taskName) {
        const res = await saveTask(taskName, category, token);

        setData((prevData) => {
          if (!Array.isArray(prevData)) {
            console.error("Previous data is not an array:", prevData);
            return [res.data.newTask._id]; // Default to a new array if prevData is not iterable
          }

          return [...prevData, res?.data?.newTask._id];
        });

        // Clear input fields after saving
        setTaskName("");
        setCategory("");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      {isLoading ? (
        "Loading.."
      ) : (
        <>
          <div className="dash-logo flex">
            <div className="dash-title flex">
              <h1 className="dash-title-letter t">T</h1>
              <h1 className="dash-title-letter o1">O</h1>
              <h1 className="dash-title-letter d">D</h1>
              <h1 className="dash-title-letter o2">O</h1>
            </div>
          </div>
          <div className="input-save flex">
            <div className="flex select-input-save">
              <div
                className="flex selector"
                style={{ flexDirection: "column" }}
              >
                <Dropdown
                  categories={categories}
                  setCategory={setCategory}
                  clasName="selectInDash"
                />
              </div>
              <input
                placeholder="Type something here..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={handleKeyPress}
              />

              <button onClick={saveClickHandler}>Save</button>
            </div>
          </div>
          <div className="category-holder flex">
            <Categorytile
              categories={categories}
              categoryClickHandler={categoryClickHandler}
            />
          </div>
          <div className="taskList-holder flex">
            <Buttons data={data} setData={setData} />
            <Tasklist
              data={data}
              setData={setData}
              clickedCategory={clickedCategory}
            />
          </div>
        </>
      )}
    </div>
  );
}
