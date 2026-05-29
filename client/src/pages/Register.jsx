import { useState } from "react"
import API from "../services/api"


function Register() {
   const [form, setForm] = useState ({
      firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "buyer"
   });
   
   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await API.post("/auth/register", form);
        console.log(res.data);
        alert("Registered SUccessfully");
    }
    catch(err) {
        console.log(err.response?.data || err.message);
    }
   };

   const handleChange = (e) => {
    setForm({
        ...form, [e.target.name]: e.target.value
    });
   }

    return( 
        <div>
            <h1>Registration Form</h1>
            <form action="" onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="middleName" placeholder="Middle Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button type="submit">Register</button>
            </form>
        </div>

)
}

export default Register