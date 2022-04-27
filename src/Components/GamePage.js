import React, {useEffect, useState, useContext} from 'react';
import '../Styles/GamePage.css'
import ChatWindow from "./ChatWindow";
import { useParams } from 'react-router';
import usernameContext from "../UsernameContext";

import {postState, getState} from "../databaseController";

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default function GamePage() {

    const [map, setMap] = useState([[]])
    const temp = new Position(7, 7)
    const [tokenPosition, setTokenPosition] = useState(temp)
    const [tokens, setTokens] = useState([[]])
    const [rows, setRows] = useState(25)
    const [columns, setColumns] = useState(25)
    const [trackedCell, setTrackedCell] = useState(0)
    const [tokenSelected, setTokenSelected] = useState(false)
    const [mapLayerSelected, setMapLayerSelected] = useState(false)
    const { username } = useContext(usernameContext);


    useEffect(()=>{
        console.log("Hello gaming world!")
        setMap(init_map(rows, columns))
        setTokens(init_tokens(rows, columns))
        
        return () =>{
        }
    }, [])
    
    function setGame(){
        let game_state = getState(username)
        console.log(game_state)
    }
    
    function saveGame(chats){
        console.log(chats)
        let game_state = {
            ...tokenPosition,
            username: username,
            ...chats
        }
        
        
        console.log(game_state)
        postState(game_state)
    }

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
        if(type === "Cell-alive"){
            type = "Cell-dead"
        }
        else{
            type = "Cell-alive"
        }

        e.target.className = type
    }
    
    function tokenSelect(e){
        //onClick event listener for a token.
        let type = e.target.className
        console.log("Div clicked!", e.target)
        trackClickedCell(e.target.id)
        if(!tokenSelected)
            setTokenSelected(true)
    }
    
    function trackClickedCell(element_id){
        let id = parseInt(element_id)
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                let new_index = (i*rows + j) + rows
                if(new_index === id){
                    setTokenPosition(new Position(i, j))
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
                    let tokenOnCell = tokenPosition.x === rowIdx && tokenPosition.y === colIdx                   
                    return (
                        <div className={"Cell-dead"} id={`${new_index}`} key={new_index} onClick={modifyCell}>
                            { tokenOnCell &&
                                <img src={require('../assets/tokens/blue_token.png')}
                                     alt={'../assets/plague_knight.png'}
                                     width={25}
                                     height={25}
                                     id={`${new_index}`}
                                />
                            }
                        </div>
                    )
                })}
            </div>
    )
        
    })

    const tokens_array_mapped = map.map((row, rowIdx)=>{
        let new_index_array = []
        return (
            <div key={rowIdx} className={"Grid-row"}>
                {row.map((column, colIdx)=>{
                    let new_index = (rowIdx*rows + colIdx) + rows
                    new_index_array.push(new_index)
                    if(rowIdx === tokenPosition.x && colIdx === tokenPosition.y)
                        return (
                            <div className={"Token-Cell"} key={new_index} onClick={tokenSelect}>
                                <img src={require('../assets/tokens/blue_token.png')}
                                     alt={'../assets/plague_knight.png'}
                                     width={25}
                                     height={25}
                                     id={`${new_index}`}
                                />
                            </div>
                                
                        )
                    else{
                        return (
                            <div className={"Empty-Token-Cell"}                                      id={`${new_index}`}
                                  key={new_index} onClick={tokenSelect}>
                            </div>

                        )
                    }
                })}
            </div>
        )

    })
    
    function toggleLayer(e){
        console.log(e.target.checked)
        setMapLayerSelected(e.target.checked)
    }

    return(
        <div className={"Entire-Page"}>
            <div className={"Game-Page"}>
                <h1>Hello world!</h1>
                <h4>Clicked Cell: {tokenSelected} at ({tokenPosition.x}, {tokenPosition.y})</h4>
                
                <div className={"Map-Toggle"}>
                    <h4>Map Layer</h4>
                    <label className="switch">
                        <input type="checkbox" id={"Layer-Toggle"} onClick={toggleLayer}/>
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className={"Grid-view"}>

                    <div className={"Map-View"}>
                        <img src={require('../assets/backgrounds/1651077791265_Forest-Frost-Encounter.jpg')}
                             alt={'../assets/plague_knight.png'}
                             width={25 * (columns + 2)}
                             height={25 * (rows + 2)}
                             id={`background-image`}
                        />
                    </div>

                    
                    {mapLayerSelected &&                     
                        <div className={"Map-View"}>
                        {map_array_mapped}
                    </div>}

                    {!mapLayerSelected &&
                        <div className={"Token-View"}>
                            {tokens_array_mapped}
                        </div>
                    }
                    
                    

                    
                </div>
                <div>
                    <input type="button" value="See Things" onClick={seeTrackedCell}/>
                </div>
            </div>
            
            <ChatWindow saveChat={saveGame}/>
            
        </div>
    );}