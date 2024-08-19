"use client"; 
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const UserInfoCard = ({ user }) => {
  return (
    <div className="bg-green-200 p-4 rounded-lg shadow-md mb-6 flex-col justify-center items-center">
      {/* <img
        src={userImage}
        alt={`${user.name}'s profile`}
        className="w-16 h-16 rounded-full mr-4"
      /> */}
      <h4 className="text-green-700 text-md font-semibold">{user.rank}</h4>
      <h2 className="text-green-700 text-2xl font-semibold mb-2">{user.name}</h2> 
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
  const [handle, setHandle] = useState('');
  const [graphData, setGraphData] = useState(null);

  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/api/analyzer?handle=${encodeURIComponent(handle)}`)
      .then(response => response.json())
      .then(data => {
        setGraphData({
          x: data.date,
          y: data.delta
        });
      })
      .catch(error => console.error('Error fetching data:', error));
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
      <div className="w-screen m-5">
        <p>Performance Plot</p>
        {graphData && (
          <Plot
            data={[
              {
                x: graphData.x,
                y: graphData.y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'blue' }
              }
            ]}
            layout={{
              xaxis: { title: 'Date' },
              yaxis: { title: 'Delta' }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Analyzer;
