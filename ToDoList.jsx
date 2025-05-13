// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { format, differenceInMinutes, parse } from "date-fns";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [overallStartTime, setOverallStartTime] = useState("");
    const [overallEndTime, setOverallEndTime] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleStartTimeChange(event) {
        setStartTime(event.target.value);
    }

    function handleEndTimeChange(event) {
        setEndTime(event.target.value);
    }

    function handleOverallStartTimeChange(event) {
        setOverallStartTime(event.target.value);
    }

    function handleOverallEndTimeChange(event) {
        setOverallEndTime(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "" && startTime && endTime) {
        setTasks((t) => [...t, { text: newTask, startTime, endTime }]);
        setNewTask("");
        setStartTime("");
        setEndTime("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
            updatedTasks[index - 1],
            updatedTasks[index]
        ];
        setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
        const updatedTasks = [...tasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
            updatedTasks[index + 1],
            updatedTasks[index]
        ];
        setTasks(updatedTasks);
        }
    }

    // Calculate total time period
    const overallStart = overallStartTime ? parse(overallStartTime, "HH:mm", new Date()) : null;
    const overallEnd = overallEndTime ? parse(overallEndTime, "HH:mm", new Date()) : null;
    const totalDuration = overallStart && overallEnd ? differenceInMinutes(overallEnd, overallStart) : 0;

    return (
        <div className="to-do-list">
        <h1>To-Do List</h1>
        <div>
            <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
            />
            <input
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
            />
            <input
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
            />
            <button className="add-button" onClick={addTask}>
            Add
            </button>
        </div>

        <div className="overall-time-input mt-4">
            <h2>Set Overall Time Period</h2>
            <input type="time" value={overallStartTime} onChange={handleOverallStartTimeChange} />
            <input type="time" value={overallEndTime} onChange={handleOverallEndTimeChange} />
        </div>

        <ol>
            {tasks.map((task, index) => {
            const start = parse(task.startTime, "HH:mm", new Date());
            const end = parse(task.endTime, "HH:mm", new Date());
            const duration = differenceInMinutes(end, start);

            return (
                <li key={index}>
                <span className="text">{task.text}</span>
                <p className="text-gray-600">Start: {task.startTime}</p>
                <p className="text-gray-600">End: {task.endTime}</p>
                <p className="text-blue-500 font-medium">Duration: {duration} minutes</p>
                <button className="delete-button" onClick={() => deleteTask(index)}>
                    Delete
                </button>
                <button className="move-button" onClick={() => moveTaskUp(index)}>
                    👆
                </button>
                <button className="move-button" onClick={() => moveTaskDown(index)}>
                    👇
                </button>
                </li>
            );
            })}
        </ol>

        {overallStart && overallEnd && (
            <div className="overall-duration mt-4 p-2 bg-gray-200 rounded">
            <h2 className="text-lg font-semibold">Total Time Period</h2>
            <p className="text-gray-600">Start: {format(overallStart, "HH:mm")}</p>
            <p className="text-gray-600">End: {format(overallEnd, "HH:mm")}</p>
            <p className="text-blue-500 font-medium">Total Duration: {totalDuration} minutes</p>
            </div>
        )}
        </div>
    );
    }

    export default ToDoList;
