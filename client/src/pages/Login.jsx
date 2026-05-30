import { useState, useContext } from "react"
import API from "../services/api"
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { login } = useContext(AuthContext)

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);
            console.log(res.data);

            login(res.data.token);

            alert("Login successful");

        }
        catch (err){
            console.log(err.response?.data);
            alert("Login Failed");
        }
    };

    return (
        <div>
            <h1>Login Form</h1>
            <form action=""  onSubmit={handleSubmit}>
               <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default Login