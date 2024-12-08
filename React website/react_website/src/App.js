import "./App.css";
import React, { useEffect, useState } from "react";
import MockupPage from "./pages/mockup"; // Import Logbook page
import LogbookPage from "./pages/logbook";
import SketchPage from "./pages/sketch";
import DescriptionPage from "./pages/description";
import FlowPage from "./pages/flow";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const jsonData = []; // Export empty array for now, will be updated after fetching data

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from the API
    fetch("http://127.0.0.1/wordpress/wp-json/wp/v2/pages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set fetched data to htmlData
        jsonData.push(...data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Description</Link>
          </li>
          <li>
            <Link to="/sketch">Sketch</Link>
          </li>
          <li>
            <Link to="/mockup">Mockup</Link>
          </li>
          <li>
            <Link to="/flow">Flow</Link>
          </li>
          <li>
            <Link to="/logbook">Logbook</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path="/" element={<DescriptionPage data={jsonData} />}></Route>
          <Route
            path="/sketch"
            element={<SketchPage data={jsonData} />}
          ></Route>
          <Route
            path="/mockup"
            element={<MockupPage data={jsonData} />}
          ></Route>
          <Route path="/flow" element={<FlowPage data={jsonData} />}></Route>
          <Route
            path="/logbook"
            element={<LogbookPage data={jsonData} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
