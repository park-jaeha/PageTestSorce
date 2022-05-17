import * as React from "react";
import axios from "axios";
/** Components Import */
import A300Screen from "../../Views/VulInsGips/A300";
import Loading from "./../../Views/Components/Loading_Basic";
import A300_GTGipCheck from "../../Views/VulInsGips/A300_GTGipCheck";
import A300_GTIn from "../../Views/VulInsGips/A300_GTIn";
import A300_GTOut from "../../Views/VulInsGips/A300_GTOut";
import A300_GTWait from "../../Views/VulInsGips/A300_GTWait";
import A300_GTInsp from "../../Views/VulInsGips/A300_GTInsp";
import ConfirmDialog from "../../Views/Components/Dialog_Confirm";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import AlertDialog from "../../Views/Components/Dialog_Alert";
import authService from "../../Services/auth.service";
import AudioPlayer from "../../Views/Components/AudioPlay";

const Global = require("./../../Global");

const A300 = () => {
	const audioRef = React.useRef();
	const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
	const [barcode, setBarcode] = React.useState(""); // 바코드 저장 State
	const [gipCheckToggle, setGipCheckToggle] = React.useState(false); // A300_GTGipCHeck Open Toggle
	const [gtInToggle, setGtInToggle] = React.useState(false); // A300_GTIn Open Toggle
	const [gtOutToggle, setGtOutToggle] = React.useState(false); // A300_GTOut Open Toggle
	const [gtWaitToggle, setGtWaitToggle] = React.useState(false); // A300_GTWait Open Toggle
	const [gtInspToggle, setGtInspToggle] = React.useState(false); // A300_GTInsp Open Toggle
	const [alertTokenDialog, setAlertTokenDialog] = React.useState(false); // 토큰 유효성 검사
	/** A300_GTGipCHeck */
	const [gipItemId, setGipItemId] = React.useState(""); // A300_GTGipCheck gt 담는 State
	const [gipItemName, setGipItemName] = React.useState(""); // A300_GTGipCheck gt DESC 담는 State
	const [gipEventTime, setGipEventTime] = React.useState(""); // A300_GTGipCheck 통과시간 담는 State
	const [gipEquipList, setGipEquipList] = React.useState([]); // A300_GTGipCheck List Array
	const gipCheckRef = React.useRef(); // A300_GTGipCheck의 forwardRef를 담을 Ref
	/** A300_GTIn */
	const [gtInScanList, setGtInScanList] = React.useState([]); // A300_GTIn Scan 결과를 담는 List Array
	const [gtInLineBarcode, setGtInLineBarcode] = React.useState(""); // A300_GTIn Line Barcode 담는 State
	const [gtInItemBarcode, setGtInItemBarcode] = React.useState(""); // A300_GTIn G/T Item Barcode 담는 State
	const [gtInBarcode, setGtInBarcode] = React.useState(""); // A300_GTIn Barcode 담는 State
	const [gtInItemCode, setGtInItemCode] = React.useState(""); // A300_GTIn G/T Item Code 담는 State
	const [gtInItemName, setGtInItemName] = React.useState(""); // A300_GTIn G/T Item Name 담는 State
	const [gtInLineCode, setGtInLineCode] = React.useState(""); // A300_GTIn G/T Line Code 담는 State
	const [gtInLineName, setGtInLineName] = React.useState(""); // A300_GTIn G/T Line Name 담는 State
	const [gtInEquipCode, setGtInEquipCode] = React.useState(""); // A300_GTIn 설비코드 담는 State
	const [gtInEquipName, setGtInEquipName] = React.useState(""); // A300_GTIn 설비이름 담는 State
	const [gtInEquipLocationCode, setGtInEquipLocationCode] =
		React.useState(""); // A300_GTIn 투입위치 Code 담는 State
	const [gtInEquipLocation, setGtInEquipLocation] = React.useState(""); // A300_GTIn 투입위치 담는 State
	const [gtInConfirmToggle, setGtInConfirmToggle] = React.useState(false); // A300_GTIn 처리 Confirm Toggle
	const gtInRef = React.useRef();
	const [gtInConfirmArticle, setGtInCOnfirmArticle] = React.useState(null); // A300_GTIn 투입 Confirm 내용 담는 State
	/** A300_GTOut */
	const [gtOutstatusIdx, setGtOutStatusIdx] = React.useState(null); // A300_GTOut Status(1번줄) Radio Check State
	const [gtOutBarcode, setGtOutBarcode] = React.useState(""); // A300_GTOut Barcode State
	const [gtOutCode, setGtOutCode] = React.useState(""); // A300_GTOut GT Code State
	const [gtOutName, setGtOutName] = React.useState(""); // A300_GTOut GT Name State
	const [gtOutEquipCode, setGtOutEquipCode] = React.useState(""); // A300_GTOut GT 설비 Code State
	const [gtOutEquipName, setGtOutEquipName] = React.useState(""); // A300_GTOut GT 설비 Name State
	const [gtOutLrFlag, setGtOutLrFlag] = React.useState(""); // A300_GTOut GT 투입정보 Code State
	const [gtOutBadId, setGtOutBadId] = React.useState(null); // A300_GTOut Bad ID(6~7번줄) Radio Check State
	const [gtOutConfirmToggle, setGtOutConfirmToggle] = React.useState(false); // A300_GTOut Logic Confirm Toggle
	const [gtOutConfirmName, setGtOutConfirmName] = React.useState(""); // A300_GTOut Logic Confirm Name
	const [gtOutConfirmArticle, setGtOutConfirmArticle] = React.useState(null); // A300_GTOut Logic Confirm Article
	const gtOutRef = React.useRef();
	const [gtOutLogicFlag, setGtOutLogicFlag] = React.useState(""); // A_300_GTOut Logic에서 사용할 Flag 변수
	const [gtOutLogicBadId, setGtOutLogicBadId] = React.useState(""); // A_300_GTOut Logic에서 사용할 BadId 변수
	/** A300_GTWait */
	const [gtWaitListIdx, setGtWaitListIdx] = React.useState(0); // A300_GTWait List Index State
	const [gtWaitLineCode, setGtWaitLineCode] = React.useState(""); // A300_GTWait Line Code State
	const [gtWaitLineName, setGtWaitLineName] = React.useState(""); // A300_GTWait Line Name State
	const [gtWaitEquipCode, setGtWaitEquipCode] = React.useState(""); // A300_GTWait Equip Code State
	const [gtWaitEquipName, setGtWaitEquipName] = React.useState(""); // A300_GTWait Equip Name State
	const [gtWaitLList, setGtWaitLList] = React.useState([]); // A300_GTWait 촤측대기열
	const [gtWaitRList, setGtWaitRList] = React.useState([]); // A300_GTWait 우측대기열
	const gtWaitRef = React.useRef();
	/** A300_GTInsp */
	const [badGrade, setBadGrade] = React.useState(""); // 불량정도 담는 State
	const [badGradeList, setBadGradeList] = React.useState([]); // 불량정도 담는 List
	const [gtInspbarcodeResult, setGtInspBarcodeResult] = React.useState(""); // A300_GTInsp 바코드 결과 담는 State
	const [gtInspBadId, setGtInspBadId] = React.useState(""); // A300_GTInsp 불량 코드 담는 State
	const [gtInspBadIdSub, setGtInspBadIdSub] = React.useState(""); // A300_GTInsp 불량 코드 Sub 담는 State
	const [gtInspHCode, setGtInspHCode] = React.useState(""); // A300_GTInsp 반제품 코드 담는 State
	const [gtInspHCodeSub, setGtInspHCodeSub] = React.useState(""); // A300_GTInsp 반제품 코드 Sub 담는 State
	const [gtInspRemark, setGtInspRemark] = React.useState(""); // A300_GTInsp 비고 담는 State
	// let gtInspScanParams;
	const [gtInspScanParams, setGtInspScanParams] = React.useState(null);
	const [gtInspConfirmToggle, setGtInspConfirmToggle] = React.useState(false);
	const [gtInspConfirmName, setGtInspConfirmName] = React.useState("");
	const [gtInspCOnfirmArticle, setGtInspConfirmArticle] = React.useState("");
	const [gtInspLogicIdx, setGtInspLogicIdx] = React.useState(null);
	const gtInspRef = React.useRef();

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

	React.useEffect(async () => {
		setLoading(true);

		if (
			(await axios
				.get(
					Global.useUrl +
						Global.detailUrl._VulInsGips.A300._CommonCodeSelect,
					{
						headers: {
							Authorization:
								"Bearer " +
								JSON.parse(localStorage.getItem("LoginInfo"))
									.token,
						},
						params: {
							PlantId: Global._common._DefaultParams._PlantId,
							SysCode: "QA",
							KindCode: "10",
							CodeId: "",
						},
					}
				)
				.then((Response) => {
					let resList = Response.data;
					let listCount = Response.data.length;
					// console.log("불량정도 Combo : " + JSON.stringify(resList));

					if (listCount > 0) {
						if (resList[0].rsCode == "S") {
							setBadGradeList(resList);
							return true;
						} else if (resList[0].rsCode == "E") {
							OpenSnack([resList[0].rsMsg], "error");
							setBadGradeList([]);
							return false;
						}
					} else {
						OpenSnack(
							[
								"불량정도 조회에 실패했습니다.",
								"다시 시도해주세요.!",
							],
							"error"
						);
						return false;
					}
				})
				.catch((Error) => {
					setLoading(false);
					if (Error.response.status == "401") {
						setAlertTokenDialog(true);
					} else {
						OpenSnack(["Error : ", Error], "error");
						console.log(Error);
					}
					return false;
				})) == true &&
			(await axios
				.get(
					Global.useUrl +
						Global.detailUrl._VulInsGips.A300._EquipGipSelect,
					{
						headers: {
							Authorization:
								"Bearer " +
								JSON.parse(localStorage.getItem("LoginInfo"))
									.token,
						},
						params: {
							PlantId: Global._common._DefaultParams._PlantId,
						},
					}
				)
				.then((Response) => {
					let resList = Response.data;
					let listCount = Response.data.length;
					// console.log("PDA - GIP 설비 조회 : " + JSON.stringify(resList));

					if (listCount > 1) {
						if (resList[0].rsCode == "S") {
							setGipEquipList(resList);
							return true;
						} else {
							OpenSnack([resList[0].rsMsg], "error");
							setGipEquipList([]);
							return false;
						}
					} else {
						OpenSnack(
							[
								"GIP 설비 조회에 실패했습니다.",
								"다시 시도해주세요.!",
							],
							"error"
						);
						return false;
					}
				})
				.catch((Error) => {
					setLoading(false);
					if (Error.response.status == "401") {
						setAlertTokenDialog(true);
					} else {
						OpenSnack(["Error : ", Error], "error");
						console.log(Error);
					}
					return false;
				})) == true
		) {
			OpenSnack(["메뉴를 선택해 주세요.!"], "info");
			audioRef.current.PlayConnect();
			setLoading(false);
			return true;
		} else {
			OpenSnack(
				["에러가 발생했습니다.", "새로고침 해주세요.!"],
				"warning"
			);
			audioRef.current.PlayError();
			setLoading(false);
			return false;
		}
	}, []);

	// 토큰 유효성 검사 팝업
	const AlertDialogClose = () => {
		setAlertTokenDialog(false);
		window.location.replace("/");
		authService.logout();
	};

	const OpenGipCheckDialog = () => {
		setGipCheckToggle(true);
	};

	const CloseGipCheckDialog = () => {
		GipCheckClearAll();
		setGipCheckToggle(false);
	};

	const OpenGtInDialog = () => {
		setGtInToggle(true);
	};

	const CloseGtInDialog = () => {
		GtInClearAll();
		setGtInToggle(false);
	};

	const OpenGtOutDialog = () => {
		setGtOutToggle(true);
	};

	const CloseGtOutDialog = () => {
		GtOutClearAll();
		setGtOutToggle(false);
	};

	const OpenGtWaitDialog = () => {
		setGtWaitToggle(true);
	};

	const CloseGtWaitDialog = () => {
		GtWaitClearAll();
		setGtWaitToggle(false);
	};

	const OpenGtInspDialog = () => {
		setGtInspToggle(true);
	};

	const CloseGtInspDialog = () => {
		GtInspClearAll();
		setGtInspToggle(false);
	};

	const OpenGtInConfirmDialog = (_article) => {
		setGtInCOnfirmArticle(
			_article.map((items, index) => <li key={index}>{items}</li>)
		);
		setGtInConfirmToggle(true);
	};

	const CloseGtInConfirmDialog = () => {
		setGtInConfirmToggle(false);
	};

	const OpenGtOutConfirmDialog = (_name, _article) => {
		setGtOutConfirmName(_name);
		setGtOutConfirmArticle(
			_article.map((items, index) => <li key={index}>{items}</li>)
		);
		setGtOutConfirmToggle(true);
	};

	const CloseGtOutConfirmDialog = () => {
		setGtOutConfirmToggle(false);
	};

	const OpenGtInspConfirmDialog = (_name, _article, _logicIdx) => {
		setGtInspConfirmName(_name);
		setGtInspConfirmArticle(
			_article.map((items, index) => <li key={index}>{items}</li>)
		);
		setGtInspLogicIdx(_logicIdx);
		setGtInspConfirmToggle(true);
	};

	const CloseGtInspConfirmDialog = () => {
		setGtInspConfirmToggle(false);
	};

	const GipCheckClearAll = () => {
		setBarcode("");
		setGipItemId("");
		setGipItemName("");
		setGipEventTime("");
		gipCheckRef.current.ClearAll();
	};

	const GtInClearAll = () => {
		setGtInBarcode("");
		setGtInItemCode("");
		setGtInItemName("");
		setGtInLineCode("");
		setGtInLineName("");
		setGtInEquipCode("");
		setGtInEquipName("");
		setGtInEquipLocationCode("");
		setGtInEquipLocation("");
		gtInRef.current.ClearAll();
	};

	const GtOutClearAll = () => {
		setGtOutStatusIdx(null);
		setGtOutCode("");
		setGtOutName("");
		setGtOutEquipCode("");
		setGtOutEquipName("");
		setGtOutLrFlag("");
		setGtOutBadId(null);
		gtOutRef.current.ClearAll();
		setGtOutLogicFlag("");
		setGtOutLogicBadId("");
		setGtOutBarcode("");
	};

	const GtWaitClearAll = () => {
		setGtWaitLineCode("");
		setGtWaitLineName("");
		setGtWaitEquipCode("");
		setGtWaitEquipName("");
		setGtWaitLList([]);
		setGtWaitRList([]);
		gtWaitRef.current.ClearAll();
	};

	const GtInspClearAll = () => {
		setBadGrade("");
		setGtInspBarcodeResult("");
		setGtInspBadId("");
		setGtInspBadIdSub("");
		setGtInspHCode("");
		setGtInspHCodeSub("");
		setGtInspRemark("");
		gtInspRef.current.ClearAll();
	};

	const GtGipCheckScanLogic = async (_barcode) => {
		setLoading(true);
		setBarcode(_barcode);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._GipCheckPdaSelect,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						Barcode: _barcode,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				// console.log("GtGipCheckScanLogic : " + JSON.stringify(resList));

				if (listCount > 0) {
					if (resList[0].rsCode == "S") {
						for (let i = 0; i < gipEquipList.length; i++) {
							if (resList[0].asEqId == gipEquipList[i].asEqId) {
								if (
									gipCheckRef.current.AddCheckBoxList(i) ==
									true
								) {
									setGipItemId(resList[0].asItemId);
									setGipItemName(resList[0].asItemName);
									setGipEventTime(resList[0].asEventTime);
									audioRef.current.PlayComplet();
									break;
								} else {
									break;
								}
							}
						}
						audioRef.current.PlaySearch();
						setLoading(false);
						return true;
					} else {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				} else {
					OpenSnack(["조회된 정보가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	// Grid 항목 삭제 함수
	const GtGipCheckGridDeleteLogic = () => {
		OpenSnack(["설비 목록은 지울 수 없습니다."], "warning");
		return false;
	};

	const GipCheckLogic = async (_EqId) => {
		setLoading(true);

		if (gipItemId == null || gipItemId == undefined || gipItemId == "") {
			OpenSnack(["바코드를 스캔해주세요.!"], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return false;
		}

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._GtGipCheckInsert,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						Barcode: barcode,
						ItemId: gipItemId,
						EqId: _EqId,
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;

				if (listCount > 0) {
					if (resList[0].rsCode == "E") {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayError();
						setLoading(false);
						return false;
					} else {
						OpenSnack(["저장 완료!"], "success");
						audioRef.current.PlayComplet();
						GipCheckClearAll();
						setLoading(false);
						return true;
					}
				} else {
					OpenSnack(
						["저장에 실패했습니다.", "다시 시도해주세요.!"],
						"error"
					);
					audioRef.current.PlayError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtInScanLogic = async (_barcode) => {
		setLoading(true);
		setBarcode(_barcode);

		if (_barcode.length == 6) {
			await axios
				.get(
					Global.useUrl +
						Global.detailUrl._VulInsGips.A300
							._CureLineBarcodeSelect,
					{
						headers: {
							Authorization:
								"Bearer " +
								JSON.parse(localStorage.getItem("LoginInfo"))
									.token,
						},
						params: {
							PlantId: Global._common._DefaultParams._PlantId,
							EqId: _barcode.substr(0, 5),
						},
					}
				)
				.then((Response) => {
					let resList = Response.data;
					let listCount = Response.data.length;
					console.log("GtInScanLogic : " + JSON.stringify(resList));

					if (listCount > 0) {
						if (resList[0].rsCode == "S") {
							// setGtInBarcode(_barcode + " " + gtInBarcode);
							setGtInLineBarcode(_barcode);
							// setGtInBarcode(_barcode);
							setGtInEquipCode(resList[0].asEqId);
							setGtInEquipName(
								"[" +
									resList[0].asEqId +
									"] " +
									resList[0].asEqName
							);
							setGtInLineCode(resList[0].asProcId);
							setGtInLineName(
								"[" +
									resList[0].asProcId +
									"] " +
									resList[0].asCodeNames
							);

							if (_barcode.substr(5, 1) == "L") {
								setGtInEquipLocationCode("L");
								setGtInEquipLocation("[L] 좌측");
							} else if (_barcode.substr(5, 1) == "R") {
								setGtInEquipLocationCode("R");
								setGtInEquipLocation("[R] 우측");
							}

							OpenSnack(
								["설비바코드를 조회 했습니다."],
								"success"
							);

							if (
								gtInItemCode.length > 0 &&
								gtInItemName.length > 0
							) {
								OpenGtInConfirmDialog([
									"Barcode : " + gtInItemBarcode,
									"G/T 코드 : " + gtInItemCode,
									"설비정보 : " + _barcode,
									"투입하시겠습니까?",
								]);
							}
							audioRef.current.PlaySearch();
							setLoading(false);
							return true;
						} else {
							OpenSnack([resList[0].rsMsg], "error");
							setLoading(false);
							return false;
						}
					} else {
						OpenSnack(["조회된 정보가 없습니다."], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				})
				.catch((Error) => {
					setLoading(false);
					if (Error.response.status == "401") {
						setAlertTokenDialog(true);
					} else {
						OpenSnack(["Error : ", Error], "error");
						audioRef.current.PlayError();
						console.log(Error);
					}
					return false;
				});
		} else {
			await axios
				.get(
					Global.useUrl +
						Global.detailUrl._VulInsGips.A300._GaryuWaitInputSelect,
					{
						headers: {
							Authorization:
								"Bearer " +
								JSON.parse(localStorage.getItem("LoginInfo"))
									.token,
						},
						params: {
							PlantId: Global._common._DefaultParams._PlantId,
							Barcode: _barcode,
						},
					}
				)
				.then((Response) => {
					let resList = Response.data;
					let listCount = Response.data.length;
					console.log("GtInScanLogic : " + JSON.stringify(resList));

					if (listCount > 0) {
						if (resList[0].rsCode == "S") {
							// setGtInBarcode(gtInBarcode + _barcode);
							setGtInItemBarcode(_barcode);
							setGtInBarcode(_barcode);
							setGtInItemCode(resList[0].asItemId);
							setGtInItemName(resList[0].asItemName);
							OpenSnack(
								["G/T 바코드를 Scan 했습니다."],
								"success"
							);

							if (
								gtInLineName.length > 0 &&
								gtInEquipName.length > 0 &&
								gtInEquipLocation.length > 0
							) {
								OpenGtInConfirmDialog([
									"Barcode : " + _barcode,
									"G/T 코드 : " + resList[0].asItemId,
									"설비정보 : " + gtInLineBarcode,
									"투입하시겠습니까?",
								]);
							}
							audioRef.current.PlaySearch();
							setLoading(false);
							return true;
						} else {
							OpenSnack([resList[0].rsMsg], "error");
							audioRef.current.PlayInputError();
							setLoading(false);
							return false;
						}
					} else {
						OpenSnack(["조회된 정보가 없습니다."], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				})
				.catch((Error) => {
					setLoading(false);
					if (Error.response.status == "401") {
						setAlertTokenDialog(true);
					} else {
						OpenSnack(["Error : ", Error], "error");
						audioRef.current.PlayError();
						console.log(Error);
					}
					return false;
				});
		}
	};

	const GtInLogicValidation = () => {
		setLoading(true);

		if (gtInItemCode.length < 1) {
			OpenSnack(["G/T 바코드를 스캔하세요."], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return false;
		} else if (gtInLineName.length < 1) {
			OpenSnack(["가류설비 바코드를 스캔하세요!"], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return false;
		} else if (gtInEquipName.length < 1) {
			OpenSnack(["가류설비 바코드를 스캔하세요!"], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return false;
		} else if (gtInEquipLocation.length < 1) {
			OpenSnack(["가류설비 바코드를 스캔하세요!"], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return false;
		} else {
			OpenGtInConfirmDialog([
				"Barcode : " + gtInItemBarcode,
				"G/T 코드 : " + gtInItemCode,
				"설비정보 : " + gtInLineBarcode,
				"투입하시겠습니까?",
			]);
		}
	};

	const GtInLogic = async () => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._GtCureWaitInsert,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						Barcode: gtInItemBarcode,
						CureLine: gtInLineCode,
						EqId: gtInEquipCode,
						LrFlag: gtInEquipLocationCode,
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				console.log("GtInLogic : " + JSON.stringify(resList));

				if (listCount > 0) {
					if (resList[0].rsCode == "E") {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayError();
						setLoading(false);
						return false;
					} else {
						OpenSnack(["대기열에 투입완료 했습니다."], "success");
						audioRef.current.PlayComplet();
						GtInClearAll();
						setLoading(false);
						return true;
					}
				} else {
					OpenSnack(
						["저장에 실패했습니다.", "다시 시도해주세요.!"],
						"error"
					);
					audioRef.current.PlayError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtOutScanLogic = async (_barcode) => {
		setLoading(true);
		setBarcode(_barcode);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._GetSelectGtOutBarcode,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						LotId: _barcode,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				console.log("GtOutScanLogic : " + JSON.stringify(resList));

				if (listCount > 0) {
					if (resList[0].rsCode == "S") {
						setGtOutBarcode(_barcode);
						setGtOutCode(resList[0].asItemId);
						setGtOutName(resList[0].asItemName);
						setGtOutEquipCode(resList[0].asEqId);
						setGtOutEquipName(resList[0].asEqName);
						setGtOutLrFlag(resList[0].asLrFlag);
						GtOutLogicValidation(_barcode, resList[0].asItemId);
						audioRef.current.PlaySearch();
						setLoading(false);
						return true;
					} else {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				} else {
					OpenSnack(["대기열에 없는 바코드 입니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayInputError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtOutLogicValidation = (_barcode, _gtCode) => {
		setLoading(true);

		switch (gtOutstatusIdx) {
			case 0:
				setGtOutLogicFlag("Y");

				switch (gtOutBadId) {
					case 0:
						setGtOutLogicBadId("DR1");
						break;
					case 1:
						setGtOutLogicBadId("DR2");
						break;
					case 2:
						setGtOutLogicBadId("DR4");
						break;
					case 3:
						setGtOutLogicBadId("HJ");
						break;
					case 4:
						setGtOutLogicBadId("FC");
						break;
					case 5:
						setGtOutLogicBadId("ETC");
						break;
					default:
						setGtOutLogicBadId("ETC");
						break;
				}
				break;
			case 1:
				setGtOutLogicFlag("N");
				break;
			case 2:
				setGtOutLogicFlag("I");
				break;
		}

		if (gtOutstatusIdx == 1) {
			OpenGtOutConfirmDialog("검사", [
				"Barcode : " + _barcode,
				"G/T 코드 : " + _gtCode,
				"대기열에서 G/T를 검사하시겠습니까?",
			]);
		} else {
			OpenGtOutConfirmDialog("취출", [
				"Barcode : " + _barcode,
				"G/T 코드 : " + _gtCode,
				"G/T를 대기열에서 취출 하시겠습니까?",
			]);
		}
	};

	const GtOutLogic = async () => {
		await axios
			.get(
				Global.useUrl + Global.detailUrl._VulInsGips.A300._CureWaitOut1,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						Flag: gtOutLogicFlag,
						BarcodeNo: barcode,
						BadId: gtOutLogicBadId,
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				console.log("GtOutLogic : " + JSON.stringify(resList));

				if (listCount > 0) {
					if (resList[0].rsCode == "E") {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayError();
						setLoading(false);
						return false;
					} else {
						if (gtOutstatusIdx == 1) {
							OpenSnack(["G/T 검사완료 했습니다."], "success");
							audioRef.current.PlayComplet();
							GtOutClearAll();
							setLoading(false);
							return true;
						} else {
							OpenSnack(
								["대기열에서 취출완료 했습니다."],
								"success"
							);
							audioRef.current.PlayComplet();
							GtOutClearAll();
							setLoading(false);
							return true;
						}
					}
				} else {
					OpenSnack(
						["처리에 실패했습니다.", "다시 시도해주세요.!"],
						"error"
					);
					audioRef.current.PlayError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtWaitScanLogic = async (_barcode) => {
		setLoading(true);
		setBarcode(_barcode);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._CureLineBarcodeSelect,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						EqId: _barcode.substr(0, 5),
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				// console.log("GtWaitScanLogic : " + JSON.stringify(resList));

				if (listCount > 0) {
					if (resList[0].rsCode == "S") {
						setGtWaitLineCode(resList[0].asProcId);
						setGtWaitLineName(
							"[" +
								resList[0].asProcId +
								"] " +
								resList[0].asCodeNames
						);
						setGtWaitEquipCode(resList[0].asEqId);
						setGtWaitEquipName(
							"[" + resList[0].asEqId + "] " + resList[0].asEqName
						);

						if (_barcode.substr(5, 1) == "L") {
							setGtWaitListIdx(0);
						} else if (_barcode.substr(5, 1) == "R") {
							setGtWaitListIdx(1);
						}

						GtWaitScanDataSelect(
							resList[0].asProcId,
							resList[0].asEqId
						);
						audioRef.current.PlaySearch();
					} else {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				} else {
					OpenSnack(["조회된 설비정보가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtWaitScanDataSelect = async (_line, _Equip) => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._CureWaitSelectL,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						Line: _line,
						EqId: _Equip,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				// console.log(
				//     "GtWaitScanDataSelect_L : " + JSON.stringify(resList)
				// );

				if (listCount > 0) {
					if (resList[0].rsCode == "S") {
						setGtWaitLList(resList);
						OpenSnack(["투입대기열 조회 했습니다."], "success");
						audioRef.current.PlayComplet();
						setLoading(false);
						return true;
					} else {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				} else {
					OpenSnack(["조회된 설비정보가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});

		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._CureWaitSelectR,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						Line: _line,
						EqId: _Equip,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				// console.log(
				//     "GtWaitScanDataSelect_R : " + JSON.stringify(resList)
				// );

				if (listCount > 0) {
					if (resList[0].rsCode == "S") {
						setGtWaitRList(resList);
						OpenSnack(["투입대기열 조회 했습니다."], "success");
						audioRef.current.PlaySearch();
						setLoading(false);
						return true;
					} else {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayInputError();
						setLoading(false);
						return false;
					}
				} else {
					OpenSnack(["조회된 설비정보가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtInspBadIdScanLogic = async (_badId, _badIdSub) => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._CommonCodePopSelect,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						SysCodeId: "QA",
						KindCodeId: "11",
						CodeId: _badId,
						CodeName: "",
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				console.log(
					"GtInspBadIdScanLogic : " + JSON.stringify(resList)
				);

				if (listCount == 1) {
					setGtInspBadId(resList[0].asCodeId);
					setGtInspBadIdSub(resList[0].asCodeName);
					OpenSnack(["불량유형이 검색되었습니다."], "success");
					audioRef.current.PlaySearch();
					setLoading(false);
					return true;
				} else {
					OpenSnack(["조회 결과가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setGtInspBadId("");
					setGtInspBadIdSub("");
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtInspHCodeScanLogic = async (_hCode, _hCodeSub) => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._CommonCodePopSelect,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						SysCodeId: "QA",
						KindCodeId: "06",
						CodeId: _hCode,
						CodeName: "",
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				// console.log(
				//     "GtInspBadIdScanLogic : " + JSON.stringify(resList)
				// );

				if (listCount == 1) {
					setGtInspHCode(resList[0].asCodeId);
					setGtInspHCodeSub(resList[0].asCodeName);
					OpenSnack(["반제품이 검색되었습니다."], "success");
					audioRef.current.PlaySearch();
					setLoading(false);
					return true;
				} else {
					OpenSnack(["조회 결과가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setGtInspHCode("");
					setGtInspHCodeSub("");
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtInspScanLogic = async (_barcode) => {
		setLoading(true);
		setBarcode(_barcode);

		if (_barcode.length != 10) {
			OpenSnack(["바코드 정보는 10자리 입니다."], "warning");
			setLoading(false);
			return false;
		}

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._BarcodePartInfoSelect,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						FactId: "",
						ProcFlag: "GTI",
						BarcodeNo: _barcode,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;
				console.log("GtInspScanLogic : " + JSON.stringify(resList));

				if (listCount > 0) {
					setGtInspScanParams({
						sFactID: "",
						sLotId: resList[0].asLotId,
						sInspDate: resList[0].asInspDt
							.substr(0, 10)
							.replace("-", "")
							.toString(),
						sShift: resList[0].asShift,
						sShiftRgb: resList[0].asShiftRgb,
						sTbm_ID: resList[0].asTbmId,
						sItemID: resList[0].asItemId,
						sGtWgt: resList[0].asProdWgt,
						sOD: "",
						sSW: "",
						sSeq: "",
						sPec_wgt: resList[0].asAltQty,
						sChanel: resList[0].asChanel,
						sTolc_m: resList[0].asTrs5,
						sTolc_p: resList[0].asTrs3,
					});

					setGtInspBarcodeResult("성공");
					OpenSnack(["조회 성공!!!"], "success");
					audioRef.current.PlaySearch();
					setLoading(false);
					return true;
				} else {
					// setGtInspBarcodeResult("조회 실패...");
					OpenSnack(["타이어 정보가 없습니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtInspLogicValidation = () => {
		setLoading(true);
		console.log(JSON.stringify(gtInspScanParams));

		if (barcode.length != 10) {
			OpenSnack(["바코드 정보는 10자리 입니다."], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return false;
		} else {
			OpenGtInspConfirmDialog(
				"검사",
				["GT 검사 실적을 등록 하시겠습니까?"],
				0
			);
		}
	};

	const GtInspLogic = async () => {
		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A300._GtCheckEnrollInsert,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						RowState: "I",
						PlantId: Global._common._DefaultParams._PlantId,
						FactId: gtInspScanParams.sFactID,
						BarcodeNo: barcode,
						LotId: gtInspScanParams.sLotId,
						InspSeq: gtInspScanParams.sSeq,
						InspDate: gtInspScanParams.sInspDate,
						Shift: gtInspScanParams.sShift,
						ShiftRgb: gtInspScanParams.sShiftRgb,
						ItemId: gtInspScanParams.sItemID,
						SungEqId: gtInspScanParams.sTbm_ID,
						GtWgt: gtInspScanParams.sGtWgt,
						Insp1: gtInspScanParams.sOD,
						Insp2: gtInspScanParams.sSW,
						Insp3: "",
						Insp4: "",
						BadId: gtInspBadId,
						SubItemId: gtInspHCode,
						BadKind: badGrade,
						Remarks: gtInspRemark,
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
						SpecWgt: gtInspScanParams.sPec_wgt,
						Chanel: gtInspScanParams.sChanel,
						TolcM: gtInspScanParams.sTolc_m,
						TolcP: gtInspScanParams.sTolc_p,
						InspType: "P",
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;

				if (listCount > 0) {
					if (resList[0].rsCode == "E") {
						OpenSnack([resList[0].rsMsg], "error");
						audioRef.current.PlayError();
						setLoading(false);
						return false;
					} else {
						if (gtInspBadId != "") {
							OpenGtInspConfirmDialog(
								"취출",
								["수리 취출 하시겠습니까?"],
								1
							);
						} else {
							OpenSnack(["GT 검사 실적 등록 성공!!!"], "success");
							audioRef.current.PlayComplet();
							setLoading(true);
							return true;
						}
					}
				} else {
					OpenSnack(["GT 검사 실적 등록 실패!!!"], "error");
					audioRef.current.PlayError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	const GtInspRepairLogic = async () => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl + Global.detailUrl._VulInsGips.A300._CureWaitOut1,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						Flag: "Y",
						BarcodeNo: barcode,
						BadId: "ETC",
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
					},
				}
			)
			.then((Response) => {
				let resList = Response.data;
				let listCount = Response.data.length;

				if (listCount > 0) {
					if (resList[0].rsCode == "E") {
						OpenSnack(["수리 취출 실패"], "error");
						audioRef.current.PlayError();
						setLoading(false);
						return false;
					} else {
						OpenSnack(["수리 취출 성공"], "success");
						audioRef.current.PlayComplet();
						setLoading(false);
						return true;
					}
				} else {
					OpenSnack(["수리 취출 실패"], "error");
					audioRef.current.PlayError();
					setLoading(false);
					return false;
				}
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					OpenSnack(["Error : ", Error], "error");
					audioRef.current.PlayError();
					console.log(Error);
				}
				return false;
			});
	};

	return (
		<div style={{ overflowX: "hidden" }}>
			{loading && <Loading />}
			<A300Screen
				OpenGipCheckDialog={OpenGipCheckDialog}
				OpenGtInkDialog={OpenGtInDialog}
				OpenGtOutDialog={OpenGtOutDialog}
				OpenGtWaitDialog={OpenGtWaitDialog}
				OpenGtInspDialog={OpenGtInspDialog}
			/>
			<SnackBar
				open={snackToggle}
				onClose={CloseSnack}
				time={3500}
				type={snackType}
				article={snackArticle}
			/>
			<A300_GTGipCheck
				open={gipCheckToggle}
				onClose={CloseGipCheckDialog}
				gipEquipList={gipEquipList}
				GtGipCheckScanLogic={GtGipCheckScanLogic}
				gipItemId={gipItemId}
				gipItemName={gipItemName}
				gipEventTime={gipEventTime}
				ref={gipCheckRef}
				GipCheckLogic={GipCheckLogic}
				OpenSnack={OpenSnack}
				GtGipCheckGridDeleteLogic={GtGipCheckGridDeleteLogic}
			/>
			<A300_GTIn
				open={gtInToggle}
				onClose={CloseGtInDialog}
				gtInBarcode={gtInBarcode}
				gtInItemCode={gtInItemCode}
				gtInItemName={gtInItemName}
				gtInLine={gtInLineName}
				gtInEquipCode={gtInEquipCode}
				gtInEquipName={gtInEquipName}
				gtInEquipLocation={gtInEquipLocation}
				GtInScanLogic={GtInScanLogic}
				GtInLogicValidation={GtInLogicValidation}
				ref={gtInRef}
			/>
			<A300_GTOut
				open={gtOutToggle}
				onClose={CloseGtOutDialog}
				ref={gtOutRef}
				GtOutScanLogic={GtOutScanLogic}
				gtOutBarcode={gtOutBarcode}
				gtOutCode={gtOutCode}
				gtOutName={gtOutName}
				gtOutEquipName={gtOutEquipName}
				gtOutLrFlag={gtOutLrFlag}
				setGtOutStatusIdx={setGtOutStatusIdx}
				setGtOutBadId={setGtOutBadId}
				GtOutLogicValidation={GtOutLogicValidation}
				OpenSnack={OpenSnack}
			/>
			<A300_GTWait
				open={gtWaitToggle}
				onClose={CloseGtWaitDialog}
				gtWaitListIdx={gtWaitListIdx}
				setGtWaitListIdx={setGtWaitListIdx}
				GtWaitScanLogic={GtWaitScanLogic}
				gtWaitLineName={gtWaitLineName}
				gtWaitEquipName={gtWaitEquipName}
				gtWaitLList={gtWaitLList}
				gtWaitRList={gtWaitRList}
				ref={gtWaitRef}
			/>
			<A300_GTInsp
				open={gtInspToggle}
				onClose={CloseGtInspDialog}
				badGradeList={badGradeList}
				setBadGrade={setBadGrade}
				gtInspbarcodeResult={gtInspbarcodeResult}
				gtInspBadId={gtInspBadId}
				gtInspBadIdSub={gtInspBadIdSub}
				gtInspHCode={gtInspHCode}
				gtInspHCodeSub={gtInspHCodeSub}
				GtInspBadIdScanLogic={GtInspBadIdScanLogic}
				GtInspHCodeScanLogic={GtInspHCodeScanLogic}
				GtInspScanLogic={GtInspScanLogic}
				GtInspLogicValidation={GtInspLogicValidation}
				OpenSnack={OpenSnack}
				ref={gtInspRef}
			/>
			<ConfirmDialog
				name="투입"
				article={gtInConfirmArticle}
				buttonName="확인"
				open={gtInConfirmToggle}
				onClose={CloseGtInConfirmDialog}
				buttonCancel={() => {
					CloseGtInConfirmDialog();
					setLoading(false);
				}}
				buttonLogic={() => {
					GtInLogic();
					CloseGtInConfirmDialog();
					setLoading(false);
				}}
			/>
			<ConfirmDialog
				name={gtOutConfirmName}
				article={gtOutConfirmArticle}
				width="14.8em"
				buttonName="확인"
				open={gtOutConfirmToggle}
				onClose={CloseGtOutConfirmDialog}
				buttonCancel={() => {
					CloseGtOutConfirmDialog();
					setLoading(false);
				}}
				buttonLogic={() => {
					GtOutLogic();
					CloseGtOutConfirmDialog();
					setLoading(false);
				}}
			/>
			<ConfirmDialog
				name={gtInspConfirmName}
				article={gtInspCOnfirmArticle}
				width="14.8em"
				buttonName="확인"
				open={gtInspConfirmToggle}
				onClose={CloseGtInspConfirmDialog}
				buttonCancel={() => {
					CloseGtInspConfirmDialog();
					setLoading(false);
				}}
				buttonLogic={() => {
					switch (gtInspLogicIdx) {
						case 0:
							GtInspLogic();

							break;
						case 1:
							GtInspRepairLogic();

							break;
					}
					CloseGtInspConfirmDialog();
					setLoading(false);
				}}
			/>
			<AlertDialog
				name="알림"
				article="로그인이 만료되었습니다."
				buttonName="확인"
				open={alertTokenDialog}
				onClose={AlertDialogClose}
			/>
			<AudioPlayer ref={audioRef} />
		</div>
	);
};

export default A300;
