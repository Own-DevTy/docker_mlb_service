import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';
// import { setLabels } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
    Title
);

// 차트의 옵션값
export const option = {
    scales: {
        r: {
            angleLines: {
                color: 'red'
            }
        }
    }
};

// 차트의 라벨값
export function setlabels(bool) {
    // 타율, 출루율, 장타율, 출루율+장타율, 홈런
    const labels1 = [
        '타율', '출루율', '장타율',
        ['출루율', '+장타율'], '홈런'
    ];

    // 삼진 아웃 수, 평균 자책점, 볼넷 수, 출루허용률,
    // 0이닝당 평균 삼진 수
    const labels2 = [
        ['삼진', '아웃 수'], ['평균', '자책점'], ['볼넷', ' 수'],
        ['출루', '허용률'], 'K/9'
    ];
    // true일 경우 labels1 아닐 경우 labels2
    return bool ? labels1 : labels2;
}

/**
* 선수 A, B의 이름과 스탯을 입력받아 차트를 생성
* @param {string} name1 Player A
* @param {string} name2 Player B
* @returns PlayerA와 PlayerB의 비교 차트 생성
* @param {bool} labelbool true일 경우 타자의 라벨값
* false일 경우 투수의 라벨값
*/
export default function Chart(
    labelbool,
    nameA, x_data1, x_data2, x_data3, x_data4, x_data5,
    nameB, y_data1, y_data2, y_data3, y_data4, y_data5,
) {
    // 두 명 스탯 비교 그래프
    const data = {
        labels: setlabels(labelbool),
        datasets: [
            {
                label: nameA,
                data: [
                    x_data1,
                    x_data2,
                    x_data3,
                    x_data4,
                    x_data5
                ],
                backgroundColor: 'rgba(223, 53, 58, 0.3)',
                borderColor: 'rgba(223, 53, 18, 0.4)',
                borderWidth: 2,
                pointBorderColor: 'rgba(223, 53, 18, 0.5)',
            },
            {
                label: nameB,
                data: [
                    y_data1,
                    y_data2,
                    y_data3,
                    y_data4,
                    y_data5
                ],
                backgroundColor: 'rgba(14, 51, 101, 0.3)',
                borderColor: 'rgba(14, 51, 101, 0.4)',
                borderWidth: 2,
                pointBorderColor: 'rgba(14, 51, 101, 0.5)',
            }
        ],
    };

    // PlayerA 개인 차트
    const data2 = {
        labels: setlabels(labelbool),
        datasets: [
            {
                label: nameA,
                data: [
                    x_data1,
                    x_data2,
                    x_data3,
                    x_data4,
                    x_data5
                ],
                backgroundColor: 'rgba(223, 53, 58, 0.3)',
                borderColor: 'rgba(223, 53, 18, 0.4)',
                borderWidth: 2,
                pointBorderColor: 'rgba(223, 53, 18, 0.5)',
            }
        ],
    };

    // PlayerB 개인 차트
    const data3 = {
        labels: setlabels(labelbool),
        datasets: [
            {
                label: nameB,
                data: [
                    y_data1,
                    y_data2,
                    y_data3,
                    y_data4,
                    y_data5
                ],
                backgroundColor: 'rgba(14, 51, 101, 0.3)',
                borderColor: 'rgba(14, 51, 101, 0.4)',
                borderWidth: 2,
                pointBorderColor: 'rgba(14, 51, 101, 0.5)',
            }
        ],
    };

    if(nameA!=null && nameB!=null) {
        return (
            <Radar
            title= "Radar Chart"
            description="Stats"
            data={data}
            option={option}
            height={"100%"}
            weight={"100%"}
            />
        )
    } else if (nameA!=null) {
        return (
            <Radar
            title= "Radar Chart"
            description="Stats"
            data={data2}
            option={option}
            height={"100%"}
            weight={"100%"}
            />
        )
    } else {
        return (
            <Radar
            title= "Radar Chart"
            description="Stats"
            data={data3}
            option={option}
            height={"100%"}
            weight={"100%"}
            />
        )
    }
}