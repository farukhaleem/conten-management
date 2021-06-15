import React from 'react'
import Alert from '@material-ui/lab/Alert';

let AlertMsg = (props) => {
    
    if(props.status) {
        return (
            <Alert severity={props.type}>{props.msg}</Alert>
        )
    }
    return '';
}

export default AlertMsg;
