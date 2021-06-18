import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderMenu from './HeaderMenu';
import Container from '@material-ui/core/Container';
import ChangePasswordForm from './ChangePasswordForm';

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

function ChangePassword(){
    const classes = useStyles();
    return(
      <div className={classes.root}>
      <HeaderMenu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false}>
          <h1>Change Password</h1>
          <ChangePasswordForm />
        </Container>
      </main>
    </div>  
    );
}

export default ChangePassword;