import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import "./Settings"

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import CloudinaryUploadWidget from '../CloudinaryWidget/CloudinaryUploadWidget';
import AddService from '../AddService/AddService';
import { getOptions } from '../../functions';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: "max-content",
  maxHeight: "80%",
  overflowX: "auto"
};

const modal = {
  color: "black",
  // overflowX: "scroll",
  // overflowY: "hidden",
};

const input = {
  width: "100%",
}

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

const del = {
  height: "10%",
  width: "80%",
  margin: "2%",
  alignSelf: "center",
  color:"red",
  fontFamily:"Manrope",
  fontSize: 12,
  border:"2px solid red",
  '&:hover': {
    backgroundColor: 'red',
    color: '#FFF',
    border:"2px solid red",
},
}

function Settings(props) {
  const { ip, uid, config, images, showModal, info, myServices, setShowServiceModal, setCurrentService, setOptions, setImages} = props

  useEffect(() => {

  },[info])

  let dispatch = useDispatch()

  async function handleClick(service) {
    await axios
      .get(ip + "/api/service/getone?id=" + service.idservices, config)
      .then((res) => {
        setCurrentService(res.data[0]);
        console.log(res.data[0])
      })
      .catch((err) => console.log(err));
      getOptions(ip, config, service.idservices, dispatch)
      setShowServiceModal(true)
  }

  function deleteImage(id) {
    axios
      .post(ip + "/api/image/delete", {
        id: id,
      })
      .then((res) => {
        axios
        .get(ip + "/api/image?idp=" + uid, config)
        .then((res) => {
          setImages(res.data);
        })
      })
      .catch((err) => console.log(err));
  }

  const [name, setName] = useState(info.name)
  const [adress, setAdress] = useState(info.adress)
  const [emadress, setEmadress] = useState(info.emadress)

  function handleInfoRefresh() {
    axios.put(ip + '/api/providers', {
      name: name,
      adress: adress,
      emadress: emadress,
      idp: uid
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => props.setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        color="black"
        sx={modal}
      >
        <Box sx={style}>
          <ImageList
            sx={{
              gridAutoFlow: "column",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
              gridAutoColumns: "minmax(200px, 1fr)",
            }}
          >
            {images.map((el, index) => (
              <ImageListItem key={el.idimage}>
                <img src={el.image_url} sx={{innerHeight: "10vh"}}/>
                {/* <ImageListItemBar title={"image"} /> */}
                <Button variant="outlined" sx={del} onClick={() => deleteImage(el.idimage)}>УДАЛИТЬ</Button>
              </ImageListItem>
            ))}
          </ImageList>
          <CloudinaryUploadWidget />
          <br></br>
          <br></br>
          <TextField defaultValue={info.name} id="outlined-basic" label="Название" variant="outlined" sx={input} onChange={(e) => setName(e.target.value)}/>
          <br></br>
          <br></br>
          <TextField defaultValue={info.adress} id="outlined-basic" label="Адрес" variant="outlined" sx={input} onChange={(e) => setAdress(e.target.value)}/>
          <br></br>
          <br></br>
          <TextField defaultValue={info.emadress} id="outlined-basic" label="Логин" variant="outlined" sx={input} onChange={(e) => setEmadress(e.target.value)}/>
          <br></br>
          <br></br>
          <Button key="refresh" variant="outlined" sx={btn} onClick={() => handleInfoRefresh()}>Обновить</Button>
          <br></br>
          <h2>Мои услуги:</h2>
          <Stack spacing={1} direction="column">
            {myServices.map((el) => (
              // <h4 key="{el.name}">{el.name}</h4>
              <Button key={el.name} variant="outlined" sx={btn} onClick={() => handleClick(el)}>{el.name}</Button>
            ))}
          </Stack>
          <br></br>
          <AddService />
        </Box>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, config:state.config, showModal: state.showModal, images: state.images, info: state.info, myServices: state.myServices };
};

export default connect(mapStateToProps, actions)(Settings);

