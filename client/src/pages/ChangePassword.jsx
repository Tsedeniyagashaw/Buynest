import { useState } from "react";
import API from "../services/api";


function ChangePassword(){

const [passwords,setPasswords] = useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
});


const handleChange = (e)=>{

    setPasswords({
        ...passwords,
        [e.target.name]:e.target.value
    });

};



const submit = async()=>{

    if(passwords.newPassword !== passwords.confirmPassword){

        alert("Passwords do not match");
        return;

    }


    try{

        const token = localStorage.getItem("token");


        const res = await API.put(
            "/auth/change-password",
            {
                currentPassword:passwords.currentPassword,
                newPassword:passwords.newPassword
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        alert(res.data.message);


    }
    catch(error){

        alert(error.response?.data?.message);

    }

};



return (

<div className="p-6">


<h1 className="text-2xl font-semibold mb-6">
Change Password
</h1>



<div className="bg-white p-6 rounded-xl shadow max-w-lg">


<input
type="password"
name="currentPassword"
placeholder="Current Password"
onChange={handleChange}
className="w-full border p-3 rounded mb-4"
/>



<input
type="password"
name="newPassword"
placeholder="New Password"
onChange={handleChange}
className="w-full border p-3 rounded mb-4"
/>



<input
type="password"
name="confirmPassword"
placeholder="Confirm New Password"
onChange={handleChange}
className="w-full border p-3 rounded mb-4"
/>



<button
onClick={submit}
className="bg-violet-700 text-white px-5 py-3 rounded"
>
Change Password
</button>


</div>


</div>

)

}


export default ChangePassword;