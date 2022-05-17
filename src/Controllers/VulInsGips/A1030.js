import * as React from "react";
import axios from "axios";
/** Components Import */
import A1030Screen from "../../Views/VulInsGips/A1030";
import Loading from "./../../Views/Components/Loading_Basic";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import AlertDialog from "../../Views/Components/Dialog_Alert";
import authService from "../../Services/auth.service";
import AudioPlayer from "../../Views/Components/AudioPlay";

const Global = require("../../Global");

const A1030 = () => {
	const audioRef = React.useRef();
	const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
	const [equipListUF, setEquipListUF] = React.useState([]); // equipListUF
	const [equipListDB, setEquipListDB] = React.useState([]); // equipListDB
	const [listArr, setListArr] = React.useState([]); // 리스트 데이터
	const [toolName, setToolName] = React.useState(""); // 툴명
	const [buttonInputState, setButtonInputState] = React.useState(false); // 투입 버튼 disalbed true/false
	const [alertTokenDialog, setAlertTokenDialog] = React.useState(false); // 토큰 유효성 검사
	const childRef = React.useRef();

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

	// 토큰 유효성 검사 팝업
	const AlertDialogClose = () => {
		setAlertTokenDialog(false);
		window.location.replace("/");
		authService.logout();
	};

	React.useEffect(async () => {
		setLoading(true);

		//설비조회
		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A1030._InspEqSelect1,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
					},
				}
			)
			.then((Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					setEquipListUF(resData);
				} else {
					audioRef.current.PlayError();
					OpenSnack(["데이터가 없습니다."], "error");
				}
			})
			.then(async () => {
				await axios
					.get(
						Global.useUrl +
							Global.detailUrl._VulInsGips.A1030._InspEqSelect2,
						{
							headers: {
								Authorization:
									"Bearer " +
									JSON.parse(
										localStorage.getItem("LoginInfo")
									).token,
							},
							params: {
								PlantId: Global._common._DefaultParams._PlantId,
							},
						}
					)
					.then((Response) => {
						let resData = Response.data;
						let dataCount = Response.data.length;

						if (dataCount > 0) {
							setEquipListDB(resData);
						} else {
							audioRef.current.PlayError();
							OpenSnack(["데이터가 없습니다."], "error");
						}
					});
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					audioRef.current.PlayError();
					OpenSnack(["Error : ", Error], "error");
					console.log(Error);
				}
			});
		setLoading(false);
	}, []);

	// 콤보박스 변경시 조회 이벤트
	const InputEquipSelect = async (sInspProc, equip) => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A1030._InspEqInputSelect1,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						InspProc: sInspProc,
						EqId: equip,
					},
				}
			)
			.then(async (Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					setButtonInputState(true);
					// setToolName(resData[0].asToolName);
					childRef.current.ComboSelected(
						resData[0].asBarcodeId,
						resData[0].asToolName
					);
					audioRef.current.PlaySearch();
					OpenSnack(["기존 투입 툴 존재"], "success");
				} else {
					setButtonInputState(false);
					childRef.current.ComboSelected("", "");
					setListArr([]);
					audioRef.current.PlayError();
					OpenSnack(["툴 바코드를 스캔하세요"], "info");
				}

				await axios
					.get(
						Global.useUrl +
							Global.detailUrl._VulInsGips.A1030
								._InspEqInputSelect2,
						{
							headers: {
								Authorization:
									"Bearer " +
									JSON.parse(
										localStorage.getItem("LoginInfo")
									).token,
							},
							params: {
								PlantId: Global._common._DefaultParams._PlantId,
								InspProc: sInspProc,
								EqId: equip,
							},
						}
					)
					.then((Response) => {
						let resData = Response.data;
						let dataCount = Response.data.length;

						if (dataCount > 0) {
							setListArr(resData);
							audioRef.current.PlayComplet();
							// console.log(resData);
						}
					});
				setLoading(false);
			})
			.catch((Error) => {
				setLoading(false);
				if (Error.response.status == "401") {
					setAlertTokenDialog(true);
				} else {
					audioRef.current.PlayError();
					OpenSnack(["Error : ", Error], "error");
					console.log(Error);
				}
			});
	};

	// 숫자인지 체크
	function isNumeric(num, opt) {
		// 좌우 trim(공백제거)을 해준다.
		num = String(num).replace(/^\s+|\s+$/g, "");

		if (typeof opt == "undefined" || opt == "1") {
			// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
			var regex =
				/^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
		} else if (opt == "2") {
			// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
			var regex =
				/^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
		} else if (opt == "3") {
			// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
			var regex = /^[0-9]+(\.[0-9]+)?$/g;
		} else {
			// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
			var regex = /^[0-9]$/g;
		}

		if (regex.test(num)) {
			num = num.replace(/,/g, "");
			return isNaN(num) ? false : true;
		} else {
			return false;
		}
	}

	//(Enter Logic)
	const SelectLogic = (barcode, inspProc) => {
		if (inspProc == "" || inspProc == null) {
			OpenSnack(["검사 공정을 선택하세요!"], "warning");
			audioRef.current.PlayInputError();
			childRef.current.StateClear();
			return;
		}
		if (barcode == "" || barcode == null) {
			OpenSnack(["바코드를 입력하세요"], "warning");
			audioRef.current.PlayInputError();
			return;
		}

		// let temp = parseInt(barcode);

		if (isNumeric(parseInt(barcode))) {
			if (inspProc == "UF") {
				barcode = "IR3" + barcode.toString().padStart(5, "0");
			} else {
				barcode = "IR35" + barcode.toString().padStart(4, "0");
			}
		}
		childRef.current.BarcodeSet(barcode);
		if (barcode.length > 0) {
			ScanLogic(barcode, inspProc);
		}
	};

	//조회 이벤트
	const ScanLogic = async (barcode, inspProc) => {
		if (inspProc == "" || inspProc == null) {
			OpenSnack(["검사 공정을 선택하세요!"], "warning");
			audioRef.current.PlayInputError();
			childRef.current.StateClear();
			return;
		}

		if (barcode.length < 8) {
			OpenSnack(["잘못된 바코드 입니다."], "warning");
			audioRef.current.PlayInputError();
			return;
		}
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A1030._InspEqBarcodeSelect1,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						BarcodeNo: barcode,
					},
				}
			)
			.then(async (Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					if (
						(inspProc == "UF" ? "K3" : "K4") == resData[0].asProcId
					) {
						childRef.current.ComboSelected(
							barcode,
							resData[0].asToolName
						);
						await axios
							.get(
								Global.useUrl +
									Global.detailUrl._VulInsGips.A1030
										._InspEqBarcodeSelect2,
								{
									headers: {
										Authorization:
											"Bearer " +
											JSON.parse(
												localStorage.getItem(
													"LoginInfo"
												)
											).token,
									},
									params: {
										PlantId:
											Global._common._DefaultParams
												._PlantId,
										BarcodeNo: barcode,
									},
								}
							)
							.then((Response) => {
								let resData = Response.data;
								let dataCount = Response.data.length;

								if (dataCount > 0) {
									setListArr(resData);
									OpenSnack(["조회되었습니다."], "success");
									audioRef.current.PlaySearch();
								}
							});
					} else {
						OpenSnack(
							["해당 공정에 투입", "불가능한 툴 입니다."],
							"error"
						);
						audioRef.current.PlayInputError();
					}
				} else {
					OpenSnack(["코드 정보를 찾을 수 없습니다."], "error");
					audioRef.current.PlayInputError();
					setListArr([]);
				}
				setLoading(false);
				return;
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
				return;
			});
	};

	// 투입버튼 이벤트
	const ButtonEquipInput = async (barcode, equip) => {
		setLoading(true);

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A1030._InspEqToolInput,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						BarcodeNo: barcode,
						EqId: equip,
						WcId: "K",
						ToolSeq: "1",
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
						NmpId: "",
					},
				}
			)
			.then((Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					if (resData[0].rsCode == "S") {
						OpenSnack(["[" + barcode + "] 투입 완료!"], "success");
						audioRef.current.PlayComplet();
						setLoading(false);
					} else {
						OpenSnack(["[" + barcode + "] 투입 실패!"], "error");
						audioRef.current.PlayError();
						setLoading(false);
					}
				}
				setLoading(false);
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

	// 탈착버튼 이벤트
	const ButtonEquipOutput = async (barcode, equip) => {
		setLoading(true);
		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A1030._InspEqToolOutput,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						BarcodeNo: barcode,
						EqId: equip,
						WcId: "K",
						ToolSeq: "1",
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
						NmpId: "",
					},
				}
			)
			.then((Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					if (resData[0].rsCode == "S") {
						OpenSnack(["[" + barcode + "] 탈착 완료!"], "success");
						audioRef.current.PlayComplet();
					} else {
						OpenSnack(["[" + barcode + "] 탈착 실패!"], "error");
						audioRef.current.PlayError();
					}
					setLoading(false);
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
			<A1030Screen
				equipListUF={equipListUF}
				equipListDB={equipListDB}
				buttonInputState={buttonInputState}
				listArr={listArr}
				setListArr={setListArr}
				InputEquipSelect={InputEquipSelect}
				setButtonInputState={setButtonInputState}
				SelectLogic={SelectLogic}
				ButtonEquipInput={ButtonEquipInput}
				ButtonEquipOutput={ButtonEquipOutput}
				ref={childRef}
			/>
			<SnackBar
				open={snackToggle}
				onClose={CloseSnack}
				time={3500}
				type={snackType}
				article={snackArticle}
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

export default A1030;
