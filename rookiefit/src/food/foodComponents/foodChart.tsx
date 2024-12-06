import React, { MouseEvent, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import './FoodChart.css';
import moment from "moment";
import { useFoodContext } from "../foodContext"; // useFoodContext 임포트

const FoodChart = () => {
    const { foodDetails, selectedDate, setSelectedDate } = useFoodContext(); // Context 사용
    const [showCalendar, setShowCalendar] = useState(false); // 달력 팝업 상태
    console.log("Food Details for Chart:", foodDetails);

    // 영양 성분 합계 계산
    const totalCalories = foodDetails.entries.reduce((sum, item) => sum + item.enerc, 0);
    const totalCarbs = foodDetails.entries.reduce((sum, item) => sum + item.chocdf, 0);
    const totalProtein = foodDetails.entries.reduce((sum, item) => sum + item.prot, 0);
    const totalFat = foodDetails.entries.reduce((sum, item) => sum + item.fatce, 0);

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
                    colors: ['#fff'],
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
                                formatter: () => `${totalCalories} kcal`,
                            },
                        },
                    },
                },
            },
            labels: ["탄수화물", "단백질", "지방"],
            colors: ["#FABC3F", "#00224D", "#CC2B52"],
            stroke: {
                width: 0,
                colors: ['#fff'],
            },
            legend: {
                position: 'bottom',
                fontSize: '16px',
                itemMargin: {
                    horizontal: 25, // 수평 간격 (px)
                    vertical: 10, // 수직 간격 (px)
                },
                formatter: (seriesName: string, opts: any) => {
                    const value = opts.w.globals.series[opts.seriesIndex];
                    return `${seriesName}: ${value.toFixed(1)}g`; // 레전드에 수치를 표시 (단위: g)
                },
            },
        } as ApexOptions,
    };

    // 날짜 클릭 처리
    const handleDateClick = (date: Date) => {
        setSelectedDate(moment(date).format("YYYY-MM-DD")); // 선택한 날짜 설정
        setShowCalendar(false); // 달력 닫기
    };

    return (
        <div className="left-back">
            <div className="food-result-wrapper">
                <div className="calendar-header">
                    <h2>{selectedDate}</h2>
                    <button onClick={() => setShowCalendar(!showCalendar)}>📆</button>
                </div>

                {/* 달력 팝업 */}
                {showCalendar && (
                    <div className="calendar-popup">
                        <Calendar
                            value={new Date(selectedDate)} // 컨텍스트의 날짜로 설정
                            onClickDay={handleDateClick} // 날짜 클릭 시 호출될 핸들러
                            formatDay={(locale, date) => moment(date).format("D")}
                            formatYear={(locale, date) => moment(date).format("YYYY")}
                            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
                            calendarType="gregory"
                            showNeighboringMonth={false}
                            next2Label={null}
                            prev2Label={null}
                            minDetail="year"
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
};

export default FoodChart;
