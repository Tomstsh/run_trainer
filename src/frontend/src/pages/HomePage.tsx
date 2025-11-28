import { useAuth } from '../auth/AuthContext';
import { Card, CardContent} from '../components/ui/card';
import { Button } from '../components/ui/button';

function HomePage() {
    const { user, logout } = useAuth();
    return (
        <div>
            You are signed in {user?.username}
            <div className="flex flex-col items-center justify-center my-4">
                <Card>
                    <CardContent>
                        You have no training plans yet.
                    </CardContent>
                </Card>
                <Button onClick={() => logout()}>Logout</Button>
            </div>  
        </div>
    )
}

export default HomePage;
