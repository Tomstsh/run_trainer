import { useAuth } from '../auth/AuthContext';
import { Card, CardContent} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ProfileQuestions } from '@/components/ProfileQuestions';
import { TrainingPlanForm } from '@/components/TrainingPlanForm';
import { PlanList } from '@/components/PlanList';
import { useEffect, useState } from 'react';
import axios from 'axios';
// TODO clean these imports

function HomePage() {
    const { logout } = useAuth();
    const [plans, setPlans] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPlans() {
            try {
                const response = await axios.get('/planner/list_training_plans/');
                setPlans(response.data);
            } catch (error) {
                console.error("Failed to fetch training plans:", error);
            }
        }
        fetchPlans();
    }, [])
    return (
        <div>
            <div className="flex flex-col items-center justify-center my-4">
                <ProfileQuestions/>
                <Card>
                    <CardContent>
                        <PlanList plans={plans} />
                    </CardContent>
                    <div className="flex flex-col items-center">
                        <TrainingPlanForm />
                    </div>
                </Card>
                <Button onClick={() => logout()}>Logout</Button>
            </div>  
        </div>
    )
}

export default HomePage;
