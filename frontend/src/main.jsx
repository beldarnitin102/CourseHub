import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

// ADDED: Import your global styles so Tailwind/CSS works again
import "./index.css"; 

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);