export default function getPlayerInfo(position, offset, limit) {
    return fetch(
        `${process.env.api}/all/${position}?skip=${offset}&limit=${limit}`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const playerInfo = data[position].map((player) => {
                if (position === 'pitching') {
                    return {
                        team_name: player.team_name,
                        name: player.name,
                        strikeOuts: player.strikeOuts,
                        era: player.era,
                        baseOnBalls: player.baseOnBalls,
                        whip: player.whip,
                        strikeoutsPer9Inn: player.strikeoutsPer9Inn,
                        id: player.id,
                    };
                } else if (position === 'hitting') {
                    return {
                        team_name: player.team_name,
                        name: player.name,
                        avg: player.avg,
                        obp: player.obp,
                        slg: player.slg,
                        ops: player.ops,
                        homeRuns: player.homeRuns,
                        id: player.id,
                    };
                }
            });

            return { nodes: playerInfo, size: Math.floor(data.size) };
        });
}
