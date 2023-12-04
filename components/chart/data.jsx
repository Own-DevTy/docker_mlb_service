import React, { useEffect, useState, useCallback, Fragment } from 'react';
import Chart from '@/components/chart/chart';

const player_id = 500871;
const team_id = 108;

export const YourComponent = ({ p_json }) => {
    const value = [];
    const test2 = p_json.hitting.map(function (a) {
        if (a.id == player_id) {
            value[0] = a.name;
            value[1] = a.avg * 10;
            value[2] = a.obp * 10;
            value[3] = a.slg * 10;
            value[4] = a.ops * 10;
            value[5] = a.homeRuns;
            console.log(value[0]);
        }
    });
    return Chart(
        true,
        value[0],
        value[1],
        value[2],
        value[3],
        value[4],
        value[5]
    );
};

export async function getServerSideProps() {
    const p = await fetch(`${process.env.api}/search/hitting/${team_id}`);
    const p_json = await p.json();
    return { props: { p_json } };
}

export default YourComponent;
