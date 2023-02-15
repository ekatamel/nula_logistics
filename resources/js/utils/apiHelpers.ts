import axios from "axios";

export const fetchHelper = async (url: string, token: string) => {
    if (token) {
        console.log("token");
        const response = await axios(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: token,
            },
        });
        return response.data;
    }
    console.log("NOtoken");
};
