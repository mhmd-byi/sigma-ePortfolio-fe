import React from "react";
import {
  Button,
  Card,
  Icon,
  Input,
  Label,
} from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResumeForm } from "./useResumeForm";

const ActionButtons = (props) => {
    const handleBack = () => {
      props.previousStep();
    };
  
    const handleNext = () => {
      props.nextStep();
    };
  
    const { handleSubmit } = useResumeForm();
  
    const handleFinish = () => {
      props.lastStep();
      handleSubmit();
    };
  
    return (
      <div className="d-flex align-items-center justify-content-between mt-5">
        {props.currentStep > 1 && (
          <Button variant={"secondary"} onClick={handleBack}>
            <Icon className={"icon-left"} /> Prev
          </Button>
        )}
        <div className="d-flex align-items-center justify-content-between ms-auto">
          {props.currentStep < props.totalSteps && (
            <Button variant={"primary"} onClick={handleNext}>
              Next <Icon className={"icon-right"} />
            </Button>
          )}
          {props.currentStep === props.totalSteps && (
            <Button type='submit' variant={"primarySolid"} onClick={handleFinish}>
              Finish{" "}
            </Button>
          )}
        </div>
      </div>
    );
  };

const Five = (props) => {
    const { resumeDetails, handleChange } = props;
    return (
      <Card>
        <div>
          <Label>Company’s Name</Label>
          <Input type={"text"} onChange={handleChange} inputName="companyName" />
        </div>
        <div className="mt-3">
          <Label>Profile</Label>
          <Input type={"text"} onChange={handleChange} inputName="companyName" />
        </div>
        <div className="row">
          <div className="mt-3 col-lg-6">
            <Label>Start Year</Label>
            <Input
              type={"date"}
              onChange={handleChange}
              inputName="workingYear"
            />
          </div>
          <div className="mt-3 col-lg-6">
            <Label>End Year</Label>
            <Input
              type={"date"}
              onChange={handleChange}
              inputName="workingYear"
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Detail</Label>
          <Input type={"textarea"} onChange={handleChange} inputName="details" />
        </div>
        <ActionButtons {...props} />
      </Card>
    );
  };

  export default Five;