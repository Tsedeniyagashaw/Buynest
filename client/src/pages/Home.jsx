import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Home() {
    
    const { token } = useContext(AuthContext);

    return (
    <div>

        <h1>Home</h1>
        {token ? ( <h2>logged in</h2> ) : ( <h2>logged in</h2> )
        } ;   
    </div>


)
}

export default Home