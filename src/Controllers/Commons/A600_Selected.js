import * as React from "react";
/** Components Import */
import { ActionsContext } from "../../Contexts/NfcContext";
import A600_Read from "./A600_Read";
import A600_Writ from "./A600_Writ";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Switch,
    TextField,
} from "@mui/material";
import BasicButton from "./../../Views/Components/Button_Basic";
import SnackBar from "../../Views/Components/MessageArea_Snack";

function A600_Selected() {
    const [actions, setActions] = React.useState(null);
    const [cartNo, setCartNo] = React.useState(""); // 운반구 No.
    const { scan, write } = actions || {};
    const actionsValue = { actions, setActions };

    const onHandleAction = (actions) => {
        setActions({ ...actions });
    };

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

    return (
        <div className="A100" style={{}}>
            <Container
                maxWidth="xl"
                className="A100Container"
                style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    // paddingTop: "10px",
                }}
            >
                <ActionsContext.Provider value={actionsValue}>
                    {!scan && !write && (
                        <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                height: "90vh",
                            }}
                        >
                            <Grid item xs={12} md={10} lg={12}>
                                <Card>
                                    <CardContent
                                        style={{
                                            padding: "10px",
                                            minWidth: "300px",
                                        }}
                                    >
                                        <div className="VulInsGipButtons">
                                            <BasicButton
                                                // disabled={props.buttonInputState}
                                                name="운반구 스캔"
                                                fontSize="18pt"
                                                height="10vh"
                                                buttonPress={() => {
                                                    onHandleAction({
                                                        scan: "scanning",
                                                        write: null,
                                                    });
                                                }}
                                                width="100%"
                                            />
                                            {/* <BasicButton
                                        name="운반구 변경"
                                        fontSize="16pt"
                                        buttonPress={() => {
                                            onHandleAction({
                                                scan: null,
                                                write: "writing",
                                            });
                                        }}
                                        width="40%"
                                    /> */}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                </ActionsContext.Provider>
            </Container>
            <ActionsContext.Provider value={actionsValue}>
                {scan && (
                    <A600_Read
                        onHandleAction={onHandleAction}
                        cartNo={cartNo}
                        setCartNo={setCartNo}
                    />
                )}
                {write && (
                    <A600_Writ
                        onHandleAction={onHandleAction}
                        cartNo={cartNo}
                        OpenSnack={OpenSnack}
                    />
                )}
            </ActionsContext.Provider>
            <SnackBar
                open={snackToggle}
                onClose={CloseSnack}
                time={3500}
                type={snackType}
                article={snackArticle}
            />
        </div>
    );
}

export default A600_Selected;
