/**
 * name : Grid Name                                                   string
 * rows : Grid 내용에 채워질 항목 List                                 List(1차원 배열이여야함)
 * ref : Grid에서 함수 전달을 위한 변수                                useRef
 * gridHeight : Grid 전체의 높이                                      string
 * setSelectedCount : 선택된 Item 개수를 부모로 전달하는 state 함수     Func
 * onClick : Grid Row Click Event                                    Func
 * 
 * 
 * titles : Grid 윗줄에 해당되는 객체(View에서 작성)
 * ex)
 * const titles = [
        {
            id: "asMatLotNo",
            label: "바코드",
            width: 80,
            align: "left",
        },
        {
            id: "asQty",
            label: "수량",
            width: 55,
            align: "right",
        },
        {
            id: "asItemCd",
            label: "품목코드",
            width: 100,
            align: "left",
        },
        {
            id: "asItemName",
            label: "품목명",
            width: 350,
            align: "left",
        },
        {
            id: "asCustName",
            label: "공급업체",
            width: 300,
            align: "left",
        },
        {
            id: "asStoLoc",
            label: "창고코드",
            width: 100,
            align: "left",
        },
        {
            id: "asPlanDt",
            label: "입고일자",
            width: 100,
            align: "left",
        },
    ];
 * 
 * 
 * SettingTableCells : Grid 본체에 나타낼 항목들 적용하는 함수(View에서 작성)
 * ex)
 * const SettingTableCells = (_items, _index) => {
        const labelId = `enhanced-table-checkbox-${_index}`;

        return (
            <>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    style={{
                        width: 100,
                        height: props.tableCellHeight,
                        fontSize: props.tableCellFontSize,
                    }}
                    align="left"
                >
                    {_items.asMatLotNo}
                </TableCell>
                <TableCell align="right">
                    {_items.asQty.toLocaleString("en-US")}
                </TableCell>
                <TableCell align="left">{_items.asItemCd}</TableCell>
                <TableCell align="left">{_items.asItemName}</TableCell>
                <TableCell align="left">{_items.asCustName}</TableCell>
                <TableCell align="left">{_items.asStoLoc}</TableCell>
                <TableCell align="left">{_items.asPlanDt}</TableCell>
            </>
        );
    };
 * 
 * 
 * // 부모 Component에 아래 State 추가
 * const [selectedCount, setSelectedCount] = React.useState(null);
 * 
 * DeleteLogic : Grid 삭제 항목 삭제 이벤트(Controller에서 작성하여 View에서는 이벤트를 넘기기만 한다.)
 * ex)
 * const GridDeleteLogic = (_selectedList) => {
        setLoading(true);

        if (_selectedList.length < 1) {
            OpenSnack(["삭제할 항목이 없습니다."], "warning");
            setLoading(false);
            return false;
        } else if (matData.length == _selectedList.length) {
            setMatData([]);
            setSearchedData([]);
            OpenSnack(["전체 삭제되었습니다."], "info");
            setLoading(false);
            return true;
        } else {
            for (let i = 0; i < _selectedList.length; i++) {
                let value = matData.splice(_selectedList[i], 1);
                let searchedValue = searchedData.splice(_selectedList[i], 1);
            }
            OpenSnack(["삭제되었습니다."], "info");
            setLoading(false);
            return true;
        }
    };
 * 
 * 
 */

import * as React from "react";
/** Components Import */
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="secondary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {props.titles.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                        // style={{ width: headCell.width }}
                    >
                        <TableSortLabel
                            // active={orderBy === headCell.id}
                            // direction={orderBy === headCell.id ? order : "asc"}
                            // onClick={createSortHandler(headCell.id)}
                            hideSortIcon={true}
                            style={{ width: headCell.width }}
                        >
                            {headCell.label}
                            {/* {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null} */}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                minHeight: 0,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
            style={{
                height: "30px",
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    id="tableTitle"
                    component="div"
                >
                    {props.name}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => {
                            props.DeleteLogic();
                            props.setSelected([]);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const BasicDataGrid = React.forwardRef((props, ref) => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);

    React.useImperativeHandle(ref, () => ({
        AddSelected(_idx) {
            handleClick(_idx);
        },
        SendSelected() {
            return selected;
        },
        SendSetSelected(_arr) {
            setSelected(_arr);
        },
        ClearAll() {
            setSelected([]);
        },
    }));

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.rows.map((n, index) => index);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_idx) => {
        const selectedIndex = selected.indexOf(_idx);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _idx);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
        props.setSelectedCount(newSelected.length);
        props.onClick(_idx);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length)
            : 0;

    const DeleteLogic = () => {
        props.DeleteLogic(selected);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <EnhancedTableToolbar
                name={props.name}
                numSelected={selected.length}
                selected={selected}
                setSelected={setSelected}
                DeleteLogic={DeleteLogic}
            />
            <TableContainer
                sx={{
                    height: props.gridHeight,
                }}
            >
                <Table
                    sx={{ height: "max-content" }}
                    aria-labelledby="tableTitle"
                    size="small"
                    stickyHeader
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={props.rows.length}
                        titles={props.titles}
                    />
                    <TableBody>
                        {props.rows.map((row, index) => {
                            const isItemSelected = isSelected(index);

                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(index)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={index}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="secondary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                "aria-labelledby": labelId,
                                            }}
                                        />
                                    </TableCell>
                                    {props.SettingTableCells(row, index)}
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 33 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{}}
                rowsPerPageOptions={[3]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
});

BasicDataGrid.defaultProps = {
    gridHeight: "30vh",
    tableCellHeight: "8vh",
    tableCellFontSize: "1.2em",
};

export default BasicDataGrid;
