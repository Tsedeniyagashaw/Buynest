import { useEffect, useState } from "react"
import API from "../../services/api"
function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/pending-sellers",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSellers(res.data);
    }
    catch (error) {
      console.log(error.response?.data);
    }
    finally {
      setLoading(false);
    }
  };

  const approveSeller = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `/admin/approve-seller/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`

          }
        }
      );
      setSellers((prev) => prev.filter((s) => s.id !== id));

    }
    catch (error) {
      console.log(error.response?.data);
    }
  };

   useEffect(() => {
        fetchSellers();
    }, []);

  if (loading) return <h2>Loading sellers ...</h2>

  if (sellers.length === 0){
    return <h2>NO pending Sellers</h2>
  }

  return (
    <div>
      <h1>Pending Sellers</h1>
      {sellers.map((seller) =>(
        <div key={seller._id}>
          <p>Email: {seller.email}</p>
          <p>Role: {seller.role}</p>
          <p>Approved: {seller.isApproved ? "Yes" :"No"}</p>
          {!seller.isApproved && (
            <button  onClick = {() => approveSeller(seller._id)}>
             Approve Seller
            </button>
          )        }
        </div>
      ))}
    </div>
  )
}

export default Sellers
