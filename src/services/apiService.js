import axios from "axios";

//export const URL = "https://vibes.cyclic.app";
// export const URL = "http://localhost:3008";
export const URL = "https://vibes-9qjm.onrender.com";
export const TOKEN_KEY = "posts_token";
export const EXP_DATE_KEY = "user_date";

export const doApiGet = async (_url) => {
    try {
        const resp = await axios({
            url: _url,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}

export const doApiMethod = async (_url, _method, _body) => {
    try {
        const resp = await axios({
            url: _url,
            method: _method,
            data: _body,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}

export const doApiCloud = async (_url, reader_result) => {
    try {
        const resp = await axios({
            url: _url,
            method: "POST",
            data: { image: reader_result },
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}

export const imgToString = async (_file) => {
    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(_file);

        reader.addEventListener("loadend", async () => {
            resolve(reader.result)
        })
    })
}

export const checkValidToken = () => {
    const token = localStorage[TOKEN_KEY];
    const expDate = localStorage[EXP_DATE_KEY];
    return token && Date.now() < expDate;



}