import React, { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent } from "@/components/ui/card";

function mapPlanToEvents(planJson: any) {
    console.log(planJson);
    
    return planJson.weeks.flatMap((week) =>
        week.days.map((day: any) => {
            let color;
            switch (day.workout_type) {
                case "easy":
                    color = "lime";
                    break
                case "long":
                    color = "purple";
                    break
                case "tempo":
                    color = "orange";
                    break
                case "interval":
                    color = "black";
                    break
                case "rest":
                    color = "green";
                    break
                case "race":
                    color = "red";
                    break
                default:
                    color = "blue";
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
                eventColor="blue"
                height="auto"
                dayCellClassNames="rounded-md border border-gray-500 hover:bg-gray-50"
                eventClick={(info) => {
                    alert(`Workout Details:\nType: ${info.event.extendedProps.description}`);
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