import { useState } from "react";
import API from "../services/api";


function ReviewModal({ product, orderId, onClose, onSuccess }) {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();


        if(rating === 0){
            alert("Please select a rating");
            return;
        }


        try {

            setLoading(true);

            const token = localStorage.getItem("token");


            await API.post(
                "/reviews",
                {
                    product: product._id,
                    order: orderId,
                    rating,
                    comment
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            alert("Review submitted successfully");


            onSuccess();

            onClose();


        }
        catch(error){

            console.log(error.response?.data);

            alert(
              error.response?.data?.message ||
              "Failed to submit review"
            );

        }
        finally{

            setLoading(false);

        }

    };


    return (

<div
className="
fixed inset-0
bg-black/40
flex
items-center
justify-center
z-50
px-4
"
>


<div
className="
bg-white
w-full
max-w-md
rounded-xl
shadow-xl
p-6
"
>


<div className="flex justify-between items-center mb-5">

<h2 className="text-xl font-bold text-gray-800">
Review {product.name}
</h2>


<button
onClick={onClose}
className="text-gray-500 hover:text-red-500 text-xl"
>
✕
</button>

</div>



<form onSubmit={handleSubmit}>


{/* Rating */}

<div className="mb-5">

<p className="font-medium mb-2">
Rating
</p>


<div className="flex gap-2 text-3xl">

{
[1,2,3,4,5].map((star)=>(

<button
type="button"
key={star}
onClick={()=>setRating(star)}
className={
star <= rating
? "text-yellow-400"
: "text-gray-300"
}
>
★
</button>

))

}

</div>

</div>



{/* Comment */}

<div className="mb-5">

<label className="font-medium">
Comment
</label>


<textarea

value={comment}

onChange={(e)=>setComment(e.target.value)}

placeholder="Share your experience..."

className="
w-full
mt-2
border
rounded-lg
p-3
outline-none
focus:ring-2
focus:ring-violet-500
"

rows="4"

/>

</div>



<button

disabled={loading}

className="
w-full
bg-violet-600
hover:bg-violet-700
text-white
py-3
rounded-lg
font-semibold
disabled:opacity-50
"

>

{
loading
?
"Submitting..."
:
"Submit Review"
}

</button>


</form>


</div>


</div>

    );
}


export default ReviewModal;