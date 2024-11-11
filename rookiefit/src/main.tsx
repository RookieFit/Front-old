import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { CalendarProvider } from './calendar/calendarContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </StrictMode>,
)
