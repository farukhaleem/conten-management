import React, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { DomainPath } from './../App';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: '100vh'
    },
    notfound: {
        maxWidth: 520,
        width: '100%',
        lineHeight: '1.4',
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translate(-50%,-50%)',
        MsTransform: 'translate(-50%,-50%)',
        transform: 'translate(-50%,-50%)',
    },
    notfound404: {
        position: 'relative',
        height: 240
    },
    topHeading: {
        fontFamily: 'cabin,sans-serif',
        position: 'relative',
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#262626',
        margin: 0,
        letterSpacing: 3,
        paddingLeft: 6,
    },
    mainHeading: {
        fontFamily: 'montserrat,sans-serif',
        position: 'absolute',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translate(-50%,-50%)',
        MsTransform: 'translate(-50%,-50%)',
        transform: 'translate(-50%,-50%)',
        fontSize: '252px',
        fontWeight: '900',
        margin: '0',
        color: '#262626',
        textTransform: 'uppercase',
        letterSpacing: '-40px',
        marginLeft: '-20px',
    },
    mainHeadingItem: {
        textShadow: '-8px 0 0 #fff'
    },
    subPara: {
        fontFamily: 'cabin,sans-serif',
        fontSize: 20,
        fontWeight: 400,
        textTransform: 'uppercase',
        color: '#000',
        marginTop: 0,
        marginBottom: 25,
    }
    
}));

export default function NotFound() {
    const path = useContext(DomainPath);
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <div className={classes.notfound}>
                <div className={classes.notfound404}>
                    <h3 className={classes.topHeading} >Oops! Page not found</h3>
                    <h1 className={classes.mainHeading} >
                        <span className={classes.mainHeadingItem} >4</span>
                        <span className={classes.mainHeadingItem} >0</span>
                        <span className={classes.mainHeadingItem} >4</span>
                    </h1>
                </div>
                <h2 className={classes.subPara} >
                    we are sorry, but the page you requested was not found
                </h2>
                <Button variant="contained" color="primary">
                    <Link
                        to={`${path}/`} 
                        className="nav-link"
                        style={{color:"#fff"}}
                    >
                        Go to Home Page
                    </Link>
                </Button>
            </div>
        </div>
    )
}
