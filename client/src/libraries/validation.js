const axios = require("axios").create({ withCredentials: true });
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const labels = ["Priority", "Secondary", "Important", "Do Later"];

const validateLabel = (e) => {
    for (let a=0; labels.length; a++){
        if(((a === labels.length-1) && (e === labels[a].toLowerCase())) || e === labels[a].toLowerCase()) return false;
        else if((a === labels.length-1) && (e !== labels[a].toLowerCase())) return true;
    }
}

const OAuthGitHub = (e) => {
    e.preventDefault();
    window.location = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=f16f43122ef61cc75963';
}

const createRequest = (e) => {
    axios.get(`${SERVER_URL}/status`)
    .then().catch(err => console.log(err));
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

module.exports = {labels, validateLabel, OAuthGitHub, createRequest, getCookie};