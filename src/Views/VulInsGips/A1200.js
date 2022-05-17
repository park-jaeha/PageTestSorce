import * as React from "react";
/** Component Import */
import {
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
} from "@mui/material";
import DataGrid from "../Components/DataGrid_Once";
import GroupButton from "../Components/Button_Group";
import BasicButton from "../Components/Button_Basic";

const A1200 = (props) => {
    const [inputInfo, setInputInfo] = React.useState("");
    const [inputDetailInfo, setInputDetailInfo] = React.useState("");
    const [listArr, setListArr] = React.useState([]); // List Array
    const [selectedIndex, setSelectedIndex] = React.useState(0); // 리스트에서 선택된 인덱스
    const [buttonGroupColor, setButtonGroupColor] = React.useState([
        "#7f1085",
        "#fff",
    ]);
    const [buttonGroupBgc, setButtonGroupBgc] = React.useState([
        "#fff",
        "#7f1085",
    ]);

    const gridTitles = [
        {
            field: "field1",
            headerName: "LOT ID",
            width: 130,
            align: "left",
        },
        {
            field: "field2",
            headerName: "규격정보",
            width: 100,
            headerAlign: "center",
            align: "center",
            // editable: true,
        },
        {
            field: "field3",
            headerName: "고무명",
            width: 130,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "field4",
            headerName: "생산 일자",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
    ];

    //list select function
    const SelectedFunc = (idx) => {
        console.log(listArr.findIndex((items) => items.field1 == idx));
        console.log(idx);
        setSelectedIndex(listArr.findIndex((items) => items.field1 == idx));
    };

    const CheckPointClicked = (idx) => {
        switch (idx) {
            case 0:
                setCheckPointed1(1);
                setCheckPointed2(0);
                setCheckPointed3(0);
                setCheckPointed4(0);
                setCheckPointed5(0);
                break;
            case 1:
                setCheckPointed1(0);
                setCheckPointed2(1);
                setCheckPointed3(0);
                setCheckPointed4(0);
                setCheckPointed5(0);
                break;
            case 2:
                setCheckPointed1(0);
                setCheckPointed2(0);
                setCheckPointed3(1);
                setCheckPointed4(0);
                setCheckPointed5(0);
                break;
            case 3:
                setCheckPointed1(0);
                setCheckPointed2(0);
                setCheckPointed3(0);
                setCheckPointed4(1);
                setCheckPointed5(0);
                break;
            case 4:
                setCheckPointed1(0);
                setCheckPointed2(0);
                setCheckPointed3(0);
                setCheckPointed4(0);
                setCheckPointed5(1);
                break;
            default:
                setCheckPointed1(0);
                setCheckPointed2(0);
                setCheckPointed3(0);
                setCheckPointed4(0);
                setCheckPointed5(0);
                break;
        }
    };

    const [checkPointed1, setCheckPointed1] = React.useState(0);
    const [checkPointed2, setCheckPointed2] = React.useState(0);
    const [checkPointed3, setCheckPointed3] = React.useState(0);
    const [checkPointed4, setCheckPointed4] = React.useState(0);
    const [checkPointed5, setCheckPointed5] = React.useState(0);
    const checkPoint = [
        <Button
            key={0}
            style={{
                color: buttonGroupColor[checkPointed1],
                backgroundColor: buttonGroupBgc[checkPointed1],
                width: "106px",
            }}
            onClick={() => {
                CheckPointClicked(0);
            }}
        >
            오규격
        </Button>,
        <Button
            key={1}
            style={{
                color: buttonGroupColor[checkPointed2],
                backgroundColor: buttonGroupBgc[checkPointed2],
            }}
            onClick={() => {
                CheckPointClicked(1);
            }}
        >
            유효기간
        </Button>,
        <Button
            key={2}
            style={{
                color: buttonGroupColor[checkPointed3],
                backgroundColor: buttonGroupBgc[checkPointed3],
            }}
            onClick={() => {
                CheckPointClicked(2);
            }}
        >
            재고상태
        </Button>,
    ];

    const checkPoint2 = [
        <Button
            key={0}
            style={{
                color: buttonGroupColor[checkPointed4],
                backgroundColor: buttonGroupBgc[checkPointed4],
            }}
            onClick={() => {
                CheckPointClicked(3);
            }}
        >
            선입선출
        </Button>,
        <Button
            key={1}
            style={{
                color: buttonGroupColor[checkPointed5],
                backgroundColor: buttonGroupBgc[checkPointed5],
                width: "105px",
            }}
            onClick={() => {
                CheckPointClicked(4);
            }}
        >
            AGING
        </Button>,
    ];

    return (
        <div className="A100" style={{ marginTop: "5px" }}>
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
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ minWidth: 280 }}>
                                        <TextField
                                            id="standard-basic"
                                            label="투입구 정보"
                                            variant="standard"
                                            value={inputInfo}
                                            onChange={(e) =>
                                                setInputInfo(e.target.value)
                                            }
                                            color="secondary"
                                            sx={{
                                                width: "100%",
                                                paddingBottom: "5px",
                                            }}
                                            // onClick={() => {}}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="투입구 대상 규격 정보"
                                            variant="standard"
                                            value={inputDetailInfo}
                                            onChange={(e) =>
                                                setInputDetailInfo(
                                                    e.target.value
                                                )
                                            }
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            // onClick={() => {}}
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
                                    getRowId={(row) => row.field1}
                                    onClick={SelectedFunc}
                                    height="40vh"
                                />
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
                                    }}
                                >
                                    <GroupButton
                                        buttons={checkPoint}
                                        size="large"
                                        marginTop="0px"
                                        marginBottom="0px"
                                        marginLeft="0px"
                                        marginRight="0px"
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <GroupButton
                                        buttons={checkPoint2}
                                        size="large"
                                        // marginTop="0px"
                                        // marginRight="53px"
                                        marginRight="0px"
                                        marginBottom="0px"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div className="A100Buttons">
                                    <BasicButton
                                        name="투입"
                                        fontSize="1.08em"
                                        buttonPress={() => {
                                            console.log("투입 !!");
                                        }}
                                        width="90%"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default A1200;
