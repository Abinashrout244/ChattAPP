import "./styles/App.css";

import { useEffect } from "react";
import { Provider } from "react-redux";

import Store from "./redux/store";
import AppLayout from "./components/layout/AppLayout";

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("chat-theme") || "black";
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  return (
    <>
      <Provider store={Store}>
        <AppLayout />
      </Provider>
    </>
  );
}

export default App;
