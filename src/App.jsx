
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Navbar from "./components/Navbar"
import Contact from "./Pages/Contact"
import Signup from "./Pages/Signup"

function App() {
  return (
    <>
        <BrowserRouter>
        <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
