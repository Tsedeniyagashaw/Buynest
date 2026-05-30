import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Products from "./pages/Products"
import Cart from "./pages/Cart"

function App() {
 

  return (
  <div>
    <Navbar />
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/register" element = {<Register />} />
      <Route path="/product" element = { <Products /> } />
      <Route path="/cart" element = { <Cart /> } />

    </Routes>
  </div>
  )
}

export default App
