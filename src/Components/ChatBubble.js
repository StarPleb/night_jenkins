import React from "react";
import '../Styles/ChatBubble.css'

export default function ChatBubble(props) {

    return(
        <div className={"Chat-Bubble"}>
            <div className={"Sender-View"}>
                {props.sender}
            </div>
            <div className={"Message-View"}>
                {props.message}
            </div>
        </div>
    )

}