import * as React from "react";
import axios from "axios";
/** Components Import */
import A600Screen from "../../Views/Commons/A600";
import { ActionsContext } from "../../Contexts/NfcContext";
import Scanner from "../../Views/Components/Scanner";
import SnackBar from "../../Views/Components/MessageArea_Snack";
import Loading from "../../Views/Components/Loading_Basic";

const Global = require("../../Global");

const A600 = (props) => {
    const { actions, setActions } = React.useContext(ActionsContext);
    const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
    const [cartNo, setCartNo] = React.useState(""); // 운반구 No.
    const [lotId, setLotId] = React.useState(""); // LOT ID
    const [itemCode, setItemCode] = React.useState(""); // 품목 코드
    const [qty, setQty] = React.useState(""); // 적재량
    const [equip, setEquip] = React.useState(""); // 생산설비
    const [mkDt, setMkDt] = React.useState(""); // 생성일시

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

    const NFCScan = React.useCallback(async () => {
        if ("NDEFReader" in window) {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();

                ndef.onreadingerror = () => {
                    OpenSnack(
                        ["읽기에 실패했습니다.", "다시 한번 시도하세요."],
                        "error"
                    );
                };

                ndef.onreading = (event) => {
                    onReading(event);
                    setActions({
                        scan: "scanned",
                        write: null,
                    });
                    props.onHandleAction({
                        scan: null,
                        write: "writing",
                    });
                };
            } catch (error) {
                OpenSnack(
                    ["읽기에 실패했습니다.", "다시 한번 시도하세요."],
                    "error"
                );
            }
        }
    }, [setActions]);

    React.useEffect(() => {
        NFCScan();
    }, []);

    const onReading = ({ message, serialNumber }) => {
        for (const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    setCartNo(textDecoder.decode(record.data));
                    props.setCartNo(textDecoder.decode(record.data));
                    break;
                case "url":
                    // TODO: Read URL record with record data.
                    break;
                default:
                // TODO: Handle other records with record data.
            }
        }
    };

    const onWrite = async (message) => {
        try {
            const ndef = new window.NDEFReader();

            // await ndef.scan();
            await ndef.write({
                records: [{ recordType: "text", data: message }],
            });
            OpenSnack(["저장했습니다."], "success");
        } catch (error) {
            OpenSnack(["다시 시도해주세요."], "error");
            console.log(error);
        }
    };

    return (
        <div style={{ overflowX: "hidden" }}>
            {loading && <Loading />}
            {actions.scan === "scanned" ? (
                // <A600Screen
                //     cartNo={cartNo}
                //     lotId={lotId}
                //     itemCode={itemCode}
                //     qty={qty}
                //     equip={equip}
                //     mkDt={mkDt}
                //     setCartNo={setCartNo}
                //     setLotId={setLotId}
                //     setItemCode={setItemCode}
                //     setQty={setQty}
                //     setEquip={setEquip}
                //     setMkDt={setMkDt}
                //     onWrite={onWrite}
                // />
                <></>
            ) : (
                <Scanner status={actions.scan} />
            )}
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

export default A600;
