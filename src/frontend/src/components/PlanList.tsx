import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export function PlanList({plans}) {
    const navigate = useNavigate();
    return (
        <ul className="space-y-1">
            {plans.map((plan) => (
                <li key={plan.id}>
                    <Button className="container cursor-pointer" key={plan.id} onClick={() => navigate(`/plans/${plan.id}`)}>
                        {plan.creation_date}
                    </Button>
                </li> 
            ))}
        </ul>
    )
}