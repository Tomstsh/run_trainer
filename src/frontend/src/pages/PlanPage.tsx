import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import { PlanCalendar } from "@/components/PlanCalendar";

export function PlanPage() {
    const { plan_id } = useParams();
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchPlan() {
            try {
                const response = await axios.post("/planner/get_training_plan/", {plan_id});
                const plan = response.data;
                setPlan(plan);
            } catch (err) {
                console.error("Failed to fetch plan:", err);
                setPlan(null);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPlan();
    }, [plan_id])
    //return (
    //    error ? <div className="text-red-500 text-sm mt-1"> {error.message} </div> : <PlanCalendar planJson={plan} />
    //)
    return (
        loading ? <div>Loading...</div> : <PlanCalendar planJson={plan.plan_json} />
    )
}