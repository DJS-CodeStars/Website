"use client";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const UserInfoCard = ({ user }) => {
  return (
    <div className="bg-green-200 p-4 rounded-lg shadow-md mb-6 flex-col justify-center items-center">
      {/* <img
        src={userImage}
        alt={`${user.name}'s profile`}
        className="w-16 h-16 rounded-full mr-4"
      /> */}
      <h4 className="text-green-700 text-md font-semibold">{user.rank}</h4>
      <h2 className="text-green-700 text-2xl font-semibold mb-2">
        {user.name}
      </h2>
      <p className="text-black">Email: {user.email}</p>
      <p className="text-black">Joined: {user.joinedDate}</p>
      <p className="text-black">College: {user.college}</p>
      <p className="text-black">Country: {user.country}</p>
      <p className="text-black">City: {user.city}</p>
      <p className="text-black">Contest Rating: {user.contestRating}</p>
    </div>
  );
};

const UserStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Object.keys(stats).map((key, index) => (
        <div
          key={index}
          className="bg-green-200 p-2 rounded-lg shadow-md text-center"
        >
          <h3 className="text-lg font-medium text-black">{key}</h3>
          <p className="text-xl font-bold text-black">{stats[key]}</p>
        </div>
      ))}
    </div>
  );
};

const Analyzer = ({ user, stats }) => {
  const [handle, setHandle] = useState("");
  const [graphData, setGraphData] = useState(null);

  const fetchData = () => {
    fetch(
      `http://127.0.0.1:5000/api/analyzer?handle=${encodeURIComponent(handle)}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGraphData({
          x: data.date,
          y: data.delta,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    if (handle) {
      fetchData();
    }
  }, [handle]);

  return (
    <div className="p-6 flex-col justify-center items-center w-screen">
      <div className="m-5 flex justify-center items-center">
        <p className="font-bold text-3xl mr-4">Codeforces Analyzer</p>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="enter Codeforces ID"
          className="rounded-md border-black p-3 text-black"
        />
        <button
          onClick={fetchData}
          className="ml-4 p-3 bg-blue-500 text-white rounded-md"
        >
          Get Stats
        </button>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="m-5">
          <UserInfoCard user={user} />
        </div>
        <div className="m-5">
          <UserStats stats={stats} />
        </div>
      </div>
      <div className="flex flex-row">
        {/* Performance plot */}

        <div className="m-5">
          <p>Performance Plot</p>
          {graphData && (
    <Plot
    data={[
      {
        x: graphData.x,
        y: graphData.y,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "black", width: 8 }, // Changed marker color to black
        line: { color: "black", width: 3, opacity:0.9},
      },
    ]}
    layout={{
      xaxis: { title: "Date" },
      yaxis: { title: "Delta" },
      shapes: [
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 0, y1: 1200, fillcolor: 'Silver', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 1200, y1: 1400, fillcolor: '#77ff77', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 1400, y1: 1600, fillcolor: '#77ddbb', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 1600, y1: 1900, fillcolor: '#aaaaff', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 1900, y1: 2100, fillcolor: '#ff88ff', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 2100, y1: 2300, fillcolor: '#ffcc88', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 2300, y1: 2400, fillcolor: '#ffbb55', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 2400, y1: 2600, fillcolor: '#ff7777', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 2600, y1: 3000, fillcolor: '#ff3333', opacity: 0.7, line: { width: 0 } },
        { type: 'rect', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: 3000, y1: 4000, fillcolor: '#aa0000', opacity: 0.7, line: { width: 0 } }
      ]
    }}
  />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
