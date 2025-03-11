import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ViewProfile.css';

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
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

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const handleDeleteProfile = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1f6feb',
        cancelButtonColor: '#6e7681',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const { token } = storedUser;
        const decodedToken = jwtDecode(token);

        await axios.delete(`http://localhost:3040/api/users/${decodedToken._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        localStorage.removeItem('user');
        setUser(null);
        logout();
        
        Swal.fire(
          'Deleted!',
          'Your profile has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting user profile:', error);
      setError('Error deleting user profile');
    }
  };

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        
        {error && <div className="profile-error">{error}</div>}

        <div className="profile-details">
          <div className="profile-detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="profile-detail-item">
            <span className="detail-label">Username:</span>
            <span className="detail-value">{user.userName}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className="profile-button edit-button"
            onClick={handleEditProfile}
          >
            <svg className="button-icon" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            Edit Profile
          </button>
          
          <button 
            className="profile-button delete-button"
            onClick={handleDeleteProfile}
          >
            <svg className="button-icon" viewBox="0 0 20 20">
              <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/>
            </svg>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;