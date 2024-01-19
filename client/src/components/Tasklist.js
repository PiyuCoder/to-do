import React, { useContext, useEffect, useState } from "react";
import "../styles/tasklist.css";
import Tasks from "./Tasks.js";
import {
  deleteSingleTask,
  getAllTaskData,
  updateTaskData,
} from "../api/api.js";
import { AuthContext } from "../context/userContext.js";

export default function Tasklist({ data, setData, clickedCategory }) {
  const [taskList, setTaskList] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [category, setCategory] = useState("");
  const [taskName, setTaskName] = useState("");

  const { token, setFlag } = useContext(AuthContext);

  async function singleDeleteHandler(tskId) {
    try {
      const res = await deleteSingleTask(token, tskId);
      if (res && res.status === 200) {
        // Update taskList after successful deletion
        const updatedTaskList = taskList.filter((item) => item._id !== tskId);
        setTaskList(updatedTaskList);

        // Update pending count
        setPendingCount((prevPendingCount) => prevPendingCount - 1);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const updateTask = async (tskid) => {
    try {
      const res = await updateTaskData(taskName, category, tskid, token);
      setFlag((prev) => !prev);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTaskData(data, token);

        const filteredData = res?.data?.tasks?.filter(
          (task) => task.category === clickedCategory
        );
        clickedCategory === "All"
          ? setTaskList(res?.data?.tasks?.reverse())
          : setTaskList(filteredData?.reverse());
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [data, setData, clickedCategory, setPendingCount, pendingCount]);

  useEffect(() => {
    // Calculate pending count based on the current taskList
    const count = taskList?.filter((item) => item.isDone == false).length;
    setPendingCount(count);
  }, [taskList, setPendingCount, pendingCount, data]);

  return (
    <div className="tasklist-container">
      <div className="innertask-container">
        <p className="pending">
          {pendingCount ? pendingCount : 0} pending tasks
        </p>
        <ul className="tasks">
          {taskList?.map((e) => (
            <li key={e?._id}>
              <Tasks
                tasks={e?.task}
                taskId={e?._id}
                time={e?.updatedAt}
                taskList={taskList}
                setPendingCount={setPendingCount}
                setTaskList={setTaskList}
                data={data}
                singleDeleteHandler={singleDeleteHandler}
                updateTask={updateTask}
                category={e?.category}
                setCategory={setCategory}
                setTaskName={setTaskName}
                taskName={taskName}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
