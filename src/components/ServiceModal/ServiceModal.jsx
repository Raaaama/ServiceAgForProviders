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

const modal = {
  color: "black",
  overflowX: "scroll",
  overflowY: "hidden",
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
  maxHeight: "80%",
  overflowX: "auto"
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

function ServiceModal(props) {
  const { ip, uid, config, images, showModal, info, myServices, showServiceModal, setShowServiceModal, currentService, options } = props

  let hasOptions = false;
  if (options.length != 0) {
    hasOptions = true;
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
          <TextField defaultValue={currentService.price} id="outlined-basic" label="Цена" variant="outlined" sx={input} />
          <br></br>
          <br></br>
          <TextField defaultValue={currentService.timePerService} id="outlined-basic" label="Время оказания услуги (мин.)" variant="outlined" sx={input} />
          <br></br>
          <br></br>
          <TextField defaultValue={currentService.description} id="outlined-basic" label="Описание" variant="outlined" sx={input} multiline rows={2}/>
          <br></br>
          <br></br>
          <Button key="refresh" variant="outlined" sx={btn}>Обновить</Button>
          <Options options={options} hasOptions={hasOptions} />
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

