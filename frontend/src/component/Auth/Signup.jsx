import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import "./SignupStyles.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(email, password, userName);
    if (success) navigate('/');
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Account</h2>
        
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <button 
          type="submit" 
          className="signup-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;