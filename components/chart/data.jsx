import React, {useEffect, useState, useCallback, Fragment} from 'react';
import Chart from "@/components/chart/chart"

export async function get(team_id){
    const p = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${team_id}`)
    const p_json = await p.json();
    return p_json
}

export function test() {
    async function fet(player_id, team_id) {
        const p = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${team_id}`)
        const p_json = await p.json();

        const value = []
        const json_map = p_json.hitting.map(function(a){
            if (a.id == player_id){
                value[0] = a.name
                value[1] = a.avg*10;
                value[2] = a.obp*10;
                value[3] = a.slg*10;
                value[4] = a.ops*10;
                value[5] = a.homeRuns;
                //console.log(value[0])
            }
        })
        //return (value)
        // return (Chart(true,
        //     value[0], value[1], value[2],
        //     value[3], value[4], value[5]))
        return new Promise ((resolve) => {
            resolve(value);
        })
    }

    let item;
    const fetchData = async() => {
        item = await fet(500871, 108)
    }

    console.log(item)

    //fet(500871, 108).then((result) => {
    //    console.log(result)
    //})
    
    //console.log(tt)
    
    //console.log(val)
    return (
        <div>
        {fet(500871, 108).then((value) => {
            console.log(value[1])
        })}
        </div>
    )
}

export const YourComponent = ({p_json}) => {
    const value = []
    const test2 = p_json.hitting.map(function(a){
        if (a.id == player_id){
            
            value[0] = a.name;
            value[1] = a.avg*10;
            value[2] = a.obp*10;
            value[3] = a.slg*10;
            value[4] = a.ops*10;
            value[5] = a.homeRuns;
            console.log(value[0])
        }
    })
    return (Chart(
        true,
        value[0], value[1], value[2], value[3],
        value[4], value[5]
    ));
};

// export async function get(team_id){
//     const p = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${team_id}`)
//     const p_json = await p.json();
//     return {props : {p_json}}
// }

export default YourComponent;