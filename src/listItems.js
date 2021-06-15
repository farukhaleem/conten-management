import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { DomainPath } from './App';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BarChartIcon from '@material-ui/icons/BarChart';

export function MainListItems() {
  const path = useContext(DomainPath);
  
  let initObj = {
    dashboard: "",
    placeorder: "",
    preview: "",
    track: ""
  }

  let url = window.location.hash;
  switch(url){
    case '#/' : initObj.dashboard = 'active'; break;
    case '#/placeorder' : initObj.placeorder= 'active'; break;
    case '#/order_preview' : initObj.preview   = 'active'; break;
    case '#/track_order' : initObj.track     = 'active'; break;
    default:  initObj.track = '';
  }

  return (
    <div>
      <Link to={`${path}/`} className={`nav-link ${initObj.dashboard}`}>
        <ListItem button className={`navBtn`} >
          <ListItemIcon >
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to={`${path}/placeorder`} className={`nav-link ${initObj.placeorder}`} >
        <ListItem button className="navBtn">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Place New Order" />
        </ListItem>
      </Link>
      <Link to={`${path}/order_preview`} className={`nav-link ${initObj.preview}`} >
        <ListItem button className="navBtn">
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText primary="Order Preview" />
        </ListItem>
      </Link>
      <Link to={`${path}/track_order`} className={`nav-link ${initObj.track}`} >
        <ListItem button className="navBtn">
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Track your Order" />
        </ListItem>
      </Link>
    </div>
  );
}
