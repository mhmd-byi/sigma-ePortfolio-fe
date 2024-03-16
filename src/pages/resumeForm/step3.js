import React from "react";
import { Button, Card, Icon, Input, Label } from "../../components";
import { Dropzone, FileMosaic } from "@files-ui/react";
import MultiSelect from "react-multiple-select-dropdown-lite";
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

const Three = (props) => {
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

  const options = [
    { label: "Option 1", value: "option_1" },
    { label: "Option 2", value: "option_2" },
    { label: "Option 3", value: "option_3" },
    { label: "Option 4", value: "option_4" },
  ];

  return (
    <Card>
      <div>
        <Label>Intro Video</Label>
        <Dropzone
          onChange={(files) => handleFileChange(files, "introVideo")}
          value={resumeDetails.introVideo}
          name="introVideo"
        >
          {resumeDetails?.introVideo?.map((file) => (
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
      <div className="mt-3">
        <Label>Summary/ About me</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"aboutMe"}
        />
      </div>
      <div className="mt-3">
        <Label>Projects Name</Label>
        <Input
          type={"text"}
          onChange={handleChange}
          inputName={"projectsName"}
        />
      </div>
      <div className="mt-3">
        <Label>Project Description</Label>
        <Input
          type={"textarea"}
          rows={4}
          onChange={handleChange}
          inputName={"projectDescription"}
        />
      </div>
      <div className="mt-3">
        <Label>Certificates/ Achievements</Label>
        <Dropzone
          onChange={(files) => handleFileChange(files, "achievements")}
          value={resumeDetails.achievements}
          name="achievements"
        >
          {resumeDetails?.achievements?.map((file) => (
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
      <div className="mt-3">
        <Label>Hard Skills</Label>
        <MultiSelect
          onChange={handleChange}
          options={options}
          className="w-100 changeBorder"
          name="skills"
          value={resumeDetails.skills}
        />
      </div>
      <div className="mt-3">
        <Label>Soft Skills</Label>
        <MultiSelect
          onChange={handleChange}
          options={options}
          className="w-100 changeBorder"
          name="languages"
          value={resumeDetails.languages}
        />
      </div>
      {/*<div className="mt-3">
          <Label>Interests</Label>
          <Input type={"text"} onChange={handleChange} inputName="interests" />
            </div>*/}
      <ActionButtons {...props} onHandleNext={handleNext} />
    </Card>
  );
};

export default Three;
