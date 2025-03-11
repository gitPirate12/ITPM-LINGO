import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const [profile, setProfile] = useState({
    email: '',
    userName: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          setError('You must be logged in to view the profile');
          return;
        }

        const { token } = storedUser;
        const decodedToken = jwtDecode(token);
        const response = await axios.get(`http://localhost:3040/api/users/${decodedToken._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProfile({
          email: response.data.email,
          userName: response.data.userName
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const { token } = storedUser;
      const decodedToken = jwtDecode(token);

      await axios.put(`http://localhost:3040/api/users/${decodedToken._id}`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/viewprofile');
    } catch (error) {
      console.error('Update error:', error);
      setError(error.response?.data?.error || 'Error updating profile');
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">Edit Profile</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="userName"
              value={profile.userName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;