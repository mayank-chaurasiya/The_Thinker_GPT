import "./Sidebar.css";

const Sidebar = () => {
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
