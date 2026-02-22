import "./ChatWindow.css";
import Chat from "../Chat/Chat.jsx";
import { useRef } from "react";
import { MyContext } from "../Context/MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const chatsContainerRef = useRef(null);

  const getReply = async () => {
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // append new chat to prevChats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }
    setPrompt("");
  }, [reply]);

  // Auto-scroll chats to bottom when prevChats changes
  useEffect(() => {
    if (chatsContainerRef.current) {
      chatsContainerRef.current.scrollTop =
        chatsContainerRef.current.scrollHeight;
    }
  }, [prevChats, loading]);

  return (
    <div className="chat-window">
      <div className="navbar">
        <span>
          Think GPT &nbsp;<i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="user-icon">
          <span className="user-icon-logo">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {/* Pass ref to Chat for scrollable container */}
      <div style={{ width: "100%" }}>
        <Chat chatsContainerRef={chatsContainerRef} />
      </div>
      {/* Loader just above input box */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 0 8px 0",
          minHeight: "48px",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "rgba(34,39,46,0.85)",
            borderRadius: "12px",
            padding: "10px 24px",
          }}
        >
          <PropagateLoader color="#fff" loading={loading} />
        </div>
      </div>
      <div className="chat-input">
        <div className="user-input-box">
          <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="gpt-warning">
          Think GPT can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
