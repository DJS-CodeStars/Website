"use client";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Analyzer = ({ user, stats }) => {
  const [data, setData] = useState(null);
  const [handle, setHandle] = useState("");
  const [graphData, setGraphData] = useState(null);
  const [RatinggraphData, setRatingGraphData] = useState(null);
  const [PerfgraphData, setPerfGraphData] = useState(null);

  const fetchData = () => {
    fetch(
      `http://127.0.0.1:5000/api/analyzer?handle=${encodeURIComponent(handle)}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.date && data.delta) {
          setData(data);
          setGraphData({
            x: data.date,
            y: data.delta,
            y_ratings: data.ratings,
          });
          console.log(data.tags);
        } else {
          setGraphData(null);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="p-6 flex-col justify-center items-center w-screen mt-10">
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
          className="ml-4 p-3 bg-yellow-500 text-black rounded-md"
        >
          Get Stats
        </button>
      </div>
      {data && (
        <div className="flex flex-row justify-center items-center">
          <div className="flex basis-1/4 m-5 justify-center items-center flex-col border-2 border-yellow-500 p-1 rounded-md">
            <p className="font-mono text-lg">Handle:{data.handle}</p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">
              User:{data.firstName} {data.lastName}
            </p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">Rank:{data.rank}</p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">Email:{data.email}</p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">
              Organization:{data.organization}
            </p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">City:{data.city}</p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">Country:{data.country}</p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">
              Contribution:{data.contribution}
            </p>
            <hr className="border-1 border-yellow-500 w-5/6"></hr>
            <p className="font-mono text-lg">Friends:{data.friendOfCount}</p>
          </div>
          <div className="flex basis-1/4 m-5 flex-col justify-center items-center">
            <div className="flex justify-center items-center basis-1/2 flex-grow-1">
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5">
                <div>
                  <p className="font-mono text-lg">Rating</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">{data.rating}</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5">
                <div>
                  <p className="font-mono text-lg">Max Rating</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">{data.maxRating}</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5">
                <div>
                  <p className="font-mono text-lg">Max Rank</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">{data.maxRank}</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5">
                <div>
                  <p className="font-mono text-lg">Problems Solved</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">{data.tried}</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5">
                <div>
                  <p className="font-mono text-lg">Problems Tried</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">{data.solved}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center basis-1/2 flex-grow-1">
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5 flex-grow-1">
                <div>
                  <p className="font-mono text-lg">Max Ac</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">{data.max_ac} </p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5 flex-grow-1">
                <div>
                  <p className="font-mono text-lg">title</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">content</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5 flex-grow-1">
                <div>
                  <p className="font-mono text-lg">title</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">content</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5 flex-grow-1">
                <div>
                  <p className="font-mono text-lg">title</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">content</p>
                </div>
              </div>
              <div className="flex  m-3 p-3 border-2 border-yellow-500 rounded-md flex-col basis-1/5 flex-grow-1">
                <div>
                  <p className="font-mono text-lg">title</p>
                </div>
                <div>
                  <p className="font-mono text-2xl">content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-column justify-center items-center">
        <div className="flex flex-row">
          {/* Performance plot */}

          <div className="m-5 basis-1/2 justify-center items-center">
            {graphData && (
              <Plot
                data={[
                  {
                    x: graphData.x,
                    y: graphData.y,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "black", width: 8 }, // Changed marker color to black
                    line: { color: "black", width: 3, opacity: 0.9 },
                  },
                ]}
                layout={{
                  title: "performance plot",
                  width: 550,
                  height: 375,
                  xaxis: { title: "Date" },
                  yaxis: { title: "Delta" },
                  margin: {
                    l: 45,
                    r: 10,
                    b: 40,
                    t: 30,
                  },
                  shapes: [
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 0,
                      y1: 1200,
                      fillcolor: "Silver",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1200,
                      y1: 1400,
                      fillcolor: "#77ff77",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1400,
                      y1: 1600,
                      fillcolor: "#77ddbb",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1600,
                      y1: 1900,
                      fillcolor: "#aaaaff",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1900,
                      y1: 2100,
                      fillcolor: "#ff88ff",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2100,
                      y1: 2300,
                      fillcolor: "#ffcc88",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2300,
                      y1: 2400,
                      fillcolor: "#ffbb55",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2400,
                      y1: 2600,
                      fillcolor: "#ff7777",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2600,
                      y1: 3000,
                      fillcolor: "#ff3333",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 3000,
                      y1: 4000,
                      fillcolor: "#aa0000",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                  ],
                }}
                config={{ displayModeBar: false }}
              />
            )}
          </div>

          {/* Rating plot */}
          <div className="m-5 basis-1/2 justify-center items-center">
            {graphData && (
              <Plot
                data={[
                  {
                    x: graphData.x,
                    y: graphData.y_ratings,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "black", width: 8 }, // Changed marker color to black
                    line: { color: "black", width: 3, opacity: 0.9 },
                  },
                ]}
                layout={{
                  title: "Rating Plot",
                  width: 550,
                  height: 375,
                  displayModeBar: false,
                  xaxis: { title: "Date" },
                  yaxis: { title: "Delta" },
                  margin: {
                    l: 50,
                    r: 10,
                    b: 40,
                    t: 30,
                  },
                  shapes: [
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 0,
                      y1: 1200,
                      fillcolor: "Silver",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1200,
                      y1: 1400,
                      fillcolor: "#77ff77",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1400,
                      y1: 1600,
                      fillcolor: "#77ddbb",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1600,
                      y1: 1900,
                      fillcolor: "#aaaaff",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 1900,
                      y1: 2100,
                      fillcolor: "#ff88ff",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2100,
                      y1: 2300,
                      fillcolor: "#ffcc88",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2300,
                      y1: 2400,
                      fillcolor: "#ffbb55",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2400,
                      y1: 2600,
                      fillcolor: "#ff7777",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 2600,
                      y1: 3000,
                      fillcolor: "#ff3333",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                    {
                      type: "rect",
                      xref: "paper",
                      yref: "y",
                      x0: 0,
                      x1: 1,
                      y0: 3000,
                      y1: 4000,
                      fillcolor: "#aa0000",
                      opacity: 0.7,
                      line: { width: 0 },
                    },
                  ],
                }}
                config={{ displayModeBar: false }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="m-5 basis-1/2 justify-center items-center">
            {/* <Plot
              data={[
                {
                  values: graphData.tags_value, // The data array for the pie chart
                  labels: graphData.tags_label, // The labels corresponding to each slice
                  type: "pie",
                  textinfo: "label+percent",
                  textposition: "outside",
                  automargin: true,
                  marker: {
                    colors: [
                      "#ff7777",
                      "#ffcc88",
                      "#aaaaff",
                      "#77ddbb",
                      "#77ff77",
                    ],
                  },
                },
              ]}
              layout={{
                title: "Problem tags",
                width: 500, // Adjust the width of the canvas
                height: 500, // Adjust the height of the canvas
                margin: {
                  l: 45,
                  r: 10,
                  b: 40,
                  t: 30, // Increase the top margin to accommodate the title
                },
              }}
              config={{ displayModeBar: false }} // This removes the toolbar
            /> */}
          </div>
          <div className="m-5 basis-1/2 justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
