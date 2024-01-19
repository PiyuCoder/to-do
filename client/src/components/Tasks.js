import React, { useEffect, useState } from "react";
import "../styles/taskcard.css";
import pencil from "../images/pencil.png";
import tick from "../images/done.png";
import { updateTaskStatus } from "../api/api";
import Dropdown from "./Dropdown";
import { categories } from "../api/category";

export default function Tasks({
  taskId,
  tasks,
  time,
  taskList,
  setPendingCount,
  singleDeleteHandler,
  updateTask,
  category,
  setCategory,
  setTaskName,
  taskName,
}) {
  const [done, setDone] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");
  const style = {
    backgroundColor: done ? "green" : "rgb(235, 177, 101)",
  };

  const preventInteraction =
    !taskId && !isEditing ? { pointerEvents: "none" } : {};
  async function updateStatus() {
    try {
      const res = await updateTaskStatus(taskId, token);

      // Update the state synchronously
      setDone((prevDone) => {
        // Update the pending count based on the new status
        setPendingCount((prevPendingCount) =>
          prevDone ? prevPendingCount + 1 : prevPendingCount - 1
        );
        return !prevDone;
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  const editHandler = (e) => {
    setIsEditing((prev) => !prev);
  };

  function timeFormatter(time) {
    const date = new Date(time);

    // Format the date
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-IN", options);
    return formattedDate;
  }

  useEffect(() => {
    const filteredTask = taskList.filter((item) => item._id === taskId);
    setDone(filteredTask[0].isDone);

    // Set the taskName when entering editing mode
    if (isEditing) {
      setTaskName(tasks);
      setCategory(category);
    } else {
      setTaskName("");
    }
  }, [taskList, taskId, isEditing]);

  return (
    <div className="taskcard-container" style={preventInteraction}>
      <div className="task-card" style={style}>
        {!isEditing ? (
          <h2 className="taskname">{tasks}</h2>
        ) : (
          <div>
            <Dropdown
              categories={categories}
              clasName="selectInTask"
              setCategory={setCategory}
              categori={category}
            />
            <textarea
              autoFocus={true}
              defaultValue={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
        )}
        <div className="time-container flex">
          <p>{isEditing ? "Click done to save" : timeFormatter(time)}</p>
        </div>
        {isEditing ? (
          ""
        ) : (
          <button
            className="deleteBtn"
            onClick={() => singleDeleteHandler(taskId)}
          >
            X
          </button>
        )}
        <div className="flex btn">
          {!done && (
            <img
              src={pencil}
              className="editBtn"
              alt="Edit"
              onClick={editHandler}
            />
          )}

          <img
            src={tick}
            onClick={
              !isEditing
                ? updateStatus
                : () => updateTask(taskId) && setIsEditing(false)
            }
            className="doneBtn"
            alt="Done"
          />
        </div>
      </div>
    </div>
  );
}
