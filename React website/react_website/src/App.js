import "./App.css";
import React, { useEffect, useState } from "react";
import MockupPage from "./pages/Mockup"; // Import Logbook page
import LogbookPage from "./pages/Logbook";
import IntroductionPage from "./pages/Introduction";
import DetailedDescriptionPage from "./pages/DetailedDescription";
import ResultPage from "./pages/Result";
import LinksPage from "./pages/Links";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

export const jsonData = []; // Export empty array for now, will be updated after fetching data

//Links for routing. Separated from the <Router> be able to use "useLocation()", to apply active ID to the <li> elements
function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <ul className="linkers">
      <li id={isActive("/") ? "active" : ""}>
        <Link to="/">Introduction</Link>
      </li>
      <li id={isActive("/mockup") ? "active" : ""}>
        <Link to="/mockup">Mockup</Link>
      </li>
      <li id={isActive("/logbook") ? "active" : ""}>
        <Link to="/logbook">Logbook</Link>
      </li>
      <li id={isActive("/detailed-description") ? "active" : ""}>
        <Link to="/detailed-description">Detailed description</Link>
      </li>
      <li id={isActive("/result") ? "active" : ""}>
        <Link to="/result">Result</Link>
      </li>
      <li id={isActive("/links") ? "active" : ""}>
        <Link to="/links">Links</Link>
      </li>
    </ul>
  );
}

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

        <Navigation />

        <Routes>
          <Route
            path="/"
            element={<IntroductionPage data={jsonData} />}
          ></Route>
          <Route
            path="/mockup"
            element={<MockupPage data={jsonData} />}
          ></Route>
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
