import { useState, useEffect } from 'react';
import PlayerStatTable from './PlayerStatTable';

const PlayerPage = ({ match }) => {
    const [playerData, setPlayerData] = useState([]);
    const { category } = match.params; // hitting 또는 pitching

    useEffect(() => {
        // API 호출 예시
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/v1/search/${category}`);
                const data = await response.json();
                setPlayerData(data);
            } catch (error) {
                console.error('API 호출 중 에러:', error);
            }
        };

        fetchData();
    }, [category]);

    return (
        <div>
            <h1>{`${category} 선수 정보`}</h1>
            <PlayerStatTable data={playerData} />
        </div>
    );
};

export default PlayerPage;
