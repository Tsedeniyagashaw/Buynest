import API from "../services/api";

function ProductCard({ product }) {

    const handleAddToCart = async (productId) => {
     try {
        const token = localStorage.getItem("token");
        const res = await API.post(
            "/cart",
            { productId, quantity: 1},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        alert("Added to Cart");
     }

     catch(error) {
        console.log(error.response?.data);
     }
    }


    return (
         <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
               <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <p>Seller: {product.seller.email}</p>
         <button onClick={() => handleAddToCart(product._id)}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;