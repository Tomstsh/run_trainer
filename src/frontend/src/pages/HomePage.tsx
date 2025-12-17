import { useAuth } from '../auth/AuthContext';
import { Card, CardContent} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ProfileQuestions } from '@/components/ProfileQuestions';
import { TrainingPlanForm } from '@/components/TrainingPlanForm';
// TODO clean these imports

function HomePage() {
    const { logout } = useAuth();

    return (
        <div>
            <div className="flex flex-col items-center justify-center my-4">
                <ProfileQuestions/>
                <Card>
                    <CardContent>
                        You have no training plans yet.
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
