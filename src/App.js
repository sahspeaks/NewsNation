import React, { useState } from "react";
import News from "./components/News";
import Navbar from "./components/Navbar";
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <>
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="general" country="in" category="general" />} />
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="business" country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="entertainment" country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="health" country="in" category="health" />} />
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="science" country="in" category="science" />} />
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} pageSize={9} key="technology" country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;