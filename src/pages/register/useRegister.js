import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();
    const ToDashboard = () => navigate('/dashboard');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('this is e', e.target)
        console.log('this is formdata in handle submit', handleSubmit)
        axios.post(`${process.env.REACT_APP_API_URL}auth/register`, {
            data: {
                name: formData.name,
                email: formData.email,
                username: formData.username,
                phone: formData.mobile,
                password: formData.password,
            }
        }).then(() => {
            navigate('/dashboard');
        })
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    }
};