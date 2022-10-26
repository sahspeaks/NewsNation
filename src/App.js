import { Component } from "react";

import News from "./components/News";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<News key="general" country="in" category="general"/>} />
              <Route exact path="/business" element={<News key="business" country="in" category="business"/>} />
              <Route exact path="/entertainment" element={<News key="entertainment" country="in" category="entertainment"/>} />
              <Route exact path="/health" element={<News key="health" country="in" category="health"/>} />
              <Route exact path="/science" element={<News key="science" country="in" category="science"/>} />
              <Route exact path="/sports" element={<News key="sports" country="in" category="sports"/>} />
              <Route exact path="/technology" element={<News key="technology" country="in" category="technology"/>} />
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}
