import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "../Context/MyContext";

const Sidebar = () => {
  const { allThreads, setAllThreads, currThreadId } = useContext(MyContext);
  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  return (
    <section className="sidebar">
      <button>
        <img
          src="src/assets/gemini-icon.png"
          alt="gpt-logo"
          className="gemini-logo"
        />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        <li>history1</li>
        <li>history2</li>
        <li>history3</li>
      </ul>

      <div className="sign">
        <p>By Mayank &hearts;</p>
      </div>
    </section>
  );
};

export default Sidebar;
