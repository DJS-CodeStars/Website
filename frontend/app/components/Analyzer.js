import React from "react";
//import userImage from "D:/Codestars_website/Website/frontend/app/components/userImage.png";

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
      <p className="text-gray-700">Email: {user.email}</p>
      <p className="text-gray-700">Joined: {user.joinedDate}</p>
      <p className="text-gray-700">College: {user.college}</p>
      <p className="text-gray-700">Country: {user.country}</p>
      <p className="text-gray-700">City: {user.city}</p>
      <p className="text-gray-700">Contest Rating: {user.contestRating}</p>
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
          <h3 className="text-lg font-medium">{key}</h3>
          <p className="text-xl font-bold">{stats[key]}</p>
        </div>
      ))}
    </div>
  );
};

const Analyzer = ({ user, stats }) => {
  return (
    <div className="p-6 flex-col justify-center items-center w-screen">
      <div className="m-5 flex justify-center items-center">
        <p className="font-bold text-3xl">Codeforces Analyzer</p>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="m-5">
          <UserInfoCard user={user} />
        </div>
        <div className="m-5">
          <UserStats stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Analyzer;