/** 코발트 설비 도입(신규) */

import * as React from "react";
import axios from "axios";
/** Component Import */
import A1100Screen from "../../Views/VulInsGips/A1100";
import CICamera from "../../Views/Components/Camera/CICamera";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import AudioPlayer from "../../Views/Components/AudioPlay";
import Loading from "./../../Views/Components/Loading_Basic";
import AlertDialog from "../../Views/Components/Dialog_Alert";
import authService from "../../Services/auth.service";

const Global = require("./../../Global");

const A1100 = () => {
    const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
    const [offline, setOffline] = React.useState(false);
    const [cameraToggle, setCameraToggle] = React.useState(false);
    const [listArr, setListArr] = React.useState([]); // 조회 Array
    const audioRef = React.useRef();
    const [alertTokenDialog, setAlertTokenDialog] = React.useState(false); // 토큰 유효성 검사
    // Snack Setting
    const [snackToggle, setSnackToggle] = React.useState(false);
    const [snackArticle, setSnackArticle] = React.useState(null);
    const [snackType, setSnackType] = React.useState(null);

    const OpenSnack = (_message, _type) => {
        setSnackType(_type);
        setSnackArticle(
            _message.map((items, index) => <li key={index}>{items}</li>)
        );
        setSnackToggle(true);
    };

    const CloseSnack = () => {
        setSnackToggle(false);
    };

    // 토큰 유효성 검사 팝업
    const AlertDialogClose = () => {
        setAlertTokenDialog(false);
        window.location.replace("/");
        authService.logout();
    };

    React.useEffect(() => {
        window.addEventListener("online", () => {
            setOffline(false);
        });
        window.addEventListener("offline", () => {
            setOffline(true);
        });
    }, []);

    const CameraClose = () => {
        setCameraToggle(false);
    };

    // 사진 업로드 이벤트
    const UploadTest = async (capturedImage) => {
        console.log(JSON.parse(localStorage.getItem("Camera")));
        OpenSnack(["업로드 테스트"], "success");

        // await axios
        // 	.get(Global.useUrl + "/GetSavePictureTest", {
        // 		headers: {
        // 			Authorization:
        // 				"Bearer " +
        // 				JSON.parse(localStorage.getItem("LoginInfo")).token,
        // 			"Content-Type": "multipart/form-data",
        // 		},
        // 		params: {
        // 			FileSource: capturedImage,
        // 		},
        // 	})
        // 	.then((Response) => {
        // 		console(Response.data);
        // 	})
        // 	.catch((Error) => {
        // 		console.log("Error : " + Error);
        // 		OpenSnack([Error], "error");
        // 	});

        var img = JSON.parse(localStorage.getItem("Camera")).file;
        // console.log(img);
        // console.log(img.replace("data:image/jpeg;base64,", ""));
        // console.log(
        //     JSON.parse(localStorage.getItem("Camera")).file.replace(
        //         "data:image/jpeg;base64,",
        //         ""
        //     )
        // );
        const formData = new FormData();
        formData.append("Picture", img.replace("data:image/jpeg;base64,", ""));
        await axios
            .post(Global.useUrl + "/GetSavePictureTest", formData, {
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("LoginInfo")).token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((data) => console.log(data))
            .catch((error) => {
                console.log(
                    "Sorry, we encountered an error uploading your image"
                );
            });
    };

    // 날짜 이벤트(null 일시)
    const getNewDay = (date) => {
        // console.log(dtpChkDay);

        let year = date.getFullYear().toString();

        let month =
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1).toString()
                : (date.getMonth() + 1).toString();

        let day =
            date.getDate() < 10
                ? "0" + date.getDate().toString()
                : date.getDate().toString();

        let hour = date.getHours();
        hour = hour < 10 ? "0" + hour.toString() : hour.toString();

        let minites = date.getMinutes();
        minites = minites < 10 ? "0" + minites : minites;

        let seconds = date.getSeconds();
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return year + month + day;
    };

    // 조회 버튼 이벤트
    const SelectFunc = async (date, part) => {
        if (part == null || part == "") {
            OpenSnack(["품목을 입력하세요!"], "warning");
            return;
        } else {
            setLoading(true);
            await axios
                .get(
                    Global.useUrl +
                        Global.detailUrl._VulInsGips.A1100
                            ._CobaltProdCompSelect,
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                JSON.parse(localStorage.getItem("LoginInfo"))
                                    .token,
                        },
                        params: {
                            PlantId: Global._common._DefaultParams._PlantId,
                            ProdDate: getNewDay(date),
                            CompName: part,
                        },
                    }
                )
                .then((Response) => {
                    let resData = Response.data;
                    let dataCount = Response.data.length;

                    if (dataCount > 0) {
                        if (
                            resData[0].asLotId == null ||
                            resData[0].asLotId == ""
                        ) {
                            OpenSnack(["품목정보를 확인하세요"], "warning");
                            audioRef.current.PlayInputError();
                            return;
                        } else {
                            OpenSnack(["조회되었습니다."], "success");
                            setListArr(resData);
                        }
                    }
                })
                .catch((Erorr) => {
                    setLoading(false);
                    if (Error.response.status == "401") {
                        setAlertTokenDialog(true);
                    } else {
                        OpenSnack(["Error : ", Error], "error");
                        audioRef.current.PlayError();
                        console.log(Error);
                    }
                });
        }
        setLoading(false);
    };

    return (
        <div style={{ overflowX: "hidden" }}>
            {loading && <Loading />}
            <A1100Screen
                listArr={listArr}
                cameraToggle={cameraToggle}
                setCameraToggle={setCameraToggle}
                SelectFunc={SelectFunc}
            />
            <AudioPlayer ref={audioRef} />
            <SnackBar
                open={snackToggle}
                onClose={CloseSnack}
                time={3500}
                type={snackType}
                article={snackArticle}
            />
            {cameraToggle && (
                <CICamera
                    offline={offline}
                    open={cameraToggle}
                    UploadTest={UploadTest}
                    onClose={CameraClose}
                ></CICamera>
            )}
            <AlertDialog
                name="알림"
                article="로그인이 만료되었습니다."
                buttonName="확인"
                open={alertTokenDialog}
                onClose={AlertDialogClose}
            />
        </div>
    );
};

export default A1100;
