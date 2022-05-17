import React, { useContext } from "react";
import "./../../CSS/Components/Scanner.css";
import Spinner from "./../../Images/Shared/spinner.gif";
import { ActionsContext } from "./../../Contexts/NfcContext";

const Scanner = () => {
    const { actions, setActions } = useContext(ActionsContext);
    return (
        <div className="scanner">
            <p
                className="scanner-exit"
                onClick={() => setActions({ ...actions, scan: null })}
            >
                X
            </p>
            <div className="scanner-container">
                <img
                    src={Spinner}
                    alt="spinning log"
                    className="scanner-image"
                />
                <p className="scanner-text">Scanning...</p>
            </div>
        </div>
    );
};

export default Scanner;
