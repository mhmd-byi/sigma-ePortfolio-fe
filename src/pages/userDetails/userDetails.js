import React from "react";
import Styles from "../dashboard/dashboard.module.scss";
import {
  Button,
  Card,
  Header,
  Input,
  Label,
  Sidebar,
  Text,
} from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { userUserDetailForm } from "./useUserDetailForm";
import { ProtectedRoute } from "../../components/security/protectedRoute";

const UserDetails = () => {
  const { userDetails, handleChange, handleSubmit } = userUserDetailForm();

  return (
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"User Account Setting"} />
          <div className={Styles.pageContent}>
            <div className={Styles.stepWizard}>
              <div className="d-flex align-items-center justify-content-between"></div>
              <form onSubmit={handleSubmit}>
                <Card>
                  <div>
                    <Label>User Name*</Label>
                    <Input
                      type={"text"}
                      placeholder={"Enter User Name"}
                      value={userDetails.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </div>
                  <div className="mt-3">
                    <Label>Name*</Label>
                    <Input
                      type={"text"}
                      placeholder={"Enter Name"}
                      value={userDetails.name}
                      onChange={(e) => handleChange(e, "name")}
                    />
                  </div>
                  <div className="mt-3">
                    <Label>Email*</Label>
                    <Input
                      type={"email"}
                      placeholder={"Enter Email"}
                      value={userDetails.email}
                      onChange={(e) => handleChange(e, "email")}
                    />
                  </div>
                  <div className="mt-3">
                    <Label>Phone No.*</Label>
                    <Input
                      type={"text"}
                      placeholder={"Enter Phone"}
                      value={userDetails.phone}
                      onChange={(e) => handleChange(e, "phone")}
                    />
                    <Text variant={"md"} color={"secondary"}>
                      Add Mobile with Country Code.
                    </Text>
                  </div>
                  <Button className={'mt-3'} type="submit" variant={"primarySolid"}>Update</Button>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDetails;
