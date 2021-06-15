import React from 'react';
import DashboardCards from './DashboardCards';
import OrdersGrid from './OrdersGrid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import HeaderMenu from './HeaderMenu';


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
})
);

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HeaderMenu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="fluid">
          <DashboardCards />
          <h2>Recent Orders</h2>
          <OrdersGrid />
        </Container>
      </main>
    </div>
  );
}

export default Home;