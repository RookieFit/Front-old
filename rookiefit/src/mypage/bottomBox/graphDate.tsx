import './graphBox.css';
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Props {
    name: string;
    values: number[]; // values should be a number array
    title: string;
    graphMinHight: number;
    graphMaxHight: number;
    daysInMonth: number[];
}

const getDaysInMonth = (month: number, year: number): number[] => {
    const date = new Date(year, month, 0);
    const daysInMonth = date.getDate();
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    }
    return daysArray;
};

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // 0-based, so add 1

const daysInMonth = getDaysInMonth(currentMonth, currentYear);

const GraphDate = ({ title, name, values, graphMinHight, graphMaxHight }: Props) => {
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
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                type: "datetime", // Make sure to use datetime type
                categories: daysInMonth.map((day) => {
                    // Create a timestamp for each day of the month
                    const date = new Date(currentYear, currentMonth - 1, day);
                    return date.getTime(); // Return the timestamp (milliseconds)
                }),
                labels: {
                    formatter: (value: any) => {
                        const date = new Date(value);
                        const month = date.toLocaleString('default', { month: 'short' }); // 'MMM'
                        const day = date.getDate();
                        return `${month} ${day}일`; // 'MMM dd' format
                    }
                },
            },
            yaxis: {
                min: graphMinHight, // Y축 최소값 설정
                max: graphMaxHight, // Y축 최대값 설정
            }
        } as ApexOptions
    }

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
