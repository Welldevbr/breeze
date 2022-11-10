import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


import { forwardRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export function AlertDialog() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const params = useParams<RoomParams>()
  const roomId: string | any = params.id


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/')
  }

  return (
    <div>
      <Button 
        variant="outlined" 
        style={
          {
            border: "1px solid #0052a3",
            borderRadius: "8px",
            color: "#0052a3",
            font: "400 1.4rem Roboto",
            textTransform: "capitalize",
          }
        } 
        onClick={handleClickOpen}
      >
        Encerrar Sala
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle textAlign={"center"} style={{fontSize: "1.8rem", marginTop: "20px"}}>
          {"Você deseja encerrar esta sala?"}
        </DialogTitle>
        <DialogContent style={{display: "flex", justifyContent: "center"}}>
          <DialogContentText 
            textAlign={"justify"}
            id="alert-dialog-description"
            style={
              {
                padding: "5px 10px",
                margin: "20px 25px",
                fontSize: "1.6rem",
              }
            }
          >
              Ao encerrar esta sala, os demais <br />
              usuarios não poderão entrar nesta <br />
              sala ou até mesmo enviar novas perguntas. <br />
              você tem certeza que deseja prosseguir?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{marginInline: "8px"}}>
          <Button 
            style={
              {
                color: "#0052a3", 
                font: "700 1.6rem Roboto",
                textTransform: "lowercase",
              }
            } 
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button 
            style={
              {
                color: "#e7405f", 
                font: "700 1.6rem Roboto",
                textTransform: "lowercase",
              }
            }  
            onClick={handleEndRoom} 
            autoFocus
          >
            Encerrar Sala
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}