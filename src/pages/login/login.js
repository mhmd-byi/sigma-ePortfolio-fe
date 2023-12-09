import React from "react";
import Styles from './login.module.scss';
import {Button, Heading, Image, Input, Label, Text} from '../../components';
import { useNavigate } from "react-router-dom";

const Login = () => { 
    const navigate = useNavigate()
    const navigateTo = () => navigate('/register');
    const ToDashboard = () => navigate('/dashboard');
  
    return (
        <div className={Styles.login}>
            <div className={Styles.content}>
                <div className={Styles.form}>
                    <div className="d-sm-none mb-4 text-center">
                        <Image src="images/logo.svg" className={'w-50'} />
                    </div>

                    <Heading headingText={'Sign In'} headingType={'h2'} />
                    <Text variant={'lg'} color={'secondary'}>Enter your email and password to sign in!</Text>
                    <Button className={Styles.googleBtn}><Image src="images/google.svg" /> Sign in with Google</Button>
                    <div className={Styles.or}>
                        <div className={Styles.left}></div>
                        <Text>Or</Text>
                        <div className={Styles.right}></div>
                    </div>
                    <div className="mb-3">
                        <Label>Email*</Label>
                        <Input type={'email'} placeholder={'mail@simmmple.com'} />
                    </div>
                    <div className="mb-3">
                        <Label>Password*</Label>
                        <Input type={'password'} placeholder={'********'} />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Keep me logged in
                            </label>
                        </div>
                        <Text variant={'md'} strong={'semiBold'} className={Styles.cursor}>Forgot Password?</Text>
                    </div>
                    <Button className={Styles.loginBtn} onClick={ToDashboard}>Sign in</Button>
                    <Text>Not registered yet? <Text strong={'semiBold'} className={Styles.cursor} onClick={navigateTo}>Create an Account</Text></Text>
                </div>
            </div>
            <div className={Styles.image}>
                <Image src="images/logoBW.svg" className={Styles.logo} />
                <Image src="images/mockup.png" className={Styles.mockup} />
                <Text className={'mt-5'}>© 2022 Sigma. All Rights Reserved. <Text strong={'semiBold'} className={Styles.cursor}>Made with love by UpSpot!</Text></Text>
            </div>
        </div>
    )
}

export default Login