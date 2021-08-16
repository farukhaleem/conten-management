import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ResetPass } from './../Services/ResetPassword';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: '#fff'
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(1, 'auto'), 
		padding: 0,
	},
	margin: {
		margin: theme.spacing(1, 'auto'),
	},
	tokenHeading: {
		fontSize: 18,
		fontWeight: 600,
		marginBottom: 0
	  },
	error: {
		color: 'red'
	}
}));

let ChangePasswordForm = () => {
	const classes = useStyles();
	
	let [err, setErr] = useState('');
	let [resMsg, setResMsg] = useState('');
	
	const [newPassword, setNewPassword] = React.useState({
		value: '',
		showValue: false,
	});

	const [repeatPassword, setRepeatPassword] = React.useState({
		value: '',
		showValue: false,
	});

	const handleChange1 = (prop) => (e) => {
		setNewPassword({ ...newPassword, [prop]: e.target.value });
		if((e.target.value !== repeatPassword.value) && (repeatPassword.value !== '') && (e.target.value !== '')){
			setErr('Password should be same.');
		}else{
			setErr('');
		}
	};

	const handleChange2 = (prop) => (e) => {
		setRepeatPassword({ ...repeatPassword, [prop]: e.target.value });	
		if((e.target.value !== newPassword.value) && (newPassword.value !== '') && (e.target.value !== '')){
			setErr('Password should be same.');
		}else{
			setErr('');
		}

	};

	const handleClickShowPassword = () => {
		setNewPassword({ ...newPassword, showValue: !newPassword.showValue });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowRepeatPassword = () => {
		setRepeatPassword({ ...repeatPassword, showValue: !repeatPassword.showValue });
	};

	const handleMouseDownRepeatPassword = (event) => {
		event.preventDefault();
	};

	

	let handleSubmit = (e) => {
		e.preventDefault();

		async function fetchData(newPass, resPass) {
			let response = await ResetPass(newPass, resPass);
			if(response.status === 'success'){
				setResMsg("Your password has successfully changed. You need to login again.");
				
				localStorage.removeItem('user');
				localStorage.removeItem('id');
				localStorage.removeItem('userName');
				localStorage.removeItem('token');
				localStorage.removeItem('role');
				localStorage.removeItem('user_token');
				localStorage.removeItem('domain_token');
				localStorage.removeItem('pm');

				setTimeout(function(){ 
					window.location.href = '/'; 
				}, 3000);
			}
		}

		if(newPassword.value === '' || repeatPassword.value === ''){
			setErr('All fields are required.')
		}else if(newPassword.value.length < 6){
			setErr('Password should contain more then 6 characters')
		}else if(newPassword.value.length > 35){
			setErr('Password should not be more then 35 characters')
		}else{
			fetchData(newPassword.value, repeatPassword.value);
		}
	}

	return (
		<Container component="main">
			<Card className={classes.root} variant="elevation">
				<CardContent>
				<Typography gutterBottom variant="h5" component="h2" className={classes.tokenHeading}>
					Change Password
				</Typography>
				
				{resMsg ? <Alert severity="success">{resMsg}</Alert> : '' }
					<div className={classes.paper}>
						<form className={classes.form} noValidate onSubmit={handleSubmit}>
							<small className={classes.error} >{err}</small>
							<FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-password">Enter New Password</InputLabel>
								<OutlinedInput
									id="outlined-adornment-password"
									type={newPassword.showValue ? 'text' : 'password'}
									value={newPassword.password}
									onChange={ (e)=> {
										handleChange1("value")(e);
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												className="password-eye"
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{newPassword.showValue ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={160}
								/>
							</FormControl>
							<FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
								<InputLabel htmlFor="outlined-adornment-repeatpassword">Repeat Password</InputLabel>
								<OutlinedInput
									id="outlined-adornment-repeatpassword"
									type={repeatPassword.showValue ? 'text' : 'password'}
									value={repeatPassword.value}
									onChange={ (e)=> {
										handleChange2("value")(e);
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												className="password-eye"
												aria-label="toggle password visibility"
												onClick={handleClickShowRepeatPassword}
												onMouseDown={handleMouseDownRepeatPassword}
												edge="end"
											>
												{repeatPassword.showValue ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={140}
								/>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								{...(err && {disabled:true})}
								className={classes.submit}
							>
								Update
          					</Button>
						</form>
					</div>
				</CardContent>
			</Card>
		</Container>
	)
}

export default ChangePasswordForm;