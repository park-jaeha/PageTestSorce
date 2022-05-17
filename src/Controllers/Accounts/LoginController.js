import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import {  } from 'react-dom';
/** Component Import */
import LoginScreen from "./../../Views/Accounts/LoginScreen";
import AlertDialog from "../../Views/Components/Dialog_Alert";
import Loading from "./../../Views/Components/Loading_Basic";
import UrlDialog from "../../Views/Components/Dialog_Url";
import AudioPlay from "./../../Views/Components/AudioPlay";

import authService from "../../Services/auth.service";

const Global = require("./../../Global");

const LoginController = () => {
    const audioRef = React.useRef();
    const navigate = useNavigate();
    const [versionText, setVersionText] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [alertDialogToggle, setAlertDialogToggle] = React.useState(false);
    const [alertName, setAlertName] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [urlDialogToggle, setUrlDialogToggle] = React.useState(false);

    // React.useEffect(async () => {
    // 	setLoading(true);

    // 	await axios
    // 		.get(Global.useUrl + Global.detailUrl._Version)
    // 		.then((Response) => {
    // 			let resData = Response.data;
    // 			let dataCount = Response.data.length;

    // 			if (dataCount > 0) {
    // 				setLoading(false);
    // 				setVersionText(resData[0].version);
    // 			} else {
    // 				setLoading(false);
    // 				AlertDialogOpen("경고", "네트워크를 확인하세요.");
    // 				audioRef.current.PlayError();
    // 			}
    // 		})
    // 		.catch((Error) => {
    // 			setLoading(false);
    // 			console.log(Error);
    // 			audioRef.current.PlayError();
    // 		});
    // }, []);

    const LoginLogic = async (userId) => {
        setLoading(true);

        // if (userId.length != 8) {
        //     AlertDialogOpen("경고", "사원번호를 확인해주세요.");
        //     audioRef.current.PlayInputError();
        //     setLoading(false);
        //     return false;
        // } else {
        //     authService.login(userId).then((_resData) => {
        //         if (!_resData) {
        //             console.log(Error.response);
        //             AlertDialogOpen("경고", "사원번호를 확인해주세요.");
        //             audioRef.current.PlayInputError();
        //             setLoading(false);
        //         } else {
        //             Global._common._UserInfo._UserId = _resData.userId;
        //             Global._common._UserInfo._UserName = _resData.userName;
        //             Global._common._UserInfo._UserDeptId = _resData.userDeptId;
        //             Global._common._UserInfo._UserDeptName =
        //                 _resData.userDeptname;
        //             Global._common._UserInfo._UserPart = _resData.userPart;
        //             Global._common._UserInfo._UserShop = _resData.userShop;
        //             audioRef.current.PlayWait();
        //             setLoading(false);
        //         }
        //     });
        // }
        navigate("/Test");
    };

    const AlertDialogOpen = (name, message) => {
        setAlertName(name);
        setAlertMessage(message);
        setAlertDialogToggle(true);
    };

    const AlertDialogClose = () => {
        setAlertDialogToggle(false);
    };

    const UrlDialogOpen = () => {
        setUrlDialogToggle(true);
    };

    const UrlDialogClose = () => {
        setUrlDialogToggle(false);
    };

    const ChangedUrl = (idx) => {
        setLoading(true);

        switch (idx) {
            case 0:
                Global.useUrl = Global.local_url;
                setLoading(false);
                return true;
            case 1:
                Global.useUrl = Global.dev_url;
                setLoading(false);
                return true;
            case 2:
                Global.useUrl = Global.oper_url;
                setLoading(false);
                return true;
            default:
                setLoading(false);
                return false;
        }
    };

    return (
        <div className="LoginController">
            {loading && <Loading />}
            <LoginScreen
                versionText={versionText}
                UrlDialogOpen={UrlDialogOpen}
                LoginLogic={LoginLogic}
            />
            <AlertDialog
                name={alertName}
                article={alertMessage}
                buttonName="확인"
                open={alertDialogToggle}
                onClose={AlertDialogClose}
            />
        </div>
    );
};

export default LoginController;
