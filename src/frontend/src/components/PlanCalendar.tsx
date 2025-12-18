import React, { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

function mapPlanToEvents(planJson: any) {
    
    return planJson.weeks.flatMap((week) =>
        week.days.map((day: any) => {
            let color;
            switch (day.workout_type) {
                case "easy":
                    color = "#2D7DD2";
                    break
                case "long":
                    color = "#2E294E";
                    break
                case "tempo":
                    color = "#FF7F11";
                    break
                case "interval":
                    color = "#2e4057";
                    break
                case "rest":
                    color = "#66A182";
                    break
                case "race":
                    color = "#FF101F";
                    break
                default:
                    color = "black";
                    break
            }
            return { title: day.workout_type,
            start: day.date,
            allDay: true,
            color: color,
            extendedProps: day
            };
        })
    );
}

export function PlanCalendar({planJson}: {planJson: any}) {
    const events = useMemo(() => mapPlanToEvents(planJson), [planJson]);
    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek,dayGridDay"
                }}
                height="auto"
                dayCellClassNames="rounded-md border border-gray-500 hover:bg-gray-50"
                eventContent={(eventInfo) => {
                    return (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div
                                    className={`rounded-md px-2 py-0 border cursor-pointer text-sm`}
                                >
                                    {eventInfo.event.title}
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <ul className="max-w-md space-y-2 text-body list-none list-inside">
                                    <li>Description: {eventInfo.event.extendedProps.description}</li>
                                    <li>Distance: {eventInfo.event.extendedProps.distance_km ? eventInfo.event.extendedProps.distance_km + " km" : "n/a"}</li>
                                    <li>Intensity: {eventInfo.event.extendedProps.intensity} </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    )
                }}
            />
            <Card className="mt-4">
                <CardContent>
                    <h1 className="font-bold">Notes:</h1>
                    {planJson.training_plan_notes}
                </CardContent>
            </Card>
        </div>
    )
}