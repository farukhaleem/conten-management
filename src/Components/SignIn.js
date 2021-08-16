import React, {useState, useContext}  from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory , Redirect } from 'react-router-dom';
import { logIn } from './../Services/Login';
import { DomainPath } from './../App';

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

  const path = useContext(DomainPath);
  const classes = useStyles();

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
    temp.username = username ? '' : "Error: Email is required" ;
    temp.password = password ? '' : "Error: Password is required" ;
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
          localStorage.setItem('user_token', user.user_token);
          localStorage.setItem('domain_token', user.domain_token);
          localStorage.setItem('pm', user.pm);
          path[1](pre => ({...pre, ...user}));
          
          return history.push('/')
        
        }else if(user.status === 'error'){
          setReq(user.msg);
        }
      
      }
      fetchData(); 
  } 
  
  if(localStorage.getItem('role')){
    return (<Redirect to='/' />)
  }

  document.title = `Login | ${localStorage.getItem('domain_name')}`;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link color="inherit" target="_blank" href={localStorage.getItem('domain_url')}>
          <img src={localStorage.getItem('domain_url')+'/assets/images/logo.png'} alt="logo" className="logo"/>
        </Link>
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