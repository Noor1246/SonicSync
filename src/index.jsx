import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from "react-hot-toast";
import './index.css';
import App from './App';
import { store } from './redux/store';
import { ThemeProvider } from "./context/ThemeContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#fff",
                border: "1px solid #06b6d4",
              },
            }}
          />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);