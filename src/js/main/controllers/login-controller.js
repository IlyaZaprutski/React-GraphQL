import base64 from 'base-64';
import axios from 'axios';

const config = {
    GITHUB_CLIENT_ID: 'e0b1671ff764de482212',
    GITHUB_CLIENT_SECRET: '8f77dcfd6a807cff38ac558400c859f240806071',
};

const AUTH_URL_PATH = 'https://api.github.com/authorizations';

export const login = (name, pwd) => {
    const bytes = `${name.trim()}:${pwd.trim()}`;
    const encoded = base64.encode(bytes);

    return axios
        .post(
            AUTH_URL_PATH,
            {
                client_id: config.GITHUB_CLIENT_ID,
                client_secret: config.GITHUB_CLIENT_SECRET,
                scopes: ['user', 'repo'],
                note: 'not abuse',
            },
            {
                headers: {
                    Authorization: `Basic ${encoded}`,
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/vnd.github.inertia-preview+json',
                },
            },
        )
        .then((response) => {
            if (response.status < 400) {
                return response.data.token;
            }
            throw new Error(response.statusText);
        });
};
