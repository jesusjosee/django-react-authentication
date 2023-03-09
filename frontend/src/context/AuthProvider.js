import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'

import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [ authTokens, setAuthTokens] = useState( () => 
        localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem('authTokens'))
        : null
     )

    const [user, setUser] = useState( () => 
        localStorage.getItem('authTokens')
        ? jwt_decode(localStorage.getItem('authTokens'))
        : null
    )

    const [ loading , setLoading] = useState( true )

    // useHistory is deprecated
    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const url = "http://127.0.0.1:8000/api/token/"

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went Wrong')
        }
    }

    const registerUser = async (username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password,
            password2
          })
        });
        if (response.status === 201) {
          navigate("/login");
        } else {
            console.log(response)
          alert("Something went wrong!");
        }
      };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/');
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        registerUser,
        logoutUser
    }

    useEffect( () => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false);
    }, [authTokens, loading] )

    return (
        <AuthContext.Provider value={contextData} >
            { loading ? null : children}
        </AuthContext.Provider>
    )
}