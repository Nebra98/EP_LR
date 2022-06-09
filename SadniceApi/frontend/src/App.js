import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Index from "./Components";

function App() {
  const [getMessage, setGetMessage] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <Index></Index>
    </div>
  );
}

export default App;
