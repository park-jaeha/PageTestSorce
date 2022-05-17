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
import BasicButton from "../Components/Button_Basic";

const A600 = (props) => {
    return (
        <div className="A100" style={{ marginTop: "10px" }}>
            <Container
                maxWidth="xl"
                className="A100Container"
                style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    paddingTop: "10px",
                }}
            >
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent
                                style={{
                                    minWidth: 290,
                                    padding: "5px",
                                    paddingTop: "5px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            autoComplete="off"
                                            id="standard-basic"
                                            label="운반구 NO"
                                            variant="standard"
                                            value={props.cartNo}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                props.setCartNo(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            autoComplete="off"
                                            id="standard-basic"
                                            label="LOT NO"
                                            variant="standard"
                                            value={props.lotId}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                props.setLotId(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            autoComplete="off"
                                            id="standard-basic"
                                            label="품목코드"
                                            variant="standard"
                                            value={props.itemCode}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                props.setItemCode(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            autoComplete="off"
                                            id="standard-basic"
                                            label="적재량"
                                            variant="standard"
                                            value={props.qty}
                                            type="number"
                                            inputProps={{
                                                inputMode: "decimal",
                                            }}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                props.setQty(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div style={{ width: "90%" }}>
                                        <TextField
                                            autoComplete="off"
                                            id="standard-basic"
                                            label="생산설비"
                                            variant="standard"
                                            value={props.equip}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                props.setEquip(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "90%",
                                            paddingBottom: "15px",
                                        }}
                                    >
                                        <TextField
                                            autoComplete="off"
                                            id="standard-basic"
                                            label="생산일시"
                                            variant="standard"
                                            value={props.mkDt}
                                            color="secondary"
                                            sx={{ width: "100%" }}
                                            onChange={(e) =>
                                                props.setMkDt(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "10px" }}>
                                <div className="VulInsGipButtons">
                                    {/* <BasicButton
                                        disabled={props.buttonInputState}
                                        name="운반구 스캔"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            props.onHandleAction({
                                                scan: "scanning",
                                                write: null,
                                            });
                                        }}
                                        width="40%"
                                    /> */}
                                    <BasicButton
                                        name="운반구 변경"
                                        fontSize="16pt"
                                        height="10vh"
                                        buttonPress={() => {
                                            props.onWrite(props.cartNo);
                                        }}
                                        width="100%"
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

export default A600;
