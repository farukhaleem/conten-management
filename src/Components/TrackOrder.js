import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderMenu from './HeaderMenu';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TrackOrderItem from './TrackOrderItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingBottom: 50,
    position: 'relative',
    background: '#f4f0f4'
  }
}));


function TrackOrder() {
  const classes = useStyles();
  let [item, setItem] = useState('');
  
  let [orderId, setOrderId] = useState('');

  let hendleupdate = () => {
    setOrderId(item);
  }
  document.title = `Track Order | ${localStorage.getItem('userName')} | ${localStorage.getItem('domain_name')}`;

  return (
    <div className={classes.root}>
      <HeaderMenu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false}>
          <h1>Track Order</h1>
          <TextField
            required
            autoFocus
            style={{width: 360}}
            id="outlined-required"
            label="Enter your order"
            onChange={(e)=> setItem(e.target.value)}
            placeholder={'eg# '+localStorage.getItem('domain_code')+"2511"}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ padding: 13, margin: 'auto 10px', fontSize: 15}}
            onClick={hendleupdate}
          >
            Submit
          </Button>
          <div style={{marginTop: 20}}>
              <TrackOrderItem orderId={orderId}/>
          </div>
        </Container>
        
      </main>
    </div>
  );
}

export default TrackOrder;