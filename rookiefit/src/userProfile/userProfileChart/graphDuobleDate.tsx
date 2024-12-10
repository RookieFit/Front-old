import './graphBox.css';
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from 'react';

interface Props {
    nameWeight: string;
    nameHeight: string;
    weights: number[];
    heights: number[];
    title: string;
}

const GraphDuobleDate = ({ 
    title, 
    nameWeight, 
    nameHeight, 
    weights, 
    heights 
}: Props) => {
    const [dates, setDates] = useState<string[]>([]);
    const [averageBMI, setAverageBMI] = useState<number | null>(null);

    useEffect(() => {
        const today = new Date();
        const dateArray: string[] = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dateArray.push(date.toISOString().split('T')[0]);
        }
        setDates(dateArray.reverse());
    }, []);

    useEffect(() => {
        if (weights.length === heights.length && weights.length > 0) {
            const totalBMI = weights.reduce((acc, weight, index) => {
                const heightInMeters = heights[index] / 100;
                const bmi = weight / (heightInMeters * heightInMeters);
                return acc + bmi;
            }, 0);
            const avgBMI = totalBMI / weights.length;
            setAverageBMI(avgBMI);
        }
    }, [weights, heights]);

    // y축 최소/최대값 계산 (정수로 처리)
    const minValue = Math.floor(Math.min(...weights, ...heights) - 15); // 내림 처리
    const maxValue = Math.ceil(Math.max(...weights, ...heights) + 15); // 올림 처리

    const data = {
        series: [
            {
                name: nameWeight,
                type: 'line',
                data: weights,
            },
            {
                name: nameHeight,
                type: 'line',
                data: heights,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true,
                    allowMouseWheelZoom: false
                },
                toolbar: {
                    autoSelected: 'zoom',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            title: {
                text: averageBMI !== null 
                    ? `${title} - 평균 BMI: ${averageBMI.toFixed(2)}` 
                    : title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5,
                },
            },
            xaxis: {
                type: "datetime",
                categories: dates,
                labels: {
                    formatter: (value: string) => {
                        const date = new Date(value);
                        const month = date.toLocaleString('default', { month: 'short' });
                        const day = date.getDate();
                        return `${month} ${day}일`;
                    },
                },
            },
            yaxis: {
                min: minValue,
                max: maxValue,
                labels: {
                    formatter: (value: number) => Math.round(value).toString(), // 값을 정수로 변환
                },
            },
        } as ApexOptions,
    };

    return (
        <div className="graph-box">
            <Chart
                options={data.options}
                series={data.series}
                type="line"
                height={315}
                width={1500}
            />
        </div>
    );
};

export default GraphDuobleDate;
