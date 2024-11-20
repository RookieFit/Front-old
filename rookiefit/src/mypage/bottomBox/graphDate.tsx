import './graphBox.css';
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from 'react';

interface Props {
    name: string;
    values: number[];
    title: string;
    graphMinHight: number;
    graphMaxHight: number;
}

const GraphDate = ({ title, name, values, graphMinHight, graphMaxHight }: Props) => {   
    const [dates, setDates] = useState<string[]>([]);

    useEffect(() => {
        // 오늘부터 30일 전까지의 날짜 배열 생성
        const today = new Date();
        const dateArray: string[] = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dateArray.push(date.toISOString().split('T')[0]); // 'YYYY-MM-DD' 형식
        }
        setDates(dateArray.reverse()); // 배열을 반전하여 오래된 날짜부터 나열
    }, []);

    const data = {
        series: [{
            name: name,
            type: 'line',
            data: values,
        }],
        options: {
            chart: {
                height: 350,
                type: 'area',
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                type: "datetime",
                categories: dates, // 생성된 날짜 배열 전달
                labels: {
                    formatter: (value: string) => {
                        const date = new Date(value);
                        const month = date.toLocaleString('default', { month: 'short' });
                        const day = date.getDate();
                        return `${month} ${day}일`; // 'MMM dd' 형식
                    }
                },
            },
            yaxis: {
                min: graphMinHight,
                max: graphMaxHight,
            }
        } as ApexOptions
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

export default GraphDate;