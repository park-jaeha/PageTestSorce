import * as React from "react";
import { Link } from "react-router-dom";
import authService from "../../Services/auth.service";
/**Component Import */
/**CSS Import */
import "../../CSS/Accounts/DrawerScreen.css";
import "../../CSS/reset.css";
/**mui Import */
import { styled, useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Toolbar,
    List,
    Divider,
    IconButton,
    Typography,
    CssBaseline,
    Stack,
    Collapse,
    Button,
    ButtonBase,
} from "@mui/material";

import { ListItemIcon, ListItemText, ListItemButton } from "@mui/material"; //Drawer의 List를 구성하기 위해 사용

import {
    ExpandLess,
    ExpandMore,
    Menu,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material"; //Mui의 Collapse(Expand)를 이용하여 drawer의 서브메뉴 구성
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
/**Icon Import */
import FiberSmartRecordSharpIcon from "@mui/icons-material/FiberSmartRecordSharp";
import MiscellaneousServicesSharpIcon from "@mui/icons-material/MiscellaneousServicesSharp";
import AddchartSharpIcon from "@mui/icons-material/AddchartSharp";
import BuildSharpIcon from "@mui/icons-material/BuildSharp";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";

//Drawer 너비
const _DrawerWidth = 280;

//Drawer 테마 다크
const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1976d2",
        },
    },
});

//Drawer 테마 화이트
const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#fff",
        },
    },
});

const OpenedMixin = (theme) => ({
    width: _DrawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const ClosedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    overflowY: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    width: 0,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

// 상단의 앱바
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: _DrawerWidth,
        width: `calc(100% - ${_DrawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

//Drawer : mui material의 drawer 사용
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: _DrawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...OpenedMixin(theme),
        "& .MuiDrawer-paper": OpenedMixin(theme),
    }),
    ...(!open && {
        ...ClosedMixin(theme),
        "& .MuiDrawer-paper": ClosedMixin(theme),
    }),
}));

//Main Loop
const DrawerScreen = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false); //drawer 오픈 상태
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };
    const [Colopen, setColOpen] = React.useState(false); //서랍의 드롭다운 상태함수 Col, 원재료
    const [Col2open, setCol2Open] = React.useState(false); //서랍의 드롭다운 상태함수 Col2, 정련
    const [Col3open, setCol3Open] = React.useState(false); //서랍의 드롭다운 상태함수 Col3, 기자재 일상점검
    const [Col4open, setCol4Open] = React.useState(false); //서랍의 드롭다운 상태함수 Col4, 가류/검사/GIP
    const [Col5open, setCol5Open] = React.useState(false); //서랍의 드롭다운 상태함수 Col5, 대차관리
    const [Col6open, setCol6Open] = React.useState(false); //서랍의 드롭다운 상태함수 Col5, 공통관리
    const [selected, setSelected] = React.useState(""); //서랍의 드롭다운 상태함수 Col, 원재료
    const [selected2, setSelected2] = React.useState(""); //서랍의 드롭다운 상태함수 Col2, 정련
    const [selected3, setSelected3] = React.useState(""); //서랍의 드롭다운 상태함수 Col3, 기자재 일상점검
    const [selected4, setSelected4] = React.useState(""); //서랍의 드롭다운 상태함수 Col4, 가류/검사/GIP
    const [selected5, setSelected5] = React.useState(""); //서랍의 드롭다운 상태함수 Col5, 대차관리
    const [selected6, setSelected6] = React.useState(""); //서랍의 드롭다운 상태함수 Col5, 공통관리
    const [subTitle, setSubtitle] = React.useState("NEXEN"); // 앱바의 이름 SubTitle
    const MainMenus = [
        { id: 1, text: "NEXEN", label: "Test" },
        { id: 2, text: "Submenu" },
        { id: 3, text: "Invoice" },
        { id: 4, text: "Profile" },
        { id: 5, text: "Chart" },
    ]; //MainMenus
    const SubMenus = [
        { id: "A100", text: "원자재 입고" },
        { id: "A110", text: "잔량 재입고" },
        { id: "A150", text: "원자재 출고" },
        { id: "A950", text: "원자재 차량 호출" },
        { id: "A160", text: "코드창고관리" },
        { id: "A200", text: "BEAD GROMMET" },
        { id: "A400", text: "Steel Cord투입신고" },
        { id: "A450", text: "Textile Cord 투입신고" },
        { id: "A500", text: "정련공정 약품투입" },
        { id: "A170", text: "창고관리" },
    ]; //SubMenus 1
    const SubMenus2 = [
        { id: "A800", text: "BATCH 재고 형태 변경" },
        { id: "A740", text: "반제품 출고" },
    ]; //SubMenus 2
    const SubMenus3 = [
        { id: "A1010", text: "기자재 입출고 관리" },
        { id: "A710", text: "재고 실사" },
        { id: "A1000", text: "유틸리티 순찰 등록" },
        { id: "A1020", text: "설비 일상점검 관리" },
    ]; //SubMenus 3
    const SubMenus4 = [
        { id: "A1030", text: "검사 툴 투입 및 탈착" },
        { id: "A300", text: "가류GT투입 & 취출" },
        { id: "A900", text: "시제품 이동 보고" },
        { id: "A1100", text: "코발트 설비 도입" },
        { id: "A1200", text: "압출투입구 투입" },
    ]; //SubMenus 4
    const Pressings = [
        { id: "SearchCartDetail", text: "대차 정보 조회" },
        { id: "PressingInput", text: "대차 입고/출고" },
        { id: "RepairInput", text: "수리 관리" },
        { id: "DisposalInput", text: "폐기 관리" },
    ]; //Pressings
    const SubMenus5 = [
        { id: "A600", text: "운반구 Tag Clear" },
        { id: "A700", text: "재고 실사" },
    ]; //SubMenus 5     공통관리

    // Screen Width 600 이하일때 Drawer 상태 조작
    React.useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        if (windowWidth >= 600) {
            setOpen(true);
        } else {
            setOpen(false);
        }
        return () => {
            window.removeEventListener("resize", resizeWindow);
        };
    }, []);

    //원재료 서브메뉴 토글 함수
    const HandleClick = () => {
        if (Colopen == true) {
            setColOpen(false);
        } else {
            setColOpen(true);
            setOpen(true);
        }
    };

    //정련 서브메뉴 토글 함수
    const Handle2Click = () => {
        if (Col2open == true) {
            setCol2Open(false);
        } else {
            setCol2Open(true);
            setOpen(true);
        }
    };

    //기자재/일상점검 서브메뉴 토글 함수
    const Handle3Click = () => {
        if (Col3open == true) {
            setCol3Open(false);
        } else {
            setCol3Open(true);
            setOpen(true);
        }
    };

    //가류/검사/GIP 서브메뉴 토글 함수
    const Handle4Click = () => {
        if (Col4open == true) {
            setCol4Open(false);
        } else {
            setCol4Open(true);
            setOpen(true);
        }
    };

    // 대차관리 서브메뉴 토글 함수
    const Handle5Click = () => {
        if (Col5open == true) {
            setCol5Open(false);
        } else {
            setCol5Open(true);
            setOpen(true);
        }
    };

    // 공통관리 서브메뉴 토글 함수
    const Handle6Click = () => {
        if (Col6open == true) {
            setCol6Open(false);
        } else {
            setCol6Open(true);
            setOpen(true);
        }
    };

    // Width 값 조정 함수
    const ClickEvent = () => {
        if (windowWidth <= 600) {
            setOpen(false);
            setColOpen(false);
            setCol2Open(false);
            setCol3Open(false);
            setCol4Open(false);
            setCol5Open(false);
            setCol6Open(false);
        }
    };

    //Drawer open함수
    const HandleDrawerOpen = () => {
        setOpen(true);
    };

    //Drawer close함수
    const HandleDrawerClose = () => {
        setOpen(false);
        setColOpen(false);
        setCol2Open(false);
        setCol3Open(false);
        setCol4Open(false);
        setCol5Open(false);
        setCol6Open(false);
    };

    //Drawer open/close 기능을 앱바와 drawer 상단에 추가하기 위해 넣어둠
    const HandleToggle = () => {
        if (open == true) {
            HandleDrawerClose();
        } else {
            HandleDrawerOpen();
        }
    };

    return (
        <Box
            className="DrawerBox"
            sx={{ display: "flex" }}
            onBlur={(e) => {
                setOpen(false);
            }}
        >
            <CssBaseline />
            <ThemeProvider theme={LightTheme}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={HandleToggle}
                            edge="start"
                            sx={{
                                marginRight: "10px",
                                color: "#7f1085",
                                ...(open && { display: "true" }),
                            }}
                        >
                            <Menu />
                        </IconButton>
                        <Button variant="text" onClick={HandleToggle}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                style={{
                                    color: "#7f1085",
                                    fontWeight: "bold",
                                    fontSize: "1.125em",
                                }}
                            >
                                {subTitle}
                            </Typography>
                        </Button>
                        <>
                            <div
                                className="Appbar"
                                style={{ display: "flex", marginLeft: "auto" }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ marginTop: 0.5 }}
                                >
                                    <ButtonBase
                                        size="large"
                                        style={{ fontWeight: "bold" }}
                                        onClick={() => {
                                            window.location.replace("/");
                                            authService.logout();
                                        }}
                                    >
                                        LOGOUT
                                    </ButtonBase>
                                </Stack>
                            </div>
                        </>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <ThemeProvider theme={DarkTheme}>
                <Drawer
                    variant="permanent"
                    open={open}
                    className="DrawerScroll"
                >
                    <DrawerHeader>
                        <Link
                            to={"/Test"}
                            style={{ color: "#fff", paddingRight: 10 }}
                            onClick={() => {
                                setOpen(false);
                                setColOpen(false);
                                setCol2Open(false);
                                setCol3Open(false);
                                setCol4Open(false);
                                setCol5Open(false);
                                setCol6Open(false);
                                setSelected("");
                                setSubtitle("NEXEN");
                            }}
                        >
                            <div style={{ marginRight: 50 }}>N E X E N</div>
                        </Link>
                        <IconButton onClick={HandleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRight />
                            ) : (
                                <ChevronLeft />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Divider />
                    <List>
                        <ListItemButton onClick={HandleClick}>
                            <ListItemIcon>
                                <FiberSmartRecordSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="원재료" />
                            {Colopen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={Colopen} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                {SubMenus.map((menus, index) => (
                                    <Link
                                        to={"/" + menus.id}
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            setSelected(menus.id);
                                            setSubtitle(menus.text);
                                            ClickEvent();
                                            setSelected2("");
                                            setSelected3("");
                                            setSelected4("");
                                            setSelected5("");
                                            setSelected6("");
                                        }}
                                        key={index}
                                    >
                                        <Divider />
                                        <ListItemButton sx={{ pl: 3 }}>
                                            <ListItemIcon>
                                                <MoreHorizSharpIcon
                                                    style={
                                                        selected == menus.id
                                                            ? {
                                                                  color: "yellow",
                                                              }
                                                            : { color: "white" }
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={menus.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton onClick={Handle2Click}>
                            <ListItemIcon>
                                <MiscellaneousServicesSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="정련" />
                            {Col2open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={Col2open} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                {SubMenus2.map((menus, index) => (
                                    <Link
                                        to={"/" + menus.id}
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            ClickEvent();
                                            setSelected2(menus.id);
                                            setSubtitle(menus.text);
                                            setSelected("");
                                            setSelected3("");
                                            setSelected4("");
                                            setSelected5("");
                                            setSelected6("");
                                        }}
                                        key={index}
                                    >
                                        <ListItemButton sx={{ pl: 3 }}>
                                            <ListItemIcon>
                                                <MoreHorizSharpIcon
                                                    style={
                                                        selected2 == menus.id
                                                            ? {
                                                                  color: "yellow",
                                                              }
                                                            : { color: "white" }
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={menus.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton onClick={Handle3Click}>
                            <ListItemIcon>
                                <AddchartSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="기자재/일상점검" />
                            {Col3open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={Col3open} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                {SubMenus3.map((menus, index) => (
                                    <Link
                                        to={"/" + menus.id}
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            ClickEvent();
                                            setSelected3(menus.id);
                                            setSubtitle(menus.text);
                                            setSelected("");
                                            setSelected2("");
                                            // setSelected3("");
                                            setSelected4("");
                                            setSelected5("");
                                            setSelected6("");
                                        }}
                                        key={index}
                                    >
                                        <ListItemButton sx={{ pl: 3 }}>
                                            <ListItemIcon>
                                                <MoreHorizSharpIcon
                                                    style={
                                                        selected3 == menus.id
                                                            ? {
                                                                  color: "yellow",
                                                              }
                                                            : { color: "white" }
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={menus.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton onClick={Handle4Click}>
                            <ListItemIcon>
                                <BuildSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="가류/검사/GIP" />
                            {Col4open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={Col4open} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                {SubMenus4.map((menus, index) => (
                                    <Link
                                        to={"/" + menus.id}
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            ClickEvent();
                                            setSelected("");
                                            setSelected2("");
                                            setSelected3("");
                                            setSelected4(menus.id);
                                            setSelected5("");
                                            setSelected6("");
                                            setSubtitle(menus.text);
                                        }}
                                        key={index}
                                    >
                                        <ListItemButton sx={{ pl: 3 }}>
                                            <ListItemIcon>
                                                <MoreHorizSharpIcon
                                                    style={
                                                        selected4 == menus.id
                                                            ? {
                                                                  color: "yellow",
                                                              }
                                                            : { color: "white" }
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={menus.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton onClick={Handle5Click}>
                            <ListItemIcon>
                                <BuildSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary="대차 관리" />
                            {Col5open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={Col5open} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                {Pressings.map((menus, index) => (
                                    <Link
                                        to={"/" + menus.id}
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            ClickEvent();
                                            setSelected5(menus.id);
                                            setSelected("");
                                            setSelected2("");
                                            setSelected3("");
                                            setSelected4("");
                                            setSelected6("");
                                            setSubtitle(menus.text);
                                        }}
                                        key={index}
                                    >
                                        <ListItemButton sx={{ pl: 3 }}>
                                            <ListItemIcon>
                                                <MoreHorizSharpIcon
                                                    style={
                                                        selected5 == menus.id
                                                            ? {
                                                                  color: "yellow",
                                                              }
                                                            : { color: "white" }
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={menus.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton onClick={Handle6Click}>
                            <ListItemIcon>
                                <HdrAutoIcon />
                            </ListItemIcon>
                            <ListItemText primary="공통 관리" />
                            {Col6open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={Col6open} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                {SubMenus5.map((menus, index) => (
                                    <Link
                                        to={"/" + menus.id}
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            ClickEvent();
                                            setSelected("");
                                            setSelected2("");
                                            setSelected3("");
                                            setSelected4("");
                                            setSelected5("");
                                            setSelected6(menus.id);
                                            setSubtitle(menus.text);
                                        }}
                                        key={index}
                                    >
                                        <ListItemButton sx={{ pl: 3 }}>
                                            <ListItemIcon>
                                                <MoreHorizSharpIcon
                                                    style={
                                                        selected6 == menus.id
                                                            ? {
                                                                  color: "yellow",
                                                              }
                                                            : { color: "white" }
                                                    }
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={menus.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                </Drawer>
            </ThemeProvider>
            <DrawerHeader />
        </Box>
    );
};

export default DrawerScreen;
