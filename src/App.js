// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './Timer';

function App() {
  const [timers, setTimers] = useState([]);
  const [title, setTitle] = useState([]);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const addTimer = (e) => {
    e.preventDefault();
    const endTime = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const gap = endTime - currentTime;

    const seconds = 1000;
    const minute = seconds * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const remainingDays = Math.floor(gap / day);
    const remainingHours = Math.floor((gap % day) / hour);
    const remainingMinutes = Math.floor((gap % hour) / minute);
    const remainingSeconds = Math.floor((gap % minute) / seconds);

    setTimers([...timers, { title, category, endTime, remainingDays, remainingHours, remainingMinutes, remainingSeconds }]);
    setTitle();
    setCategory('');
    setDate('');
  };
  const deleteHandler = (index) => {
    const newTasks = timers.filter((_, i) => i !== index);
    setTimers(newTasks);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimers((prevTimers) => prevTimers.map((timer) => {
        const currentTime = new Date().getTime();
        const gap = timer.endTime - currentTime;

        if (gap <= 0) {
          return { ...timer, remainingDays: 0, remainingHours: 0, remainingMinutes: 0, remainingSeconds: 0 };
        }

        const seconds = 1000;
        const minute = seconds * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const remainingDays = Math.floor(gap / day);
        const remainingHours = Math.floor((gap % day) / hour);
        const remainingMinutes = Math.floor((gap % hour) / minute);
        const remainingSeconds = Math.floor((gap % minute) / seconds);

        return { ...timer, remainingDays, remainingHours, remainingMinutes, remainingSeconds };
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [timers]);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={addTimer} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Select Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Calendar
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Timer
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {timers.map((timer, index) => (
          <Timer
            key={index}
            days={timer.remainingDays}
            hours={timer.remainingHours}
            minutes={timer.remainingMinutes}
            seconds={timer.remainingSeconds}
            deleteHandler={()=>deleteHandler(index)}
  
          />
        ))}
      </div>
    </div>
  );
}

export default App;
