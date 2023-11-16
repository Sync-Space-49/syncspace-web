import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import {serverAddress} from '../index'
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [isChanged, setIsChanged] = useState(false);
  const initialFormState = {
    username: user.username,
    email: user.email,
    password: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [previewImage, setPreviewImage] = useState(user.picture);

  useEffect(() => {
    const hasFormChanged = user.username !== formData.name || user.email !== formData.email || formData.password !== '' || user.picture !== previewImage;
    setIsChanged(hasFormChanged);
  }, [user, formData, previewImage]);



  const updateUser = async (e) => {
    e.preventDefault();
    setIsChanged(false);
    const token = await getAccessTokenSilently();
    const data = {};
    if (user.username !== formData.username) {
      data.username = formData.username;
    }
    if (user.email !== formData.email) {
      data.email = formData.email;
    }
    if (formData.password !== '') {
      data.password = formData.password;
    }
    if (user.picture !== previewImage) {
      data.profile_picture = previewImage;
    }
      
    const options = {
      method: "PUT",
      url: `${serverAddress}/api/users/${user.sub}`,
      headers: { authorization: `Bearer ${token}` },
      data: data
    };

    await axios(options)
      .then(() => {
        console.log("yippie")
        return
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const replaceImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: user.username,
      email: user.email,
      password: '',
    });
    setPreviewImage(user.picture);
    setIsChanged(false);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <form onSubmit={updateUser}>
          <div className="flex">
            <div>
              <img src={previewImage} alt={user.nickname} />
              <input type="file" name="pfp" id="pfp" onChange={replaceImage} />
            </div>
            <div>
              <div>
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" disabled={!isChanged}>Update</button>
            <button type="button" disabled={!isChanged} onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Profile;
