import React, {createContext, useEffect, useState} from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import PlaceOrder from './Components/PlaceOrder';
import OrderPreview from './Components/OrderPreview';
import TrackOrder from './Components/TrackOrder';
import ChangePassword from './Components/ChangePassword';
import Logout from './Components/Logout';
import NotFound from './Components/NotFound';
import './App.css';
import {fetchBrandDetails} from './Services/getOrdersService';

let path = {};
export const DomainPath = createContext(path);
  
function App() {

  let brandDetail = useState({}); 

  useEffect(() => {
    async function fetchData() {
      const brandDetails = await fetchBrandDetails();
      
      localStorage.setItem('domain_name', brandDetails.name);
      localStorage.setItem('domain_url', 'https://'+brandDetails.domain_name);
      localStorage.setItem('domain_code', brandDetails.domain_code+'-100');
      localStorage.setItem('marchantToken', brandDetails.marchantToken);
      localStorage.setItem('starting', brandDetails.startingPrice);
      localStorage.setItem('region',brandDetails.region);
      
      brandDetail[1](pre => ({...pre, ...brandDetails}));
      document.getElementById("favicon").href= localStorage.getItem('domain_url')+'/favicon.png'      
    }
    fetchData();
  }, []);
  
  return (
    <DomainPath.Provider value={brandDetail} >
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={SignIn}/>
          <Route path="/placeorder" component={PlaceOrder}/>
          <Route path="/order_preview" component={OrderPreview}/>
          <Route path="/track_order" component={TrackOrder}/>
          <Route path="/change_password" component={ChangePassword}/>
          <Route path="/logout" component={Logout}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
    </DomainPath.Provider>
  );
}

export default App;