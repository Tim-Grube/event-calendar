"use client"

import { useState } from "react"
import { addDays, setHours, setMinutes } from "date-fns"

import { EventCalendar, type CalendarEvent } from "@/components/event-calendar"
import ThemeToggle from "@/components/theme-toggle"

// Sample events data with hardcoded times
const sampleEvents: CalendarEvent[] = [
  {
    id: "10",
    title: "Team Meeting",
    description: "Weekly team sync",
    start: setMinutes(setHours(addDays(new Date(), 5), 9), 45),
    end: setMinutes(setHours(addDays(new Date(), 5), 11), 0),
    color: "amber",
    location: "Conference Room A",
  },
  {
    id: "11",
    title: "Marketing Strategy Session",
    description: "Quarterly marketing planning",
    start: setMinutes(setHours(addDays(new Date(), 9), 10), 0),
    end: setMinutes(setHours(addDays(new Date(), 9), 15), 30),
    color: "emerald",
    location: "Marketing Department",
  },
  {
    id: "12",
    title: "Annual Shareholders Meeting",
    description: "Presentation of yearly results",
    start: addDays(new Date(), 17),
    end: addDays(new Date(), 17),
    allDay: true,
    color: "sky",
    location: "Grand Conference Center",
  },
  {
    id: "13",
    title: "Product Development Workshop",
    description: "Brainstorming for new features",
    start: setMinutes(setHours(addDays(new Date(), 26), 9), 0),
    end: setMinutes(setHours(addDays(new Date(), 27), 17), 0), // 5:00 PM, 27 days from now
    color: "rose",
    location: "Innovation Lab",
  },
]

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event])
  }

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    )
  }

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  return (
    // Add min-h-screen to make it full height
    <div className="flex flex-col p-1 sm:p-4 md:p-8">
      <EventCalendar
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        startOnFirstFutureEvent
      />
      <div className="mt-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
