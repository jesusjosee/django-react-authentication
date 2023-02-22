import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <div>
                <h1> Mi app Authentication</h1>

                {
                        user 
                    ?
                        (
                            <>
                                <Link to="/" >Home</Link>
                                <Link to="/protected" >Protected Page</Link>
                                <button onClick={logout} >Logout</button>
                            </>
                        )
                    :
                        (
                            <>
                                <Link to="/login" >Login</Link>
                                <Link to="/register" >Register</Link>
                            </>
                        )
                }
                
            </div>
        </nav>
    )
}

export default Navbar;