import {useContext} from 'react';
import { DomainPath } from './../App';

function Logout(){
    const path = useContext(DomainPath);
    
    localStorage.clear();
    window.location.href = path;

}

export default Logout;