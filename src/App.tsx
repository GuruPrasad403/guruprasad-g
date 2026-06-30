import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/ui/LoadingScreen";
import CustomCursor from "./components/ui/CustomCursor";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <BrowserRouter>
          {/* Custom Cursor Trailing Engine */}
          <CustomCursor />
          
          {/* Master Routing mapping */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Toast Notification Provider */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181B",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                padding: "12px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#18181B",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#18181B",
                },
              },
            }}
          />
        </BrowserRouter>
      )}
    </>
  );
}
