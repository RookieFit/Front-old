import React from 'react'
import CustomCalendar from './customCalendar/customCalendar'
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail'
import './calendarPage.css'

const CalenderPage = () => {
    return (
        <div className='calendarPage'>
            <CustomCalendar />
            <CustomCalendarDetail />
        </div>
    )
}

export default CalenderPage
