import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/common/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  // Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <AppRoutes />;
}

export default App;