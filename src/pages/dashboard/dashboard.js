import React from "react";
import Styles from "./dashboard.module.scss";
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Sidebar,
  Text,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../../components/security/protectedRoute";
import { useDashboard } from "./useDashboard";

import { useGetPortfolioDetails } from "../portfolio/useGetPortfolioDetails";
import { useGetResumeDetails } from "../resume/useGetResumeDetails";

const Dashboard = () => {
  const navigate = useNavigate();
  const ToResume = () => navigate("/resume");
  const ToPortfolio = () => navigate("/portfolio");
  const { userDetails } = useDashboard();
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const { portfolioDetails } = useGetPortfolioDetails(token, userId);
  const portfolioId = portfolioDetails?.id;
  const { resumeDetails } = useGetResumeDetails(token, userId);
  const resumeId = resumeDetails?.id;

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"Dashboard"} />
          <div className={Styles.cardGrid}>
            {!resumeId && (
              <Card className={Styles.card} onClick={ToResume}>
                <Icon className={"icon-plus"} />
                <Text>Create New Resume</Text>
              </Card>
            )}
            {!portfolioId && (
              <Card className={Styles.card} onClick={ToPortfolio}>
                <Icon className={"icon-plus"} />
                <Text>Create New Portfolio</Text>
              </Card>
            )}
            <Card className={Styles.detailCard}>
              <div className={Styles.row}>
                <div className={Styles.leftCol}>
                  <Text strong={"medium"}>User Details</Text>
                  <Text color={"secondary"}>{userDetails.username}</Text>
                  <Text color={"secondary"}>{userDetails.number}</Text>
                  <Text color={"secondary"}>{userDetails.email}</Text>
                </div>
                <div className={Styles.rightCol}>
                  <Image src="./images/avatar.png" />
                </div>
              </div>
              <div className={`${Styles.btns} d-flex align-items-center`}>
                <Button>
                  <Icon className={"icon-edit"} /> Edit
                </Button>
                <Button>
                  <Icon className={"icon-view"} /> View
                </Button>
                <Button>
                  <Icon className={"icon-share"} /> Share
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
