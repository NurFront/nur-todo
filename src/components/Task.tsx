import React, { FC, useState, useEffect } from 'react';
import './css/Task.css';

const Task: FC = () => {
    const [addAll, setAddAll] = useState(false);
    const [btnAll, setBtnAll] = useState(true);
    const [tasks, setTasks] = useState<{ text: string; isCompleted: boolean; isEditing?: boolean }[]>([]);
    const [taskInput, setTaskInput] = useState<string>('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);


    const closeInput = () => {
        setAddAll(false);
        setBtnAll(true);
    };

    const addBtn = () => {
        setAddAll(true);
        setBtnAll(false);
    };

    const addTask = () => {
        if (taskInput.trim() !== '') {
            const newTask = { text: taskInput, isCompleted: false };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setTaskInput('');
        }
    };

    const toggleCompletion = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updatedTasks);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };
    const editTask = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isEditing: true } : task
        );
        setTasks(updatedTasks);
    };

    const saveEditedTask = (index: number, newText: string) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: newText, isEditing: false } : task
        );
        setTasks(updatedTasks);
    };

    const cancelEditing = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isEditing: false } : task
        );
        setTasks(updatedTasks);
    };

    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const totalTasks = tasks.length;

    return (
        <>
            <h1 className="task-titles">NUR ToDo</h1>
            <p className="task-stats">Задачи выполнены: {completedTasks} из {totalTasks}</p>
            <div className="task-container">
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={`task-item ${task.isCompleted ? 'completed' : ''}`}
                        >
                            <input
                                type="checkbox"
                                id={`taskCheckbox-${index}`}
                                className="task-checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleCompletion(index)}
                            />
                            <label htmlFor={`taskCheckbox-${index}`} className="checkbox-label"></label>
                            {task.isEditing ? (
                                <input
                                    type="text"
                                    defaultValue={task.text}
                                    onBlur={(e) => saveEditedTask(index, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            saveEditedTask(index, e.currentTarget.value);
                                        } else if (e.key === 'Escape') {
                                            cancelEditing(index);
                                        }
                                    }}
                                    className="edit-input"
                                    autoFocus
                                />
                            ) : (
                                <span>{task.text}</span>
                            )}
                            {!task.isEditing && (
                                <button
                                    onClick={() => editTask(index)}
                                    className="edit-button"
                                >
                                    ✎
                                </button>
                            )}
                            <button
                                onClick={() => deleteTask(index)}
                                className="delete-button"
                            >
                                x
                            </button>

                        </li>
                    ))}
                </ul>
                {tasks.length === 0 && <p className="empty-message">Список задач пуст</p>}
            </div>

            {addAll && (
                <div className="task-input-container">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Введите задачу"
                        className="task-input"
                        maxLength={30}
                    />
                    <button
                        onClick={addTask}
                        className="add-button"
                    >
                        Добавить
                    </button>
                    <button
                        onClick={closeInput}
                        className="close-button"
                    >
                        Закрыть
                    </button>
                </div>
            )}
            {btnAll && <button onClick={addBtn} className="add-all-button">
                +⠀⠀Добавить задачу
            </button>}
        </>
    );
};

export default Task;