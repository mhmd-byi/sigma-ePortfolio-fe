import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const useViewPortfolioWithId = () => {
  const { portfolioId } = useParams();
  const [portfolioDetails, setPortfolioDetails] = useState();

  const getPortfolioDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}portfolio/${portfolioId}`,
    })
      .then((res) => {
        setPortfolioDetails(res.data);
      })
      .catch((e) => {
        console.log("this is error", e);
      });
  };

  useEffect(() => {
    getPortfolioDetails();
  }, []);

  return {
    portfolioId,
    portfolioDetails,
  };
};
