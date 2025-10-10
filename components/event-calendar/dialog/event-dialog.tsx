"use client"

import { useEffect } from "react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/event-calendar/auth-provider"
import EventForm from "@/components/event-calendar/dialog/event-form"
import EventView from "@/components/event-calendar/dialog/event-view"
import type { CalendarEvent } from "@/components/event-calendar/lib"
import { ColorOption } from "@/components/event-calendar/lib/types"

interface EventDialogProps {
  event: CalendarEvent | null
  isOpen: boolean
  onClose: () => void
  onSave: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
}

export function EventDialog({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const { isAdmin } = useAuth()
  // Debug log to check what event is being passed
  useEffect(() => {
    console.log("EventDialog received event:", event)
  }, [event])

  // Updated color options to match types.ts
  const colorOptions: ColorOption[] = [
    {
      value: "sky",
      label: "Sky",
      bgClass: "!bg-sky-400",
      borderClass: "border-sky-400 data-[state=checked]:border-sky-400",
    },
    {
      value: "amber",
      label: "Amber",
      bgClass: "!bg-amber-400",
      borderClass: "border-amber-400 data-[state=checked]:border-amber-400",
    },
    {
      value: "violet",
      label: "Violet",
      bgClass: "!bg-violet-400",
      borderClass: "border-violet-400 data-[state=checked]:border-violet-400",
    },
    {
      value: "rose",
      label: "Rose",
      bgClass: "!bg-rose-400",
      borderClass: "border-rose-400 data-[state=checked]:border-rose-400",
    },
    {
      value: "emerald",
      label: "Emerald",
      bgClass: "!bg-emerald-400",
      borderClass: "border-emerald-400 data-[state=checked]:border-emerald-400",
    },
    {
      value: "orange",
      label: "Orange",
      bgClass: "!bg-orange-400",
      borderClass: "border-orange-400 data-[state=checked]:border-orange-400",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"flex items-center gap-2"}>
            {isAdmin ? (
              event?.id ? (
                "Edit Event"
              ) : (
                "Create Event"
              )
            ) : (
              <>
                <span
                  className={cn(
                    "aspect-square w-4 rounded-full",
                    colorOptions.find((co) => co.value == event?.color)?.bgClass
                  )}
                />
                {event?.title}
              </>
            )}
          </DialogTitle>
          <DialogDescription className={cn(isAdmin && "sr-only")}>
            {isAdmin
              ? event?.id
                ? "Edit the details of this event"
                : "Add a new event to your calendar"
              : event?.description}
          </DialogDescription>
        </DialogHeader>
        {isAdmin ? (
          <EventForm
            event={event}
            onSave={onSave}
            onDelete={onDelete}
            onClose={onClose}
            colorOptions={colorOptions}
          />
        ) : (
          <EventView event={event} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
