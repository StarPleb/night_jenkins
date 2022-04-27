import React, {useContext, useEffect, useState} from 'react';
import '../Styles/ChatWindow.css'
import ChatBubble from "./ChatBubble";
import UsernameContext from "../UsernameContext";

class Chat {
    constructor(sender, message) {
        this.sender = sender
        this.message = message
        this.timeStamp = Date.now()
        console.log(this.timeStamp)
    }
}

export default function ChatWindow(props) {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("Red is real sus")
    const {username} = useContext(UsernameContext)
    const saveChats = props.saveChat

    
    
    useEffect(()=>{
        console.log("Hello chat!")
        testing_stuff()
        let tempArr = []
        const TestChat = new Chat(username, message)
        tempArr.push(TestChat)
        setMessages(tempArr)
        
        return ()=>{

        }
    }, [])
    
    // useEffect(()=>{
    //    
    //     return ()=>{
    //         prepareChat(messages)
    //             .then((arr)=>{
    //                 saveChats(arr)
    //             })
    //     }
    // }, [messages])
    
    function saveButton(){
        saveChats(messages)
    }
    
    async function prepareChat(){
        console.log(messages)
        let arr = []
        for(const chat in messages){
            let message = {
                sender: chat.sender,
                message: chat.message
            }
            arr.push(message)
        }
        return arr
    }
    
    
    function commandFunction(input){
        let command = input.slice(1)
        if(command.slice(0,4) === "roll"){
            rollDice(command)
        }
    }
    
    function rollDice(input){
        console.log(input)
        /*
        d4 d6 d8 d10 d12 d20 d100
         */
        let allowed_dice = [4, 6, 8, 10, 12, 20, 100]
        let arr = input.match(/[-+]?[0-9]*\.?[0-9]+/g)
        let num1 = parseInt(arr[0])
        let num2 = parseInt(arr[1])
        let result = 0
        
        let isLegalDice = false;
        
        for(let i = 0; i < allowed_dice.length; i++){
            if(num2 === allowed_dice[i])
                isLegalDice = true
        }
        if(isLegalDice)
            result = Math.ceil(Math.random() * (arr[0] * arr[1]))
        else
            serverMessage("Illegal di")
        if(result < 2)
            result += 1
        
        serverMessage(`You rolled ${num1} d${num2}'s and got ${result}!`)
    }
    
    function serverMessage(message){
        const new_message = new Chat("Server", message)
        setMessages(messages => [...messages, new_message])
    }
    
    
    function sendMessage(e){
        e.preventDefault();
        testing_stuff()
        const text_area = document.getElementById("text_area")
        const typed_message = text_area.value
        let first_char = typed_message.charAt(0)
        if(first_char === "/"){
            commandFunction(typed_message)
        } else{
            const new_message = new Chat(username, typed_message)
            setMessages(messages => [...messages, new_message])
            text_area.value = ""
        }




    }
    
    const chats_mapped = messages.map((chat, index)=>{
        return(
            <ChatBubble key={chat.timeStamp} sender={chat.sender} message={chat.message}/>
        )
    })
    
    function testing_stuff(){
        const element = document.getElementById("Chat-Box")
    }




    return(
        <div className={"Chat-window"}>
            <h1>Chat</h1>
            <h7>Current User: {username}</h7>
            <h7>It is {username}'s turn.</h7>
            <div className={"Chat-Box"}>
                <div className={"Scrolling-Window"} id={"Chat-Box"}>
                    {chats_mapped}
                </div>
            </div>
            <div className={"Action-Box"}>
                    <form className={"Typing-Portion"} onSubmit={sendMessage}>
                        <h3>
                            <label htmlFor="text_area">Message:</label><br/>
                            <textarea id="text_area" name="text_area" placeholder={"Message must be < 60 characters."} rows="5" cols="30"/>
                        </h3>
                        <input type="submit" value="Send"/>
                        <input type="button" value="Save" onClick={saveButton}/>
                    </form>
            </div>

            </div>
    );}