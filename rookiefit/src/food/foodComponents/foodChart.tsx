import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import './FoodChart.css';
import moment from "moment";

interface Entry {
    foodName: string;
    cal: number;
    chobo: number;
    prot: number;
    fat: number;
}

interface FoodChartProps {
    foodDetails: { entries: Entry[] };
}

const FoodChart = ({ foodDetails }: FoodChartProps) => {
    // 영양 성분 합계 계산
    const totalCalories = foodDetails.entries.reduce((sum, item) => sum + item.cal, 0);
    const totalCarbs = foodDetails.entries.reduce((sum, item) => sum + item.chobo, 0);
    const totalProtein = foodDetails.entries.reduce((sum, item) => sum + item.prot, 0);
    const totalFat = foodDetails.entries.reduce((sum, item) => sum + item.fat, 0);

    // 차트에 사용될 데이터 설정
    const data = {
        series: [totalCarbs, totalProtein, totalFat],
        options: {
            chart: {
                type: 'donut' as const,
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '18px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    colors: ['#fff']
                },
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: '',
                                formatter: () => `${totalCalories} kcal`
                            }
                        },
                    }
                }
            },
            labels: ["탄수화물", "단백질", "지방"],
            colors: ["#FFE31A", "#000B58", "#FF2929"],
            stroke: {
                width: 4,
                colors: ['#fff']
            },
            legend: {
                position: 'bottom',
                fontSize: '16px',
            },
        } as ApexOptions
    };

    return (
        <div className="left-back">
            <div className="food-result-wrapper">
                <div className="calendar-header">
                    <h2>{moment().format('YYYY-MM-DD-ddd')}</h2>
                </div>
                <div className="food-result-chart">
                    <Chart
                        options={data.options}
                        series={data.series}
                        type="donut"
                        width="680"
                    />
                </div>
            </div>
        </div>
    );
}

export default FoodChart;
