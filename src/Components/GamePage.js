import React, {useEffect, useState} from 'react';
import '../GamePage.css'

export default function GamePage() {

    const [map, setMap] = useState([[]])
    const [tokens, setTokens] = useState([[]])
    const [counter, setCounter] = useState(0)

    useEffect(()=>{
        console.log("Hello gaming world!")
        setMap(init_map(15, 15))
        setTokens(init_tokens(15, 15))
// Add event listener to table
        const el = document.getElementById("outside");
        el.addEventListener("click", modifyText, false);
        
    }, [])

    function init_map(rows, columns){
        let temp = []
        for(let i = 0; i < rows; i ++){
            let temp_row = []
            for(let j = 0; j < columns; j ++) {
                temp_row.push(0)
            }
            temp.push(temp_row)
        }
        return temp
    }
    

    function init_tokens(rows, columns){
        let temp = []
        for(let i = 0; i < rows; i ++){
            let temp_row = []
            for(let j = 0; j < columns; j ++) {
                if(i === rows/2 && j === columns/2)
                    temp.push(1)
                else{
                    temp.push(0)
                }
            }
            temp.push(temp_row)
        }
        return temp
    }

    function modifyText() {
        const t2 = document.getElementById("t2");
        if (t2.firstChild.nodeValue === "three") {
            t2.firstChild.nodeValue = "two";
        } else {
            t2.firstChild.nodeValue = "three";
        }
    }

    function modifyCell(e) {
        let type = e.target.className
        console.log("Hey world!", e.target)
        if(type === "Cell-alive"){
            type = "Cell-dead"
        }
        else{
            type = "Cell-alive"
        }

        e.target.className = type
    }

// Add event listener to table

    const map_array_mapped = map.map((row, index)=>{
        let new_index_array = []
        return (
            <div className={"Grid-row"}>
                {row.map((column, idx)=>{
                    let new_index = index*idx + idx
                    new_index_array.push(new_index)
                    console.log(index, idx)
                    return (
                        <div className={"Cell-dead"} id={`${new_index}`} onClick={modifyCell}/>
                    )
                })}
            </div>
    )
        
    })

    return(
        <div className={"Game-page"}>
            <h1>Let's play!</h1>
            <div className={"Grid-view"}>
                {map_array_mapped}
            </div>
            <table id="outside">
                <tr><td id="t1">one</td></tr>
                <tr><td id="t2">two</td></tr>
            </table>
        </div>
    );}