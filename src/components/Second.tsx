import React, { useState, useEffect } from "react";
import './css/Second.css';

const Second = () => {
    const [time, setTime] = useState(0); // Время в секундах
    const [isRunning, setIsRunning] = useState(false); // Состояние таймера (запущен/остановлен)
    const [minutes, setMinutes] = useState(""); // Ввод минут
    const [seconds, setSeconds] = useState(""); // Ввод секунд

    // Эффект для уменьшения времени каждую секунду
    useEffect(() => {
        if (isRunning && time > 0) {
            const timerId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId); // Очистка таймера
        } else if (time === 0) {
            setIsRunning(false); // Останавливаем таймер при нуле
        }
    }, [isRunning, time]);

    // Обработчик для добавления времени
    const handleAddTime = () => {
        const min = parseInt(minutes, 10);
        const sec = parseInt(seconds, 10);

        if (
            (!isNaN(min) && min >= 0) &&
            (!isNaN(sec) && sec >= 0 && sec < 60)
        ) {
            const additionalTime = min * 60 + sec;
            setTime((prevTime) => prevTime + additionalTime);
            setMinutes("");
            setSeconds("");
        } else {
            alert("Введите корректное время! Минуты должны быть >= 0, секунды от 0 до 59.");
        }
    };

    // Обработчик кнопки старт/пауза
    const toggleTimer = () => {
        if (time > 0) {
            setIsRunning((prev) => !prev);
        }
    };

    // Обработчик сброса таймера
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className="second-container">
            <h1 className="second-title">Таймер</h1>
            <h2 className="second-timer">{`${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`}</h2>
            <div className="time-inputs">
                <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="second-input"
                    placeholder="Минут"
                    min="0"
                />
                <input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="second-input"
                    placeholder="Секунд"
                    min="0"
                    max="59"
                />
                <button onClick={handleAddTime} className="second-add-button">
                    Добавить время
                </button>
            </div>
            <div className="second-controls">
                <button
                    onClick={toggleTimer}
                    className={`second-control-button ${isRunning ? "pause" : "start"}`}
                >
                    {isRunning ? "Пауза" : "Старт"}
                </button>
                <button onClick={resetTimer} className="second-control-button reset">
                    Сброс
                </button>
            </div>
        </div>
    );
};

export default Second;
