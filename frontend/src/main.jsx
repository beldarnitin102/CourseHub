import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

// ADDED: Import your global styles so Tailwind/CSS works again
import "./index.css"; 

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" />
    </BrowserRouter>
  </Provider>
);