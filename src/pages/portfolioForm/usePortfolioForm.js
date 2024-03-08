import axios from "axios";
import { useEffect, useState } from "react";

export const usePortfolioForm = () => {
  const [portfolioDetails, setportfolioDetails] = useState({
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
      url: `${process.env.REACT_APP_API_URL}users/${sessionStorage.getItem(
        "userId"
      )}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setportfolioDetails({
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
    if (e?.target?.name && e.target.type !== 'file' && e.target.type !== 'select-multiple') {
      setportfolioDetails({ ...portfolioDetails, [e.target.name]: e.target.value });
    }
    
    else if (e?.target?.name && e.target.type === 'file') {
      const file = e.target.files[0];
      if (file) {
        setportfolioDetails({ ...portfolioDetails, [e.target.name]: [file] });
      }
    }
  
    else if (e?.target?.name && e.target.type === 'select-multiple') {
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setportfolioDetails({ ...portfolioDetails, [e.target.name]: selectedValues });
    }
  };
  

  const removeFile = (fieldName) => {
    setportfolioDetails({ ...portfolioDetails, [fieldName]: [] });
  };

  const handleFileChange = (files, fieldName) => {
    setportfolioDetails({ ...portfolioDetails, [fieldName]: files });
  };

  return {
    portfolioDetails,
    errMsg,
    handleChange,
    removeFile,
    handleFileChange,
  };
};
