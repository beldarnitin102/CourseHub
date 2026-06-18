import { useState } from "react";
import SplashScreen from "./components/common/SplashScreen";
//import Home from "./pages/Home";
//import Navbar from "./components/layout/Navbar";
import Signup from "./pages/Signup";
//import Login from "./pages/Login";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <SplashScreen onFinish={() => setLoading(false)} />
      ) : (
        //<Home />
       // <Navbar/>
       <Signup/>
       //<Login/>
      )}
    </>
  );
}

export default App;