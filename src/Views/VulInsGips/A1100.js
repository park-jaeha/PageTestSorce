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
import DataGrid from "../Components/DataGrid_Once";
import TableCell from "@mui/material/TableCell";
import BasicButton from "../Components/Button_Basic";
import BasicInput from "./../Components/Input_Basic";
import A1100_DecisionPop from "./A1100_DecisionPop";
import BasicDatePicker from "../Components/DatePicker_Basic";
import A1100_DecResonPop from "./A1100_DecResonPop";
import CICamera from "../Components/Camera/CICamera";

const A1100 = (props) => {
    const [date, setDate] = React.useState(new Date()); // 생산일자 new Date()
    const [part, setPart] = React.useState(""); // 품목명 String
    const [listArr, setListArr] = React.useState([]); // List Array
    const [selectedIndex, setSelectedIndex] = React.useState(0); // 리스트에서 선택된 인덱스
    const [decision, setDecision] = React.useState(""); // 판정 State
    const [decReason, setDecReason] = React.useState(""); // 품목사유 State
    const [decisionDialogOpen, setDecisionDialogOpen] = React.useState(false); // A1100_DecisionPop Toggle State
    const [decisionList, setDecisionList] = React.useState([]); // 판정 팝업 List
    const [decisionSelectList, setDecisionSelectList] = React.useState([]); // 판정 팝업 콤보 List
    const [decReasonList, setDecReasonList] = React.useState([]); // 판정 사유 팝업 list
    const [decResonDialogOpen, setDecResonDialogOpen] = React.useState(false); // A1100_DecisionPop Toggle State
    const [decResonList, setDecResonList] = React.useState([]); // 판정 팝업 List
    const [decResonSelectList, setDecResonSelectList] = React.useState([]); // 판정 팝업 콤보 List

    const gridTitles = [
        {
            field: "asLotId",
            headerName: "LOT ID",
            width: 200,
            align: "left",
        },
    ];

    React.useEffect(() => {
        setListArr(props.listArr);
    }, [props.listArr]);
    // Decision Toggle
    const OpenDecisionDialog = () => {
        setDecisionDialogOpen(true);
    };

    const CloseDecisionDialog = () => {
        setDecisionDialogOpen(false);
    };

    // DecReson Toggle
    const OpenDecResonDialog = () => {
        setDecResonDialogOpen(true);
    };

    const CloseDecResonDialog = () => {
        setDecResonDialogOpen(false);
    };

    //list select function
    const SelectedFunc = (idx) => {
        console.log(listArr.findIndex((items) => items.asLotId == idx));
        console.log(idx);
        setSelectedIndex(listArr.findIndex((items) => items.asLotId == idx));
    };

    const DecisionConfirm = (idx, useYn, code) => {
        let useName = "";

        if (useYn == "Y") {
            useName = "가용";
        } else if (useYn == "N") {
            useName = "불용";
        }
        setDecision(decisionList[idx].asCodeName + " | 가용/불용 : " + useName);
    };

    const DecResonConfirm = (idx, code) => {
        setDecReason(decReasonList[idx].asCodeName);
    };

    return (
        <div className="A100" style={{ marginTop: "10px" }}>
            <Container
                maxWidth="xl"
                className="A100Container"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
            >
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "space-evenly",
                                    }}
                                >
                                    <div style={{ width: "65%" }}>
                                        <BasicDatePicker
                                            disable
                                            width="100%"
                                            name="생산일자"
                                            date={date}
                                            setDate={setDate}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="품목명"
                                            variant="standard"
                                            value={part}
                                            onChange={(e) =>
                                                setPart(e.target.value)
                                            }
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            // onClick={() => {}}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: "25%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <BasicButton
                                            name="조회"
                                            fontSize="1.08em"
                                            buttonPress={() => {
                                                props.SelectFunc(date, part);
                                            }}
                                            height="13vh"
                                            width="100%"
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
                                    titles={gridTitles}
                                    rows={listArr}
                                    getRowId={(row) => row.asLotId}
                                    onClick={SelectedFunc}
                                    height="40vh"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent
                                style={{ minWidth: 280, padding: "5px" }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="판정"
                                            variant="standard"
                                            value={decision}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onClick={() => {
                                                console.log("판정 팝업!!");
                                                OpenDecisionDialog();
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            disabled
                                            id="standard-basic"
                                            label="판정사유"
                                            variant="standard"
                                            value={decReason}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onClick={() => {
                                                console.log("판정 사유 팝업!!");
                                                OpenDecResonDialog();
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div className="A100Buttons">
                                    <BasicButton
                                        name="사진등록"
                                        fontSize="1.08em"
                                        buttonPress={() => {
                                            props.setCameraToggle(
                                                !props.cameraToggle
                                            );
                                        }}
                                        width="40%"
                                    />
                                    <BasicButton
                                        name="최종 등록"
                                        fontSize="1.08em"
                                        buttonPress={() => {
                                            console.log("최종 등록");
                                        }}
                                        width="40%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <A1100_DecisionPop
                open={decisionDialogOpen}
                onClose={CloseDecisionDialog}
                decisionList={decisionList}
                decisionSelectList={decisionSelectList}
                DecisionConfirm={DecisionConfirm}
            />
            <A1100_DecResonPop
                open={decResonDialogOpen}
                onClose={CloseDecResonDialog}
                decReasonList={decReasonList}
                decResonConfirm={DecResonConfirm}
            />
        </div>
    );
};

export default A1100;
