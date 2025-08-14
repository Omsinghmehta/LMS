import React from "react";
import Chatting from "../student/Chatting";
import { useParams } from "react-router-dom";

export default function ChatWithStudent() {
  const { courseId, instructorId } = useParams();

  const senderId = "Instructor"; 

  return (
    <div>
      <Chatting 
        courseId={courseId} 
        instructorId={instructorId} 
        senderId={senderId}
      />
    </div>
  );
}
