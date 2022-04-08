import React from "react";
import {useEffect, useState} from "react";
import '../SignInPage.css'
import { useNavigate } from 'react-router-dom';



function SignInPage(props){
    let navigate = useNavigate()
    const testUser = "Notch"
    const testPassword = "Pickaxe"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=>{
        console.log("Hello world!")
    }, [])


    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    
    function login(){
        console.log("In Login Function")
        if(username === testUser && password === testPassword){
            alert("Login Successful!")
            navigate('/game')
        }
        else{
            alert("Login failed.")
        }
    }

    function register(){
        alert("Not implemented yet.")
    }

    return(
            <form onSubmit={login} className={"Login-page"}>
                <h1>Login Page</h1>
                <h3>
                    <label htmlFor="username">Username:</label><br/>
                    <input type="text" id="username"
                           name="username"
                           value={username}
                           onChange={handleNameChange}
                    /><br/>
                </h3>
                
                <h3>
                    <label htmlFor="password">Password:</label><br/>
                    <input type="text" id="password"
                           name="password"
                           value={password}
                           onChange={handlePasswordChange}

                    /><br/>
                </h3>

                <input type="submit" value={"Login"} /> <br/>
                <input type="button" value={"Register"} onClick={register}/>

            </form>
);
}

export default SignInPage