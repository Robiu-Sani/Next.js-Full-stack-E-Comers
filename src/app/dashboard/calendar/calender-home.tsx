/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  differenceInDays,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO string
  createdAt: string; // ISO string
}

export default function CalendarHome() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from localStorage on component mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem("calendarEvents");
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        // Validate that parsedEvents is an array
        if (Array.isArray(parsedEvents)) {
          setEvents(parsedEvents);
        } else {
          console.error("Invalid events format in localStorage");
          toast.error("Invalid events data found");
        }
      }
    } catch (error) {
      console.error("Failed to parse events from localStorage", error);
      toast.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("calendarEvents", JSON.stringify(events));
      } catch (error) {
        console.error("Failed to save events to localStorage", error);
        toast.error("Failed to save events");
      }
    }
  }, [events, isLoading]);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: selectedDate || new Date(),
    },
  });

  // Set the form date when a date is selected from the calendar
  useEffect(() => {
    if (selectedDate) {
      form.setValue("date", selectedDate);
    }
  }, [selectedDate, form]);

  const onSubmit = (data: any) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      date: data.date.toISOString(),
      createdAt: new Date().toISOString(),
    };

    setEvents((prev) => [...prev, newEvent]);
    toast.success("Event added successfully!");
    form.reset();
    setDialogOpen(false);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    toast.success("Event deleted successfully!");
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  // Get all days in the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      try {
        return isSameDay(parseISO(event.date), date);
      } catch (error) {
        console.error("Error parsing event date:", error);
        return false;
      }
    });
  };

  // Calculate days passed/remaining for events
  const getEventStatus = (eventDate: string) => {
    try {
      const today = new Date();
      const eventDay = parseISO(eventDate);
      const diff = differenceInDays(eventDay, today);

      if (diff === 0) return "Today";
      if (diff > 0) return `${diff} day${diff !== 1 ? "s" : ""} left`;
      return `${Math.abs(diff)} day${Math.abs(diff) !== 1 ? "s" : ""} ago`;
    } catch (error) {
      console.error("Error calculating event status:", error);
      return "Date error";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl flex justify-center items-center h-screen">
        <div>Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto ">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold ">Calendar</h1>
            <Button onClick={navigateToToday} variant="outline">
              Today
            </Button>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold ">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className=" grid-cols-7 hidden gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-medium  py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "min-h-24 p-2 border rounded-lg cursor-pointer transition-colors",
                    isCurrentMonth ? "" : " ",
                    isSelected && "ring-2 ring-blue-500",
                    isToday && ""
                  )}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isToday &&
                          "0  rounded-full w-6 h-6 flex items-center justify-center"
                      )}
                    >
                      {format(day, "d")}
                    </span>

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(day);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>

                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="text-xs p-1  text-blue-800 rounded truncate"
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs ">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Section */}
        <div className="md:w-80">
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Select a date"}
            </h2>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full mb-6"
                  onClick={() => setSelectedDate(selectedDate || new Date())}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Event description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Add Event
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <ScrollArea className="h-[500px] pr-4">
              {selectedDate ? (
                <>
                  <h3 className="font-medium mb-3">
                    Events on {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <p className=" text-sm">
                      No events scheduled for this day.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate).map((event) => (
                        <div
                          key={event.id}
                          className="p-3  rounded-lg border"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{event.title}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => deleteEvent(event.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          {event.description && (
                            <p className="text-sm  mt-1">
                              {event.description}
                            </p>
                          )}
                          <div className="text-xs  mt-2">
                            {getEventStatus(event.date)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="">Select a date to view events</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
