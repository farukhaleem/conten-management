import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Components/Home';
import PlaceOrder from './Components/PlaceOrder';
import OrderPreview from './Components/OrderPreview';
import TrackOrder from './Components/TrackOrder';
import ChangePassword from './Components/ChangePassword';
import Logout from './Components/Logout';
import HeaderMenu from './Components/HeaderMenu';

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

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderMenu />
      
      {/* <Router>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/placeorder" component={PlaceOrder}/>
                  <Route exact path="/order_preview" component={OrderPreview}/>
                  <Route exact path="/track_order" component={TrackOrder}/>
                  <Route exact path="/change_password" component={ChangePassword}/>
                  <Route exact path="/logout" component={Logout}/>
                  <Route path="*" component={()=><h2>404 Not Found</h2>}/>
              </Switch>
        </main>
      </Router> */}

    </div>
  );
}