import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";


function Wishlist(){
    const [wishlist,setWishlist] = useState([]);
    useEffect(()=>{
            fetchWishlist();
        },[]);


    const fetchWishlist = async()=>{

        try{

            const token = localStorage.getItem("token");
            const res = await API.get("/wishlist",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            setWishlist(
                res.data.items || []
            );

        }catch(error){
            console.log(error.response?.data);
        }
    }



    return(

        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                 My Wishlist
            </h1>

            {
                wishlist.length === 0 ?
                <p className="text-gray-500"> Your wishlist is empty </p>
                :
                <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                { wishlist.map(item=>( <ProductCard key={item.product._id} product={item.product} /> )) }
                </div>
            }
        </div>
    )
}


export default Wishlist;