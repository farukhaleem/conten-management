import React, {useState, useContext} from 'react';
import { DomainPath } from './../App';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory , Redirect } from 'react-router-dom';
import { logIn } from './../Services/Login';

function Copyright() {
  
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" target="_blank" href={localStorage.getItem('domain_url')}>
      {localStorage.getItem('domain_name')}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  }

}));

export default function SignIn() {
  
  const classes = useStyles();
  const path = useContext(DomainPath);

  let initialError = {
    username : null,
    password : null,
  }

  let [username, setUser] = useState('');
  let [password, setPass] = useState('');
  let [request , setReq]  = useState('');
  let [error, setError] = useState(initialError);
  let history = useHistory();

  const validate = () => {
    
    let temp = {} ;
    temp.username = username ? '' : "* Email is required" ;
    temp.password = password ? '' : "* Password is required" ;
    setError({ 
      ...temp 
    })

    return Object.values(temp).every( x => x === "" )
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    
    validate();
    async function fetchData() {
        const user = await logIn(username, password);
        
        if(user.status === 'success'){
          
          localStorage.setItem('user', user.email);
          localStorage.setItem('id', user.user);
          localStorage.setItem('userName', user.c_name);
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', true);
          return history.push(path+'/')
        }else if(user.status === 'error'){
          setReq(user.msg);
        }
      
      }
      fetchData(); 
      
        
  } 
  
  if(localStorage.getItem('role')){
    return (<Redirect to={`${path}/`} />)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={ handleSubmit }>
          <span className={classes.error} >{request}</span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...(error.username && {error:true, helperText: error.username})}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=> { setUser(e.target.value); setReq('') } }
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            {...(error.password && {error:true, helperText: error.password})}
            id="password"
            onChange={(e)=> {setPass(e.target.value); setReq('') } }
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}