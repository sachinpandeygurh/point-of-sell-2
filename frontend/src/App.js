import React, { useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";

function App() {
  const webFontLoad = useMemo(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  // useEffect(() => {
  //   webFontLoad();
  // }, [webFontLoad]);

  return (
    <Router>
        <React.Fragment>
          <Header />
        </React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
        <React.Fragment>

        <Footer />
        </React.Fragment>
    </Router>
  );
  
  
}

export default App;
