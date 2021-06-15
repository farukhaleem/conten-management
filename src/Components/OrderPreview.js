import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderMenu from './HeaderMenu';
import Container from '@material-ui/core/Container';
import OrdersPreviewGrid from './OrdersPreviewGrid';

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

function OrderPreview() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HeaderMenu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="fluid">
          <h1>Order Preview</h1>
          <OrdersPreviewGrid />
        </Container>
      </main>
    </div>
  );
}

export default OrderPreview;