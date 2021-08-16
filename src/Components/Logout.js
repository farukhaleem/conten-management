import { Redirect } from 'react-router-dom';

function Logout(){
    
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_token');
    localStorage.removeItem('domain_token');
    localStorage.removeItem('pm');
    
    return(<Redirect to='/' />);

}

export default Logout;