import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { serverAddress } from '../index';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const initialFormState = {
    email: user.email,
    username: user.username,
    password: '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isChanged, setIsChanged] = useState(false);
  const [isImageNew, setIsImageNew] = useState(false);
  const [previewImage, setPreviewImage] = useState(new File([], ''));

  useEffect(() => {
    const hasFormChanged =
      user.username !== formData.username ||
      user.email !== formData.email ||
      formData.password !== '' ||
      isImageNew;
    setIsChanged(hasFormChanged);
  }, [user, formData, isImageNew]);

  const updateUser = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const body = new FormData();
    if (user.username !== formData.username) {
      body.append('username', formData.username);
    }
    if (user.email !== formData.email) {
      body.append('email', formData.email);
    }
    if (formData.password !== '') {
      body.append('password', formData.password);
    }
    if (isImageNew) {
      const imagefile = document.querySelector('#pfp');
      body.append('profile_picture', imagefile.files[0]);
    }

    const options = {
      method: 'PUT',
      url: `${serverAddress}/api/users/${user.sub}`,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: body,
    };

    await axios(options)
      .then(() => {
        // Add alert popup
        setFormData({
          name: user.username,
          email: user.email,
          password: '',
        });
        setIsChanged(false);
        setIsImageNew(false);
        return;
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
        setIsImageNew(true);
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
          <div className="flex justify-around mt-10">
            <div className="w-64">
              {isImageNew ? (
                <img
                  src={previewImage}
                  alt={user.nickname}
                  className="w-64 h-64 object-cover"
                />
              ) : (
                <img
                  src={`${user.picture}?${Date.now()}`}
                  alt={user.nickname}
                  className="w-64 h-64 object-cover"
                />
              )}
              <input
                type="file"
                name="pfp"
                id="pfp"
                className="my-2"
                onChange={replaceImage}
              />
              <div>
                <button
                  type="submit"
                  className={`bg-primary rounded p-2 mr-2 ${
                    isChanged ? 'hover:bg-slate-400' : ''
                  }  duration-100`}
                  disabled={!isChanged}
                >
                  Update
                </button>
                <button
                  type="button"
                  className={`bg-primary rounded p-2 ${
                    isChanged ? 'hover:bg-slate-400' : ''
                  }  duration-100`}
                  disabled={!isChanged}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border mb-2"
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
                  className="border mb-2"
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
                  className="border mb-2"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default Profile;
