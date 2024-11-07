import React, { useEffect } from 'react'
import CustomCalendar from './customCalendar/customCalendar'
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail'
import './calendarPage.css'

const CalenderPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, []);
    return (

        <div className='calendarPage'>
            <CustomCalendar />
            <CustomCalendarDetail />
        </div>
    )
}

export default CalenderPage
