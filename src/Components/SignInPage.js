import React from "react";
import {useEffect, useState} from "react";
import '../SignInPage.css'


function SignInPage(props){
    const testUser = "Notch"
    const testPassword = "Pickaxe"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [previousLoginAttempts, setPreviousLoginAttempts] = useState([])

    useEffect(()=>{
        console.log("Hello world!")
    }, [])


    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    
    function login(){
        console.log("In Login Function")
        const newItem = {
            user: username,
            pass: password,
            login_time: Date.now()
        }
        setPreviousLoginAttempts(prevState => prevState.concat(newItem))
        
        if(username === testUser && password === testPassword){
            alert("Login Successful!")
        }
        else{
            alert("Login failed.")
        }
    }

    function register(){
        alert("Not implemented yet.")
    }

    return(
        <div className={"Login-page"}>
            <h1>Login Page</h1>
            {/*<form onSubmit={handleLoginAttempt}>*/}
                <h3>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        id="username"
                        onChange={handleNameChange}
                        value={username}
                    />
                </h3>

                <h3>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </h3>

                <button onClick={login}>
                    Login
                </button>
            <button onClick={register}>
                Register
            </button>
        </div>
    );
}

export default SignInPage