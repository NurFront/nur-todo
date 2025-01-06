import React, { FC, useState, useEffect } from 'react';
import './css/Task.css';

const Task: FC = () => {
    const [addAll, setAddAll] = useState(false);
    const [btnAll, setBtnAll] = useState(true);
    const [tasks, setTasks] = useState<{ text: string; isCompleted: boolean }[]>([]);
    const [taskInput, setTaskInput] = useState<string>('');

    // Загружаем задачи из localStorage при монтировании компонента
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks)); // Если задачи есть, устанавливаем их в состояние
        }
    }, []);

    // Сохраняем задачи в localStorage, когда они изменяются
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Сохраняем задачи в localStorage
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
            setTasks(prevTasks => [...prevTasks, newTask]); // Добавляем новую задачу в состояние
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

    // Функция для удаления задачи
    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index); // Удаляем задачу по индексу
        setTasks(updatedTasks); // Обновляем состояние задач
    };

    return (
        <>
        <h1 className="task-titles">NUR ToDo</h1>
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
                            <span>{task.text}</span>
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

            <div className="planner"></div>
            <div className="sidebar-planner"></div>

            <div className='opisanie'>
            Приложение To Do — единый центр для личных задач в NUR ToDo. Оно тесно интегрировано с центрами NUR Studio. Задачи, созданные в этих продуктах, синхронизируются с To Do, чтобы вы могли обращаться к ним и управлять ими на разных устройствах.
            Добавляйте свои задачи и сделайте это!
            </div>
        </>
    );
};

export default Task;
