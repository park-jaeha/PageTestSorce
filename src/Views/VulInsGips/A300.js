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
/** CSS Import */
import "../../CSS/VulInsGips/VulInsGip.css";

const A300 = (props) => {
    return (
        <div
            className="VulInsGip"
            style={{ height: "90vh", marginTop: "10px" }}
        >
            <Container
                maxWidth="xl"
                className="A300Container"
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
            >
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} md={10} lg={12}>
                        <Card>
                            <CardContent style={{ padding: "5px" }}>
                                <div className="VulInsGipButtons">
                                    <BasicButton
                                        name="GIP M/C G/T 확인"
                                        fontSize="17pt"
                                        buttonPress={() => {
                                            props.OpenGipCheckDialog();
                                        }}
                                        width={270}
                                        height={70}
                                    />
                                </div>
                                <div className="VulInsGipButtons">
                                    <BasicButton
                                        name="G/T 대기열 투입"
                                        fontSize="17pt"
                                        buttonPress={() => {
                                            props.OpenGtInkDialog();
                                        }}
                                        width={270}
                                        height={70}
                                    />
                                </div>
                                <div className="VulInsGipButtons">
                                    <BasicButton
                                        name="G/T 대기열 취출"
                                        fontSize="17pt"
                                        buttonPress={() => {
                                            props.OpenGtOutDialog();
                                        }}
                                        width={270}
                                        height={70}
                                    />
                                </div>
                                <div className="VulInsGipButtons">
                                    <BasicButton
                                        name="G/T 대기열 조회"
                                        fontSize="17pt"
                                        buttonPress={() => {
                                            props.OpenGtWaitDialog();
                                        }}
                                        width={270}
                                        height={70}
                                    />
                                </div>
                                <div className="VulInsGipButtons">
                                    <BasicButton
                                        name="G/T 검사"
                                        fontSize="17pt"
                                        buttonPress={() => {
                                            props.OpenGtInspDialog();
                                        }}
                                        width={270}
                                        height={70}
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

export default A300;
