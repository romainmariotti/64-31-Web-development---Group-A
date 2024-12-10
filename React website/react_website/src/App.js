import "./App.css";
import React, { useEffect, useState } from "react";
import MockupPage from "./pages/Mockup"; // Import Logbook page
import LogbookPage from "./pages/Logbook";
import SketchPage from "./pages/Sketch";
import IntroductionPage from "./pages/Introduction";
import FlowPage from "./pages/Flow";
import DetailedDescriptionPage from "./pages/DetailedDescription";
import ResultPage from "./pages/Result";
import LinksPage from "./pages/Links";
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
        <div class="background">
          <h1>HES-SO Vs - 64-31 - Web Development</h1>
          <img src="background.jpg" class="background_image"></img>
        </div>
        <ul className="linkers">
          <li>
            <Link to="/">Introduction</Link>
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
          <li>
            <Link to="/detailed-description">Detailed description</Link>
          </li>
          <li>
            <Link to="/result">Result</Link>
          </li>
          <li>
            <Link to="/links">Links</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/"
            element={<IntroductionPage data={jsonData} />}
          ></Route>
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
          <Route
            path="/detailed-description"
            element={<DetailedDescriptionPage data={jsonData} />}
          ></Route>
          <Route
            path="/result"
            element={<ResultPage data={jsonData} />}
          ></Route>
          <Route path="/links" element={<LinksPage data={jsonData} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
