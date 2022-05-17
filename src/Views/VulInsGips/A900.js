import * as React from "react";
/** Components Import */
import {
    Container,
    Grid,
    Card,
    CardContent,
    Switch,
    TextField,
} from "@mui/material";
import BasicInput from "./../Components/Input_Basic";
import BindingSelect from "../Components/Select_Binding";
import DataGrid from "../Components/DataGrid_Basic";
import TableCell from "@mui/material/TableCell";
import BasicButton from "../Components/Button_Basic";
import ConfirmDialog from "../Components/Dialog_Confirm";

const A900 = (props) => {
    const [text, setText] = React.useState(""); // 바코드 입력 String
    const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
    const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
    const [userInfo, setUserInfo] = React.useState([]); // 사용자 정보 배열
    const [reson, setReson] = React.useState("");
    const [resonList, setResonList] = React.useState([]);
    const [listArr, setListArr] = React.useState([]);
    const [moveLabel, setMoveLabel] = React.useState("");
    const [moveType, setMoveType] = React.useState("");
    const [moveTypeName, setMoveTypeName] = React.useState("");
    const [confirmDialogToggle, setConfirmDialogToggle] = React.useState(false); //confirmDialog 상태
    const inputRef = React.useRef(); // 바코드창 포커싱 ref
    const [selectedCount, setSelectedCount] = React.useState(null);
    const GridRef = React.useRef(); // Grid ref
    const gridTitles = [
        {
            id: "Barcode",
            label: "BARCODE NO",
            width: 100,
            align: "left",
        },
        {
            id: "ItemId",
            label: "규격",
            width: 70,
            align: "left",
        },
        {
            id: "ProdType",
            label: "생산유형",
            width: 130,
            align: "left",
        },
        {
            id: "MoveType",
            label: "이동유형",
            width: 90,
            align: "left",
        },
        {
            id: "MoveReson",
            label: "이동사유",
            width: 180,
            align: "left",
        },
        {
            id: "MoveResonCode",
            label: "사유코드",
            width: 90,
            align: "left",
        },
    ];

    const SettingTableCells = (_items, _index) => {
        const labelId = `enhanced-table-checkbox-${_index}`;

        return (
            <>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    style={{
                        width: 100,
                        height: props.tableCellHeight,
                        fontSize: props.tableCellFontSize,
                    }}
                    align="left"
                >
                    {_items.Barcode}
                </TableCell>
                <TableCell align="left">{_items.ItemId}</TableCell>
                <TableCell align="left">{_items.ProdType}</TableCell>
                <TableCell align="left">{_items.MoveType}</TableCell>
                <TableCell align="left">{_items.MoveReson}</TableCell>
                <TableCell align="left">{_items.MoveResonCode}</TableCell>
            </>
        );
    };

    React.useEffect(() => {
        setResonList(props.resonList);
    }, [props.resonList]);

    React.useEffect(() => {
        if (props.userInfo.length > 0) {
            setUserInfo(props.userInfo);
        } else {
            setUserInfo([]);
        }
    }, [props.userInfo]);

    React.useEffect(() => {
        setListArr(props.listArr);
    }, [props.listArr]);

    React.useEffect(() => {
        setMoveType(props.moveType);
    }, [props.moveType]);

    React.useEffect(() => {
        setMoveTypeName(props.moveTypeName);
    }, [props.moveTypeName]);

    // Keyboard on/off Switch 이벤트
    const ChangeSwitch = () => {
        setSwitchChecked(!switchChecked);
        if (inputMode == "none") {
            setInputMode("text");
        } else {
            setInputMode("none");
        }
        inputRef.current.focus();
        setText("");
    };

    // Enter 입력 이벤트, controller의 SelectTbInMCart 연결
    const onKeyPress = (e) => {
        if (e.key == "Enter") {
            props.SelectLogic(text, reson);
            setText("");
        }
    };

    //ConfirmDialog on/off 이벤트
    const ConfirmDialogOpen = () => {
        setConfirmDialogToggle(true);
    };

    const ConfirmDialogClose = () => {
        setConfirmDialogToggle(false);
    };

    //콤보박스 Select
    const SelectedReson = (e) => {
        setReson(e.target.value);
        // inputRef.current.focus();
    };

    // List Primary Settig Func
    const ChangePrimary = (idx) => {
        let returnData = listArr[idx].Barcode;
        return "BARCODE NO : " + returnData;
    };

    // List Secondary Settig Func
    const ChangeSecondary = (idx) => {
        let returnData1 = listArr[idx].ItemId;
        let returnData2 = listArr[idx].ProdType;
        let returnData3 = listArr[idx].MoveType;
        let returnData4 = listArr[idx].MoveReson;
        let returnData5 = listArr[idx].MoveResonCode;
        return (
            "규격 : " +
            returnData1 +
            " | 생산유형 : " +
            returnData2 +
            " | 이동유형 : " +
            returnData3 +
            " | 이동사유 : " +
            returnData4 +
            " | 사유코드 : " +
            returnData5
        );
    };

    return (
        <div className="A100" style={{ height: "90vh" }}>
            <Container
                maxWidth="xl"
                className="A100Container"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
            >
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent
                                style={{ marginTop: "10px", padding: "5px" }}
                            >
                                <div className="PressingBarcordArea">
                                    <BasicInput
                                        disabled={props.userCheck}
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        placeholder="바코드를 스캔하세요."
                                        onKeyPress={onKeyPress}
                                        changedMode={inputMode}
                                        inputRef={inputRef}
                                    />
                                    <div
                                        className="SwitchWrap"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p
                                            className="SwitchName"
                                            style={{
                                                color: "#7f1085",
                                                fontSize: "0.688em",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            키보드
                                        </p>
                                        <Switch
                                            checked={switchChecked}
                                            onChange={() => {
                                                ChangeSwitch();
                                            }}
                                            inputProps={{
                                                "aria-label": "controlled",
                                            }}
                                            color="secondary"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "8vh",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <BindingSelect
                                            disabled={props.resonCheck}
                                            minWidth={300}
                                            name="이동 사유"
                                            value={reson}
                                            label="이동 사유"
                                            SelectChange={SelectedReson}
                                            array={resonList}
                                            marginRight="5px"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardContent style={{ padding: "5px" }}>
                                <div className="A100TextArea">
                                    <div
                                        style={{
                                            width: "90%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="이동 유형"
                                            variant="standard"
                                            value={
                                                // () => {
                                                //     if (moveType.length < 1) {
                                                //         return false;
                                                //     } else {
                                                //         return (
                                                //             moveType +
                                                //             "-" +
                                                //             moveTypeName
                                                //         );
                                                //     }
                                                // }
                                                moveType + "-" + moveTypeName
                                            }
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                setMoveLabel(e.target.value)
                                            }
                                            // onClick={() => {
                                            //     props.SelectDecisionDialogLogic();
                                            //     OpenOutSearchDialog();
                                            // }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <DataGrid
                                    name="스캔 목록"
                                    titles={gridTitles}
                                    rows={listArr}
                                    SettingTableCells={SettingTableCells}
                                    gridHeight="26.5vh"
                                    setSelectedCount={setSelectedCount}
                                    DeleteLogic={props.GridDeleteLogic}
                                    ref={GridRef}
                                    onClick={() => {
                                        return true;
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div className="A100Buttons">
                                    <BasicButton
                                        disabled={props.userCheck}
                                        name="초기화"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            ConfirmDialogOpen();
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                    <BasicButton
                                        disabled={props.userCheck}
                                        name="조회"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            props.SelectLogic(text, reson);
                                            setText("");
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                    <BasicButton
                                        disabled={props.userCheck}
                                        name="저장"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            console.log("저장");
                                            props.ButtonSave();
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <ConfirmDialog
                name="초기화"
                article="초기화 하시겠습니까?"
                buttonName="확인"
                open={confirmDialogToggle}
                onClose={ConfirmDialogClose}
                buttonCancel={() => {
                    ConfirmDialogClose();
                }}
                buttonLogic={() => {
                    props.ButtonClearAll();
                    setText("");
                    setReson("");
                    ConfirmDialogClose();
                }}
            />
        </div>
    );
};

export default A900;
