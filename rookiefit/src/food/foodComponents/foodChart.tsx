import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import './FoodChart.css';
import moment from "moment";
import { useFoodContext } from "../foodContext";  // useFoodContext 임포트

const FoodChart = () => {
    const { foodDetails } = useFoodContext();  // context 사용
    const [showCalendar, setShowCalendar] = useState(false);  // 달력 팝업 상태
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);  // 선택된 날짜 상태

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
            colors: ["#ac990d", "#000B58", "#FF2929"],
            stroke: {
                width: 0,
                colors: ['#fff']
            },
            legend: {
                position: 'bottom',
                fontSize: '16px',
                itemMargin: {
                    horizontal: 25, // 수평 간격 (px)
                    vertical: 10,   // 수직 간격 (px)
                },
            },
        } as ApexOptions
    };

    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);  // 날짜 선택 시 상태 업데이트
        setShowCalendar(false);  // 달력 닫기
    };

    return (
        <div className="left-back">
            <div className="food-result-wrapper">
                <div className="calendar-header">
                    <h2>{selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}</h2>
                    <button onClick={() => setShowCalendar(!showCalendar)}>
                        📆
                    </button>
                </div>

                {/* 달력 팝업 */}
                {showCalendar && (
                    <div className="calendar-popup">
                        <Calendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            formatDay={(locale, date) => moment(date).format("D")}
                            formatYear={(locale, date) => moment(date).format("YYYY")}
                            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
                            calendarType="gregory"
                            showNeighboringMonth={false}
                            next2Label={null}
                            prev2Label={null}
                            minDetail="year"
                            startOfWeek={0}  // 일요일부터 시작
                        />
                    </div>
                )}

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
