import React from "react";
import {useEffect, useState} from "react";
import '../Styles/SignInPage.css'
import { useNavigate } from 'react-router-dom';



function SignInPage(props){
    let navigate = useNavigate()
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
    
    function login(e){
        e.preventDefault()
        let data = `username=${username}&password=${password}`;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let temp = JSON.parse(this.responseText)
                if(temp.status === 200) {
                    navigate('/game')
                }
            }
        });
        xhr.open("POST", "auth/login");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    function register(e){
        e.preventDefault()
        let data = `username=${username}&password=${password}`;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            let temp = this.responseText
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                if(temp.status === 400) {
                    alert('User exists')
                }if(temp.status === 200) {
                    alert('User registered')
                }
            }
        });
        xhr.open("POST", "auth/register");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    function postState(e){
        e.preventDefault()
        // data will contain the name field and the json object
        let data = {
            "username": username,
            "token_list": "test123",
            "background_list": "2131241"
        };
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                if(this.status === 400) {
                    alert('User exists')
                }if(this.status === 200) {
                    alert('User registered')
                }
            }
        });
        xhr.open("POST", "state");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }

    function getState(e){
        e.preventDefault()
        let data = `username=${username}`;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                if(this.status === 400) {
                    alert('User exists')
                }if(this.status === 200) {
                    alert('User registered')
                }
            }
        });
        xhr.open("POST", "state/retreive");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
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
                <input type="button" value={"Register"} onClick={getState}/>

            </form>
);
}

export default SignInPage