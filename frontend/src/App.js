import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./component/Inventory";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import UserMangement from "./component/UserMangement";
import { UserProvider } from "./context/user/UserContext";
import { ProductProvider } from "./context/product/ProductContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/" element={<Inventory />} />
              <Route path="/admin/users" element={<UserMangement />} />
            </Routes>
          </Router>
          <ToastContainer />
        </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
