import React from "react";
import Chart from "react-apexcharts";
import './foodResult.css'
import moment from "moment";

const FoodResult = () => {
    const data = {
        series: [44, 33, 23],
        options: {
            chart: {
                type: 'donut' as const,
                events: {
                    click: () => { }
                },

            },
            dataLabels: {
                enabled: true,
                textAnchor: 'middle',
                style: {
                    fontSize: '18px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#000'
                },

            },
            plotOptions: {
                pie: {
                    expandOnClick: false, // 클릭 시 확장 방지
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: '총 칼로리',
                                formatter: () => '10000kcal' // 중앙의 값 설정
                            }
                        },
                        size: '50%', // 차트의 두께를 설정 (값을 높이면 원의 중앙이 더 작아짐)

                    }
                }
            },
            labels: ["탄수화물", "단백질", "지방"],
            colors: ["#88C273", "#FFF1DB", "#D4BDAC"],
            stroke: {
                width: 4, // 차트의 외곽선 두께 설정 (값을 조정하여 두께 변경)
                colors: ['#ddd'] // 외곽선 색상을 흰색으로 설정
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '16px',
                itemMargin: {
                    horizontal: 70,
                    vertical: 5
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    };

    return (
        <div className="left-back" >
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
        </div >
    );
}

export default FoodResult;
