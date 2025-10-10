import { Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { CalendarEvent } from "@/components/event-calendar/lib"

interface EventViewProps {
  event: CalendarEvent | null
  onClose: () => void
}

export default function EventView({ event, onClose }: EventViewProps) {
  if (!event) return null

  const locale = navigator.language || "en-GB"

  const toDayDate = (date: Date) => {
    return date.toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "long",
    })
  }

  const toHHmm = (date: Date) => {
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <div className={"flex w-full flex-col gap-3"}>
        <span className={"flex items-center gap-2 text-sm"}>
          <Calendar size={16} />
          {event.allDay
            ? toDayDate(event.start) + " - " + toDayDate(event.end)
            : toHHmm(event.start) + " - " + toHHmm(event.end)}
        </span>
        {event.location && (
          <span className={"flex items-center gap-2 text-sm"}>
            <MapPin size={16} />
            {event.location}
          </span>
        )}
      </div>
      <DialogFooter className={"flex w-full justify-end"}>
        <Button
          variant={"outline"}
          className={"!bg-background"}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogFooter>
    </>
  )
}
