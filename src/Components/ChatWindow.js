﻿import React, {useEffect, useState} from 'react';
import '../Styles/ChatWindow.css'
import ChatBubble from "./ChatBubble";

class Chat {
    constructor(sender, message) {
        this.sender = sender
        this.message = message
        this.timeStamp = Date.now()
        console.log(this.timeStamp)
    }
}

export default function ChatWindow() {

    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState("Obama")
    const [message, setMessage] = useState("Red is real sus")
    const [currentPlayer, setCurrentPlayer] = useState("Obama")

    
    
    useEffect(()=>{
        console.log("Hello chat!")
        testing_stuff()
        let tempArr = []
        const TestChat = new Chat(username, message)
        tempArr.push(TestChat)
        setMessages(tempArr)
    }, [])

    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }
    
    
    function sendMessage(){
        alert(message)
    }
    
    function addMessage(e){
        e.preventDefault();
        testing_stuff()
        const text_area = document.getElementById("text_area")
        const typed_message = text_area.value
        const new_message = new Chat(username, typed_message)
        setMessages(messages => [...messages, new_message])
        text_area.value = ""



    }
    
    const chats_mapped = messages.map((chat, index)=>{
        return(
            <ChatBubble key={chat.timeStamp} sender={chat.sender} message={chat.message}/>
        )
    })
    
    function testing_stuff(){
        const element = document.getElementById("Chat-Box")
        console.log(element)
        console.log(element.scrollTop)
    }




    return(
        <div className={"Chat-window"}>
            <h1>Chat</h1>
            <h7>Current User: {username}</h7>
            <h7>It is {currentPlayer}'s turn.</h7>
            <div className={"Chat-Box"}>
                <div className={"Scrolling-Window"} id={"Chat-Box"}>
                    <ChatBubble sender={"Obama"} message={"Hey mom"}/>
                    <ChatBubble sender={"Trump"} message={"Hey Obama's mom"}/>
                    <ChatBubble sender={"Obama"} message={"Now that's just rude"}/>
                    {chats_mapped}
                </div>
            </div>
            <div className={"Action-Box"}>
                    <form className={"Typing-Portion"} onSubmit={addMessage}>
                        <h3>
                            <label htmlFor="text_area">Message:</label><br/>
                            <textarea id="text_area" name="text_area" placeholder={"Message must be < 60 characters."} rows="5" cols="35"/>
                        </h3>
                        <input type="submit" value="Send"/>
                    </form>
            </div>

            </div>
    );}