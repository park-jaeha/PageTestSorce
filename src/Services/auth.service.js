import axios from "axios";

const Global = require("./../Global");

class AuthService {
    login(username) {
        return axios
            .post(Global.useUrl + "/login", { username })
            .then((Response) => {
                if (Response.data.token) {
                    localStorage.setItem("LoginInfo", JSON.stringify(Response.data));
                }

                return Response.data;
            })
            .catch((Error)=>{
                console.log(Error);
            })
    }
    logout() {
        localStorage.removeItem("LoginInfo");
    }
}

export default new AuthService();
