import React, {useEffect, useState, useCallback, Fragment} from 'react';
import Chart from "@/components/chart/chart"

const value = ['', 0, 0, 0, 0, 0]
const player_id = 572287
const team_id = 114

const YourComponent = ({p_json}) => {
    const test2 = p_json.hitting.map(function(a){
        if (a.id == player_id){
            value[0] = a.name;
            value[1] = a.avg*10;
            value[2] = a.obp*10;
            value[3] = a.slg*10;
            value[4] = a.ops*10;
            value[5] = a.homeRuns;
        }
    })
    return (
        <Fragment>
            {Chart(true,
                value[0], value[1], value[2], value[3],
                value[4], value[5])}
        </Fragment>
    );
};

export async function getServerSideProps(){
    const p = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${team_id}`)
    const p_json = await p.json();
    return {props : {p_json}}
}

export default YourComponent;