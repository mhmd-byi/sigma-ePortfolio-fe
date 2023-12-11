import React, { useEffect } from "react";
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
import { Loader } from "../../components/shared/loader/loader";
import { ProtectedRoute } from "../../components/security/protectedRoute";

const Dashboard = () => {
  const navigate = useNavigate();
  const ToResume = () => navigate("/resume");
  const ToPortfolio = () => navigate("/portfolio");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    console.log("this is token", token);
    if (token?.length < 2 || token === null) {
      <Loader />;
    }
  }, [token]);

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        {token === null && <Loader />}
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"Dashboard"} />
          <div className={Styles.cardGrid}>
            <Card className={Styles.card} onClick={ToResume}>
              <Icon className={"icon-plus"} />
              <Text>Create New Resume</Text>
            </Card>
            <Card className={Styles.card} onClick={ToPortfolio}>
              <Icon className={"icon-plus"} />
              <Text>Create New Portfolio</Text>
            </Card>
            <Card className={Styles.detailCard}>
              <div className={Styles.row}>
                <div className={Styles.leftCol}>
                  <Text strong={"medium"}>Username</Text>
                  <Text color={"secondary"}>username@gmail.com</Text>
                  <Text color={"secondary"}>+917895641230</Text>
                  <Text color={"secondary"}>username.sigma.com</Text>
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
