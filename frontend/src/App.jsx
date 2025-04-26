import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatApp from "./components/ChatApp";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Navbar from "./components/nAVBAR.JSX";
import Sidebar from "./components/Sidebar.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";

// Update the App component to use React Router
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Sidebar/><ChatApp /></>} />
        <Route path="/about" element={<><About /><Footer/></>} />
        <Route path="/contact" element={<><Contact /><Footer/></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}


export default App;