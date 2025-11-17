import { useState } from 'react';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (data) => {
      console.log(data);
      alert(`Username: ${data.username}\nPassword: ${data.password}`);
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
          <h1>Welcome!</h1>
  
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
            <button type="submit">Login</button>
            <input type="hidden" name="next" value="/users/dashboard/"/>
          </form>
          <p>
            Don't have an account? <a href="/users/register/">Register here</a>.
          </p>
        </div>
    );
}

export default LoginPage;