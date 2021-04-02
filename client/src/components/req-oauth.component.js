import React, { useEffect } from 'react';
import { setNotification, NOTIFICATION_TYPES } from '../libraries/setNotification';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ReqOAuth = () => {
    const {pathname} = window.location;
    const code = window.location.search;

    useEffect(() => {
        async function validateData() {
            await axios.get(`${SERVER_URL}${pathname}${code}`, { withCredentials: true })
            .then(() => window.location = '/')
            .catch(err => {
                if(err.response.data.statusCode === 302) window.location = err.response.data.url;
                else{
                    if(err.response.data.message || err.response.data.error_description){
                        setNotification(NOTIFICATION_TYPES.DANGER, err.response.data.message ? err.response.data.message : err.response.data.error_description);
                        setTimeout(() => { window.location='/' }, 5000)
                    }else window.location='/'
                };
            })
        }
        validateData();
    },[code, pathname])

    return(<div></div>)
}

export default ReqOAuth;