// src/Timer.js
import React from 'react';

function Timer({title, days, hours, minutes, seconds,deleteHandler }) {
  return (
    <div className="border p-4 rounded shadow-md m-2">
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <th>{days} days</th>&nbsp;&nbsp;
            <th>{hours} hours</th>&nbsp;&nbsp;
            <th>{minutes} minutes</th>&nbsp;&nbsp;
            <th>{seconds} seconds</th>&nbsp;&nbsp;
            <button onClick={deleteHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Remove Timer</button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Timer;
