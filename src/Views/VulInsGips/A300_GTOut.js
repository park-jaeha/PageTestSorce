import * as React from "react";
/** Components Import */
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import BasicButton from "../Components/Button_Basic";
import BasicInput from "./../Components/Input_Basic";
import ButtonGroup from "./../Components/Button_Group";
import AlertDialog from "../Components/Dialog_Alert";
import AudioPlayer from "../Components/AudioPlay";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const A300_GTOut = React.forwardRef((props, ref) => {
	const audioRef = React.useRef();
	const [buttonGroupColor, setButtonGroupColor] = React.useState([
		"#7f1085",
		"#fff",
	]);
	const [buttonGroupBgc, setButtonGroupBgc] = React.useState([
		"#fff",
		"#7f1085",
	]);
	const [text, setText] = React.useState(""); // 바코드 입력 String
	const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
	const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
	const inputRef = React.useRef(); // 바코드창 포커싱 ref
	const [buttonName, setButtonName] = React.useState("G/T 취출");
	const [buttonBackColor, setButtonBackColor] = React.useState("#7f1085");
	const [barcode, setBarcode] = React.useState("");
	const [gtCode, setGtCode] = React.useState("");
	const [gtName, setGtName] = React.useState("");
	const [equip, setEquip] = React.useState("");
	const [LrFlag, setLrFlag] = React.useState("");
	const [alertToggle, setAlertToggle] = React.useState(false);
	const [alertName, setAlertName] = React.useState("");
	const [alertArticle, setAlertArticle] = React.useState("");
	let articleArr = [
		"대기열 G/T 검사를",
		<br />,
		"위한 화면입니다.",
		<br />,
		"확인 후",
		<br />,
		"작업 진행하세요.",
	];

	const [stateSelect1, setStateSelect1] = React.useState(0);
	const [stateSelect2, setStateSelect2] = React.useState(0);
	const [stateSelect3, setStateSelect3] = React.useState(0);
	const stateSelect = [
		<Button
			key={0}
			style={{
				color: buttonGroupColor[stateSelect1],
				backgroundColor: buttonGroupBgc[stateSelect1],
			}}
			onClick={() => {
				stateSelectClicked(0);
			}}
		>
			수리취출
		</Button>,
		<Button
			key={1}
			style={{
				color: buttonGroupColor[stateSelect2],
				backgroundColor: buttonGroupBgc[stateSelect2],
			}}
			onClick={() => {
				stateSelectClicked(1);
			}}
		>
			일반취출
		</Button>,
		<Button
			key={2}
			style={{
				color: buttonGroupColor[stateSelect3],
				backgroundColor: buttonGroupBgc[stateSelect3],
			}}
			onClick={() => {
				stateSelectClicked(2);
			}}
		>
			검사
		</Button>,
	];

	const stateSelectClicked = (idx) => {
		props.setGtOutStatusIdx(idx);

		switch (idx) {
			case 0:
				setButtonName("G/T 취출");
				setButtonBackColor("#7f1085");
				setStateSelect1(1);
				setStateSelect2(0);
				setStateSelect3(0);
				setRadioDisabled1(false);
				setRadioDisabled2(false);
				setRadioDisabled3(false);
				setRadioDisabled4(false);
				setRadioDisabled5(false);
				setRadioDisabled6(false);
				radioClicked(5);
				break;
			case 1:
				setButtonName("G/T 취출");
				setButtonBackColor("#7f1085");
				setStateSelect1(0);
				setStateSelect2(1);
				setStateSelect3(0);
				setRadioDisabled1(true);
				setRadioDisabled2(true);
				setRadioDisabled3(true);
				setRadioDisabled4(true);
				setRadioDisabled5(true);
				setRadioDisabled6(true);
				radioClicked();
				break;
			case 2:
				OpenAlertDialog(
					"경고",
					articleArr.map((item, index) => <li key={index}>{item}</li>)
				);
				setButtonName("G/T 검사");
				setButtonBackColor("#e356eb");
				setStateSelect1(0);
				setStateSelect2(0);
				setStateSelect3(1);
				setRadioDisabled1(true);
				setRadioDisabled2(true);
				setRadioDisabled3(true);
				setRadioDisabled4(true);
				setRadioDisabled5(true);
				setRadioDisabled6(true);
				radioClicked();
				break;
			default:
				setButtonName("G/T 취출");
				setButtonBackColor("#7f1085");
				setStateSelect1(0);
				setStateSelect2(0);
				setStateSelect3(0);
				setRadioDisabled1(true);
				setRadioDisabled2(true);
				setRadioDisabled3(true);
				setRadioDisabled4(true);
				setRadioDisabled5(true);
				setRadioDisabled6(true);
				radioClicked();
				break;
		}
	};

	const [radioSelect1, setRadioSelect1] = React.useState(0);
	const [radioSelect2, setRadioSelect2] = React.useState(0);
	const [radioSelect3, setRadioSelect3] = React.useState(0);
	const [radioSelect4, setRadioSelect4] = React.useState(0);
	const [radioSelect5, setRadioSelect5] = React.useState(0);
	const [radioSelect6, setRadioSelect6] = React.useState(0);
	const [radioDisabled1, setRadioDisabled1] = React.useState(false);
	const [radioDisabled2, setRadioDisabled2] = React.useState(false);
	const [radioDisabled3, setRadioDisabled3] = React.useState(false);
	const [radioDisabled4, setRadioDisabled4] = React.useState(false);
	const [radioDisabled5, setRadioDisabled5] = React.useState(false);
	const [radioDisabled6, setRadioDisabled6] = React.useState(false);
	const radioGroup1 = [
		<Button
			key={0}
			disabled={radioDisabled1}
			style={{
				color: buttonGroupColor[radioSelect1],
				backgroundColor: buttonGroupBgc[radioSelect1],
			}}
			onClick={() => {
				radioClicked(0);
			}}
		>
			DR1
		</Button>,
		<Button
			key={1}
			disabled={radioDisabled2}
			style={{
				color: buttonGroupColor[radioSelect2],
				backgroundColor: buttonGroupBgc[radioSelect2],
			}}
			onClick={() => {
				radioClicked(1);
			}}
		>
			DR2
		</Button>,
		<Button
			key={2}
			disabled={radioDisabled3}
			style={{
				color: buttonGroupColor[radioSelect3],
				backgroundColor: buttonGroupBgc[radioSelect3],
			}}
			onClick={() => {
				radioClicked(2);
			}}
		>
			DR4
		</Button>,
	];
	const radioGroup2 = [
		<Button
			key={0}
			disabled={radioDisabled4}
			style={{
				color: buttonGroupColor[radioSelect4],
				backgroundColor: buttonGroupBgc[radioSelect4],
			}}
			onClick={() => {
				radioClicked(3);
			}}
		>
			HJ
		</Button>,
		<Button
			key={1}
			disabled={radioDisabled5}
			style={{
				color: buttonGroupColor[radioSelect5],
				backgroundColor: buttonGroupBgc[radioSelect5],
			}}
			onClick={() => {
				radioClicked(4);
			}}
		>
			FC
		</Button>,
		<Button
			key={2}
			disabled={radioDisabled6}
			style={{
				color: buttonGroupColor[radioSelect6],
				backgroundColor: buttonGroupBgc[radioSelect6],
			}}
			onClick={() => {
				radioClicked(5);
			}}
		>
			기타
		</Button>,
	];

	const radioClicked = (idx) => {
		props.setGtOutBadId(idx);

		switch (idx) {
			case 0:
				setRadioSelect1(1);
				setRadioSelect2(0);
				setRadioSelect3(0);
				setRadioSelect4(0);
				setRadioSelect5(0);
				setRadioSelect6(0);
				break;
			case 1:
				setRadioSelect1(0);
				setRadioSelect2(1);
				setRadioSelect3(0);
				setRadioSelect4(0);
				setRadioSelect5(0);
				setRadioSelect6(0);
				break;
			case 2:
				setRadioSelect1(0);
				setRadioSelect2(0);
				setRadioSelect3(1);
				setRadioSelect4(0);
				setRadioSelect5(0);
				setRadioSelect6(0);
				break;
			case 3:
				setRadioSelect1(0);
				setRadioSelect2(0);
				setRadioSelect3(0);
				setRadioSelect4(1);
				setRadioSelect5(0);
				setRadioSelect6(0);
				break;
			case 4:
				setRadioSelect1(0);
				setRadioSelect2(0);
				setRadioSelect3(0);
				setRadioSelect4(0);
				setRadioSelect5(1);
				setRadioSelect6(0);
				break;
			case 5:
				setRadioSelect1(0);
				setRadioSelect2(0);
				setRadioSelect3(0);
				setRadioSelect4(0);
				setRadioSelect5(0);
				setRadioSelect6(1);
				break;
			default:
				setRadioSelect1(0);
				setRadioSelect2(0);
				setRadioSelect3(0);
				setRadioSelect4(0);
				setRadioSelect5(0);
				setRadioSelect6(0);
				break;
		}
	};

	React.useEffect(() => {
		stateSelectClicked(0);
	}, []);

	React.useEffect(() => {
		setBarcode(props.gtOutBarcode);
		setGtCode(props.gtOutCode);
		setGtName(props.gtOutName);
		setEquip(props.gtOutEquipName);
		setLrFlag(props.gtOutLrFlag);
	});

	React.useImperativeHandle(ref, () => ({
		ClearAll() {
			stateSelectClicked(0);
			setText("");
		},
	}));

	// Keyboard on/off Switch 이벤트
	const ChangeSwitch = () => {
		setSwitchChecked(!switchChecked);
		if (inputMode == "none") {
			setInputMode("text");
		} else {
			setInputMode("none");
		}
		inputRef.current.focus();
		setText("");
	};

	// Enter 입력 이벤트
	const onKeyPress = (e) => {
		if (e.key == "Enter") {
			props.GtOutScanLogic(text);
			setText("");
		}
	};

	const OpenAlertDialog = (_name, _article) => {
		setAlertName(_name);
		setAlertArticle(_article);
		setAlertToggle(true);
	};

	const CloseAlertDialog = () => {
		setAlertToggle(false);
	};

	return (
		<div className="A100">
			<Dialog
				fullScreen
				open={props.open}
				onClose={props.onClose}
				TransitionComponent={Transition}
			>
				<AppBar
					sx={{ position: "relative" }}
					style={{
						backgroundColor: "#7f1085",
					}}
				>
					<Toolbar>
						<Typography
							sx={{ ml: 2, flex: 1 }}
							variant="h6"
							component="div"
						>
							가류 GT 취출
						</Typography>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.onClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<div className="CheckPoint" style={{ marginTop: "5px" }}>
					<Card>
						<CardContent style={{ padding: "5px" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "8vh",
								}}
							>
								<BasicInput
									value={text}
									onChange={(e) => setText(e.target.value)}
									placeholder="바코드를 스캔하세요."
									onKeyPress={onKeyPress}
									changedMode={inputMode}
									inputRef={inputRef}
								/>
								<div
									className="SwitchWrap"
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<p
										className="SwitchName"
										style={{
											color: "#7f1085",
											fontSize: "0.688em",
											fontWeight: "bold",
										}}
									>
										키보드
									</p>
									<Switch
										checked={switchChecked}
										onChange={() => {
											ChangeSwitch();
										}}
										inputProps={{
											"aria-label": "controlled",
										}}
										color="secondary"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
					<div className="CheckPoint">
						<Card>
							<CardContent style={{ padding: "8px" }}>
								<ButtonGroup
									buttons={stateSelect}
									size="large"
									fullWidth={true}
									marginTop="0"
									marginBottom="0"
									marginLeft="0"
									marginRight="0"
								/>
							</CardContent>
						</Card>
					</div>
					<div className="CheckPoint">
						<Card>
							<CardContent style={{ padding: "5px" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "8vh",
									}}
								>
									<div
										style={{
											width: "90%",
											display: "flex",
											justifyContent: "center",
										}}
									>
										<TextField
											disabled
											id="standard-basic"
											label="Barcode"
											variant="standard"
											value={barcode}
											color="secondary"
											sx={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardContent>
							<CardContent style={{ padding: "5px" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "8vh",
									}}
								>
									<div
										style={{
											width: "30%",
											display: "flex",
											justifyContent: "center",
											marginRight: "5px",
										}}
									>
										<TextField
											disabled
											id="standard-basic"
											label="G/T 코드"
											variant="standard"
											value={gtCode}
											color="secondary"
											sx={{ width: "100%" }}
										/>
									</div>
									<div
										style={{
											width: "58%",
											display: "flex",
											justifyContent: "center",
											marginLeft: "5px",
										}}
									>
										<TextField
											disabled
											id="standard-basic"
											label="G/T 명"
											variant="standard"
											value={gtName}
											color="secondary"
											sx={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardContent>
							<CardContent style={{ padding: "5px" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "8vh",
									}}
								>
									<div
										style={{
											width: "90%",
											display: "flex",
											justifyContent: "center",
										}}
									>
										<TextField
											disabled
											id="standard-basic"
											label="설비정보"
											variant="standard"
											value={equip}
											color="secondary"
											sx={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardContent>
							<CardContent style={{ padding: "5px" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "8vh",
									}}
								>
									<div
										style={{
											width: "90%",
											display: "flex",
											justifyContent: "center",
										}}
									>
										<TextField
											disabled
											id="standard-basic"
											label="투입정보"
											variant="standard"
											value={LrFlag}
											color="secondary"
											sx={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="CheckPoint">
						<Card>
							<CardContent style={{ padding: "8px" }}>
								<ButtonGroup
									buttons={radioGroup1}
									size="large"
									fullWidth={true}
									marginTop="0"
									marginLeft="0"
									marginRight="0"
									marginBottom="8px"
								/>
								<ButtonGroup
									buttons={radioGroup2}
									size="large"
									fullWidth={true}
									marginTop="8px"
									marginLeft="0"
									marginRight="0"
									marginBottom="0"
								/>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardContent
							style={{
								display: "flex",
								justifyContent: "center",
								padding: "14px",
							}}
						>
							<BasicButton
								name={buttonName}
								backColor={buttonBackColor}
								fontSize="17pt"
								buttonPress={() => {
									if (
										gtCode == "" ||
										gtCode == null ||
										gtCode == undefined
									) {
										props.OpenSnack(
											[
												"바코드를 확실하게 스캔해주세요.!",
											],
											"warning"
										);
										audioRef.current.PlayInputError();
										return false;
									} else {
										props.GtOutLogicValidation(
											text,
											gtCode
										);
										inputRef.current.focus();
									}
								}}
								width="90%"
								height={50}
							/>
						</CardContent>
					</Card>
				</div>
				<AudioPlayer ref={audioRef} />
			</Dialog>
			<AlertDialog
				name={alertName}
				article={alertArticle}
				buttonName="확인"
				open={alertToggle}
				onClose={CloseAlertDialog}
			/>
		</div>
	);
});

export default A300_GTOut;
