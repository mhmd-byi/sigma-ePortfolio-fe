import React from "react";
import Styles from './dashboard.module.scss';
import {Button, Card, Header, Icon, Image, Sidebar, Text} from '../../components';
import { useNavigate } from "react-router-dom";

const Dashboard = () => { 
    const navigate = useNavigate()
    const ToResume = () => navigate('/resume');
    const ToPortfolio = () => navigate('/portfolio');
    return (
        <div className={Styles.dashboard}>
            <Sidebar />
            <div className={Styles.main}>
                <Header pageHeading={'Dashboard'} />
                <div className={Styles.cardGrid}>
                    <Card className={Styles.card} onClick={ToResume}>
                        <Icon className={'icon-plus'} />
                        <Text>Create New Resume</Text>
                    </Card>
                    <Card className={Styles.card} onClick={ToPortfolio}>
                        <Icon className={'icon-plus'} />
                        <Text>Create New Portfolio</Text>
                    </Card>
                    <Card className={Styles.detailCard}>
                        <div className={Styles.row}>
                            <div className={Styles.leftCol}>
                                <Text strong={'medium'}>Username</Text>
                                <Text color={'secondary'}>username@gmail.com</Text>
                                <Text color={'secondary'}>+917895641230</Text>
                                <Text color={'secondary'}>username.sigma.com</Text>
                            </div>
                            <div className={Styles.rightCol}>
                                <Image src="./images/avatar.png" />
                            </div>
                        </div>
                        <div className={`${Styles.btns} d-flex align-items-center`}>
                            <Button><Icon className={'icon-edit'} /> Edit</Button>
                            <Button><Icon className={'icon-view'} /> View</Button>
                            <Button><Icon className={'icon-share'} /> Share</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard