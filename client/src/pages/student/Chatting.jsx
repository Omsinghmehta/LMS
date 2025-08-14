import { AppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import io from "socket.io-client";

export default function Chatting({ courseId, instructorId, senderId }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const {backendUrl}=useContext(AppContext)

  useEffect(() => {
    const newSocket = io(`${backendUrl}`, {
      query: { courseId, instructorId }
    });
    setSocket(newSocket);

    newSocket.on("loadMessages", (oldMsgs) => {
      setMessages(oldMsgs);
    });

    newSocket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, [courseId, instructorId]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("sendMessage", { senderId, message, courseId, instructorId });
      setMessage("");
    }
  };

  return (
    <div className="p-5 border border-gray-300 max-w-2xl mx-auto rounded-lg shadow-md bg-white my-5">
      <h3 className="text-lg font-semibold mb-4">💬 Chat Room</h3>

      <div className="h-52 overflow-y-auto border border-gray-400 mb-4 p-3 rounded-md bg-gray-50">
        {messages.length > 0 ? (
          messages.map((m, i) => (
            <p key={i} className={`mb-1  ${m.senderId==='Student'?"text-right":"text-left"} `}>
              <span className={`font-bold text-blue-600 `}>{m?.senderId}:</span>{" "}
              {m.message}
            </p>
          ))
        ) : (
          <p className="text-gray-500 italic">No messages yet...</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
