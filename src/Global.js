module.exports = {
    useUrl: "http://localhost:19198/api/Link", // 로컬
    // useUrl: "http://172.17.31.171:8090/api/Link", // 개발
    // useUrl: "http://172.17.31.171:8080/api/Link", // 운영
    devVersion: "22.05.11_v01",
    OperVersion: "22.05.11_v01",

    local_url: "http://localhost:19198/api/Link",
    dev_url: "http://172.17.31.171:8090/api/Link",
    oper_url: "http://172.17.31.171:8080/api/Link",

    detailUrl: {
        _Version: "/Version", // ServerSide Version
        _UserInfo: "/GetSelectUserInfo", // Select User Info
        _JandiMsgSend: "/JandiMsgSend", // ServerSide Version
        _Material: {
            A100: {
                _MatLotSelect: "/GetSelectMaterialMatLot",
                _MatLotInput: "/GetInsertMaterialMatLot",
            },
            A110: {
                _WareHouseSelect: "/GetSelectReInputWareHouse",
                _MatLotReselect: "/GetSelectMaterialReselect",
                _MatLotReinput: "/GetSelectMaterialReInput",
            },
            A150: {
                _MatLotoutSelect: "/GetSelectMaterialOut",
                _MatLotoutSelectItem: "/GetSelectMaterialOutItem",
                _MatLotout: "/GetOutMaterialOutItem",
                _MatLotWarehouseOut: "/GetOutMaterialOutWarehouseItem",
            },
            A160: {
                _WarehouseCodeSelect: "/GetSelectCodeWarehouse", // 원부자재 출고 바코드 조회
                _WarehouseCodeDelete: "/GetDeleteCodeWarehouse", // 코드 창고 위치 초기화
                _WarehouseCodeInsert: "/GetInsertCodeWarehouse", // 코드 창고 위치 등록
            },
            A170: {
                _MatWarehouseLineReset: "/GetResetMatWarehouseLine", // 원자재창고 라인 초기화
                _MatWarehouseLineEnroll: "/GetEnrollMatWarehouseLine", // 원자재창고 등록 처리
                _MatWarehouseSelect: "/GetSelectCodeWarehouseSelect", // 원부자재 출고 바코드 조회
                _StartLineSeqSelect: "/GetSelectStartLineSeq", // 창고 startLineSeq 조회
                _RowWarehouseMaxSeqSelect: "/GetSelectRowWarehouseMaxSeq", //창고 MAXSEQ 조회
            },
            A200: {
                _BeadWireEquipSelect: "/GetSelectBwEqSelect", //비드와이어 설비 조회
                _BeadWireEquipLocationSelect: "/GetSelectBwPosSelect", // 비드와이어 설비 투입 위치 조회
                _BeadWireWorkOrderStartSelect: "/GetSelectMrWorkOrderSelect", // 비드와이어 설비의 진행중인 작업지시조회
                _BeadWireBarcodeOutSelect: "/GetSelectBwBarcodeOut", // 비드와이어 투입된 원자재 바코드 조회
                _BeadWireMatInInsert: "/GetInsertBeadWireMatIn", // 비드와이어 공정 투입
                _BeadWireMatOutInsert: "/GetInsertBeadWireMatOut", // 원자재 투입처리
                _BeadWireBarcodeSelect: "/GetSelectBwBarcodeSelect", // 비드와이어 투입될 원자재 바코드 조회
            },
            A400: {
                _SteelCalInput: "/GetInsertSteelCalInput", // STEEL CAL 원자재 투입처리
                _SteelCalLotSelect: "/GetSelectSteelCalLotId", // 압연 스틸카렌타 원자재 Lot 조회
                _SteelCalWaitSelect: "/GetSelectSteelCalWait", // 압연 스틸카렌타 원자재 대기열 조회
            },
            A450: {
                _TextileCoreBarcodeSelect: "/GetSelectTextileCoreBarcode", //TEXTILE CORE 원부자재 출고 바코드 조회 처리
                _TextileMatInputBatch: "/GetInsertTextileMatInputBatch", //압연공정 TEXTILE 원자재 PDA 투입처리
                _TexttileMatOutModify: "/GetInsertTextileMatOutModify", //PDA Textile 원자재 투입처리, 창고이동, 창고출고, LOT상태, 창고상태 변경
            },
            A500: {
                _MixerDataSelect: "/GetSelectMixerData", // 정련공정 약품투입 바코드 조회
                _MixerDataUpdate: "/GetUpdateMixerData", //약품계량기의 BIN별에 원자재 장착을 처리함
            },
            WorkOrder: {
                _WorkOrderPdaSelect: "/GetSelectWorkOrderPda", // 창녕공장에 공정별 작업지시 조회
            },
            A950: {
                _LocationSelect: "/GetSelectMaterialLocation",
                _VehicleSelect: "/GetSelectMaterialVehicle",
                _MaterialLocationInsert: "/GetInsertMaterialLocation", // 코드 창고 위치 등록
                _MaterialCheckListInsert: "/GetInsertMaterialCheckListNew", //원부재료 입하계획 저장
                _MaterialCarOutCheckListInsert:
                    "/GetInsertMaterialCartOutCheckList", // 원부재료 입하계획 저장(차량 반출정보 저장)
            },
        },
        _Batch: {
            A740: {
                _MoveOutSelect: "/GetSelectInDMoveOutChk", // 반제품 출고 바코드 조회
                _MoveOutUpdate: "/GetUpdateMoveOut", // 반제품 출고 공장간 반제품이동 출고 등록 (FOR PDA)
            },
            A800: {
                _BatchInfoSelect: "/GetSelectCmMrCode", // BATCH Popup List & Decision Combo 조회
                _BatchDecisionSelect: "/GetSelectCmMrCodeRel", // BATCH Decision List 조회
                _BatchUpdate: "/GetUpdateBatch", // BATCH 재고 형태 변경
            },
        },
        _EquipInspecs: {
            A710: {
                _PartShopComboSelect: "/GetSelectEquipCombobox", // A710 파트, 샵 콤보 조회
                _WarehouseCodeComboSelect: "/GetSelectSpareWarehouseCombobox", // A710 창고 콤보 조회
                _SpareStockMainSelect: "/GetSelectSpareStock", // 스페어 재고 기준정보 검색(기자재 품목관리)
                _SpareStockMainInsert: "/GetInsertSpareStock", // 스페어 재고 실사 데이터 저장
                _SpareStockBarcodeInsert: "/GetInsertSpareStockBarcode", // 스페어 재고 실사 바코드 건건 데이터 저장
            },
            A1000: {
                _UtilityMasterSelect: "/GetSelectUtilityMasterInfo", // UTILITY PDA 마스터 정보 조회
                _UtilityPdaCheckInsert: "/GetInsertUtilityPdaCheck", //  UTILITY PDA 점검치 저장
            },
            A1010: {
                _PdaMasterInfoRc1: "/GetSelectPDAMasterInfoRc1", // UTILITY PDA 마스터 정보 조회 (RC1)
                _PdaMasterInfoRc2: "/GetSelectPDAMasterInfoRc2", // UTILITY PDA 마스터 정보 조회 (RC2)
                _PdaMasterInfoRc3: "/GetSelectPDAMasterInfoRc3", // UTILITY PDA 마스터 정보 조회 (RC3)
                _PdaMasterInfoRc4: "/GetSelectPDAMasterInfoRc4", // UTILITY PDA 마스터 정보 조회 (RC4)
                _PdaMasterInfoRc5: "/GetSelectPDAMasterInfoRc5", // UTILITY PDA 마스터 정보 조회 (RC5)
                _PdaMasterInfoRc6: "/GetSelectPDAMasterInfoRc6", // UTILITY PDA 마스터 정보 조회 (RC6)
                _PdaMasterInfoRc7: "/GetSelectPDAMasterInfoRc7", // UTILITY PDA 마스터 정보 조회 (RC7)
                _PdaMasterInfoRc8: "/GetSelectPDAMasterInfoRc8", // UTILITY PDA 마스터 정보 조회 (RC8)
                _EquipInputInsert: "/GetInsertEquip", // 기자재 입고 저장
                _EquipOutInsert: "/GetInsertEquipOut", // 기자재 출하 처리
                _EquipReInputInsert: "/GetInsertEquipReInput", // 기자재 수리입고 저장
                _EquipDisposalInsert: "/GetInsertEquipDisposal", // 기자재 폐기 처리
            },
            A1020: {
                _UtilityPdaMasterInfoSelect: "/GetSelectDailyCheckPda", // 일상점검 PDA 점검기준서 조회
                _EquipDailyCheckInsert: "/GetInsertEquipDailyCheckPda", // 설비 일상점검 PDA 점검치 저장
            },
        },
        _Pressing: {
            _CartSelect: "/GetSelectTbInMCart", // 대차 조회
            _CartSelectHis: "/GetSelectTbInHCartInoutHis", // 대차 이력 조회
            _CartInsertNew: "/ExecCartMaster", // 대차 신규 입고
            _CartInsertExisting: "/ExecCartInput", // 대차 기존 입고
            _CartRepairRequire: "/RequireCartRepair", // 대차 수리 요청
            _CartRepairConfirm: "/RequireCartRepairConfirm", // 대차 수리 접수
            _CartRepairOutside: "/CartRepairOutside", // 대차 외부 수리
            _CartRepairComplet: "/CartRepairComplete", // 대차 수리 완료
            _CartDisposalRequire: "/CartDisposalRequire", // 대차 폐기 요청
            _CartDisposalCancel: "/CartDisposalCancel", // 대차 폐기 취소
            _CartDisposalComplete: "/CartDisposalComplete", // 대차 폐기 완료
        },
        _VulInsGips: {
            A1030: {
                _InspEqSelect1: "/GetSelectInspEqSelectRc1", // 검사림 투입 PDA 설비 조회 (RC1)
                _InspEqSelect2: "/GetSelectInspEqSelectRc2", // 검사림 투입 PDA 설비 조회 (RC1)
                _InspEqInputSelect1: "/GetSelectInspEqInputSelectRc1", // 설비 기 투입 TOOL 조회 (RC1)
                _InspEqInputSelect2: "/GetSelectInspEqInputSelectRc2", // 설비 기 투입 TOOL 조회 (RC2)
                _InspEqBarcodeSelect1: "/GetSelectInspEqBarcodeSelectRc1", // 검사림 스캔 바코드 조회 (RC1)
                _InspEqBarcodeSelect2: "/GetSelectInspEqBarcodeSelectRc2", // 검사림 스캔 바코드 조회 (RC2)
                _InspEqToolInput: "/GetInsertEquipToolInput", // 설비 TOOL 투입
                _InspEqToolOutput: "/GetInsertEquipToolOutput", // 설비 TOOL 탈착
            },
            A300: {
                _CommonCodeSelect: "/GetSelectCommonCode", // 공통코드 리스트 , Select_CM_CODE, 불량정도
                _BarcodePartInfoSelect: "/GetSelectBarcodePartInfo", // 바코드 스캔시 품목, 품명 등 조회 - 가류공정 GT 검사
                _GtCheckEnrollInsert: "/GetInsertGTCheckEnroll", // G/T 검사등록수정삭제, Insert_QA_FM_014
                _CureWaitOut1: "/GetInsertCureWaitOut", // 가류공정 투입대기열에 있는 GT를 취출처리
                _CureLineBarcodeSelect: "/GetSelectCureLineBarcode", // 가류공정 라인정보 조회
                _GaryuWaitInputSelect: "/GetSelectGaryuWaitInput", // 가류공정 투입대기열 조회
                _GipCheckPdaSelect: "/GetSelectGipCheckPda", // GT GIP 확인 PDA
                _GtGipCheckInsert: "/GetInsertGtGipCheck", // GT GIP 저장
                _GtCureWaitInsert: "/GetInsertGtCureWait", // 가류공정 대기열에 GT 투입처리
                _CureWaitSelectL: "/GetSelectCureWaitSelectL", // 가류 대기열 조회, RCTABLE_L
                _CureWaitSelectR: "/GetSelectCureWaitSelectR", // 가류 대기열 조회, RCTABLE_R
                _EquipGipSelect: "/GetSelectEquipGip", // GIP 설비조회 PDA
                _CommonCodePopSelect: "/GetSelectCommonCodePop", // 공통정보 코드
                _GetSelectGtOutBarcode: "/GetSelectGtOutBarcode", // GTOut Barcode 조회
            },
            A900: {
                _BarcodeInfoPdaSelect: "/GetSelectBarcodeInfoPda", // 바코드 정보 조회(PDA 시제품 이동 보고시 사용)
                _OutMoveInsert: "/GetInsertOutMove", // PDA 반출 요청 저장
                _CommonCodeIn: "/GetSelectCommonCodeIn", // 공통코드 리스트, Select_CM_CODE
                _EquipToolInput: "/GetInsertEquipToolInput", // 설비 TOOL 투입
                _EquipToolOut: "/GetInsertEquipToolOutput", // 설비 TOOL 탈착
                _UserInfoCheckSelect: "/GetSelectUserInfoCheckPda", //완제품 재고 이동(PDA) 사용자 정보 조회(PDA 시제품 이동 보고시 사용)
            },
            A1100: {
                _CobaltProdCompSelect: "/GetSelectCobaltProdComp", // 코발트측정설비 실적 등록을 위한 생산실적 조회
            },
        },
        _Commons: {
            A700: {
                _GetOraDate: "/GetSelectOraDate", // 오라클 날짜 정보 조회
                _GtBarcodeInsertT: "/GetInsertGtBarcode", // 반제품/GT 재고실사 로직(입력 데이터를 건당 저장하는 방식, SP_IN_PP_GT_BARCODE_INSERT_Arr)
                _ComboboxBindingSelect: "/GetSelectComboboxBinding700", // 콤보박스 바인딩 조회
                _LocNoDataSelect: "/GetSelectLocNoData", // LocNo 조회
            },
        },
    },

    _common: {
        _DefaultParams: {
            _PlantId: "P110",
            _UseYnY: "Y",
            _UseYnN: "N",
        },
        _UserInfo: {
            _UserId: "10191001",
            _UserName: "",
            _UserDeptId: "",
            _UserDeptName: "",
            _UserPart: "",
            _UserShop: "",
        },
    },
};
