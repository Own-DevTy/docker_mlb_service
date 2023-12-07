const position = 'hitting';

export async function getPlayerInfo(position, offset, limit) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/v1/all/${position}?skip=${offset}&limit=${limit}`
        );
        const data = await response.json();

        const playerInfo = data[position]
            ? data[position].map((player) => {
                  if (position == 'pitching') {
                      return {
                          team_name: player.team_name,
                          name: player.name,
                          strikeOuts: player.strikeOuts,
                          era: player.era,
                          baseOnBalls: player.baseOnBalls,
                          whip: player.whip,
                          strikeoutsPer9Inn: player.strikeoutsPer9Inn,
                      };
                  } else if (position == 'hitting') {
                      return {
                          team_name: player.team_name,
                          name: player.name,
                          avg: player.avg,
                          obp: player.obp,
                          slg: player.slg,
                          ops: player.ops,
                          homeRuns: player.homeRuns,
                      };
                  }
              })
            : [];

        return { nodes: playerInfo, size: Math.floor(data.size) };
    } catch (error) {
        console.error('error:', error);
        throw error;
    }
}
