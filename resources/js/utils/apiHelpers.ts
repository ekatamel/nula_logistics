import axios from "axios";

const token = localStorage.getItem("auth_token") || "ascascasc";
export const fetchHelper = async (url: string) => {
    const response = await axios(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: token,
        },
    });
    return response.data;
};
