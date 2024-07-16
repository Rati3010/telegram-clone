import React from "react";
import profile from "../assets/profile3.jpg";

const Messages = (messages) => {
  console.log(messages);
  return (
    <div
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid gray",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <img
          src={profile}
          alt="profile"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </div>
      <div style={{ marginLeft: "10px", flex: 1 }}>
        <p
          style={{
            margin: 0,
            wordWrap: "break-word",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {messages.message.name}
        </p>
        <p
          style={{
            margin: 0,
            wordWrap: "break-word",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {messages.message.messages.you}
        </p>
      </div>
      {messages.message.unread > 0 && (
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "50%",
            padding: "5px 5px",
            minWidth: "20px",
            textAlign: "center",
            display: "inline-block",
            margin:"auto"
          }}
        >
          {messages.message.unread}
        </span>
      )}
    </div>
  );
};

export default Messages;
