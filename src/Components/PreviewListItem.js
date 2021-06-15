import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	listItem: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 0,
        // borderBottom: '1px solid #f8f5f5'
	},
    listChild:{
        lineHeight: 1,
        padding: '4px 0'
    },
    title:{

    },
    desc:{
        textAlign: 'right',
        width: '60%',
        fontWeight: 'inherit',
    }
}));


let PreviewListItem = (props) => {
    const classes = useStyles();
    if(!props.itemData){
        return '';
    }else{
        return (
            <ListItem className={classes.listItem} style={props.style} >
                <Typography className={clsx(classes.title, classes.listChild)} color="textSecondary" gutterBottom>
                    {props.itemTitle}
                </Typography>
                <Typography component="h6" className={clsx(classes.desc, classes.listChild)} >
                    {props.itemData}
                </Typography>
            </ListItem>
        )
    }    
}

export default PreviewListItem;