//import styles from "@/styles/Chart.module.css"

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
    labels: [
        'thing 1', 'thing 2', 'thing 3',
        'thing 4', 'thing 5', 'thing 6'
    ],
    datasets: [
        {
            label: '이름1',
            data: [1, 2, 3, 4, 5, 6],
            backgroundColor: 'rgba(223, 53, 58, 0.3)',
            borderColor: 'rgba(223, 53, 18, 0.5)',
            borderWidth: 2,
        },
        {
            label: '이름2',
            data: [5, 3, 6, 2, 1, 4],
            backgroundColor: 'rgba(14, 51, 101, 0.3)',
            borderColor: 'rgba(14, 51, 101, 0.5)',
            borderWidth: 2,
        }
    ],
};

export const option = {
    plugins: {
        title: {
            display: true,
            text: 'Custom Chart Title',
            padding: {
                top: 10,
                bottom: 30
            }
        }
    }
};

export default function RChart() {
    return (
    <div>
        <div style={{width: "400px"}}>
        <Radar
        title= "Radar Chart"
        description="Stats"
        data={data}
        option={option}/>
        </div>
    </div>
    )
}