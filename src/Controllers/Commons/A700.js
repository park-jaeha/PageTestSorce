import * as React from "react";
import axios from "axios";
/** Components Import */
import A700Screen from "../../Views/Commons/A700";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import Loading from "./../../Views/Components/Loading_Basic";
import ConfirmDialog from "./../../Views/Components/Dialog_Confirm";
import AlertDialog from "../../Views/Components/Dialog_Alert";
import authService from "../../Services/auth.service";
import AudioPlay from "./../../Views/Components/AudioPlay";

const Global = require("../../Global");

const A700 = () => {
    const childRef = React.useRef();
    const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
    const [oraDateArray, setOraDateArray] = React.useState([]); // 오라클 날짜 조회
    const [listArr, setListArr] = React.useState([]); // 조회 데이터 배열   (eSeqNo, eBarcode, eLocNo, eStandDt, eScanTm)
    const [subArray, setSubArray] = React.useState([]); // 삭제시 저장 위한 subArray
    const [selectedData, setSelectedData] = React.useState([]); // 그리드 선택된 셀 인덱스 저장
    const [date, setDate] = React.useState(new Date()); // 일자 기준 날짜선택
    const [confirmDialogToggle, setConfirmDialogToggle] = React.useState(false); //confirmDialog 상태
    const audioRef = React.useRef();
    const [type, setType] = React.useState("success");
    const [typeToggle, setTypeToggle] = React.useState([
        "success",
        "warning",
        "error",
        "info",
    ]);
    const [alertTokenDialog, setAlertTokenDialog] = React.useState(false); // 토큰 유효성 검사

    const [snackToggle, setSnackToggle] = React.useState(false);
    const [snackArticle, setSnackArticle] = React.useState(null);

    const inputLogicDialogRef = React.useRef();
    const nextSelectedIndexRef = React.useRef();

    const OpenSnack = (_message) => {
        setSnackArticle(
            _message.map((items, index) => <li key={index}>{items}</li>)
        );
        setSnackToggle(true);
    };

    const CloseSnack = () => {
        setSnackToggle(false);
    };

    React.useEffect(async () => {
        setLoading(true);

        await axios
            .get(Global.useUrl + Global.detailUrl._Commons.A700._GetOraDate, {
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("LoginInfo")).token,
                },
            })
            .then((Response) => {
                let resData = Response.data;
                let dataCount = Response.data.length;

                if (dataCount > 0) {
                    setOraDateArray(resData);
                    if (new Date().getDate() > 25) {
                        setDate(resData[0].asOraCurMonLastDay);
                    } else if (new Date().getDate() < 5) {
                        setDate(resData[0].asOraPremonLastDay);
                    } else {
                        setDate(resData[0].asOraFullDt);
                    }
                }
                setLoading(false);
            })
            .catch((Error) => {
                setLoading(false);
                if (Error.response.status == "401") {
                    setAlertTokenDialog(true);
                } else {
                    setType(typeToggle[2]);
                    OpenSnack(["Error : ", Error]);
                    console.log(Error);
                }
                return false;
            });
    }, []);

    // 토큰 유효성 검사 팝업
    const AlertDialogClose = () => {
        setAlertTokenDialog(false);
        window.location.replace("/");
        authService.logout();
    };

    //ConfirmDialog on/off 이벤트
    const ConfirmDialogOpen = () => {
        setConfirmDialogToggle(true);
    };

    const ConfirmDialogClose = () => {
        setLoading(false);
        setConfirmDialogToggle(false);
    };

    // 조회 이벤트
    const SelectLogic = async (barcode, locNo) => {
        if (barcode == "" || barcode == null) {
            setType(typeToggle[1]);
            OpenSnack(["바코드를 입력하세요!"]);
            audioRef.current.PlayInputError();
            return;
        }
        if (barcode.length < 10 || barcode.length > 15) {
            setType(typeToggle[1]);
            OpenSnack(["잘못된 바코드 입니다!"]);
            audioRef.current.PlayInputError();
            return;
        }
        if (locNo == "" || locNo == null) {
            setType(typeToggle[1]);
            OpenSnack(["위치 정보가 없습니다."]);
            audioRef.current.PlayError();
            return;
        }

        let iFRow = 0;
        for (let i = 0; i < listArr.length; i++) {
            if (listArr[i].asBarcode == barcode) {
                iFRow += 1;
            }
        }
        if (iFRow > 0) {
            setType(typeToggle[1]);
            OpenSnack(["이미 추가된 바코드입니다."]);
            audioRef.current.PlayInputError();
            return;
        } else {
            setLoading(true);
            listArr.push({
                asSeq: listArr.length + 1,
                asBarcode: barcode,
                asLocNo: locNo,
                asStandDt:
                    date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2),
                asScanTm:
                    date.substr(0, 4) +
                    date.substr(5, 2) +
                    date.substr(8, 2) +
                    date.substr(11, 2) +
                    date.substr(14, 2) +
                    date.substr(17, 2),
            });
            setType(typeToggle[0]);
            OpenSnack([listArr.length + " 건을 스캔 했습니다."]);
            audioRef.current.PlaySearch();
            setLoading(false);
        }
    };

    // Grid 항목 삭제 함수
    const GridDeleteLogic = (_selectedList) => {
        // setLoading(true);
        console.log(_selectedList);
        if (_selectedList.length < 1) {
            setType(typeToggle[1]);
            OpenSnack(["삭제할 항목이 없습니다."]);
            audioRef.current.PlayError();
            setLoading(false);
            return false;
        } else if (listArr.length == _selectedList.length) {
            setListArr([]);
            setType(typeToggle[3]);
            OpenSnack(["전체 삭제되었습니다."]);
            audioRef.current.PlayComplet();
            setLoading(false);
            return true;
        } else {
            for (let i = 0; i < _selectedList.length; i++) {
                // let value = listArr.splice(_selectedList[i], 1);
                subArray.push({
                    barcode: listArr[_selectedList[i]].asBarcode,
                });
            }
            for (let i = 0; i < subArray.length; i++) {
                for (let j = 0; j < listArr.length; j++) {
                    if (listArr[j].asBarcode == subArray[i].barcode) {
                        let value = listArr.splice(j, 1);
                    }
                }
            }
            setSubArray([]);
            setType(typeToggle[3]);
            OpenSnack(["삭제되었습니다."]);
            audioRef.current.PlayComplet();
            setLoading(false);
            return true;
        }
    };

    // 저장 로직
    const SaveLogicClick = (selected) => {
        if (selected.length < 1) {
            setType(typeToggle[1]);
            OpenSnack(["저장할 바코드가 없습니다."]);
            audioRef.current.PlayError();
        } else {
            setSelectedData(selected);
            ConfirmDialogOpen();
        }
    };

    const SaveLogicStart = async () => {
        console.log(selectedData);
        setLoading(true);
        let successCount = 0;
        let failed;
        for (let i = 0; i < selectedData.length; i++) {
            if (failed) {
                break;
            }
            await axios
                .get(
                    Global.useUrl +
                        Global.detailUrl._Commons.A700._GtBarcodeInsertT,
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                JSON.parse(localStorage.getItem("LoginInfo"))
                                    .token,
                        },
                        params: {
                            StandDt: listArr[selectedData[i]].asStandDt,
                            LocNo: listArr[selectedData[i]].asLocNo,
                            BarcodeNo: listArr[selectedData[i]].asBarcode,
                            DataCnt: selectedData.length,
                            ScanTime: listArr[selectedData[i]].asScanTm,
                            UserId: JSON.parse(
                                localStorage.getItem("LoginInfo")
                            ).userId,
                        },
                    }
                )
                .then((Response) => {
                    let resData = Response.data;
                    let dataCount = Response.data.length;

                    if (dataCount > 0) {
                        console.log(resData);
                        if (resData[0].rsCode == "S") {
                            successCount += 1;
                        } else if (resData[0].rsCode == "O") {
                            setType(typeToggle[2]);
                            OpenSnack([
                                resData[0].rsMsg + ": 중복발생[삭제 후 저장]",
                            ]);
                            failed = true;
                            return false;
                        } else {
                            setType(typeToggle[2]);
                            OpenSnack([resData[0].rsMsg]);
                            return false;
                        }
                    }
                })
                .catch((Error) => {
                    setLoading(false);
                    if (Error.response.status == "401") {
                        setAlertTokenDialog(true);
                    } else {
                        setType(typeToggle[2]);
                        OpenSnack(["Error : ", Error]);
                        console.log(Error);
                    }
                    return false;
                });
        }
        if (failed) {
            audioRef.current.PlayError();
        }
        if (successCount > 0) {
            setType(typeToggle[0]);
            OpenSnack([successCount + " 건 바코드 처리 완료!"]);
            setListArr([]);
            audioRef.current.PlayProccessing();
            childRef.current.ButtonClear();
        }
        setLoading(false);
    };

    return (
        <div style={{ overflowX: "hidden" }}>
            {loading && <Loading />}
            <A700Screen
                oraDateArray={oraDateArray}
                listArr={listArr}
                setListArr={setListArr}
                date={date}
                setType={setType}
                OpenSnack={OpenSnack}
                SelectLogic={SelectLogic}
                SaveLogic={SaveLogicClick}
                GridDeleteLogic={GridDeleteLogic}
                ref={childRef}
            />
            <SnackBar
                open={snackToggle}
                onClose={CloseSnack}
                time={3500}
                type={type}
                article={snackArticle}
            />
            <ConfirmDialog
                name="처리"
                article={selectedData.length + " 건 입고 처리하시겠습니까?"}
                buttonName="처리"
                open={confirmDialogToggle}
                onClose={ConfirmDialogClose}
                buttonCancel={() => {
                    ConfirmDialogClose();
                    setLoading(false);
                }}
                buttonLogic={() => {
                    SaveLogicStart();
                    ConfirmDialogClose();
                    setLoading(false);
                }}
            />
            <AudioPlay ref={audioRef} />
        </div>
    );
};

export default A700;
