import React from "react";
import { Link } from "react-router-dom";

const SessionList = ({ sessions, onSessionClick }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-5">
      <h2 className="text-3xl font-semibold text-blue-400 mb-6">
        Available Chat Sessions
      </h2>
      <div className="w-full max-w-3xl grid grid-cols-1 gap-6">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => onSessionClick(session._id)}
          >
            <Link
              to={`/chat/${session._id}`}
              className="block p-4 text-center transition-all duration-300 hover:bg-gray-700"
            >
              <h3 className="text-xl font-semibold text-white">
                {session.name}
              </h3>
              <p className="text-gray-400 mt-2">Session ID: {session._id}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionList;
