import ApexCharts, { ApexOptions } from 'apexcharts'
import './graphBox.css';
import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';



const GraphDate = () => {
  const data = {
    series: [44, 33, 23],
    options: {
        // 차트의 타입, 이벤트
        chart: {
            type: 'donut' as const,
            events: {
                //TODO: 클릭이벤트 추가
                click: () => { }
            },
        },
        // 차트 내부 정보
        dataLabels: {
            enabled: true,
            textAnchor: 'middle' as const, // 타입 명시
            style: {
                fontSize: '18px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                colors: ['#fff']
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.55
            }
        },
        // 차트 가운데 들어가는 내용, 크기 조절
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: '총 칼로리',
                            formatter: () => '10000kcal'
                        }
                    },
                    size: '50%',
                }
            }
        },
        // 더미데이터
        labels: ["탄수화물", "단백질", "지방"],
        colors: ["#BBE9FF", "#85F4FF", "#94FFD8"],
        stroke: {
            width: 4,
            colors: ['#fff']
        },
        // 아래 작게 나오는 친구들
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
    } as ApexOptions // 여기서 타입을 ApexOptions로 지정
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
};
export default GraphDate;