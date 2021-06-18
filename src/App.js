import React, {createContext, useEffect} from 'react';
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

const path = '';
export const DomainPath = createContext(path);
  
function App() {


  useEffect(() => {
    async function fetchData() {
      const brandDetails = await fetchBrandDetails();
      localStorage.setItem('domain_name', brandDetails.name);
      localStorage.setItem('domain_url', 'https://'+brandDetails.domain_name);
      localStorage.setItem('domain_code', brandDetails.domain_code+'-100');

      document.getElementById("favicon").href= localStorage.getItem('domain_url')+'/favicon.png'
      document.title = localStorage.getItem('domain_name')+' | Student Area';

    }
    fetchData();
  }, [])
  
  return (
    <DomainPath.Provider value={path} >
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