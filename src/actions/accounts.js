const config = require("./config.json");

export const login = (payload) => {
    return dispatch => {
        fetch(`${config.url}/accounts/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(resp => resp.json())
            .then(response => {
                let accessToken = response.data.access_token;
                sessionStorage.setItem("accessToken", accessToken);
                dispatch({
                    type: "LOGIN_COMPLETE",
                    payload: accessToken
                });
            });
    };
};

export const register = (payload) => {
    return dispatch => {
        fetch(`${config.url}/accounts/register`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(resp => resp.json())
            .then(response => {
                let accessToken = response.data.access_token;
                sessionStorage.setItem("accessToken", accessToken);
                dispatch({
                    type: "REGISTER_COMPLETE",
                    payload: true
                });
                dispatch({
                    type: "LOGIN_COMPLETE",
                    payload: accessToken
                });
            });
    };
};

export const logout = () => {
    sessionStorage.removeItem("accessToken");
    return ({
        type: "LOGIN_COMPLETE",
        payload: null
    });
};
export const socialLogin = (params) => {
    return dispatch => {
        fetch(`${config.url}/accounts/google/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(params)
        })
            .then(resp => resp.json())
            .then(response => {
                let accessToken = response.data.access_token;
                sessionStorage.setItem("accessToken", accessToken);
                dispatch({
                    type: "LOGIN_COMPLETE",
                    payload: accessToken
                });
            });
    };
};

export const socialsRegister = (payload) => {
    return dispatch => {
        fetch(`${config.url}/accounts/google/register`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then(resp => resp.json())
            .then(response => {
                let accessToken = response.data.access_token;
                sessionStorage.setItem("accessToken", accessToken);
                dispatch({
                    type: "REGISTER_COMPLETE",
                    payload: true
                });
                dispatch({
                    type: "LOGIN_COMPLETE",
                    payload: accessToken
                });
            });
    };
};
