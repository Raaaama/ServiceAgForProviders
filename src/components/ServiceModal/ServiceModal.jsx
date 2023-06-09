import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Options from '../Options/Options';
import OptionEditor from '../OptionEditor/OptionEditor';
import { refreshMyServices, refreshNewServices, deleteService } from '../../functions.jsx';
import { useDispatch } from 'react-redux';

const modal = {
  color: "black",
  overflowX: "hidden",
  overflowY: "scroll",
  height: "100%",
};

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
  maxHeight: "84%",
  overflowY: "auto",
  // overflowX: "hidden"
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

const redBtn = {
  width: "100%",
  color: "red",
  outline: "red",
  fontFamily: "Manrope",
  border: "2px solid red",
  "&:hover": {
    backgroundColor: "red",
    color: "#FFF",
    border: "2px solid red",
  },
};

function ServiceModal(props) {
  const { ip, uid, config, images, showModal, info, myServices, showServiceModal, setShowServiceModal, currentService, options } = props

  const [price, setPrice] = useState(currentService.price)
  const [timePerService, setTimePerService] = useState(currentService.timePerService)
  const [description, setDescription] = useState(currentService.description ? currentService.description : "")

  const dispatch = useDispatch()

  let hasOptions = false;
  if (options.length != 0) {
    hasOptions = true;
  }

  function handleUpdateService(id) {
    axios.put(ip + '/api/service', {
      id: id,
      price: price,
      timePerService: timePerService,
      description: description
    })
    .catch((err) => console.log(err));
  }

  async function handleDeleteService(id) {
    try {
      let res = await deleteService(ip, uid, config, dispatch, id);
      setShowServiceModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Modal
        open={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        color="black"
        sx={modal}
      >
        <Box sx={style}>
          <TextField defaultValue={currentService.price} onChange={(e) => setPrice(e.target.value)} id="outlined-basic" label="Цена" variant="outlined" sx={input} />
          <br></br>
          <br></br>
          <TextField defaultValue={currentService.timePerService} onChange={(e) => setTimePerService(e.target.value)} id="outlined-basic" label="Время оказания услуги (мин.)" variant="outlined" sx={input} />
          <br></br>
          <br></br>
          <TextField defaultValue={currentService.description ? currentService.description : ""} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Описание" variant="outlined" sx={input} multiline rows={2}/>
          <br></br>
          <br></br>
          <Button key="refresh" variant="outlined" sx={btn} onClick={() => handleUpdateService(currentService.idservices)}>Обновить</Button>
          <Options options={options} hasOptions={hasOptions} />
          <br></br>
          <Button key="refresh" variant="outlined" sx={redBtn} onClick={() => handleDeleteService(currentService.idservices)}>Удалить услугу</Button>
        </Box>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ip: state.ip, uid: state.uid, config:state.config, showModal: state.showModal, images: state.images, 
    info: state.info, myServices: state.myServices, showServiceModal: state.showServiceModal, 
    currentService:state.currentService, options: state.options };
};

export default connect(mapStateToProps, actions)(ServiceModal);

