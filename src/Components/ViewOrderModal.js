import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import OrderData from './OrderData';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  link:{
    display: 'inline',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'rgb(111 111 111 / 87%)',
    fontWeight: 600,
    fontSize: 14
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 600,
    maxWidth: 600,
    },
}));

  
export default function ViewOrderModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
    
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <div style={{display: 'inline'}}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        View Details
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <OrderData orderId={props.orderId}/>
        </Fade>
      </Modal>
    </div>
  );
}