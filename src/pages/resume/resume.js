import React, { useState } from "react";
import Styles from "../dashboard/dashboard.module.scss";
import { Button, Card, Header, Icon, Input, Label, Sidebar, Text } from "../../components";
import { Stepper, Step } from "react-form-stepper";
import StepWizard from "react-step-wizard";
import { Dropzone, FileMosaic } from "@files-ui/react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useResume } from "./useResume";

const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
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
          <Button variant={"primarySolid"} onClick={handleFinish}>
            Finish{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

const One = (props) => {
  const { resumeDetails, handleChange } = props;
  return (
    <Card>
      <div>
        <Label>Name*</Label>
        <Input
          type={"text"}
          placeholder={"Enter Name"}
          value={resumeDetails.name}
          disabled
        />
      </div>
      <div className="mt-3">
        <Label>Email*</Label>
        <Input
          type={"email"}
          placeholder={"example@gmail.com"}
          value={resumeDetails.email}
          disabled
        />
      </div>
      <div className="mt-3">
        <Label>Phone No.*</Label>
        <Input
          type={"text"}
          placeholder={"+91 9876543210"}
          value={resumeDetails.phone}
          disabled
        />
        <Text variant={"md"} color={"secondary"}>
          Add Mobile with Country Code.
        </Text>
      </div>
      <div className="mt-3">
        <Label>Address</Label>
        <Input
          type={"textarea"}
          rows={2}
          placeholder={"Abc, xyz Street"}
          inputName={"address"}
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
        <Label>Job Title</Label>
        <Input
          type={"text"}
          placeholder={"Enter Title"}
          inputName={"jobTitle"}
          onChange={handleChange}
        />
      </div>

      <ActionButtons {...props} />
    </Card>
  );
};

const Two = (props) => {
  const { resumeDetails, handleChange, removeFile, handleFileChange } = props;

  return (
    <Card>
      <div>
        <Label>Banner Photo/ Logo</Label>
        <Dropzone onChange={(files) => handleFileChange(files, 'bannerImage')} value={resumeDetails.bannerImage} name="bannerImage">
          {resumeDetails?.bannerImage?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
            />
          ))}
        </Dropzone>
      </div>
      <div className="mt-3">
        <Label>Profile Picture</Label>
        <Dropzone onChange={(files) => handleFileChange(files, 'profilePhoto')} value={resumeDetails.profilePhoto} name="profilePhoto">
          {resumeDetails?.profilePhoto?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
            />
          ))}
        </Dropzone>
        <Text variant={"md"} color={"secondary"}>
          Use 400X400 size for better results
        </Text>
      </div>
      <div className="mt-3">
        <Label>Select Theme Colour</Label>
        <div className={Styles.themeSelect}>
          <input type="radio" name="theme" id="red" value="red" onChange={handleChange} />
          <label htmlFor="red" className={Styles.red}>
            Red
          </label>

          <input type="radio" name="theme" id="green" value="green" onChange={handleChange} />
          <label htmlFor="green" className={Styles.green}>
            Green
          </label>

          <input type="radio" name="theme" id="blue" value="blue" onChange={handleChange} />
          <label htmlFor="blue" className={Styles.blue}>
            Blue
          </label>
        </div>
      </div>
      <div className="mt-3">
        <Label>Custom Domain</Label>
        <Input type={"text"} placeholder={"Enter Domain"} onChange={handleChange} inputName={'customDomain'} />
        <Text variant={"md"} color={"secondary"}>
          Your Card Link will be:{" "}
          <Text strong={"semiBold"} color={"dark"}>
            https://
          </Text>
        </Text>
      </div>
      <div className="mt-3 border-top pt-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
            Hide Branding
          </label>
        </div>
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const Three = (props) => {
  const [files, setFiles] = React.useState([]);
  const { handleChange } = useResume();
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const [value, setvalue] = useState("");

  const handleOnchange = (val) => {
    setvalue(val);
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
        <Label>Summary/ About me</Label>
        <Input type={"textarea"} rows={4} onChange={handleChange} inputName={'aboutMe'} />
      </div>
      <div className="mt-3">
        <Label>Intro Video</Label>
        <Dropzone onChange={updateFiles} value={files}>
          {files.map((file) => (
            <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
          ))}
        </Dropzone>
      </div>
      <div className="mt-3">
        <Label>Project Description</Label>
        <Input type={"textarea"} rows={4} />
      </div>
      <div className="mt-3">
        <Label>Projects Name</Label>
        <Input type={"text"} />
      </div>
      <div className="mt-3">
        <Label>Certificates/ Achievements</Label>
        <Dropzone onChange={updateFiles} value={files}>
          {files.map((file) => (
            <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
          ))}
        </Dropzone>
      </div>
      <div className="mt-3">
        <Label>Skills (Hard Skill & Soft Skill)</Label>
        <MultiSelect
          onChange={handleOnchange}
          options={options}
          className="w-100 changeBorder"
        />
      </div>
      <div className="mt-3">
        <Label>Languages</Label>
        <MultiSelect
          onChange={handleOnchange}
          options={options}
          className="w-100 changeBorder"
        />
      </div>
      <div className="mt-3">
        <Label>Interests</Label>
        <Input type={"text"} />
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const Four = (props) => {
  const [files, setFiles] = React.useState([]);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  return (
    <Card>
      <div>
        <Label>Course Name</Label>
        <Input type={"text"} />
      </div>
      <div className="mt-3">
        <Label>Year</Label>
        <Input type={"date"} rows={3} />
      </div>
      <div className="mt-3">
        <Label>Percentage</Label>
        <Input type={"number"} />
      </div>
      <div className="mt-3">
        <Label>Certificate</Label>
        <Dropzone onChange={updateFiles} value={files}>
          {files.map((file) => (
            <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
          ))}
        </Dropzone>
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const Five = (props) => {
  return (
    <Card>
      <div>
        <Label>Company’s Name</Label>
        <Input type={"text"} />
      </div>
      <div className="mt-3">
        <Label>Job Title</Label>
        <Input type={"text"} />
      </div>
      <div className="mt-3">
        <Label>Working Year</Label>
        <Input type={"date"} />
      </div>
      <div className="mt-3">
        <Label>Detail</Label>
        <Input type={"textarea"} />
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const Resume = () => {
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const { resumeDetails, handleChange, handleFileChange, removeFile } = useResume();

  const assignStepWizard = (instance) => {
    //   setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val,
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("You r done. TQ");
  };

  return (
    <div className={Styles.dashboard}>
      <Sidebar />
      <div className={Styles.main}>
        <Header pageHeading={"E-Resume"} />
        <div className={Styles.pageContent}>
          <div className={Styles.stepWizard}>
            <div className="d-flex align-items-center justify-content-between">
              <Stepper
                activeStep={activeStep}
                className="w-100 justify-content-start px-1"
              >
                <Step label="Basic Details" className={`${Styles.stepView}`} />
                <Step label="Home Page" className={`${Styles.stepView}`} />
                <Step label="E-Resume" className={`${Styles.stepView}`} />
                <Step label="Education" className={`${Styles.stepView}`} />
                <Step label="Experience " className={`${Styles.stepView}`} />
              </Stepper>
              <Button variant={"main"} className={Styles.skipSave}>
                Skip & Save
              </Button>
            </div>
            <StepWizard
              instance={assignStepWizard}
              onStepChange={handleStepChange}
              className="mt-3"
            >
              <One userCallback={assignUser} resumeDetails={resumeDetails} handleChange={handleChange} />
              <Two userCallback={assignUser} resumeDetails={resumeDetails} handleChange={handleChange} handleFileChange={handleFileChange} removeFile={removeFile} />
              <Three userCallback={assignUser} />
              <Four userCallback={assignUser} />
              <Five user={user} completeCallback={handleComplete} />
            </StepWizard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
