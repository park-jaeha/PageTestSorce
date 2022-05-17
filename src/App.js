import logo from "./logo.svg";
import * as React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
/** Component Import */
import Routers from "./Views/Routers";
import A1100 from "./Controllers/VulInsGips/A1100";
import BasicButton from "./Views/Components/Button_Basic";
import A600 from "./Controllers/Commons/A600_Selected";

function App() {
    const [camOpen, setCamOpen] = React.useState(false);
    const [nfcOpen, setNfcOpen] = React.useState(false);

    const CamToggle = () => {
        setCamOpen(!camOpen);
        if (nfcOpen == true) {
            setNfcOpen(false);
        }
    };

    const NfcToggle = () => {
        setNfcOpen(!nfcOpen);
        if (camOpen == true) {
            setCamOpen(false);
        }
    };
    return (
        <div className="App">
            {/* <Routers /> */}
            <div style={{ display: "flex", padding: "5px" }}>
                <BasicButton
                    name="카메라테스트"
                    width="11.25em"
                    height="2em"
                    fontSize="1.5em"
                    buttonPress={() => {
                        console.log("카메라");
                        CamToggle();
                    }}
                />
                <div style={{ marginLeft: "5px" }}>
                    <BasicButton
                        name="NFC테스트"
                        width="11.25em"
                        height="2em"
                        fontSize="1.5em"
                        buttonPress={() => {
                            console.log("NFC");
                            NfcToggle();
                        }}
                    />
                </div>
            </div>
            {camOpen && <A1100 />}
            {nfcOpen && <A600 />}
        </div>
    );
}

export default App;
