import "./ChatWindow.css";
import Chat from "../Chat/Chat.jsx";
import { MyContext } from "../Context/MyContext.jsx";
import { useContext, useState } from "react";
import { BounceLoader } from "react-spinners";

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currThreadId } =
    useContext(MyContext);
  const [loading, setLoading] = useState(false);

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
      <Chat></Chat>
      <BounceLoader color="#fff" loading={loading} />
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
