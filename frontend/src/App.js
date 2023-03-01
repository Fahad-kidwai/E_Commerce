import { BrowserRouter as Router } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Home />
      </Router>
    </>
  );
}

export default App;
