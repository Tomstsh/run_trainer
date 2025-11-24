import { useAuth } from '../auth/AuthContext';

function HomePage() {
    const { user, logout } = useAuth();
    return (
        <div>
            You are signed in {user?.username}
            <p>
                <button onClick={() => logout()}>Logout</button>
            </p>
        </div>
    )
}

export default HomePage;
