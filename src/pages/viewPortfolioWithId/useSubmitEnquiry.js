import axios from "axios";
import { useState } from "react";

export const useSubmitEnquiry = (portfolioId) => {
  const [enquiryDetails, setEnquiryDetails] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const onSubmit = async (data) => {
    try {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}portfolio/portfolio-user/${portfolioId}`,
      }).then((res) => {
        const userId = res.data;
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}enquiry`,
          data: {
              userId,
              ...data,
          },
        })
          .then(() => {
            console.log("enquiry submitted successfully");
            alert('Enquiry submitted successfully');
            window.location.reload();
          })
          .catch((e) => {
            console.log("error in enquiry submission", e);
          });
      })
    } catch (e) {}
  };
  return {
    setEnquiryDetails,
    enquiryDetails,
    onSubmit,
  };
};
