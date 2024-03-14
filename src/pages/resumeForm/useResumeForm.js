import axios from "axios";
import { useEffect, useState } from "react";

export const useResumeForm = () => {
  const [resumeDetails, setResumeDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    bannerImage: [],
    profilePhoto: [],
    theme: "",
    customDomain: "",
    aboutMe: '',
    introVideo: [],
    projectDescription: "",
    projectsName: "",
    achievements: [],
    skills: "",
    languages: "",
    interests: "",
    courseName: "",
    year: 0,
    percentage: 0,
    certificate: [],
    companyName: "",
    workingYear: 0,
    details: ""
  });
  const [errMsg, setErrMsg] = useState("");
  const token = sessionStorage.getItem("token");

  const getUserDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}users/${sessionStorage.getItem("userId")}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setResumeDetails(prevDetails => ({
          ...prevDetails,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        }));
      })
      .catch((e) => {
        setErrMsg(e.message);
      });
  }

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]);

  const handleChange = (e) => {
    if (e?.target?.name && e.target.type !== 'file' && e.target.type !== 'select-multiple') {
      setResumeDetails(prevDetails => ({ ...prevDetails, [e.target.name]: e.target.value }));
    } else if (e?.target?.name && e.target.type === 'file') {
      const files = Array.from(e.target.files);
      setResumeDetails(prevDetails => ({ ...prevDetails, [e.target.name]: files }));
    } else if (e?.target?.name && e.target.type === 'select-multiple') {
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setResumeDetails(prevDetails => ({ ...prevDetails, [e.target.name]: selectedValues }));
    }
  };

  const removeFile = (fieldName) => {
    setResumeDetails(prevDetails => ({ ...prevDetails, [fieldName]: [] }));
  };

  const handleFileChange = (files, fieldName) => {
    setResumeDetails(prevDetails => ({ ...prevDetails, [fieldName]: files }));
  };

  const handleSubmit = async (files, fieldName) => {
    setResumeDetails(prevDetails => ({ ...prevDetails, [fieldName]: files }));
    console.log("Final submission data:", resumeDetails);
    
    // Example of logging FormData if you were preparing to submit files
    const formData = new FormData();
    Object.entries(resumeDetails).forEach(([key, value]) => {
      if (Array.isArray(value)) { // Check if the value is an array (e.g., files)
        value.forEach(file => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
    });
  
    // Log each key-value pair in formData for demonstration purposes
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }
  };

  return {
    resumeDetails,
    errMsg,
    handleChange,
    removeFile,
    handleFileChange,
    handleSubmit, // Make sure to return this
  };
};
