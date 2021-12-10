import React from "react";

export default function Comment({ username, commentId, time, text }) {
  return (
    <div>
      <ul>
        <li>{username}</li>
        <li>{time}</li>
        <li>{text}</li>
      </ul>
    </div>
  );
}
