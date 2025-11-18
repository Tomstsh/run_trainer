import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { login} = useAuth();

    const handleSubmit = async (data) => {
        setIsSubmitting(true);
        try {
          await login(data.username, data.password);
          navigate('/')
        } catch (error) {
          console.error("Login error:", error);
        } finally {
          setIsSubmitting(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}>
            <p>
              <label htmlFor="id_username">Username:</label>
              <input required type="text" name="username" id="id_username" value={formData.email} onChange={handleChange}/>
            </p>
            <p>
              <label htmlFor="id_password">Password:</label>
              <input required type="password" name="password" id="id_password" value={formData.password} onChange={handleChange}/>
            </p>
            <button type="submit" disabled={isSubmitting}>{ isSubmitting ? "Signing in..." : "Login"}</button>
            <input type="hidden" name="next" value="/users/dashboard/"/>
          </form>
          <p>
            Don't have an account? <a href="/users/register/">Register here</a>.
          </p>
        </div>
    );
}

export default LoginPage;