import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { CalendarProvider } from './calendar/calendarContext.tsx'
import { CalendarDetailsProvider } from './calendar/calendarDetailContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarProvider>
      <CalendarDetailsProvider>
        <App />
      </CalendarDetailsProvider>
    </CalendarProvider>
  </StrictMode>,
)
