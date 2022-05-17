/** 압출투입구 투입(신규화면 A1200) */

import * as React from "react";
import axios from "axios";
/** Component Import */
import A1200Screen from "../../Views/VulInsGips/A1200";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import AudioPlayer from "../../Views/Components/AudioPlay";
import Loading from "./../../Views/Components/Loading_Basic";

const A1200 = () => {
    const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
    const audioRef = React.useRef();

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
        <div style={{ overflowX: "hidden" }}>
            {loading && <Loading />}
            <A1200Screen />
            <AudioPlayer ref={audioRef} />
            <SnackBar
                open={snackToggle}
                onClose={CloseSnack}
                time={3500}
                type={snackType}
                article={snackArticle}
            />
        </div>
    );
};

export default A1200;
