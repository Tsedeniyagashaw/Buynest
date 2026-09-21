import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [user, setUser] = useState({
        firstName:"",
        middleName:"",
        lastName:"",
        email:"",
        phoneNumber:"",
        role:"",
        isApproved:false
    });

    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchProfile = async()=>{
            try{
                const token = localStorage.getItem("token");
                const res = await API.get(
                    "/auth/profile",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                console.log(res.data);
                setUser(res.data);
            }catch(error){
                console.log(error.response?.data);
            }finally{
                setLoading(false);
            }
        };
        fetchProfile();
    },[]);

    const updateProfile = async () => {

    try {
        const token = localStorage.getItem("token");
        const res = await API.put(
            "/auth/profile",
            {
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setUser(res.data.user);
        alert("Profile updated successfully!");

    } 
    catch (error) {
        console.log(error.response?.data);
        alert("Something went wrong!");
    }

};

    if(loading){
        return <h2>Loading profile...</h2>;
    }

    return(

        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">
                My Profile
            </h1>

           <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name
            </label>

            <input type="text" value={user.firstName} onChange={(e)=> setUser({ ...user, firstName:e.target.value }) }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />

        </div>
        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                Middle Name
            </label>

            <input
                type="text"
                value={user.middleName}
                onChange={(e)=>
                    setUser({
                        ...user,
                        middleName:e.target.value
                    })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />

        </div>

        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                Last Name
            </label>

            <input
                type="text"
                value={user.lastName}
                onChange={(e)=>
                    setUser({
                        ...user,
                        lastName:e.target.value
                    })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />

        </div>

        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
            </label>

            <input
                type="email"
                value={user.email}
                onChange={(e)=>
                    setUser({
                        ...user,
                        email:e.target.value
                    })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />

        </div>

        {/* Phone */}

        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
            </label>

            <input
                type="text"
                value={user.phoneNumber}
                onChange={(e)=>
                    setUser({
                        ...user,
                        phoneNumber:e.target.value
                    })
                }
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />

        </div>


        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                Role
            </label>

            <input type="text" value={user.role} disabled className="w-full bg-gray-100 border rounded-lg px-4 py-2 text-gray-500" />

        </div>

    </div>

    {
        user.role === "seller" && (

            <div className="mt-6">

                <label className="block text-sm font-medium text-gray-600 mb-2">
                    Seller Status
                </label>

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${ user.isApproved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" }`} >
                    { user.isApproved ? "Approved" : "Pending Approval" }
                </span>
            </div>
        )
    }

    <div className="mt-8 flex justify-end">

       <button onClick={updateProfile} className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-lg font-medium" >
    Save Changes
</button>

     </div>
    </div>
</div>
); }

export default Profile;