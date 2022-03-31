import React, {useEffect, useState} from 'react';
import '../GamePage.css'

export default function GamePage() {

    const [map, setMap] = useState([[]])
    const [tokens, setTokens] = useState([[]])

    useEffect(()=>{
        console.log("Hello gaming world!")
        setMap(init_map(15, 15))
        setTokens(init_tokens(15, 15))
        
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
    
    const map_array_mapped = map.map((row, index)=>{
        return (
            <div className={"Grid-row"}>
                {row.map((column, idx)=>{
                    console.log(index, idx)
                    return (
                        <div className={"Grid-cell"}/>
                    )
                })}
            </div>
    )
        
    })

    return(
        <div>
            <h1>Let's play!</h1>
            <div className={"Grid-view"}>
                {map_array_mapped}
            </div>
        </div>
    );}