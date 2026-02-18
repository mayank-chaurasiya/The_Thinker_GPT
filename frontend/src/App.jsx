import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import { MyContext } from "./components/Context/MyContext";

function App() {
  const providerValues = {};
  return (
    <>
      <div className="app">
        <MyContext.Provider value={providerValues}>
          <Sidebar />
          <ChatWindow />
        </MyContext.Provider>
      </div>
    </>
  );
}

export default App;
