import * as React from "react";
import axios from "axios";
/** Components Import */
import A900Screen from "../../Views/VulInsGips/A900";
import Loading from "./../../Views/Components/Loading_Basic";
import ConfirmDialog from "./../../Views/Components/Dialog_Confirm";
import SnackBar from "./../../Views/Components/MessageArea_Snack";
import AlertDialog from "../../Views/Components/Dialog_Alert";
import authService from "../../Services/auth.service";
import AudioPlayer from "../../Views/Components/AudioPlay";

const Global = require("../../Global");

const A900 = () => {
	const audioRef = React.useRef();
	const [loading, setLoading] = React.useState(false); // Loading on/off 지정 State
	const [userInfo, setUserInfo] = React.useState([]); // 사용자 정보 배열
	const [userCheck, setUserCheck] = React.useState(false); // 사용자에 따른 화면 사용 설정 true/false
	const [moveType, setMoveType] = React.useState("");
	const [resonCheck, setResonCheck] = React.useState(false); // 사용자에 따른 이동 사유 선택
	const [moveTypeName, setMoveTypeName] = React.useState("");
	const [resonList, setResonList] = React.useState([]); // 공정 콤보 배열(Reson)
	const [listArr, setListArr] = React.useState([]); // 바코드 조회 정보 저장 배열
	const [subArray, setSubArray] = React.useState([]); // 그리드 선택 삭제를 위한 SubArray
	const [confirmDialogToggle, setConfirmDialogToggle] = React.useState(false); //confirmDialog state
	const [saveDialogToggle, setSaveDialogToggle] = React.useState(false); //confirmDialog state
	const [delIndex, setDelIndex] = React.useState(""); // 삭제할 데이터 인덱스 저장용 Index
	const [alertTokenDialog, setAlertTokenDialog] = React.useState(false); // 토큰 유효성 검사

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

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A900._UserInfoCheckSelect,
				{
					headers: {
						Authorization:
							"Bearer " +
							JSON.parse(localStorage.getItem("LoginInfo")).token,
					},
					params: {
						PlantId: Global._common._DefaultParams._PlantId,
						UserId: JSON.parse(localStorage.getItem("LoginInfo"))
							.userId,
					},
				}
			)
			.then(async (Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					if (resData[0].asUseYn != "Y") {
						OpenSnack(
							["완제품 재고이동 권한이 없습니다."],
							"warning"
						);
						audioRef.current.PlayError();
						setUserCheck(true);
						setResonCheck(true);
						setLoading(false);
						return;
					} else {
						setUserInfo(resData);
						setMoveType(resData[0].asInspTypeCd);
						if (resData[0].asInspTypeCd == "0003") {
							setResonCheck(false);
						} else {
							setResonCheck(true);
						}
						setMoveTypeName(resData[0].asCodeName);
					}
				} else {
					OpenSnack(["완제품 재고이동 권한이 없습니다."], "warning");
					audioRef.current.PlayError();
					setUserCheck(true);
					setResonCheck(true);
					setLoading(false);
					return;
				}
				await axios
					.get(
						Global.useUrl +
							Global.detailUrl._VulInsGips.A900._CommonCodeIn,
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
								SysCode: "IN",
								KindCode: "40",
								CodeId: "",
							},
						}
					)
					.then((Response) => {
						let resData = Response.data;
						let dataCount = Response.data.length;

						if (dataCount > 0) {
							setResonList(resData);
						} else {
							OpenSnack(["공정 데이터가 없습니다."], "error");
							audioRef.current.PlayError();
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
					});
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
			});

		setLoading(false);
	}, []);

	// 토큰 유효성 검사 팝업
	const AlertDialogClose = () => {
		setAlertTokenDialog(false);
		window.location.replace("/");
		authService.logout();
	};

	//삭제 Dialog on/off 토글
	const DelConfirmDialogOpen = (index) => {
		setConfirmDialogToggle(true);
		setDelIndex(index);
	};

	const DelConfirmDialogClose = () => {
		setLoading(false);
		setConfirmDialogToggle(false);
	};

	//저장 Dialog on/off 토글
	const SaveDialogOpen = () => {
		setSaveDialogToggle(true);
	};

	const SaveDialogClose = () => {
		setLoading(false);
		setSaveDialogToggle(false);
	};

	const RemoveData = (index) => {
		let value = listArr.splice(index, 1);
		// let valueSearched = searchedData.splice(index, 1);
	};

	// 바코드 조회 이벤트
	const SelectLogic = async (barcode, reson) => {
		if (barcode.length < 10 || barcode.length > 15) {
			OpenSnack(["잘못된 바코드입니다!"], "warning");
			audioRef.current.PlayInputError();
			return;
		}
		setLoading(true);

		let iFRow = 0;
		for (let i = 0; i < listArr.length; i++) {
			if (barcode == listArr[i].Barcode) {
				iFRow += 1;
				break;
			}
		}
		if (iFRow > 0) {
			OpenSnack(["이미 추가된 바코드 입니다."], "warning");
			audioRef.current.PlayInputError();
			setLoading(false);
			return;
		}

		await axios
			.get(
				Global.useUrl +
					Global.detailUrl._VulInsGips.A900._BarcodeInfoPdaSelect,
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
			.then((Response) => {
				let resData = Response.data;
				let dataCount = Response.data.length;

				if (dataCount > 0) {
					// setListArr([...listArr,resData]);
					OpenSnack(["조회되었습니다."], "success");
					audioRef.current.PlaySearch();
					if (resData[0].asLotState == "Z") {
						OpenSnack(["종결된 타이어 입니다."], "info");
						setLoading(false);
						return;
					}
					if (resData[0].asCnt != "0") {
						OpenSnack(
							["이동 확정 대기중인 타이어가 존재합니다."],
							"info"
						);
						setLoading(false);
						return;
					}
					if ((moveType == "0003" && reson == "") || reson == null) {
						OpenSnack(["이동 사유는 필수 선택 입니다."], "info");
						setLoading(false);
						return;
					}
					let resonName;
					for (let i = 0; i < resonList.length; i++) {
						if (reson == resonList[i].asCodeId) {
							resonName = resonList[i].asCodeName;
							break;
						}
					}
					// listArr.push(resData);
					listArr.push({
						Barcode: barcode,
						ItemId: resData[0].asItemId,
						ProdType: resData[0].asProdType,
						MoveType: moveType,
						MoveReson: resonName,
						MoveResonCode: reson,
					});
				} else {
					OpenSnack(["바코드 정보가 존재하지 않습니다."], "error");
					audioRef.current.PlayInputError();
					setLoading(false);
					return false;
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

	// 초기화 버튼 이벤트
	const ButtonClearAll = () => {
		setLoading(true);

		setListArr([]);
		OpenSnack(["초기화하였습니다."], "info");
		audioRef.current.PlayComplet();
		setLoading(false);
	};

	// 저장 버튼 이벤트
	const ButtonSave = () => {
		if (listArr.length < 1) {
			OpenSnack(["저장할 바코드가 없습니다."], "warning");
			audioRef.current.PlayError();
			return;
		} else {
			SaveDialogOpen();
		}
	};

	// 저장 로직
	const SaveLogic = async () => {
		setLoading();

		let saveCount = 0;
		let errorMsg;
		for (let i = 0; i < listArr.length; i++) {
			await axios
				.get(
					Global.useUrl +
						Global.detailUrl._VulInsGips.A900._OutMoveInsert,
					{
						headers: {
							Authorization:
								"Bearer " +
								JSON.parse(localStorage.getItem("LoginInfo"))
									.token,
						},
						params: {
							BarCodeNo: listArr[i].Barcode,
							InspType: listArr[i].MoveType,
							UserId: JSON.parse(
								localStorage.getItem("LoginInfo")
							).userId,
							Reson: listArr[i].MoveResonCode,
						},
					}
				)
				.then((Response) => {
					let resData = Response.data;
					let dataCount = Response.data.length;

					if (dataCount > 0) {
						if (resData[0].rsCode == "S") {
							saveCount += 1;
						} else {
							errorMsg = resData[0].rsMsg;
						}
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
					return;
				});
		}
		if (saveCount > 0) {
			OpenSnack([saveCount + " 건 바코드 처리 완료!"], "success");
			audioRef.current.PlayComplet();
			setListArr([]);
		} else {
			OpenSnack([errorMsg], "error");
			audioRef.current.PlayError();
		}
		setLoading(false);
	};

	// Grid 항목 삭제 함수
	const GridDeleteLogic = (_selectedList) => {
		// setLoading(true);
		if (_selectedList.length < 1) {
			OpenSnack(["삭제할 항목이 없습니다."], "warning");
			audioRef.current.PlayError();
			setLoading(false);
			return false;
		} else if (listArr.length == _selectedList.length) {
			setListArr([]);
			OpenSnack(["전체 삭제되었습니다."], "info");
			audioRef.current.PlayError();
			setLoading(false);
			return true;
		} else {
			for (let i = 0; i < _selectedList.length; i++) {
				// let value = listArr.splice(_selectedList[i], 1);
				subArray.push({
					Barcode: listArr[_selectedList[i]].Barcode,
				});
			}
			for (let i = 0; i < subArray.length; i++) {
				for (let j = 0; j < listArr.length; j++) {
					if (listArr[j].Barcode == subArray[i].Barcode) {
						let value = listArr.splice(j, 1);
					}
				}
			}
			setSubArray([]);
			OpenSnack(["삭제되었습니다."], "info");
			audioRef.current.PlayComplet();
			setLoading(false);
			return true;
		}
	};

	return (
		<div style={{ overflowX: "hidden" }}>
			{loading && <Loading />}
			<A900Screen
				userInfo={userInfo}
				userCheck={userCheck}
				resonList={resonList}
				resonCheck={resonCheck}
				moveType={moveType}
				moveTypeName={moveTypeName}
				listArr={listArr}
				SelectLogic={SelectLogic}
				ButtonClearAll={ButtonClearAll}
				ButtonSave={ButtonSave}
				DelConfirmDialogOpen={DelConfirmDialogOpen}
				GridDeleteLogic={GridDeleteLogic}
			/>
			<SnackBar
				open={snackToggle}
				onClose={CloseSnack}
				time={3500}
				type={snackType}
				article={snackArticle}
			/>
			<ConfirmDialog
				name="삭제"
				article="삭제하시겠습니까?"
				buttonName="확인"
				open={confirmDialogToggle}
				onClose={DelConfirmDialogClose}
				buttonCancel={() => {
					DelConfirmDialogClose();
					setLoading(false);
				}}
				buttonLogic={() => {
					DelConfirmDialogClose();
					RemoveData(delIndex);
					OpenSnack(["삭제되었습니다."], "info");
					setLoading(false);
				}}
			/>
			<ConfirmDialog
				name="저장"
				article={[
					listArr.length + " 건의 바코드를",
					"저장하시겠습니까?",
				].map((item, index) => (
					<li key={index}>{item}</li>
				))}
				buttonName="확인"
				open={saveDialogToggle}
				onClose={SaveDialogClose}
				buttonCancel={() => {
					SaveDialogClose();
					setLoading(false);
				}}
				buttonLogic={() => {
					SaveDialogClose();
					SaveLogic();
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

export default A900;
