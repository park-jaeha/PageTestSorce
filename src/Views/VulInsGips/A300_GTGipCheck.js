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
import CheckBoxList from "../Components/List_Checkbox";
import DataGrid from "../Components/DataGrid_Basic";
import TableCell from "@mui/material/TableCell";
import AlertDialog from "../Components/Dialog_Alert";
import AudioPlayer from "../Components/AudioPlay";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const A300_GTGipCheck = React.forwardRef((props, ref) => {
	const audioRef = React.useRef();
	const [text, setText] = React.useState(""); // 바코드 입력 String
	const [inputMode, setInputMode] = React.useState("none"); // Keyboard on/off 상태 지정
	const [switchChecked, setSwitchChecked] = React.useState(false); // 키보드 전환 state
	const inputRef = React.useRef(); // 바코드창 포커싱 ref
	const [gt, setGt] = React.useState("");
	const [gtDesc, setGtDesc] = React.useState("");
	const [gtMoveTime, setGtMoveTime] = React.useState("");
	const [listArr, setListArr] = React.useState([]);
	const [checkedlistArr, setCheckedListArr] = React.useState([]); // Check된 항목을 담는 List
	const [alertName, setAlertName] = React.useState("");
	const [alertArticle, setAlertArticle] = React.useState("");
	const [alertToggle, setAlertToggle] = React.useState(false);
	const [selectedCount, setSelectedCount] = React.useState(null);
	const GridRef = React.useRef(); // Grid ref
	const gridTitles = [
		{
			id: "no",
			label: "No.",
			width: 20,
			align: "left",
		},
		{
			id: "asEqId",
			label: "EQ ID",
			width: 60,
			align: "left",
		},
		{
			id: "asEqName",
			label: "EQ NAME",
			width: 80,
			align: "left",
		},
	];

	const SettingTableCells = (_items, _index) => {
		const labelId = `enhanced-table-checkbox-${_index}`;

		return (
			<>
				<TableCell
					component="th"
					id={labelId}
					scope="row"
					style={{
						width: 20,
						height: props.tableCellHeight,
						fontSize: props.tableCellFontSize,
					}}
					align="left"
				>
					{_index + 1}
				</TableCell>
				<TableCell align="left">{_items.asEqId}</TableCell>
				<TableCell align="left">{_items.asEqName}</TableCell>
			</>
		);
	};

	React.useEffect(() => {
		setGt(props.gipItemId);
		setGtDesc(props.gipItemName);
		setGtMoveTime(props.gipEventTime);
		setListArr(props.gipEquipList);
	});

	React.useImperativeHandle(ref, () => ({
		AddCheckBoxList(_idx) {
			if (GridRef.current.SendSelected().length > 0) {
				OpenAlert("경고", "이미 선택한 항목이있습니다.");
				return false;
			} else {
				for (
					let i = 0;
					i < GridRef.current.SendSelected().length;
					i++
				) {
					if (_idx == GridRef.current.SendSelected()[i]) {
						OpenAlert("체크", "이미 선택한 항목입니다.");
						return false;
					}
				}
			}

			GridRef.current.SendSelected().push(_idx);
			return true;
		},
		ClearAll() {
			setCheckedListArr([]);
			setText("");
			GridRef.current.ClearAll();
		},
	}));

	const OpenAlert = (_name, _article) => {
		setAlertName(_name);
		setAlertArticle(_article);
		setAlertToggle(true);
	};

	const CloseAlert = () => {
		setAlertToggle(false);
	};

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
			props.GtGipCheckScanLogic(text);
			// console.log("Checked List : " + JSON.stringify(checkedlistArr));
			// setText("");
		}
	};

	// List Primary Settig Func
	const ChangePrimary = (idx) => {
		let returnData = idx + 1;
		return "No. " + returnData;
	};

	// List Secondary Settig Func
	const ChangeSecondary = (idx) => {
		let returnData1 = listArr[idx].asEqId;
		var returnData2 = listArr[idx].asEqName;
		return "EQ ID : " + returnData1 + " | EQ NAME : " + returnData2;
	};

	// Check Box에 체크된 항목을 담는 Func
	const GetCheckedList = (_checkList) => {
		setCheckedListArr(_checkList);
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
							GIP 확인
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
				<div className="CheckPoint" style={{ marginTop: "10px" }}>
					<Card>
						<CardContent style={{ padding: "5px" }}>
							<div className="PressingBarcordArea">
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
							<CardContent style={{ padding: "5px" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "10vh",
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
												disabled
												id="standard-basic"
												label="G/T"
												variant="standard"
												value={gt}
												color="secondary"
												sx={{ width: "90%" }}
											/>
										</div>
										<div style={{ width: "80%" }}>
											<TextField
												disabled
												id="standard-basic"
												label="G/T Desc"
												variant="standard"
												value={gtDesc}
												color="secondary"
												sx={{ width: "100%" }}
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
										height: "10vh",
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
											label="통과시간"
											variant="standard"
											value={gtMoveTime}
											color="secondary"
											sx={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardContent style={{ padding: "5px" }}>
							{/* <CheckBoxList
                                array={listArr}
                                ListPress={(index) => {
                                    props.DelConfirmDialogOpen(index);
                                    inputRef.current.focus();
                                }}
                                Selected={GetCheckedList}
                                height="35vh"
                                primary={ChangePrimary}
                                secondary={ChangeSecondary}
                            /> */}
							<DataGrid
								name="설비 목록"
								titles={gridTitles}
								rows={listArr}
								SettingTableCells={SettingTableCells}
								gridHeight="24vh"
								setSelectedCount={setSelectedCount}
								DeleteLogic={props.GtGipCheckGridDeleteLogic}
								ref={GridRef}
								onClick={() => {
									return true;
								}}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardContent>
							<div
								className="VulInsGipButtons"
								style={{
									marginTop: "10px",
								}}
							>
								<BasicButton
									name="GIP 확인"
									fontSize="17pt"
									buttonPress={() => {
										if (
											GridRef.current.SendSelected()
												.length < 1
										) {
											props.OpenSnack(
												[
													"바코드를 스캔하거나",
													"리스트를 체크하세요.",
												],
												"warning"
											);
											audioRef.current.PlayInputError();
										} else {
											props.GipCheckLogic(
												listArr[
													GridRef.current.SendSelected()[0]
												].asEqId
											);
										}
										inputRef.current.focus();
									}}
									width="90%"
									height={50}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
				<AudioPlayer ref={audioRef} />
			</Dialog>
			<AlertDialog
				open={alertToggle}
				onClose={CloseAlert}
				width="12.6"
				name={alertName}
				article={alertArticle}
				buttonName="확인"
			/>
		</div>
	);
});

export default A300_GTGipCheck;
