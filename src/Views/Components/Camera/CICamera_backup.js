import React, { Component } from "react";
import { Webcam } from "./webcam";
import "../../../CSS/Components/CICamera.css";
import axios from "axios";

class ClCamera extends Component {
	constructor(props) {
		super(props);
		this.webcam = null;
		this.state = {
			capturedImage: null,
			captured: false,
			uploading: false,
		};
	}

	componentDidMount() {
		// initialize the camera
		this.canvasElement = document.createElement("canvas");
		this.webcam = new Webcam(
			document.getElementById("webcam"),
			this.canvasElement
		);
		this.webcam.setup().catch(() => {
			console.log("Error getting access to your camera");
		});
	}

	componentDidUpdate(prevProps) {
		if (!this.props.offline && prevProps.offline === true) {
			// if its online,
			this.batchUploads();
		}
	}

	render() {
		const imageDisplay = this.state.capturedImage ? (
			<img
				src={this.state.capturedImage}
				alt="captured"
				width="100%"
				height="100%"
			/>
		) : (
			<span />
		);

		const buttons = this.state.captured ? (
			<div>
				<button className="deleteButton" onClick={this.discardImage}>
					{" "}
					Delete Photo{" "}
				</button>
				<button className="captureButton" onClick={this.uploadImage}>
					{" "}
					Upload Photo{" "}
				</button>
			</div>
		) : (
			<button className="captureButton" onClick={this.captureImage}>
				{" "}
				Take Picture{" "}
			</button>
		);

		const uploading = this.state.uploading ? (
			<div>
				<p> Uploading Image, please wait ... </p>
			</div>
		) : (
			<span />
		);

		const DelCapture = this.setState({
			captured: true,
		});

		return (
			<div>
				{uploading}
				{!this.state.captured && (
					<video
						autoPlay
						playsInline
						muted
						id="webcam"
						width="100%"
						height="100%"
					/>
				)}
				{this.state.captured && (
					<div className="imageCanvas">{imageDisplay}</div>
				)}
				{buttons}
			</div>
		);
	}

	captureImage = async () => {
		const capturedData = this.webcam.takeBase64Photo({
			type: "jpeg",
			quality: 0.8,
		});
		console.log(capturedData);
		this.setState({
			captured: true,
			capturedImage: capturedData.base64,
		});
	};

	discardImage = () => {
		this.setState({
			captured: false,
			capturedImage: null,
		});
	};

	uploadImage = () => {
		if (this.props.offline) {
			console.log("you're using in offline mode sha");
			// create a random string with a prefix
			const prefix = "cloudy_pwa_";
			// create random string
			const rs = Math.random().toString(36).substr(2, 5);
			localStorage.setItem(`${prefix}${rs}`, this.state.capturedImage);
			console.log(
				"Image saved locally, it will be uploaded to your Cloudinary media library once internet connection is detected"
			);
			this.discardImage();
			// save image to local storage
		} else {
			this.setState({ uploading: true });
			localStorage.setItem(
				"Camera",
				JSON.stringify({
					date: new Date(),
					file: this.state.capturedImage,
					upload_preset: process.env.REACT_APP_CLOUD_PRESET,
				})
			);
			// axios.post(
			//     `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
			//     {
			//         file: this.state.capturedImage,
			//         upload_preset: process.env.REACT_APP_CLOUD_PRESET
			//     }
			// ).then(
			//     (data) => this.checkUploadStatus(data)
			// )
			//     .catch((error) => {
			//         alert('Sorry, we encountered an error uploading your image');
			//         this.setState({ 'uploading': false });
			//     });
		}
	};

	findLocalItems = (query) => {
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

	checkUploadStatus = (data) => {
		this.setState({ uploading: false });
		if (data.status === 200) {
			console.log("Image Uploaded to Cloudinary Media Library");
			this.discardImage();
		} else {
			console.log("Sorry, we encountered an error uploading your image");
		}
	};
	batchUploads = () => {
		// this is where all the images saved can be uploaded as batch uploads
		const images = this.findLocalItems(/^cloudy_pwa_/);
		let error = false;
		if (images.length > 0) {
			this.setState({ uploading: true });
			for (let i = 0; i < images.length; i++) {
				// upload
				// axios.post(
				//     `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
				//     {
				//         file: images[i].val,
				//         upload_preset: process.env.REACT_APP_CLOUD_PRESET
				//     }
				// ).then((data) => this.checkUploadStatus(data)).catch((error) => {
				//     error = true;
				// })
				localStorage.setItem("Camera", {
					file: images[i].val,
					upload_preset: process.env.REACT_APP_CLOUD_PRESET,
				});
			}
			this.setState({ uploading: false });
			if (!error) {
				console.log(
					"All saved images have been uploaded to your Cloudinary Media Library"
				);
			}
		}
	};
}
export default ClCamera;
