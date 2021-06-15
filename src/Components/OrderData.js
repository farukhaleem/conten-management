import React, {useEffect, useState} from 'react'
import { getOrder } from './../Services/getOrdersService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link:{
      display: 'inline',
      textDecoration: 'underline',
      cursor: 'pointer',
      color: 'rgb(111 111 111 / 87%)',
      fontWeight: 600,
      fontSize: 14
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 600,
      maxWidth: 600,
      },
  }));

let OrderData = (props) => { 
    const classes = useStyles();
    
    let [order, setOrder] = useState({});
    const [dense, setDense] = React.useState(false);

    useEffect(() => {
        async function fetchData() {
          const orderData = await getOrder(props.orderId);
          setOrder(orderData[0]);
        }
        fetchData();
      }, [])

    return (
        <div className={classes.paper}>
            <div className={classes.demo}>
                <List dense={dense}>
                    <ListItem>
                        <ListItemText
                            primary="Order ID"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.order_code+order.order_id}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Total Amount"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.currency_code+' '+order.total_payment}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Paper Topic"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.topic}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Type Of Paper"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.paper_type_caption}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Deadline"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.deadline}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Style"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.style}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Language"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.language}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Nubmer Of Pages/Words"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.num_of_page+' pages / ' +order.num_of_page*250+' Word count'}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Academic Level"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.academic_level}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Subject Area"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.sub_area}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Number of References"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.num_ref}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Detail"
                        />
                        <ListItemSecondaryAction>
                        <ListItemText
                            primary={order.details}
                        />  
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default OrderData;

