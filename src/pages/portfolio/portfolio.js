import React, { useState } from "react";
import Styles from '../dashboard/dashboard.module.scss';
import {Button, Card, Header, Icon, Input, Label, Sidebar, Text} from '../../components';
import { Stepper, Step } from "react-form-stepper";
import StepWizard from "react-step-wizard";
import { useForm, useFieldArray } from 'react-hook-form';
import { Dropzone, FileMosaic } from "@files-ui/react";

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
                <Button variant={'secondary'} onClick={handleBack}><Icon className={'icon-left'} /> Prev</Button>
            )}
            <div className="d-flex align-items-center justify-content-between ms-auto">
                {props.currentStep < props.totalSteps && (
                    <Button variant={'primary'} onClick={handleNext}>Next <Icon className={'icon-right'} /></Button>
                )}
                {props.currentStep === props.totalSteps && (
                    <Button variant={'primarySolid'} onClick={handleFinish}>Finish </Button>
                )}
            </div>
        </div>
    );
};
  
const One = (props) => {
    return (
        <Card>
            <div>
                <Label>Name*</Label>
                <Input type={'text'} placeholder={'Enter Name'} />
                <Text variant={'md'} color={'red'}>Please enter a valid name.</Text>
            </div>
            <div className="mt-3">
                <Label>Email*</Label>
                <Input type={'email'} placeholder={'example@gmail.com'} />
            </div>
            <div className="mt-3">
                <Label>Phone No.*</Label>
                <Input type={'text'} placeholder={'+91 9876543210'} />
                <Text variant={'md'} color={'secondary'}>Add Mobile with Country Code.</Text>
            </div>
            <div className="mt-3">
                <Label>Address</Label>
                <Input type={'textarea'} rows={2} placeholder={'Abc, xyz Street'} />
            </div>
            <div className="mt-3">
                <Label>Job Title</Label>
                <Input type={'text'} placeholder={'Enter Title'} />
            </div>

            <ActionButtons {...props} />
        </Card>
    );
};
  
const Two = (props) => {  
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
                <Label>Banner Photo/ Logo</Label>
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    >
                    {files.map((file) => (
                        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
                    ))}
                </Dropzone>
            </div>
            <div className="mt-3">
                <Label>Profile Picture</Label>
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    >
                    {files.map((file) => (
                        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
                    ))}
                </Dropzone>
                <Text variant={'md'} color={'secondary'}>Use 400X400 size for better results</Text>
            </div>
            <div className="mt-3">
                <Label>Select Theme Colour</Label>
                <div className={Styles.themeSelect}>
                    <input type="radio" name="radio1" id="red" value="red"/>
                    <label htmlFor="red" className={Styles.red}>Red</label>

                    <input type="radio" name="radio1" id="green" value="green"/>
                    <label htmlFor="green" className={Styles.green}>Green</label>
                    
                    <input type="radio" name="radio1" id="blue" value="blue"/>
                    <label htmlFor="blue" className={Styles.blue}>Blue</label>
                </div>
            </div>
            <div className="mt-3">
                <Label>Custom Domain</Label>
                <Input type={'text'} placeholder={'Enter Domain'} />
                <Text variant={'md'} color={'secondary'}>Your Card Link will be: <Text strong={'semiBold'} color={'dark'}>https://</Text></Text>
            </div>
            <div className="mt-3 border-top pt-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Hide Branding</label>
                </div>
            </div>
            <ActionButtons {...props} />
        </Card>
    );
};
  
const Three = (props) => {
    const { control, register, handleSubmit } = useForm({
        defaultValues: { links: [{ link: '' }] },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'links',
    });   

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
                <Label>Summary/ About me</Label>
                <Input type={'textarea'} rows={4} />
            </div>
            <div className="mt-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <Label className={'mb-0'}>Social Links</Label>
                        <Text variant={'sm'}>(Instagram, Facebook, Twitter, LinkedIn, Behance, YouTube, Website etc)</Text>
                    </div>
                    <Button type="button" className={Styles.addBtn} onClick={() => append({ link: '' })}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    </Button>
                </div>
                <form onSubmit={handleSubmit()} className="mt-2">
                {fields.map((field, index) => (
                    <div className={Styles.socialLink} key={field.id}>
                        <Input
                        {...register(`links.${index}`)}
                        defaultValue={field.link}
                        />
                        {index > 0 && (
                        <Button type="button" onClick={() => remove(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </Button>
                        )}
                    </div>
                ))}                
                </form>
            </div>
            <div className="mt-3">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="WhatsAppButtons" />
                    <label class="form-check-label" for="WhatsAppButtons">Direct WhatsApp Buttons</label>
                </div>
            </div>
            <div className="mt-3">
                <Label>Other Attachments</Label>
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    >
                    {files.map((file) => (
                        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
                    ))}
                </Dropzone>
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
                <Label>Service Name</Label>
                <Input type={'text'} />
            </div>            
            <div className="mt-3">
                <Label>Content Of Services</Label>
                <Input type={'textarea'} rows={3} />
            </div>
            <div className="mt-3">
                <Label>Price of the Services</Label>
                <Input type={'number'} />
            </div>
            <div className="mt-3">
                <Label>Videos of your work</Label>
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    >
                    {files.map((file) => (
                        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
                    ))}
                </Dropzone>
            </div>
            <div className="mt-3">
                <Label>Projects in any Doc format</Label>
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    >
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
                <Label>Payment Links</Label>
                <Input type={'text'} />
            </div>
            <div className="mt-3">
                <Label>Payment Links</Label>
                <Dropzone
                    onChange={updateFiles}
                    value={files}
                    >
                    {files.map((file) => (
                        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
                    ))}
                </Dropzone>
            </div>
            <ActionButtons {...props} />
        </Card>
    );
};
  

const Portfolio = () => { 
    const [user, setUser] = useState({});
    const [activeStep, setActiveStep] = useState(0);
  
    const assignStepWizard = (instance) => {
    //   setStepWizard(instance);
    }; 
  
    const assignUser = (val) => {
      console.log("parent receive user callback");
      console.log(val);
      setUser((user) => ({
        ...user,
        ...val
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
                <Header pageHeading={'E-Portfolio'} />
                <div className={Styles.pageContent}>                
                    <div className={Styles.stepWizard}>
                        <div className="d-flex align-items-center justify-content-between">
                            <Stepper activeStep={activeStep} className="w-100 justify-content-start px-1">
                                <Step label="Basic Details" className={`${Styles.stepView}`} />
                                <Step label="Home Page" className={`${Styles.stepView}`} />
                                <Step label="E-Portfolio" className={`${Styles.stepView}`} />
                                <Step label="Services" className={`${Styles.stepView}`} />
                                <Step label="Payments" className={`${Styles.stepView}`} />
                            </Stepper>
                            <Button variant={'main'} className={Styles.skipSave}>Skip & Save</Button>
                        </div>
                        <StepWizard instance={assignStepWizard} onStepChange={handleStepChange} className="mt-3">
                            <One userCallback={assignUser} />
                            <Two userCallback={assignUser} />
                            <Three userCallback={assignUser} />
                            <Four userCallback={assignUser} />
                            <Five user={user} completeCallback={handleComplete} />
                        </StepWizard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio