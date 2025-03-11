import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom"; 
import "./LoginStyles.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Log In</h2>
        
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;