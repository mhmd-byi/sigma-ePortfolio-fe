import React from "react";
import { Button, Card, Icon, Input, Label } from "../../components";
import { Dropzone, FileMosaic } from "@files-ui/react";
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
          <Button type="submit" variant={"primary"} onClick={handleNext}>
            Next <Icon className={"icon-right"} />
          </Button>
        )}
        {props.currentStep === props.totalSteps && (
          <Button type="submit" variant={"primarySolid"} onClick={handleFinish}>
            Finish{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

const Four = (props) => {
  const {
    resumeDetails,
    handleChange,
    handleFileChange,
    removeFile,
    nextStep,
  } = props;
  const handleNext = () => {
    console.log("Current Resume Details:", resumeDetails);
    nextStep(); // Move to the next step after logging
  };

  return (
    <Card>
      <div>
        <Label>Course Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="courseName" />
      </div>
      <div className="mt-3">
        <Label>University/School Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="courseName" />
      </div>
      <div className="row">
        <div className="mt-3 col-sm-6">
          <Label>Start Year</Label>
          <Input type={"date"} rows={3} onChange={handleChange} name="year" />
        </div>
        <div className="mt-3 col-sm-6">
          <Label>End Year</Label>
          <Input type={"date"} rows={3} onChange={handleChange} name="year" />
        </div>
      </div>
      <div className="mt-3">
        <Label>Percentage</Label>
        <Input type={"number"} onChange={handleChange} name="percentage" />
      </div>
      <div className="mt-3">
        <Label>Certificate</Label>
        <Dropzone
          onChange={(files) => handleFileChange(files, "certificate")}
          value={resumeDetails.certificate}
          name="certificate"
        >
          {resumeDetails?.certificate?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
              preview
            />
          ))}
        </Dropzone>
      </div>
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Four;
