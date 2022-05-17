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
import BasicButton from "../Components/Button_Basic";
import BasicInput from "./../Components/Input_Basic";
import BindingSelect from "../Components/Select_Binding";
import AudioPlayer from "../Components/AudioPlay";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const A300_GTInsp = React.forwardRef((props, ref) => {
	const audioRef = React.useRef();
	const [text, setText] = React.useState(""); // 바코드 입력 String
	const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
	const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
	const inputRef = React.useRef(); // 바코드창 포커싱 ref
	const [selectResult, setSelectResult] = React.useState(""); // 조회 결과 담는 State
	const [badCode, setBadCode] = React.useState(""); // 불량코드 담는 State
	const [badCodeSub, setBadCodeSub] = React.useState(""); // 불량코드sub 담는 State
	const [hCode, setHCode] = React.useState(""); // 반제품코드 담는 State
	const [hCodeSub, setHCodeSub] = React.useState(""); // 반제품코드sub 담는 State
	const [badGrade, setBadGrade] = React.useState(""); // 불량정도 담는 State
	const [badGradeList, setBadGradeList] = React.useState([]); // 불량정도 Combo 다는 List
	const [remark, setRemark] = React.useState(""); // 비고 담는 State

	React.useEffect(() => {
		setBadGradeList(props.badGradeList);
		setSelectResult(props.gtInspbarcodeResult);
	});

	React.useEffect(() => {
		setBadCode(props.gtInspBadId);
		setBadCodeSub(props.gtInspBadIdSub);
		setHCode(props.gtInspHCode);
		setHCodeSub(props.gtInspHCodeSub);
	}, [
		props.gtInspBadId,
		props.gtInspBadIdSub,
		props.gtInspHCode,
		props.gtInspHCodeSub,
	]);

	React.useImperativeHandle(ref, () => ({
		ClearAll() {
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
	const onKeyPress = (e, idx) => {
		switch (idx) {
			case 0:
				if (e.key == "Enter") {
					props.GtInspScanLogic(text);
					setText("");
				}

				break;
			case 1:
				if (e.key == "Enter") {
					props.GtInspBadIdScanLogic(badCode, badCodeSub);
				}

				break;
			case 2:
				if (e.key == "Enter") {
					props.GtInspHCodeScanLogic(hCode, hCodeSub);
				}

				break;
		}
	};

	const SelectedbadGrade = (e) => {
		setBadGrade(e.target.value);
		props.setBadGrade(e.target.value);
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
							G/T 검사
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
				<div className="CheckPoint">
					<Card>
						<CardContent>
							<div className="PressingBarcordArea">
								<BasicInput
									value={text}
									onChange={(e) => setText(e.target.value)}
									placeholder="바코드를 스캔하세요."
									onKeyPress={(e) => {
										onKeyPress(e, 0);
									}}
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
										label="바코드 조회 결과"
										variant="standard"
										value={selectResult}
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
									<div style={{ width: "80%" }}>
										<TextField
											// disabled
											autoComplete="off"
											id="standard-basic"
											label="불량코드"
											variant="standard"
											value={badCode}
											color="secondary"
											sx={{ width: "90%" }}
											onChange={(e) => {
												setBadCode(e.target.value);
												// setBadCodeSub("");
											}}
											onKeyPress={(e) => {
												onKeyPress(e, 1);
											}}
											onFocus={(event) => {
												event.target.select();
											}}
											inputProps={{
												inputMode: "decimal",
											}}
										/>
									</div>
									<div style={{ width: "80%" }}>
										<TextField
											disabled
											id="standard-basic"
											label="불량 유형"
											variant="standard"
											value={badCodeSub}
											color="secondary"
											sx={{ width: "100%" }}
											onChange={(e) => {
												setBadCodeSub(e.target.value);
												// setBadCode("");
											}}
											onKeyPress={(e) => {
												onKeyPress(e, 1);
											}}
										/>
									</div>
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
									<div style={{ width: "80%" }}>
										<TextField
											// disabled
											autoComplete="off"
											id="standard-basic"
											label="반제품코드"
											variant="standard"
											value={hCode}
											color="secondary"
											sx={{ width: "90%" }}
											onChange={(e) => {
												setHCode(e.target.value);
												// setHCodeSub("");
											}}
											onKeyPress={(e) => {
												onKeyPress(e, 2);
											}}
											onFocus={(event) => {
												event.target.select();
											}}
											inputProps={{
												inputMode: "decimal",
											}}
										/>
									</div>
									<div style={{ width: "80%" }}>
										<TextField
											disabled
											id="standard-basic"
											label="반제품 이름"
											variant="standard"
											value={hCodeSub}
											color="secondary"
											sx={{ width: "100%" }}
											onChange={(e) => {
												setHCodeSub(e.target.value);
												// setHCode("");
											}}
											onKeyPress={(e) => {
												onKeyPress(e, 2);
											}}
										/>
									</div>
								</div>
							</div>
						</CardContent>
						<CardContent>
							<div className="A160SelectedLocation">
								<BindingSelect
									minWidth="90%"
									name="불량정도"
									value={badGrade}
									label="불량정도"
									SelectChange={SelectedbadGrade}
									array={badGradeList}
									marginRight="5px"
								/>
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
										// disabled
										autoComplete="off"
										id="standard-basic"
										label="비  고"
										variant="standard"
										value={remark}
										color="secondary"
										sx={{ width: "100%" }}
										onChange={(e) =>
											setRemark(e.target.value)
										}
									/>
								</div>
							</div>
						</CardContent>
						<CardContent style={{ padding: "5px" }}>
							<p
								className="SwitchName"
								style={{
									textAlign: "center",
									verticalAlign: "center",
									color: "#e31f1c",
									fontSize: "0.912em",
									fontWeight: "bold",
								}}
							>
								불량등록 시 빈칸을 채워주세요
							</p>
						</CardContent>
					</Card>
				</div>
				<div className="CheckPointFooter">
					<Card>
						<CardContent>
							<div className="VulInsGipButtons">
								<BasicButton
									name="G/T 검사"
									fontSize="17pt"
									buttonPress={() => {
										if (
											selectResult == "" ||
											selectResult == null ||
											selectResult == undefined
										) {
											props.OpenSnack(
												["바코드를 스캔하세요.!"],
												"warning"
											);
											audioRef.current.PlayInputError();
										} else {
											props.GtInspLogicValidation();
											inputRef.current.focus();
										}
									}}
									width="90%"
									height={80}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
				<AudioPlayer ref={audioRef} />
			</Dialog>
		</div>
	);
});

export default A300_GTInsp;
