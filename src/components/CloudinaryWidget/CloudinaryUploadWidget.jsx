import React, { Component } from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import Button from '@mui/material/Button';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import axios from "axios";

const btn = {
  width: "100%",
  color:"black",
  outline:"black",
  fontFamily:"Manrope",
  border:"2px solid black",
  '&:hover': {
    backgroundColor: '#000',
    color: '#FFF',
    border:"2px solid black",
},
}

const addImage = (ip, idp, config, url, setImages) => {
  axios.post(ip + '/api/image', {
    idp: idp,
    url: url,
  })
  .then(() => {
    axios
      .get(ip + "/api/image?idp=" + idp, config)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
};

class CloudinaryUploadWidget extends Component {

  componentDidMount() {
    const cloudName = "dlsqc5jra"; // replace with your own cloud name
    const uploadPreset = "ml_default"; // replace with your own upload preset

    const {ip,uid,config, setImages} = this.props

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // console.log("Done! Here is the image info: ", result.info);
          // console.log(result.info)
          addImage(ip, uid, config, result.info.secure_url, setImages)
          // document
          //   .getElementById("uploadedimage")
          //   .setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      // <button " className="cloudinary-button">
      //   Upload
      // </button>
      <Button id="upload_widget" key="refresh" variant="outlined" sx={btn}>Добавить картинку</Button>
    );
  }
}


const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, config: state.config };
};

export default connect(mapStateToProps, actions)(CloudinaryUploadWidget);
