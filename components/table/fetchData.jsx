import React, {useEffect, useState, useCallback, Fragment} from 'react';

const fetchDataFromAPI = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/search/hitting/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
const initial_state = {
    hitting: [
        {id: "", name: ""}
    ]
}
const YourComponent = () => {
    const [data, setData] = useState(initial_state);

    const fetchData = useCallback(async (id) => {
        const result = await fetchDataFromAPI(id);
        setData(result);
    }, []);

    useEffect(() => {
        fetchData(108);         //팀번호 입력 넣으셈
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

   
    const playerId = 500871;    //선수번호 입력 하셈
    const playerInfo = data.hitting.find(player => player.id === playerId);

    return (
        <Fragment>
            {playerInfo && (            //세부정보 추가하면 됨
                <div>
                    <p>아이디 : {playerInfo.id}</p>
                    <p>이름 : {playerInfo.name}</p>
                    <p>나이 : { playerInfo.age}</p>
                    <p>키 : { playerInfo.height}</p>
                    <p>몸무게 : { playerInfo.weight}</p>
                  
                </div>
            )}
        </Fragment>
    );
};

export default YourComponent;