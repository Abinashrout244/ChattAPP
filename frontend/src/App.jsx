import "./App.css";

import { Provider } from "react-redux";

import Store from "./utils/Store";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <>
      <Provider store={Store}>
        <AppLayout />
      </Provider>
    </>
  );
}

export default App;
