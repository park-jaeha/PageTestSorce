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
import BindingSelect from "../Components/Select_Binding";
import BasicInput from "./../Components/Input_Basic";
import BasicList from "../Components/List_NoIcon";
import BasicButton from "../Components/Button_Basic";

const A1030 = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        ComboSelected(barcode, toolName) {
            setText(barcode);
            setToolName(toolName);
        },
        StateClear() {
            setText("");
            setToolName("");
        },
        BarcodeSet(barcode) {
            setText(barcode);
        },
    }));
    const [text, setText] = React.useState(""); // 바코드 입력 String
    const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
    const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
    const [cboInspProc, setCboInspProc] = React.useState(""); // 콤보박스 InspProc
    const [cboInspProcList, setCboInspProcList] = React.useState([
        { asCodeId: "UF", asCodeName: "UF" },
        { asCodeId: "DB", asCodeName: "DB" },
    ]);
    const [equip, setEquip] = React.useState(""); // 콤보박스 Equip
    const [equipList, setEquipList] = React.useState([]);
    const [toolName, setToolName] = React.useState("");
    const [listArr, setListArr] = React.useState([]);
    const inputRef = React.useRef(); // 바코드창 포커싱 ref

    React.useEffect(() => {
        // console.log("Change : " + cboInspProc);
        if (props.equipListUF.length > 0 && props.equipListDB.length > 0) {
            if (cboInspProc == "UF") {
                setEquipList(props.equipListUF);
            } else {
                setEquipList(props.equipListDB);
            }
        }
    }, [cboInspProc]);

    React.useEffect(() => {
        let sInspProc = cboInspProc == "UF" ? "K3" : "K4";
        if (equip != null && equip != "") {
            props.InputEquipSelect(sInspProc, equip);
        }
    }, [equip]);

    React.useEffect(() => {
        if (props.listArr.length > 0) {
            setListArr(props.listArr);
        } else {
            setListArr([]);
        }
    }, [props.listArr]);

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
            props.SelectLogic(text, cboInspProc);
            // setText("");
        }
    };

    // 콤보박스 Select
    const SelectInspProc = (e) => {
        setEquipList([]);
        setEquip("");
        setText("");
        setToolName("");
        props.setListArr([]);
        setCboInspProc(e.target.value);
    };

    const SelectedEquip = (e) => {
        setEquip(e.target.value);
        // inputRef.current.focus();
    };

    // List Primary Settig Func
    const ChangePrimary = (idx) => {
        // let returnData = listArr[idx];
        // return "LOT ID : " + returnData;
    };

    // List Secondary Settig Func
    const ChangeSecondary = (idx) => {
        let returnData1 = listArr[idx].asInfoValue;
        let returnData2 = listArr[idx].asRemarks;

        return "인치 : " + returnData1 + " | 비고 : " + returnData2;
    };

    // 탈착 후 공정, 설비, 리스트 초기화
    const ListClear = () => {
        setEquipList([]);
        setEquip("");
        setText("");
        setToolName("");
        setCboInspProc("");
        props.setListArr([]);
    }

    return (
        <div className="A100" style={{ height: "90vh" }}>
            <Container
                maxWidth="xl"
                className="A100Container"
                style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                }}
            >
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                }}
                            >
                                <div className="A100TextArea">
                                    <div className="A160SelectedLocation">
                                        <BindingSelect
                                            minWidth={130}
                                            name="공정 선택"
                                            value={cboInspProc}
                                            label="공정 선택"
                                            SelectChange={SelectInspProc}
                                            array={cboInspProcList}
                                            marginRight="5px"
                                        />
                                    </div>
                                    <div className="A160SelectedLocation">
                                        <BindingSelect
                                            minWidth={130}
                                            name="설비"
                                            value={equip}
                                            label="설비"
                                            SelectChange={SelectedEquip}
                                            array={equipList}
                                            marginRight="5px"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div className="PressingBarcordArea">
                                    <BasicInput
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
                                <div className="A100TextArea">
                                    <div style={{ width: "100%" }}>
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="툴명"
                                            variant="standard"
                                            value={toolName}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <BasicList
                                    array={listArr}
                                    ListPress={(index) => {
                                        // props.DelConfirmDialogOpen(index);
                                        inputRef.current.focus();
                                    }}
                                    height="30vh"
                                    primary={ChangePrimary}
                                    secondary={ChangeSecondary}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent>
                                <div className="A100Buttons">
                                    <BasicButton
                                        disabled={props.buttonInputState}
                                        name="투입"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            props.ButtonEquipInput(text, equip);
                                            inputRef.current.focus();
                                        }}
                                        width="30%"
                                    />
                                    <BasicButton
                                        name="탈착"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            props.ButtonEquipOutput(
                                                text,
                                                equip
                                            );
                                            ListClear();
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
        </div>
    );
});

export default A1030;
