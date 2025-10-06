
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Navbar from "./components/Navbar"
import Contact from "./Pages/Contact"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Users from "./Pages/Users"
import User from "./Pages/User"
import ProtectedRoute from "./components/ProtectedRoute"
import { UserProvider } from "./context/UserContext"

function App() {
  return (
    <>
        <BrowserRouter>
      <UserProvider>
        <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/users" element={
              <ProtectedRoute>
              <Users/>
              </ProtectedRoute>
              }/>
              <Route path="/user/:id" element={
              <ProtectedRoute>
              <User/>
              </ProtectedRoute>
              }/>
            </Routes>
      </UserProvider>
        </BrowserRouter>
    </>
  )
}

export default App
