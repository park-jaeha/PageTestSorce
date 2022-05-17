import * as React from "react";
/** Css Import */
import "../../../CSS/Components/CICamera.css";
/** Component Import */
import { Webcam } from "./webcam";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import BasicButton from "../Button_Basic";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CICamera = (props) => {
    var webcam = null;
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [captured, setCaptured] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);

    React.useEffect(() => {
        const canvasElement = document.createElement("canvas");
        setTimeout(() => {
            webcam = new Webcam(
                document.getElementById("webcam"),
                canvasElement
            );
            webcam.setup().catch(() => {
                console.log("Error getting access to your camera");
            });
        }, 800);
    });

    React.useEffect(() => {
        if (!props.offline == true) {
            batchUploads();
        }
    }, [props.offline]);

    const findLocalItems = (query) => {
        var i,
            results = [];
        for (i in localStorage) {
            if (localStorage.hasOwnProperty(i)) {
                if (i.match(query) || (!query && typeof i === "string")) {
                    const value = localStorage.getItem(i);
                    results.push({ key: i, val: value });
                }
            }
        }
        return results;
    };

    const captureImage = async () => {
        const capturedData = webcam.takeBase64Photo({
            type: "jpeg",
            quality: 1,
        });
        // const capturedData = webcam.takeBlobPhoto();
        console.log(capturedData);
        setCaptured(true);
        setCapturedImage(capturedData.base64);
    };

    const discardImage = () => {
        setCaptured(false);
        setCapturedImage(null);
    };

    const uploadImage = () => {
        if (props.offline) {
            console.log("you're using in offline mode sha");
            // create a random string with a prefix
            const prefix = "cloudy_pwa_";
            // create random string
            const rs = Math.random().toString(36).substr(2, 5);
            localStorage.setItem(`${prefix}${rs}`, capturedImage);
            console.log(
                "Image saved locally, it will be uploaded to your Cloudinary media library once internet connection is detected"
            );
            discardImage();
        } else {
            setUploading(true);
            localStorage.setItem(
                "Camera",
                JSON.stringify({
                    date: new Date(),
                    file: capturedImage,
                    upload_preset: process.env.REACT_APP_CLOUD_PRESET,
                })
            );
            props.UploadTest(capturedImage);
            props.onClose();
        }
    };

    const checkUploadStatus = (data) => {
        setUploading(false);
        if (data.status === 200) {
            console.log("Image Uploaded to Cloundinary Media Library");
            discardImage();
        } else {
            console.log("Sorry, we encountered an error uploading your image");
        }
    };
    const batchUploads = () => {
        const images = findLocalItems(/^cloudy_pwa_/);
        if (images.length > 0) {
            setUploading(true);
            for (let i = 0; i < images.length; i++) {
                localStorage.setItem("Camera", {
                    file: images[i].val,
                    upload_preset: process.env.REACT_APP_CLOUD_PRESET,
                });
            }
            setUploading(false);
        }
    };

    const imageDisplay = capturedImage ? (
        <img
            src={capturedImage}
            alt="captured"
            style={{
                width: "100%",
                height: "80vh",
            }}
        />
    ) : (
        <span />
    );

    const buttons = captured ? (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <BasicButton name="삭제" buttonPress={discardImage} width="40%" />
            <BasicButton name="업로드" buttonPress={uploadImage} width="40%" />
        </div>
    ) : (
        <BasicButton name="촬영" buttonPress={captureImage} width="80%" />
    );

    return (
        <div>
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
                            사진 등록
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {!captured && (
                        <div
                            style={{
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <video
                                autoPlay
                                playsInline
                                muted
                                id="webcam"
                                style={{
                                    width: "100%",
                                    objectFit: "fill",
                                    height: "80vh",
                                    marginBottom: "8px",
                                }}
                            />
                        </div>
                    )}
                    {captured && <div>{imageDisplay}</div>}
                    {buttons}
                </div>
            </Dialog>
        </div>
    );
};

export default CICamera;
