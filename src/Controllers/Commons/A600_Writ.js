import * as React from "react";
/** Components Import */
import A600Screen from "../../Views/Commons/A600";
import SnackBar from "../../Views/Components/MessageArea_Snack";
import Loading from "../../Views/Components/Loading_Basic";

const A600_Write = (props) => {
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

    React.useEffect(() => {
        setCartNo(props.cartNo);
        setLotId(props.lotId);
        setItemCode(props.itemCode);
        setQty(props.qty);
        setEquip(props.equip);
        setMkDt(props.mkDt);
    }, [props.cartNo]);

    const onWrite = async (message) => {
        try {
            const ndef = new window.NDEFReader();

            // await ndef.scan();
            await ndef.write({
                records: [{ recordType: "text", data: message }],
            });
            // OpenSnack(["저장했습니다."], "success");
            props.onHandleAction({
                scan: null,
                write: null,
            });
            props.OpenSnack(["저장했습니다."], "success");
        } catch (error) {
            OpenSnack(["다시 시도해주세요."], "error");
            console.log(error);
        }
    };

    return (
        <div style={{ overflowX: "hidden" }}>
            {loading && <Loading />}
            <A600Screen
                cartNo={cartNo}
                lotId={lotId}
                itemCode={itemCode}
                qty={qty}
                equip={equip}
                mkDt={mkDt}
                setCartNo={setCartNo}
                setLotId={setLotId}
                setItemCode={setItemCode}
                setQty={setQty}
                setEquip={setEquip}
                setMkDt={setMkDt}
                onWrite={onWrite}
            />
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

export default A600_Write;
