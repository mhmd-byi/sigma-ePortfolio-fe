import axios from "axios";
import { useEffect, useState } from "react";

export const useResume = () => {
  const [resumeDetails, setResumeDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    bannerImage: [],
    profilePhoto: [],
    theme: "",
    aboutMe: '',
  });
  const [errMsg, setErrMsg] = useState("");
  const token = sessionStorage.getItem("token");
  const getUserDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}users/${sessionStorage.getItem(
        "userId"
      )}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setResumeDetails({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .catch((e) => {
        setErrMsg(e.message);
      });
  }
  useEffect(() => {
    if (token) {
        getUserDetails()
    }
  }, [token]);

  const handleChange = (e) => {
    if (e?.target?.name && e.target.type !== 'file') {
      setResumeDetails({ ...resumeDetails, [e.target.name]: e.target.value });
    }
    
    if (e?.target?.name && e.target.type === 'file') {
      // Assuming you want to store only the first file
      const file = e.target.files[0];
      if (file) {
        setResumeDetails({ ...resumeDetails, [e.target.name]: [file] });
      }
    }
  };

  const removeFile = (fieldName) => {
    setResumeDetails({ ...resumeDetails, [fieldName]: [] });
  };

  const handleFileChange = (files, fieldName) => {
    // Update the state with the new files
    setResumeDetails({ ...resumeDetails, [fieldName]: files });
  };

  return {
    resumeDetails,
    errMsg,
    handleChange,
    removeFile,
    handleFileChange,
  };
};
