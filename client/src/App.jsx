import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import SellerDashboard from "./pages/SellerDashboard"
import SellerOrders from "./pages/SellerOrders"
import ProductDetails from "./pages/ProductDetails"
import AdminLayout from "./layouts/AdminLayout"
import AdminHome from "./pages/admin/AdminHome"
import Users from "./pages/admin/Users"
import Sellers from "./pages/admin/Sellers"

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
      <Route path="/orders" element = { <Orders /> } />
      <Route path="/seller-dashboard" element = { <SellerDashboard /> } />
      <Route path="/seller-orders" element = { <SellerOrders /> } />
      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>

       <Routes>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="users" element={<Users />} />
                <Route path="sellers" element={<Sellers />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
            </Route>

        </Routes>

    

  </div>
  )
}

export default App
