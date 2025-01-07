import React, { useState } from 'react';
import './css/Analytic.css';
import { Home, Timer } from '@mui/icons-material';
import Second from './Second';
import Task from './Task';

const Sidebar = () => {
    const [timers, setTimers] = useState(false);
    const [taskVa, setTaskVa] = useState(false);

    const timerTrue = () => {
        setTimers(true);
        setTaskVa(true);
    };

    const mainClick = () => {
        setTimers(false);
        setTaskVa(false);
    };

    return (
        <div>
            <div className="timer" onClick={timerTrue}>
                <Timer sx={{ fontSize: '40px' }} />
                <div className="name-timer">Таймер</div>
            </div>
            <div className="home" onClick={mainClick}>
                <Home sx={{ fontSize: '40px' }} />
                <div className="name-home">Задачи</div>
            </div>
            <div className='zss'>{timers && <Second />}</div>
            {taskVa && <div className='bg-colos'></div>}
        </div>
    );
};

export default Sidebar;
