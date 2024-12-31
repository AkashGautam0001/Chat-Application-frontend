import React from "react";

const MessageInput = ({ newMessage, setNewMessage, onSendMessage }) => {
  return (
    <div className="p-4 bg-gray-800 text-white flex items-center">
      <input
        type="text"
        className="w-full p-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        onClick={onSendMessage}
        className="bg-blue-600 py-2 px-4 rounded-r-md ml-2 hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
