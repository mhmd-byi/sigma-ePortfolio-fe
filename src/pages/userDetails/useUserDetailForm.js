import axios from "axios";
import { useEffect, useState } from "react";

export const userUserDetailForm = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
  });
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit data", userDetails)
    try {
      axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_URL}users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: userDetails,
      })
        .then(() => {
          alert("Details updated successfully");
        })
        .catch((e) => {
          console.log('this is an error', e)
          alert("Please try again");
        });
    } catch (e) {
      console.error(e);
    }
  };

  const getUserDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUserDetails({
        username: res.data.username,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      });
    });
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]);

  const handleChange = (event, fieldName) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: event.target.value,
    }));
  };

  return {
    userDetails,
    handleChange,
    userDetails,
    handleSubmit,
  };
};
