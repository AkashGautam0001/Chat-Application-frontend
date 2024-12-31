const ChatWindow = ({ messages, userId }) => {
  return (
    <div className="space-y-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender?.id === userId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg shadow-lg text-gray-200 ${
              message.sender?.id === userId
                ? "bg-blue-600"
                : "bg-gray-700 text-white"
            }`}
          >
            <p className="text-sm font-medium">
              {message.sender?.name || "Unknown"}
              <br />
              {message.content}
            </p>
            <small className="block text-xs text-gray-400 mt-2">
              {message.createdAt
                ? new Date(message.createdAt).toLocaleTimeString()
                : "Unknown time"}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
