import React, { useState } from "react";
import Styles from "../dashboard/dashboard.module.scss";
import { Button, Card, Header, Icon, Input, Label, Sidebar, Text } from "../../components";
import { Stepper, Step } from "react-form-stepper";
import StepWizard from "react-step-wizard";
import { Dropzone, FileMosaic } from "@files-ui/react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { usePortfolioForm } from "./usePortfolioForm";
import { ProtectedRoute } from "../../components/security/protectedRoute";

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
  const { portfolioDetails, handleChange } = props;
  return (
    <Card>
      <div>
        <Label>Name*</Label>
        <Input
          type={"text"}
          placeholder={"Enter Name"}
          value={portfolioDetails.name}
          disabled
        />
      </div>
      <div className="mt-3">
        <Label>Email*</Label>
        <Input
          type={"email"}
          placeholder={"example@gmail.com"}
          value={portfolioDetails.email}
          disabled
        />
      </div>
      <div className="mt-3">
        <Label>Phone No.*</Label>
        <Input
          type={"text"}
          placeholder={"+91 9876543210"}
          value={portfolioDetails.phone}
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
  const { portfolioDetails, handleChange, removeFile, handleFileChange } = props;

  return (
    <Card>
      <div>
        <Label>Banner Photo/ Logo</Label>
        <Dropzone onChange={(files) => handleFileChange(files, 'bannerImage')} value={portfolioDetails.bannerImage} name="bannerImage">
          {portfolioDetails?.bannerImage?.map((file) => (
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
        <Label>Profile Picture</Label>
        <Dropzone onChange={(files) => handleFileChange(files, 'profilePhoto')} value={portfolioDetails.profilePhoto} name="profilePhoto">
          {portfolioDetails?.profilePhoto?.map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={removeFile}
              info
              preview
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
  const { portfolioDetails, handleChange, handleFileChange, removeFile } = props;

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
        <Dropzone onChange={(files) => handleFileChange(files, 'introVideo')} value={portfolioDetails.introVideo} name="introVideo">
          {portfolioDetails?.introVideo?.map((file) => (
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
        <Label>Project Description</Label>
        <Input type={"textarea"} rows={4} onChange={handleChange} inputName={'projectDescription'} />
      </div>
      <div className="mt-3">
        <Label>Projects Name</Label>
        <Input type={"text"} onChange={handleChange} inputName={'projectsName'} />
      </div>
      <div className="mt-3">
        <Label>Certificates/ Achievements</Label>
        <Dropzone onChange={(files) => handleFileChange(files, 'achievements')} value={portfolioDetails.achievements} name="achievements">
          {portfolioDetails?.achievements?.map((file) => (
            <FileMosaic key={file.id} {...file} onDelete={removeFile} info preview />
          ))}
        </Dropzone>
      </div>
      <div className="mt-3">
        <Label>Skills (Hard Skill & Soft Skill)</Label>
        <MultiSelect
          onChange={handleChange}
          options={options}
          className="w-100 changeBorder"
          name="skills"
          value={portfolioDetails.skills}
        />
      </div>
      <div className="mt-3">
        <Label>Languages</Label>
        <MultiSelect
          onChange={handleChange}
          options={options}
          className="w-100 changeBorder"
          name="languages"
          value={portfolioDetails.languages}
        />
      </div>
      <div className="mt-3">
        <Label>Interests</Label>
        <Input type={"text"} onChange={handleChange} inputName="interests" />
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const Four = (props) => {
  const { portfolioDetails, handleChange, handleFileChange, removeFile } = props;
  return (
    <Card>
      <div>
        <Label>Course Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="courseName" />
      </div>
      <div className="mt-3">
        <Label>Year</Label>
        <Input type={"date"} rows={3} onChange={handleChange} name="year" />
      </div>
      <div className="mt-3">
        <Label>Percentage</Label>
        <Input type={"number"} onChange={handleChange} name="percentage" />
      </div>
      <div className="mt-3">
        <Label>Certificate</Label>
        <Dropzone onChange={(files) => handleFileChange(files, 'certificate')} value={portfolioDetails.certificate} name="certificate">
          {portfolioDetails?.certificate?.map((file) => (
            <FileMosaic key={file.id} {...file} onDelete={removeFile} info preview />
          ))}
        </Dropzone>
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const Five = (props) => {
  const { portfolioDetails, handleChange } = props;
  return (
    <Card>
      <div>
        <Label>Company’s Name</Label>
        <Input type={"text"} onChange={handleChange} inputName="companyName" />
      </div>
      <div className="mt-3">
        <Label>Working Year</Label>
        <Input type={"date"} onChange={handleChange} inputName="workingYear" />
      </div>
      <div className="mt-3">
        <Label>Detail</Label>
        <Input type={"textarea"} onChange={handleChange} inputName="details" />
      </div>
      <ActionButtons {...props} />
    </Card>
  );
};

const PortfolioForm = () => {
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const { portfolioDetails, handleChange, handleFileChange, removeFile } = usePortfolioForm();

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
    <ProtectedRoute>
      <div className={Styles.dashboard}>
        <Sidebar />
        <div className={Styles.main}>
          <Header pageHeading={"E-Portfolio"} />
          <div className={Styles.pageContent}>
            <div className={Styles.stepWizard}>
              <div className="d-flex align-items-center justify-content-between">
                <Stepper
                  activeStep={activeStep}
                  className="w-100 justify-content-start px-1"
                >
                  <Step label="Basic Details" className={`${Styles.stepView}`} />
                  <Step label="Home Page" className={`${Styles.stepView}`} />
                  <Step label="E-Portfolio" className={`${Styles.stepView}`} />
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
                <One userCallback={assignUser} portfolioDetails={portfolioDetails} handleChange={handleChange} />
                <Two userCallback={assignUser} portfolioDetails={portfolioDetails} handleChange={handleChange} handleFileChange={handleFileChange} removeFile={removeFile} />
                <Three userCallback={assignUser} portfolioDetails={portfolioDetails} handleChange={handleChange} handleFileChange={handleFileChange} removeFile={removeFile} />
                <Four userCallback={assignUser} portfolioDetails={portfolioDetails} handleChange={handleChange} handleFileChange={handleFileChange} removeFile={removeFile} />
                <Five user={user} completeCallback={handleComplete} portfolioDetails={portfolioDetails} handleChange={handleChange} />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PortfolioForm;
