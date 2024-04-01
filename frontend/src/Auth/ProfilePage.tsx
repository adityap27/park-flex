import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSquare } from 'react-bootstrap-icons';
import useAuthStore from '../stores/useAuthStore';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
type ProfileFieldProps = {
  label: string;
  value: string;
  onEditClick: () => void;
  isEditing: boolean;
  onEditChange: (newValue: string) => void;
  onEditSubmit: () => void;
  type?: string;
};

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  onEditClick,
  isEditing,
  onEditChange,
  onEditSubmit,
  type = 'text',
}) => (
  <div className="flex items-center p-4 border-b border-gray-200">
    {!isEditing ? (
      <>
        <span className="flex-grow text-lg font-medium">{label}</span>
        <span className="flex-grow text-right text-gray-700">{value}</span>
        <PencilSquare className="h-5 w-5 text-blue-500 cursor-pointer" onClick={onEditClick} />
      </>
    ) : (
      <>
        <span className="flex-grow text-lg font-medium">{label}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onEditChange(e.target.value)}
          className="flex-grow text-right border p-1 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={onEditSubmit}
        >
          Save
        </button>
      </>
    )}
  </div>
);

const ProfilePage: React.FC = () => {
  const { token, user, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');

  const isValidName = (name: string): boolean => /^[A-Za-z\s]+$/.test(name);
  const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleValidation = (field: string, value: string): boolean => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!isValidName(value)) {
          toast.error(`Please enter a valid ${field} with characters only.`);
          return false;
        }
        break;
      case 'email':
        if (!isValidEmail(value)) {
          toast.error("Please enter a valid email address.");
          return false;
        }
        break;
      case 'password':
        if (!isValidPassword(value)) {
          toast.error("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };



  useEffect(() => {
    if (user) {
      setEditedFirstName(user.firstName || '');
      setEditedLastName(user.lastName || '');
      setEditedEmail(user.email || '');
      
    }
  }, [user]);

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleEditChange = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
        setEditedFirstName(value);
        break;
      case 'lastName':
        setEditedLastName(value);
        break;
      case 'email':
        setEditedEmail(value);
        break;
      case 'password':
        setEditedPassword(value);
        break;
      default:
        break;
    }
  };

  const handleEditSubmit = async (field: string) => {
    if (!token) return;
    
    // Get the value to validate
    const valueToValidate = 
      field === 'firstName' ? editedFirstName :
      field === 'lastName' ? editedLastName :
      field === 'email' ? editedEmail :
      field === 'password' ? editedPassword : '';

    // If validation fails, don't submit
    if (!handleValidation(field, valueToValidate)) return;

    // Prepare data for the update
    const updateData = { [field]: valueToValidate };

    try {
      // Attempt to update the profile
      const response = await axios.put('http://localhost:3001/api/auth/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, ...response.data.profile });
      setIsEditing({ ...isEditing, [field]: false });
      toast.success(`${field} updated successfully!`);
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error(`An error occurred while updating ${field}.`);
    }
  };

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const storedUserId = localStorage.getItem('userId');

  console.log('Token:', storedToken);
  console.log('User:', storedUser && JSON.parse(storedUser)); // Parsing because user is stored as a string
  console.log('UserID:', storedUserId);
    const fetchProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:3001/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
      setUser(response.data.profile);
      } catch (error) {
        console.error('Error fetching profile', error);
        // Clear the token and user, and redirect to login
        setToken(null);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, setUser, setToken, navigate]);

  if (!token) return <Navigate to="/login" />;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="space-y-4 w-full max-w-md">
        <ProfileField
          label="First Name"
          value={editedFirstName}
          isEditing={isEditing.firstName}
          onEditClick={() => handleEditClick('firstName')}
          onEditChange={(value) => handleEditChange('firstName', value)}
          onEditSubmit={() => handleEditSubmit('firstName')}
        />
        <ProfileField
          label="Last Name"
          value={editedLastName}
          isEditing={isEditing.lastName}
          onEditClick={() => handleEditClick('lastName')}
          onEditChange={(value) => handleEditChange('lastName', value)}
          onEditSubmit={() => handleEditSubmit('lastName')}
        />
        <ProfileField
          label="Email"
          value={editedEmail}
          isEditing={isEditing.email}
          onEditClick={() => handleEditClick('email')}
          onEditChange={(value) => handleEditChange('email', value)}
          onEditSubmit={() => handleEditSubmit('email')}
          type="email"
        />
        <ProfileField
          label="Password"
          value={isEditing.password ? editedPassword : '........'}
          isEditing={isEditing.password}
          onEditClick={() => handleEditClick('password')}
          onEditChange={(value) => handleEditChange('password', value)}
          onEditSubmit={() => handleEditSubmit('password')}
          type="password"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
