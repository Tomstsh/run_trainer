import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogHeader,
    DialogFooter,
    DialogContent,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog";
import { DateSelector } from "./ui/date-selector";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";


export function TrainingPlanForm() {
    const [formData, setFormData] = useState({
        raceDistance: "",
        raceDate: "",
        raceGoals: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (data: {
        raceDistance: string;
        raceDate: Date;
        raceGoals: string;
    }) => {
        setIsSubmitting(true);
        try {
            await axios.post("/planner/create_training_plan/", {
                race_distance: data.raceDistance,
                race_date: data.raceDate.toISOString().substring(0,10),
                race_goals: data.raceGoals
            });
            location.reload();
        } catch (error) {
            console.error("Failed submission:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    console.log(formData)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button">Create New Training Plan?</Button>
            </DialogTrigger>
            <DialogContent>
                <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        handleSubmit(formData);
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Create a new training plan</DialogTitle>
                        <DialogDescription>Add info about your upcoming race or challenge and press submit to generate a new training plan for it</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3 pt-4">
                            <Label htmlFor="raceDistance">Race Distance in km:</Label>
                            <Input required id="raceDistance" name="raceDistance" value={formData.raceDistance} onChange={(e) => {
                                const val = e.target.value
                                if (/^\d*\.?\d*$/.test(val)) {
                                    handleChange(e)
                                }
                            }} />
                        </div>
                        <div>
                            <DateSelector label="When is your race?" date={formData.raceDate} onSelect={(date) => handleChange({
                                target: {
                                    name: "raceDate",
                                    value: date,
                                },
                            } as React.ChangeEvent<HTMLInputElement>)} />
                        </div>
                        <div className="col-span-2 gap-3 pt-4">
                            <Label className="pb-2" htmlFor="raceGoals"> Any specific goals for ths race?</Label>
                            <Textarea id="raceGoals" placeholder="I want to finish the race in less than 50 minutes." name="raceGoals" value={formData.raceGoals} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Working..." : "Generate new training plan"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}