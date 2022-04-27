import React, {useEffect, useState} from 'react';
import '../Styles/GamePage.css'
import ChatWindow from "./ChatWindow";

export default function GamePage() {

    const [map, setMap] = useState([[]])
    const [tokens, setTokens] = useState([[]])
    const [rows, setRows] = useState(15)
    const [columns, setColumns] = useState(15)
    const [trackedCell, setTrackedCell] = useState(0)

    useEffect(()=>{
        console.log("Hello gaming world!")
        setMap(init_map(rows, columns))
        setTokens(init_tokens(rows, columns))
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

    function modifyCell(e) {
        //onClick event listener for each cell.
        let type = e.target.className 
        console.log("Div clicked!", e.target)
        trackClickedCell(e.target.id)
        if(type === "Cell-alive"){
            type = "Cell-dead"
        }
        else{
            type = "Cell-alive"
        }

        e.target.className = type
    }
    
    function trackClickedCell(element_id){
        let id = parseInt(element_id)
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                let new_index = (i*rows + j) + rows
                if(new_index === id){
                    setTrackedCell(new_index)
                    console.log(`${new_index} === ${id}`)
                }
            }
        }
    }
    
    function seeTrackedCell(){
        console.log(trackedCell)
        const element = document.getElementById(trackedCell.toString())
        console.log(element)
    }
    
    const map_array_mapped = map.map((row, rowIdx)=>{
        let new_index_array = []
        return (
            <div key={rowIdx} className={"Grid-row"}>
                {row.map((column, colIdx)=>{
                    let new_index = (rowIdx*rows + colIdx) + rows
                    new_index_array.push(new_index)
                    return (
                        <div className={"Cell-dead"} id={`${new_index}`} key={new_index} onClick={modifyCell}/>
                    )
                })}
            </div>
    )
        
    })

    return(
        <div className={"Entire-Page"}>
            <div className={"Game-Page"}>
                <h1>Hello world!</h1>
                <div className={"Grid-view"}>
                    {map_array_mapped}
                </div>
                <div>
                    <input type="button" value="See Things" onClick={seeTrackedCell}/>
                </div>
            </div>
            <ChatWindow/>
            
        </div>
    );}