import "./ChatWindow.css";
import Chat from "../Chat/Chat.jsx";

const ChatWindow = () => {
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
      <div className="chat-input">
        <div className="user-input-box">
          <input type="text" placeholder="Ask anything" />
          <div id="submit">
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
