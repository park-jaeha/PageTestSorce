/**
 * width : Grid Width                                       string
 * height : Grid Height                                     Number
 * rows : Grid 항목 List                                    List
 * onClick : Row 클리 시 ID를 반환하는 함수                  Func
 * 
 * getRowId : Grid 항목 ID                                  Func
 * ex)
 * getRowId={(row) => row.carNo}
 * 
 * titles : Grid Head List                                  List
 * ex)
 * const gridTitles = [
        {
            field: "itemName",
            headerName: "품목",
            width: 180,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "workState",
            headerName: "상태",
            width: 110,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "carNo",
            headerName: "차량번호",
            width: 110,
            align: "left",
        },
    ];
 * 
 * 
 * 
 * 
 */

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const OnceGrid = React.forwardRef((props, ref) => {
    const [selectionModel, setSelectionModel] = React.useState([]);

    return (
        <div style={{ width: props.width, height: props.height }}>
            <DataGrid
                columns={props.titles}
                rows={props.rows}
                getRowId={props.getRowId}
                selectionModel={selectionModel}
                onSelectionModelChange={(newSelection) => {
                    props.onClick(newSelection);
                    setSelectionModel(newSelection);
                }}
                pageSize={100}
                rowsPerPageOptions={[100]}
            />
        </div>
    );
});

OnceGrid.defaultProps = {
    width: "100%",
    height: 300,
};

export default OnceGrid;
