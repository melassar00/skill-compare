import axios from 'axios';
const authUrl = 'https://auth.emsicloud.com/connect/token';
const extractUrl = 'https://skills.emsicloud.com/versions/latest/extract';

export const getAuth = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('client_id', 'ikw8djnn9lt9m5aj');
    bodyFormData.append('client_secret', 'mF85PsGG');
    bodyFormData.append('grant_type', 'client_credentials');
    bodyFormData.append('scope', 'emsi_open');

    const res = await axios.post(authUrl, bodyFormData, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });

    if (res.status !== 200) {
        console.error("Error")
        return;
    }

    sessionStorage.setItem('emsi', res.data.access_token);

    return res.data;
}

export const getSkills = async (resumeText) => {
    const res = await axios.post(extractUrl, {
        full_text: resumeText
    }, {
        headers: {
            authorization: `Bearer ${sessionStorage.getItem('emsi')}`,
            'content-type': 'application/json'
        },
    });

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    // );

    return res.data;
}


