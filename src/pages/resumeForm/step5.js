import React from "react";
import { Button, Card, Icon, Input, Label } from "../../components";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResumeForm } from "./useResumeForm";

const ActionButtons = (props) => {
  const { onHandleNext } = props; // Custom handler for the Next button

  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (onHandleNext) {
      onHandleNext(); // Use the custom handler if provided
    } else {
      props.nextStep(); // Default behavior
    }
  };

  const handleFinish = (e) => {
    e.preventDefault();
    props.lastStep();
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
          <Button type="submit" variant={"primarySolid"}>
            Finish{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

const Five = (props) => {
  const { resumeDetails, handleChange } = props;
  const { handleSubmit } = useResumeForm();
  const handleFinish = (e) => {
    e.preventDefault();
    console.log("Current Resume Details:", resumeDetails);
    handleSubmit(resumeDetails);
  };
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
          <Input type={"date"} onChange={handleChange} inputName="startYear" />
        </div>
        <div className="mt-3 col-lg-6">
          <Label>End Year</Label>
          <Input type={"date"} onChange={handleChange} inputName="endYear" />
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
