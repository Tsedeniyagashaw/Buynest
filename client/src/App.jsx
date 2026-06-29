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
import Header from "./components/Header"
import Layout from "./layouts/Layout"
import Search from "./pages/Search"

function App() {
 

  return (
  <div class="mx-0 lg:mx-10  ">
    {/* <Header />
    <Navbar /> */}
   <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="search" element={<Search />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="product" element={<Products />} />
    <Route path="cart" element={<Cart />} />
    <Route path="orders" element={<Orders />} />
    <Route path="seller-dashboard" element={<SellerDashboard />} />
    <Route path="seller-orders" element={<SellerOrders />} />
    <Route path="products/:id" element={<ProductDetails />} />
  </Route>

     <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="sellers" element={<Sellers />} />
      </Route>
</Routes>

    

  </div>
  )
}

export default App
