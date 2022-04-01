import React, {useEffect, useState} from 'react';
import '../GamePage.css'

export default function GamePage() {

    const [map, setMap] = useState([[]])
    const [tokens, setTokens] = useState([[]])
    const [rows, setRows] = useState(15)
    const [columns, setColumns] = useState(15)

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
        console.log("Hey world!", e.target)
        if(type === "Cell-alive"){
            type = "Cell-dead"
        }
        else{
            type = "Cell-alive"
        }

        e.target.className = type
    }
    
    const map_array_mapped = map.map((row, rowIdx)=>{
        let new_index_array = []
        return (
            <div className={"Grid-row"}>
                {row.map((column, colIdx)=>{
                    let new_index = rowIdx*rows + colIdx
                    new_index_array.push(new_index)
                    console.log(new_index)
                    return (
                        <div className={"Cell-dead"} id={`${new_index}`} onClick={modifyCell}/>
                    )
                })}
            </div>
    )
        
    })

    return(
        <div className={"Game-page"}>
            <h1>Hello world!</h1>
            <div className={"Grid-view"}>
                {map_array_mapped}
            </div>
        </div>
    );}