import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import * as yup from 'yup';
import { Formik, Form } from "formik";
import { submitFormData } from './../Services/PlaceOrder';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import TransitionsModal from './TermsCondition';

registerPlugin(
	FilePondPluginFileValidateType, 
	FilePondPluginImageExifOrientation, 
	FilePondPluginImagePreview,
	FilePondPluginFileValidateSize
);

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: 0,
		width: 'auto',
		float: 'right',
		padding: 0
	},
	formControl: {
		minWidth: '100%',
	},
	error: {
		color: 'red'
	},
	toLink: {
		fontSize: 16,
		fontWeight: 600,
		color: 'rgba(0, 0, 0, 0.54)'
	}
}));


export default function PlaceOrderForm(props) {

    let pond = {} ;
    let [state, setState] = useState({
        files: []
    })
  
    let handleInit = () => {
        // console.log('FilePond instance has initialised', pond);
    }
	let errorDeadline = false;
	let errorDeadlineText = '';
	let [disable, setDisable]= useState(true);

	const subjectItems = [
		{ title:'' ,value: 0},
		{ title:'Art, Media &amp; Literature' ,value: 1},
		{ title:'Art' ,value: 2},
		{ title:'Communications' ,value: 3},
		{ title:'Design' ,value: 4},
		{ title:'Drama' ,value: 5},
		{ title:'English Language' ,value: 6},
		{ title:'English Literature' ,value: 7},
		{ title:'Fashion' ,value: 8},
		{ title:'Film Studies' ,value: 9},
		{ title:'Linguistics' ,value: 10},
		{ title:'Media' ,value: 11},
		{ title:'Music' ,value: 12},
		{ title:'Photography' ,value: 13},
		{ title:'Theatre Studies' ,value: 14},
		{ title:'Business &amp; Management' ,value: 15},
		{ title:'Advertising - Public Relations' ,value: 16},
		{ title:'Business' ,value: 17},
		{ title:'Employment' ,value: 18},
		{ title:'Health and Safety' ,value: 19},
		{ title:'Human Resource Management' ,value: 20},
		{ title:'Management' ,value: 21},
		{ title:'Marketing' ,value: 22},
		{ title:'Security Risk Management' ,value: 23},
		{ title:'Tourism Hospitality' ,value: 24},
		{ title:'Computing &amp; ICT' ,value: 25},
		{ title:'Computer Science' ,value: 26},
		{ title:'Information Systems' ,value: 27},
		{ title:'Information Technology' ,value: 28},
		{ title:'Construction &amp; Engineering' ,value: 29},
		{ title:'Architecture' ,value: 30},
		{ title:'Construction' ,value: 31},
		{ title:'Engineering' ,value: 32},
		{ title:'Estate Management' ,value: 33},
		{ title:'Housing' ,value: 34},
		{ title:'Quantity Surveying' ,value: 35},
		{ title:'Real Estate' ,value: 36},
		{ title:'Town &amp; Country Planning' ,value: 37},
		{ title:'Education' ,value: 38},
		{ title:'Children &amp; Young People' ,value: 39},
		{ title:'Education' ,value: 40},
		{ title:'Methodology' ,value: 41},
		{ title:'PGCE' ,value: 42},
		{ title:'Physical Education' ,value: 43},
		{ title:'Teacher Training' ,value: 44},
		{ title:'TESOL' ,value: 45},
		{ title:'Finance &amp; Economics' ,value: 46},
		{ title:'Accounting' ,value: 47},
		{ title:'Econometrics' ,value: 48},
		{ title:'Economics' ,value: 49},
		{ title:'Finance' ,value: 50},
		{ title:'Health &amp; Nursing' ,value: 51},
		{ title:'Counselling' ,value: 52},
		{ title:'Food and Nutrition' ,value: 53},
		{ title:'Health' ,value: 54},
		{ title:'Health &amp; Social Care' ,value: 55},
		{ title:'Mental Health' ,value: 56},
		{ title:'Nursing' ,value: 57},
		{ title:'Occupational Therapy' ,value: 58},
		{ title:'Psychology' ,value: 59},
		{ title:'Psychotherapy' ,value: 60},
		{ title:'Social Work' ,value: 61},
		{ title:'Languages' ,value: 62},
		{ title:'French Literature' ,value: 63},
		{ title:'German Literature' ,value: 64},
		{ title:'Spanish Literature' ,value: 65},
		{ title:'Translation' ,value: 66},
		{ title:'Law' ,value: 67},
		{ title:'Alternative Dispute Resolution (ADR) - Mediation' ,value: 68},
		{ title:'Civil Litigation Law' ,value: 69},
		{ title:'Company - Business - Partnership Law' ,value: 70},
		{ title:'Commercial Law' ,value: 71},
		{ title:'Comparative - Conflict of Laws' ,value: 72},
		{ title:'Competition Law' ,value: 73},
		{ title:'Constitutional - Administrative/Public Law' ,value: 74},
		{ title:'Construction Law' ,value: 75},
		{ title:'Contract Law' ,value: 76},
		{ title:'Consumer - Consumer Rights Law' ,value: 77},
		{ title:'Criminal Law' ,value: 78},
		{ title:'Criminal Litigation (Law)' ,value: 79},
		{ title:'Criminal Justice System - Process (Law)' ,value: 80},
		{ title:'Employment Law' ,value: 81},
		{ title:'English Legal System (Law)' ,value: 82},
		{ title:'Environmental - Biodiversity - Planning Law' ,value: 83},
		{ title:'Equity &amp; Trusts Law' ,value: 84},
		{ title:'European (EU) Law' ,value: 85},
		{ title:'Family Law' ,value: 86},
		{ title:'Finance Law' ,value: 87},
		{ title:'General Law' ,value: 88},
		{ title:'Human Rights' ,value: 89},
		{ title:'Human Rights Law' ,value: 90},
		{ title:'Immigration - Refugee Law' ,value: 91},
		{ title:'Information - Media &amp; Technology Law' ,value: 92},
		{ title:'International Commercial Law' ,value: 93},
		{ title:'International Criminal Law' ,value: 94},
		{ title:'International Law' ,value: 95},
		{ title:'International Trade - Sale of Goods Law' ,value: 96},
		{ title:'Intellectual Property Law' ,value: 97},
		{ title:'Investment - WTO Law' ,value: 98},
		{ title:'Jurisprudence (Law)' ,value: 99},
		{ title:'Landlord &amp; Tenant - Housing Law' ,value: 100},
		{ title:'Land - property Law' ,value: 101},
		{ title:'Law of Evidence' ,value: 102},
		{ title:'Law of the Sea - Territorial Waters Law' ,value: 103},
		{ title:'Legal Professional Ethics (Law)' ,value: 104},
		{ title:'Maritime - Marine Insurance Law' ,value: 105},
		{ title:'Medical Law' ,value: 106},
		{ title:'Mental Health Law' ,value: 107},
		{ title:'Oil &amp; Gas Law' ,value: 108},
		{ title:'Social Work Law' ,value: 109},
		{ title:'Sports Law' ,value: 110},
		{ title:'Tax - Revenue Law' ,value: 111},
		{ title:'Tort Law' ,value: 112},
		{ title:'Mathematics &amp; Statistics' ,value: 113},
		{ title:'Maths' ,value: 114},
		{ title:'SPSS' ,value: 115},
		{ title:'Statistics' ,value: 116},
		{ title:'Medical Sciences' ,value: 114},
		{ title:'Dentistry' ,value: 115},
		{ title:'Medicine' ,value: 116},
		{ title:'Paramedic Studies' ,value: 117},
		{ title:'Radiology &amp; Medical Technology' ,value: 118},
		{ title:'Politics &amp; International Relations' ,value: 119},
		{ title:'European Studies' ,value: 120},
		{ title:'International Political Economy' ,value: 121},
		{ title:'International Relations' ,value: 122},
		{ title:'International Studies' ,value: 123},
		{ title:'Politics' ,value: 124},
		{ title:'Public Administration' ,value: 125},
		{ title:'Social Policy' ,value: 126},
		{ title:'Science' ,value: 127},
		{ title:'Animal - Plant Biology' ,value: 128},
		{ title:'Biology' ,value: 129},
		{ title:'Chemistry' ,value: 130},
		{ title:'Environmental Sciences' ,value: 131},
		{ title:'Environment' ,value: 132},
		{ title:'Forensic Science' ,value: 133},
		{ title:'Geography' ,value: 134},
		{ title:'Geology' ,value: 135},
		{ title:'Pharmacology' ,value: 136},
		{ title:'Physics' ,value: 137},
		{ title:'Social Sciences' ,value: 138},
		{ title:'Anthropology' ,value: 139},
		{ title:'Archaeology' ,value: 140},
		{ title:'Criminology' ,value: 141},
		{ title:'Cultural Studies' ,value: 142},
		{ title:'History' ,value: 143},
		{ title:'Philosophy' ,value: 144},
		{ title:'Sociology' ,value: 145},
		{ title:'Theology &amp; Religion' ,value: 146},
		{ title:'Sport &amp; Exercise Sciences' ,value: 147},
		{ title:'Health Psychology' ,value: 148},
		{ title:'Physiotherapy' ,value: 149},
		{ title:'Sports Psychology' ,value: 150},
		{ title:'Sports Science' ,value: 151}
	  ];

	const classes = useStyles();
	
	async function submitForm(values) {

		const formData = new FormData();

		let len = document.querySelectorAll('[name="image"]').length
		for(var i = 0; i < len; i++){
			let x = document.querySelectorAll('[name="image"]')[i].value;
			formData.append('image[]', x);
		}		

		formData.append('user', localStorage.getItem('id'));
        formData.append('order_code', localStorage.getItem('domain_code'));
        formData.append('pdt_caption', props.pdtCaption[0]);
        formData.append('sub_area_caption', props.subject[0]);
        formData.append('paperTopic', values.paperTopic);
        formData.append('paperType', values.paperType);
        formData.append('deadline', values.deadline);
        formData.append('style', values.style);
        formData.append('language', values.language);
        formData.append('pages', values.pages);
        formData.append('pageType', values.pageType);
        formData.append('academicLevel', values.academicLevel);
        formData.append('subjectArea', values.subjectArea);
        formData.append('references', values.references);
        formData.append('detail', values.detail);
        formData.append('totalCost', values.totalCost);
        formData.append('currency', values.currency);
        const response = await submitFormData(formData);
		
		if(response.status === 'success'){
			window.location.href = '/api/payment-proceed.php?token='+localStorage.getItem('token')+'&order_id='+response.order_id+'&user_token='+localStorage.getItem('user_token')+'&domain_token='+localStorage.getItem('domain_token') ;
		}
	}
	
	const handleUpdate = e => {
		const { name, value } = e.target;
		props.state[1](prevState => ({
				...prevState,
				[name]: value
		}));	
	};

	let a = new Date();
	let b = new Date(a.getTime()+(1000*60*60*24*10));
	let c = b.getFullYear();
	let d = b.getMonth()+1;
	let e = b.getDate();

	if(d < 10){ d = '0'+d; }
	if(e < 10){ e = '0'+e; }

	const initialDeadline = c+'-'+d+'-'+e+'T00:00';
	
	const handleUpdateType = e => {
		switch(e.target.value){
			case 11: 	props.pdtCaption[1]('Assignment')				; break;
			case 16: 	props.pdtCaption[1]('Admission Essay')			; break;
			case 118: 	props.pdtCaption[1]('Application Essay')		; break;
			case 4: 	props.pdtCaption[1]('Book Report')				; break;
			case 8: 	props.pdtCaption[1]('Term Paper')				; break;
			case 9: 	props.pdtCaption[1]('Coursework')				; break;
			case 17: 	props.pdtCaption[1]('Case Study')				; break;
			case 10: 	props.pdtCaption[1]('Dissertation')				; break;
			case 127: 	props.pdtCaption[1]('Dissertation Proposal')	; break;
			case 1: 	props.pdtCaption[1]('Essays')					; break;
			case 119: 	props.pdtCaption[1]('Entrance Essay')			; break;
			case 7: 	props.pdtCaption[1]('Research Papers')			; break;
			case 122: 	props.pdtCaption[1]('Research Proposal')		; break;
			case 121: 	props.pdtCaption[1]('Thesis Proposal')			; break;
			case 120: 	props.pdtCaption[1]('Papers')					; break;
			case 125: 	props.pdtCaption[1]('Powerpoint Presentation')	; break;
			case 117: 	props.pdtCaption[1]('Scholarship Essay')		; break;
			default: 	props.pdtCaption[1]('');
		}		
	};

	let SignupSchema = yup.object().shape({
		paperTopic: yup.string().required('Paper Topic is required.'),
		paperType: yup.string().required('Paper Type is required.'),
		deadline: yup.string().required('Deadline is required.'),
		style: yup.string().required('Style is required.'),
		language: yup.string().required('Language is required.'),
		pages: yup.string().required('No. of Pages/ Word Count is required.'),
		subjectArea: yup.string().required('Subject Area is required.'),
		references: yup.string().required('No of References is required.'),
		term: yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
	});

	
	
	return (
		<div>
			<CssBaseline />
			<div className={classes.paper}>
				<Box component="h2" m={0}>
					Place Your Order
				</Box>
				<Formik
					initialValues={{
						paperTopic: "",
						paperType: "",
						deadline: initialDeadline,
						style: "",
						language: "",
						pages: "",
						subjectArea: "",
						references: "",
						currency:"GBP",
						costPerPage: props.costPerPage[0],
						totalCost: 0,
						pageType: "single space",
						academicLevel: "High School",
						detail: "",
						term: false,
					}}
					validationSchema={SignupSchema}
					onSubmit={values => {
						submitForm(values);
					}}
				>
					{({ errors, handleChange, touched, values }) => {
						(Object.keys(errors).length === 0)
						? setDisable(false)
						: setDisable(true) ;
						
						return(
						<Form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="paperTopic"
										name="paperTopic"
										variant="outlined"
										required
										fullWidth
										id="paperTopic"
										label="Paper Topic"
										autoFocus
										value={values.paperTopic}
										error={errors.paperTopic && touched.paperTopic}
										onChange={ (e) => {
											handleChange("paperTopic")(e);
											handleUpdate(e)
										}}
										helperText={
											errors.paperTopic && touched.paperTopic
												? errors.paperTopic
												: null
										}
									/>
								</Grid>
								
								<Grid item xs={12} sm={6}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="paperType-label">Type Of Paper</InputLabel>
										<Select
											labelId="paperType-label"
											id="paperType"
											name="paperType"
											label="Type Of Paper"
											value={values.paperType}
											onChange={(e) => {
												handleChange("paperType")(e);
												handleUpdateType(e)
											}}
											error={errors.paperType && touched.paperType}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={11}>Assignment</MenuItem>
											<MenuItem value={16}>Admission Essay</MenuItem>
											<MenuItem value={118}>Application Essay</MenuItem>
											<MenuItem value={4}>Book Report</MenuItem>
											<MenuItem value={8}>Term Paper</MenuItem>
											<MenuItem value={9}>Coursework</MenuItem>
											<MenuItem value={17}>Case Study</MenuItem>
											<MenuItem value={10}>Dissertation</MenuItem>
											<MenuItem value={127}>Dissertation Proposal</MenuItem>
											<MenuItem value={1}>Essays</MenuItem>
											<MenuItem value={119}>Entrance Essay</MenuItem>
											<MenuItem value={7}>Research Papers</MenuItem>
											<MenuItem value={122}>Research Proposal</MenuItem>
											<MenuItem value={121}>Thesis Proposal</MenuItem>
											<MenuItem value={120}>Papers</MenuItem>
											<MenuItem value={125}>Powerpoint Presentation</MenuItem>
											<MenuItem value={117}>Scholarship Essay</MenuItem>
										</Select>
										<FormHelperText className={classes.error}>{
											errors.paperType && touched.paperType
												? errors.paperType
												: null
											}
										</FormHelperText>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl variant="outlined" className={classes.formControl}>
									<TextField
										id="deadline"
										name="deadline"
										variant="outlined"
										label="Deadline"
										type="datetime-local"
										defaultValue={values.deadline}
										className={classes.textField}
										InputLabelProps={{
										shrink: true,
										}}
										error={errorDeadline}
										helperText={
											errorDeadline
												? errorDeadlineText
												: null
										}
										onChange={(e) => {
											handleChange("deadline")(e);
											// handleUpdate(e)
											let event = new Date(e.target.value);
											
											let current = new Date();
											
											let time = Math.ceil((event - current) / 1000 / 60);
											let hours = Math.floor((time/60))+' Hours';
											let days = Math.floor((time/60/24))+' Days';
											
											if(time < 0){
												errorDeadline = true;
												errorDeadlineText = 'Deadline should be future time, this time has been passed.';
											}else if(time < 180){
												errorDeadline = true;
												errorDeadlineText = 'Deadline should be more then 3 hours.';
											}else if(time > 180 && time < 360){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](27); 
												props.deadline[1](hours)
											}else if(time > 360 && time < 720){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](25)
												props.deadline[1](hours)
											}else if(time > 720 && time < 1440){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](24)
												props.deadline[1](hours)
											}else if(time > 1440 && time < 2880){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](22)
												props.deadline[1](hours)
											}else if(time > 2880 && time < 4320){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](21)
												props.deadline[1](days)
											}else if(time > 4320 && time < 5760){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](19)
												props.deadline[1](days)
											}else if(time > 5760 && time < 7200){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](18)
												props.deadline[1](days)
											}else if(time > 7200 && time < 8640){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](16)
												props.deadline[1](days)
											}else if(time > 8640 && time < 10080){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](14)
												props.deadline[1](days)
											}else if(time > 10080 && time < 14400){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](13)
												props.deadline[1](days)
											}else if(time > 14400){
												errorDeadline = false; errorDeadlineText = '';
												props.costPerPage[1](9)
												props.deadline[1](days)
											}else{
												errorDeadline = false; errorDeadlineText = '';
											}

											
										  }}
									/>	
									</FormControl>
								</Grid>			

								<Grid item xs={12} sm={6}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="style-label">Style</InputLabel>
										<Select
											labelId="style-label"
											id="style"
											onChange={(e) => {
												handleChange("style")(e);
												handleUpdate(e)
											}}
											label="Style"
											value={values.style}
											name="style"
											error={errors.style && touched.style}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='Harvard - standard'>Harvard - standard </MenuItem>
											<MenuItem value='Harvard - page numbers for all in-text citations'>Harvard - page numbers for all in-text citations </MenuItem>
											<MenuItem value='Oxford Referencing'>Oxford Referencing </MenuItem>
											<MenuItem value='OSCOLA Referencing'>OSCOLA Referencing </MenuItem>
											<MenuItem value='AGLC - Australian Guide to Legal Citation'>AGLC - Australian Guide to Legal Citation </MenuItem>
											<MenuItem value='Footnotes'>Footnotes </MenuItem>
											<MenuItem value='APA Referencing'>APA Referencing </MenuItem>
											<MenuItem value='BMJ Referencing'>BMJ Referencing </MenuItem>
											<MenuItem value='Chicago Referencing'>Chicago Referencing </MenuItem>
											<MenuItem value='MHRA Referencing'>MHRA Referencing </MenuItem>
											<MenuItem value='MLA Referencing'>MLA Referencing </MenuItem>
											<MenuItem value='Open University'>Open University </MenuItem>
											<MenuItem value='Turabian Referencing'>Turabian Referencing </MenuItem>
											<MenuItem value='Vancouver Referencing'>Vancouver Referencing </MenuItem>
											<MenuItem value='No Referencing'>No Referencing </MenuItem>
											<MenuItem value='Other'>Other </MenuItem>
										</Select>
										<FormHelperText className={classes.error}>{
											errors.style && touched.style
												? errors.style
												: null
											}
										</FormHelperText>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="pages-label">Nubmer Of Pages/Words</InputLabel>
										<Select
											labelId="pages-label"
											id="pages"
											onChange={(e) => {
												handleChange("pages")(e);
												handleUpdate(e)
											}}
											label="Nubmer Of Pages/Words"
											value={values.pages}
											name="pages"
											error={errors.pages && touched.pages}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>1 page(s) / 250 words</MenuItem>
											<MenuItem value='2'>2 page(s) / 500 words</MenuItem>
											<MenuItem value='3'>3 page(s) / 750 words</MenuItem>
											<MenuItem value='4'>4 page(s) / 1000 words</MenuItem>
											<MenuItem value='5'>5 page(s) / 1250 words</MenuItem>
											<MenuItem value='6'>6 page(s) / 1500 words</MenuItem>
											<MenuItem value='7'>7 page(s) / 1750 words</MenuItem>
											<MenuItem value='8'>8 page(s) / 2000 words</MenuItem>
											<MenuItem value='9'>9 page(s) / 2250 words</MenuItem>
											<MenuItem value='10'>10 page(s) / 2500 words</MenuItem>
											<MenuItem value='11'>11 page(s) / 2750 words</MenuItem>
											<MenuItem value='12'>12 page(s) / 3000 words</MenuItem>
											<MenuItem value='13'>13 page(s) / 3250 words</MenuItem>
											<MenuItem value='14'>14 page(s) / 3500 words</MenuItem>
											<MenuItem value='15'>15 page(s) / 3750 words</MenuItem>
											<MenuItem value='16'>16 page(s) / 4000 words</MenuItem>
											<MenuItem value='17'>17 page(s) / 4250 words</MenuItem>
											<MenuItem value='18'>18 page(s) / 4500 words</MenuItem>
											<MenuItem value='19'>19 page(s) / 4750 words</MenuItem>
											<MenuItem value='20'>20 page(s) / 5000 words</MenuItem>
											<MenuItem value='21'>21 page(s) / 5250 words</MenuItem>
											<MenuItem value='22'>22 page(s) / 5500 words</MenuItem>
											<MenuItem value='23'>23 page(s) / 5750 words</MenuItem>
											<MenuItem value='24'>24 page(s) / 6000 words</MenuItem>
											<MenuItem value='25'>25 page(s) / 6250 words</MenuItem>
											<MenuItem value='26'>26 page(s) / 6500 words</MenuItem>
											<MenuItem value='27'>27 page(s) / 6750 words</MenuItem>
											<MenuItem value='28'>28 page(s) / 7000 words</MenuItem>
											<MenuItem value='29'>29 page(s) / 7250 words</MenuItem>
											<MenuItem value='30'>30 page(s) / 7500 words</MenuItem>
											<MenuItem value='31'>31 page(s) / 7750 words</MenuItem>
											<MenuItem value='32'>32 page(s) / 8000 words</MenuItem>
											<MenuItem value='33'>33 page(s) / 8250 words</MenuItem>
											<MenuItem value='34'>34 page(s) / 8500 words</MenuItem>
											<MenuItem value='35'>35 page(s) / 8750 words</MenuItem>
											<MenuItem value='36'>36 page(s) / 9000 words</MenuItem>
											<MenuItem value='37'>37 page(s) / 9250 words</MenuItem>
											<MenuItem value='38'>38 page(s) / 9500 words</MenuItem>
											<MenuItem value='39'>39 page(s) / 9750 words</MenuItem>
											<MenuItem value='40'>40 page(s) / 10000 words</MenuItem>
											<MenuItem value='41'>41 page(s) / 10250 words</MenuItem>
											<MenuItem value='42'>42 page(s) / 10500 words</MenuItem>
											<MenuItem value='43'>43 page(s) / 10750 words</MenuItem>
											<MenuItem value='44'>44 page(s) / 11000 words</MenuItem>
											<MenuItem value='45'>45 page(s) / 11250 words</MenuItem>
											<MenuItem value='46'>46 page(s) / 11500 words</MenuItem>
											<MenuItem value='47'>47 page(s) / 11750 words</MenuItem>
											<MenuItem value='48'>48 page(s) / 12000 words</MenuItem>
											<MenuItem value='49'>49 page(s) / 12250 words</MenuItem>
											<MenuItem value='50'>50 page(s) / 12500 words</MenuItem>
											<MenuItem value='51'>51 page(s) / 12750 words</MenuItem>
											<MenuItem value='52'>52 page(s) / 13000 words</MenuItem>
											<MenuItem value='53'>53 page(s) / 13250 words</MenuItem>
											<MenuItem value='54'>54 page(s) / 13500 words</MenuItem>
											<MenuItem value='55'>55 page(s) / 13750 words</MenuItem>
											<MenuItem value='56'>56 page(s) / 14000 words</MenuItem>
											<MenuItem value='57'>57 page(s) / 14250 words</MenuItem>
											<MenuItem value='58'>58 page(s) / 14500 words</MenuItem>
											<MenuItem value='59'>59 page(s) / 14750 words</MenuItem>
											<MenuItem value='60'>60 page(s) / 15000 words</MenuItem>
											<MenuItem value='61'>61 page(s) / 15250 words</MenuItem>
											<MenuItem value='62'>62 page(s) / 15500 words</MenuItem>
											<MenuItem value='63'>63 page(s) / 15750 words</MenuItem>
											<MenuItem value='64'>64 page(s) / 16000 words</MenuItem>
											<MenuItem value='65'>65 page(s) / 16250 words</MenuItem>
											<MenuItem value='66'>66 page(s) / 16500 words</MenuItem>
											<MenuItem value='67'>67 page(s) / 16750 words</MenuItem>
											<MenuItem value='68'>68 page(s) / 17000 words</MenuItem>
											<MenuItem value='69'>69 page(s) / 17250 words</MenuItem>
											<MenuItem value='70'>70 page(s) / 17500 words</MenuItem>
											<MenuItem value='71'>71 page(s) / 17750 words</MenuItem>
											<MenuItem value='72'>72 page(s) / 18000 words</MenuItem>
											<MenuItem value='73'>73 page(s) / 18250 words</MenuItem>
											<MenuItem value='74'>74 page(s) / 18500 words</MenuItem>
											<MenuItem value='75'>75 page(s) / 18750 words</MenuItem>
											<MenuItem value='76'>76 page(s) / 19000 words</MenuItem>
											<MenuItem value='77'>77 page(s) / 19250 words</MenuItem>
											<MenuItem value='78'>78 page(s) / 19500 words</MenuItem>
											<MenuItem value='79'>79 page(s) / 19750 words</MenuItem>
											<MenuItem value='80'>80 page(s) / 20000 words</MenuItem>
											<MenuItem value='81'>81 page(s) / 20250 words</MenuItem>
											<MenuItem value='82'>82 page(s) / 20500 words</MenuItem>
											<MenuItem value='83'>83 page(s) / 20750 words</MenuItem>
											<MenuItem value='84'>84 page(s) / 21000 words</MenuItem>
											<MenuItem value='85'>85 page(s) / 21250 words</MenuItem>
											<MenuItem value='86'>86 page(s) / 21500 words</MenuItem>
											<MenuItem value='87'>87 page(s) / 21750 words</MenuItem>
											<MenuItem value='88'>88 page(s) / 22000 words</MenuItem>
											<MenuItem value='89'>89 page(s) / 22250 words</MenuItem>
											<MenuItem value='90'>90 page(s) / 22500 words</MenuItem>
											<MenuItem value='91'>91 page(s) / 22750 words</MenuItem>
											<MenuItem value='92'>92 page(s) / 23000 words</MenuItem>
											<MenuItem value='93'>93 page(s) / 23250 words</MenuItem>
											<MenuItem value='94'>94 page(s) / 23500 words</MenuItem>
											<MenuItem value='95'>95 page(s) / 23750 words</MenuItem>
											<MenuItem value='96'>96 page(s) / 24000 words</MenuItem>
											<MenuItem value='97'>97 page(s) / 24250 words</MenuItem>
											<MenuItem value='98'>98 page(s) / 24500 words</MenuItem>
											<MenuItem value='99'>99 page(s) / 24750 words</MenuItem>
											<MenuItem value='100'>100 page(s) / 25000 words</MenuItem>
											<MenuItem value='101'>101 page(s) / 25250 words</MenuItem>
											<MenuItem value='102'>102 page(s) / 25500 words</MenuItem>
											<MenuItem value='103'>103 page(s) / 25750 words</MenuItem>
											<MenuItem value='104'>104 page(s) / 26000 words</MenuItem>
											<MenuItem value='105'>105 page(s) / 26250 words</MenuItem>
											<MenuItem value='106'>106 page(s) / 26500 words</MenuItem>
											<MenuItem value='107'>107 page(s) / 26750 words</MenuItem>
											<MenuItem value='108'>108 page(s) / 27000 words</MenuItem>
											<MenuItem value='109'>109 page(s) / 27250 words</MenuItem>
											<MenuItem value='110'>110 page(s) / 27500 words</MenuItem>
											<MenuItem value='111'>111 page(s) / 27750 words</MenuItem>
											<MenuItem value='112'>112 page(s) / 28000 words</MenuItem>
											<MenuItem value='113'>113 page(s) / 28250 words</MenuItem>
											<MenuItem value='114'>114 page(s) / 28500 words</MenuItem>
											<MenuItem value='115'>115 page(s) / 28750 words</MenuItem>
											<MenuItem value='116'>116 page(s) / 29000 words</MenuItem>
											<MenuItem value='117'>117 page(s) / 29250 words</MenuItem>
											<MenuItem value='118'>118 page(s) / 29500 words</MenuItem>
											<MenuItem value='119'>119 page(s) / 29750 words</MenuItem>
											<MenuItem value='120'>120 page(s) / 30000 words</MenuItem>
											<MenuItem value='121'>121 page(s) / 30250 words</MenuItem>
											<MenuItem value='122'>122 page(s) / 30500 words</MenuItem>
											<MenuItem value='123'>123 page(s) / 30750 words</MenuItem>
											<MenuItem value='124'>124 page(s) / 31000 words</MenuItem>
											<MenuItem value='125'>125 page(s) / 31250 words</MenuItem>
											<MenuItem value='126'>126 page(s) / 31500 words</MenuItem>
											<MenuItem value='127'>127 page(s) / 31750 words</MenuItem>
											<MenuItem value='128'>128 page(s) / 32000 words</MenuItem>
											<MenuItem value='129'>129 page(s) / 32250 words</MenuItem>
											<MenuItem value='130'>130 page(s) / 32500 words</MenuItem>
											<MenuItem value='131'>131 page(s) / 32750 words</MenuItem>
											<MenuItem value='132'>132 page(s) / 33000 words</MenuItem>
											<MenuItem value='133'>133 page(s) / 33250 words</MenuItem>
											<MenuItem value='134'>134 page(s) / 33500 words</MenuItem>
											<MenuItem value='135'>135 page(s) / 33750 words</MenuItem>
											<MenuItem value='136'>136 page(s) / 34000 words</MenuItem>
											<MenuItem value='137'>137 page(s) / 34250 words</MenuItem>
											<MenuItem value='138'>138 page(s) / 34500 words</MenuItem>
											<MenuItem value='139'>139 page(s) / 34750 words</MenuItem>
											<MenuItem value='140'>140 page(s) / 35000 words</MenuItem>
											<MenuItem value='141'>141 page(s) / 35250 words</MenuItem>
											<MenuItem value='142'>142 page(s) / 35500 words</MenuItem>
											<MenuItem value='143'>143 page(s) / 35750 words</MenuItem>
											<MenuItem value='144'>144 page(s) / 36000 words</MenuItem>
											<MenuItem value='145'>145 page(s) / 36250 words</MenuItem>
											<MenuItem value='146'>146 page(s) / 36500 words</MenuItem>
											<MenuItem value='147'>147 page(s) / 36750 words</MenuItem>
											<MenuItem value='148'>148 page(s) / 37000 words</MenuItem>
											<MenuItem value='149'>149 page(s) / 37250 words</MenuItem>
											<MenuItem value='150'>150 page(s) / 37500 words</MenuItem>
											<MenuItem value='151'>151 page(s) / 37750 words</MenuItem>
											<MenuItem value='152'>152 page(s) / 38000 words</MenuItem>
											<MenuItem value='153'>153 page(s) / 38250 words</MenuItem>
											<MenuItem value='154'>154 page(s) / 38500 words</MenuItem>
											<MenuItem value='155'>155 page(s) / 38750 words</MenuItem>
											<MenuItem value='156'>156 page(s) / 39000 words</MenuItem>
											<MenuItem value='157'>157 page(s) / 39250 words</MenuItem>
											<MenuItem value='158'>158 page(s) / 39500 words</MenuItem>
											<MenuItem value='159'>159 page(s) / 39750 words</MenuItem>
											<MenuItem value='160'>160 page(s) / 40000 words</MenuItem>
											<MenuItem value='161'>161 page(s) / 40250 words</MenuItem>
											<MenuItem value='162'>162 page(s) / 40500 words</MenuItem>
											<MenuItem value='163'>163 page(s) / 40750 words</MenuItem>
											<MenuItem value='164'>164 page(s) / 41000 words</MenuItem>
											<MenuItem value='165'>165 page(s) / 41250 words</MenuItem>
											<MenuItem value='166'>166 page(s) / 41500 words</MenuItem>
											<MenuItem value='167'>167 page(s) / 41750 words</MenuItem>
											<MenuItem value='168'>168 page(s) / 42000 words</MenuItem>
											<MenuItem value='169'>169 page(s) / 42250 words</MenuItem>
											<MenuItem value='170'>170 page(s) / 42500 words</MenuItem>
											<MenuItem value='171'>171 page(s) / 42750 words</MenuItem>
											<MenuItem value='172'>172 page(s) / 43000 words</MenuItem>
											<MenuItem value='173'>173 page(s) / 43250 words</MenuItem>
											<MenuItem value='174'>174 page(s) / 43500 words</MenuItem>
											<MenuItem value='175'>175 page(s) / 43750 words</MenuItem>
											<MenuItem value='176'>176 page(s) / 44000 words</MenuItem>
											<MenuItem value='177'>177 page(s) / 44250 words</MenuItem>
											<MenuItem value='178'>178 page(s) / 44500 words</MenuItem>
											<MenuItem value='179'>179 page(s) / 44750 words</MenuItem>
											<MenuItem value='180'>180 page(s) / 45000 words</MenuItem>
											<MenuItem value='181'>181 page(s) / 45250 words</MenuItem>
											<MenuItem value='182'>182 page(s) / 45500 words</MenuItem>
											<MenuItem value='183'>183 page(s) / 45750 words</MenuItem>
											<MenuItem value='184'>184 page(s) / 46000 words</MenuItem>
											<MenuItem value='185'>185 page(s) / 46250 words</MenuItem>
											<MenuItem value='186'>186 page(s) / 46500 words</MenuItem>
											<MenuItem value='187'>187 page(s) / 46750 words</MenuItem>
											<MenuItem value='188'>188 page(s) / 47000 words</MenuItem>
											<MenuItem value='189'>189 page(s) / 47250 words</MenuItem>
											<MenuItem value='190'>190 page(s) / 47500 words</MenuItem>
											<MenuItem value='191'>191 page(s) / 47750 words</MenuItem>
											<MenuItem value='192'>192 page(s) / 48000 words</MenuItem>
											<MenuItem value='193'>193 page(s) / 48250 words</MenuItem>
											<MenuItem value='194'>194 page(s) / 48500 words</MenuItem>
											<MenuItem value='195'>195 page(s) / 48750 words</MenuItem>
											<MenuItem value='196'>196 page(s) / 49000 words</MenuItem>
											<MenuItem value='197'>197 page(s) / 49250 words</MenuItem>
											<MenuItem value='198'>198 page(s) / 49500 words</MenuItem>
											<MenuItem value='199'>199 page(s) / 49750 words</MenuItem>
											<MenuItem value='200'>200 page(s) / 50000 words</MenuItem>
											
										</Select>
										<FormHelperText className={classes.error}>{
											errors.pages && touched.pages
												? errors.pages
												: null
											}
										</FormHelperText>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6} >
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="references-label">Number of References</InputLabel>
										<Select
											labelId="references-label"
											id="references"
											onChange={(e) => {
												handleChange("references")(e);
												handleUpdate(e)
											}}
											label="Number of References"
											value={values.references}
											name="references"
											error={errors.references && touched.references}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='1'>1</MenuItem>
											<MenuItem value='2'>2</MenuItem>
											<MenuItem value='3'>3</MenuItem>
											<MenuItem value='4'>4</MenuItem>
											<MenuItem value='5'>5</MenuItem>
											<MenuItem value='6'>6</MenuItem>
											<MenuItem value='7'>7</MenuItem>
											<MenuItem value='8'>8</MenuItem>
											<MenuItem value='9'>9</MenuItem>
											<MenuItem value='10'>10</MenuItem>
											<MenuItem value='11'>11</MenuItem>
											<MenuItem value='12'>12</MenuItem>
											<MenuItem value='13'>13</MenuItem>
											<MenuItem value='14'>14</MenuItem>
											<MenuItem value='15'>15</MenuItem>
											<MenuItem value='16'>16</MenuItem>
											<MenuItem value='17'>17</MenuItem>
											<MenuItem value='18'>18</MenuItem>
											<MenuItem value='19'>19</MenuItem>
											<MenuItem value='20'>20</MenuItem>
											<MenuItem value='21'>21</MenuItem>
											<MenuItem value='22'>22</MenuItem>
											<MenuItem value='23'>23</MenuItem>
											<MenuItem value='24'>24</MenuItem>
											<MenuItem value='25'>25</MenuItem>
											<MenuItem value='26'>26</MenuItem>
											<MenuItem value='27'>27</MenuItem>
											<MenuItem value='28'>28</MenuItem>
											<MenuItem value='29'>29</MenuItem>
											<MenuItem value='30'>30</MenuItem>
											<MenuItem value='31'>31</MenuItem>
											<MenuItem value='32'>32</MenuItem>
											<MenuItem value='33'>33</MenuItem>
											<MenuItem value='34'>34</MenuItem>
											<MenuItem value='35'>35</MenuItem>
											<MenuItem value='36'>36</MenuItem>
											<MenuItem value='37'>37</MenuItem>
											<MenuItem value='38'>38</MenuItem>
											<MenuItem value='39'>39</MenuItem>
											<MenuItem value='40'>40</MenuItem>
											<MenuItem value='41'>41</MenuItem>
											<MenuItem value='42'>42</MenuItem>
											<MenuItem value='43'>43</MenuItem>
											<MenuItem value='44'>44</MenuItem>
											<MenuItem value='45'>45</MenuItem>
											<MenuItem value='46'>46</MenuItem>
											<MenuItem value='47'>47</MenuItem>
											<MenuItem value='48'>48</MenuItem>
											<MenuItem value='49'>49</MenuItem>
											<MenuItem value='50'>50</MenuItem>
											<MenuItem value='51'>51</MenuItem>
											<MenuItem value='52'>52</MenuItem>
											<MenuItem value='53'>53</MenuItem>
											<MenuItem value='54'>54</MenuItem>
											<MenuItem value='55'>55</MenuItem>
											<MenuItem value='56'>56</MenuItem>
											<MenuItem value='57'>57</MenuItem>
											<MenuItem value='58'>58</MenuItem>
											<MenuItem value='59'>59</MenuItem>
											<MenuItem value='60'>60</MenuItem>
											<MenuItem value='61'>61</MenuItem>
											<MenuItem value='62'>62</MenuItem>
											<MenuItem value='63'>63</MenuItem>
											<MenuItem value='64'>64</MenuItem>
											<MenuItem value='65'>65</MenuItem>
											<MenuItem value='66'>66</MenuItem>
											<MenuItem value='67'>67</MenuItem>
											<MenuItem value='68'>68</MenuItem>
											<MenuItem value='69'>69</MenuItem>
											<MenuItem value='70'>70</MenuItem>
											<MenuItem value='71'>71</MenuItem>
											<MenuItem value='72'>72</MenuItem>
											<MenuItem value='73'>73</MenuItem>
											<MenuItem value='74'>74</MenuItem>
											<MenuItem value='75'>75</MenuItem>
											<MenuItem value='76'>76</MenuItem>
											<MenuItem value='77'>77</MenuItem>
											<MenuItem value='78'>78</MenuItem>
											<MenuItem value='79'>79</MenuItem>
											<MenuItem value='80'>80</MenuItem>
										</Select>
										<FormHelperText className={classes.error}>{
											errors.references && touched.references
												? errors.references
												: null
											}
										</FormHelperText>
									</FormControl>	
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="language-label">Language</InputLabel>
										<Select
											labelId="language-label"
											id="language"
											onChange={(e) => {
												handleChange("language")(e);
												handleUpdate(e)
											}}
											label="Language"
											value={values.language}
											name="language"
											error={errors.language && touched.language}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value='English (U.K.)'>English (U.K.)</MenuItem>
											<MenuItem value='English (U.S.)'>English (U.S.)</MenuItem>
											<MenuItem value='Not a native speaker'>Not a native speaker</MenuItem>
										</Select>
										<FormHelperText className={classes.error}>{
											errors.language && touched.language
												? errors.language
												: null
											}
										</FormHelperText>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={6}>
									<FormControl variant="outlined" className={classes.formControl}>
										<InputLabel id="currency-label">Select Currency</InputLabel>
										<Select
											labelId="currency-label"
											id="currency"
											onChange={(e) => {
												handleChange("currency")(e);
												handleUpdate(e)
												switch(e.target.value){
													case 'GBP' 	: props.currencyRate[1](props.currency.GBP); break;
													case 'AUD' 	: props.currencyRate[1](props.currency.AUD); break;
													case 'USD' 	: props.currencyRate[1](props.currency.USD); break;
													default : props.currencyRate[1](props.currency.GBP); break;
												}	
											}}
											label="Select currency"
											value={values.currency}
											name="currency"
											error={errors.currency && touched.currency}
										>
											<MenuItem value='GBP'>GBP</MenuItem>
											<MenuItem value='USD'>USD</MenuItem>
											<MenuItem value='AUD'>AUD</MenuItem>
										</Select>
										<FormHelperText className={classes.error}>{
											errors.currency && touched.currency
												? errors.currency
												: null
											}
										</FormHelperText>
									</FormControl>
								</Grid>

								<Grid item xs={12} sm={12}>
									<FormControl variant="outlined" className={classes.formControl}>
										<Autocomplete
										options={subjectItems}
										getOptionLabel={(option) => option.title}
										getOptionSelected={(option) => option.title}
										onChange={(e, option) => {
											handleChange("subjectArea")(e);
											if(option){
												props.subject[1](option.title);
												values.subjectArea = option.value;
											}else{
												props.subject[1]('');
												values.subjectArea = '';
											}
										}}
										renderInput={(params) => 
										<TextField 
											{...params}
											value={values.subjectArea}	
											autoComplete="subjectArea"
											name="subjectArea"
											variant="outlined"
											required
											fullWidth
											id="subjectArea"
											label="Subject Area"
											error={errors.subjectArea && touched.subjectArea}
											helperText={
												errors.subjectArea && touched.subjectArea
													? errors.subjectArea
													: null
											}
										/>
										}
										/>
									</FormControl>
								</Grid>
								
								<Grid item xs={12} sm={6} style={{display: 'none'}}>
									<TextField
										autoComplete="costPerPage"
										name="costPerPage"
										variant="outlined"
										required
										hidden
										disabled
										onChange={(e) => {
											handleChange("costPerPage")(e);
											handleUpdate(e)
										}}
										value={parseFloat(props.costPerPage[0] * props.currencyRate[0]).toFixed(2)}
										fullWidth
										id="costPerPage"
										label="Cost Per Page"
									/>
								</Grid>
								
								<Grid item xs={12} sm={6} style={{display: 'none'}}>
									<TextField
										autoComplete="totalCost"
										name="totalCost"
										variant="outlined"
										required
										disabled
										onChange={(e) => {
											handleChange("totalCost")(e);
											handleUpdate(e);
										}}
										value={values.totalCost = parseFloat(props.costPerPage[0] * values.pages * props.currencyRate[0]).toFixed(2)}
										fullWidth
										id="totalCost"
										label="Total Cost"
									/>
								</Grid>

								<Grid item xs={12} style={{ margin: 'auto' }}>
									<FormControl component="fieldset">
										<FormLabel component="legend">Page Spacing</FormLabel>
										<RadioGroup 
											onChange={(e) => {
												handleChange("pageType")(e);
												handleUpdate(e)
											}} 
											value={values.pageType} 
											row 
											aria-label="pageType" 
											id="pageType" 
											name="pageType" 
											defaultValue="top"
										>
											<FormControlLabel value="single space" control={<Radio color="primary" />} label="Single Space" />
											<FormControlLabel value="double space" control={<Radio color="primary" />} label="Double Space" />
										</RadioGroup>
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<FormControl component="fieldset">
										<FormLabel component="legend">Academic Level</FormLabel>
										<RadioGroup 
											onChange={(e) => {
												handleChange("academicLevel")(e);
												handleUpdate(e)
											}} 
											value={values.academicLevel} 
											id="academicLevel" 
											row 
											aria-label="academicLevel" 
											name="academicLevel" 
											defaultValue="top"
										>
											<FormControlLabel value="High School" control={<Radio color="primary" />} label="High School" />
											<FormControlLabel value="Under Graduate" control={<Radio color="primary" />} label="Under Graduate" />
											<FormControlLabel value="Master" control={<Radio color="primary" />} label="Master" />
											<FormControlLabel value="PHD" control={<Radio color="primary" />} label="PHD" />
										</RadioGroup>
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<FilePond ref={ref => pond = ref}
												files={state.files}
												allowMultiple={true}
												maxFiles={25}
												maxFileSize='25MB'
												name="image"
												server={localStorage.getItem('domain_url')+'/api/move_files.php'}
												labelMaxFileSizeExceeded='File is too large'	
												oninit={() => handleInit() }
												labelIdle='Drag & Drop files or <span class="filepond--label-action">Browse</span>'
												onupdatefiles={(fileItems) => {
													setState({
														files: fileItems.map(fileItem => fileItem.file)
													});
												}}>
									</FilePond>
								</Grid>
								
								<Grid item xs={12}>
									<FormControl variant="outlined" className={classes.formControl}>
										<TextareaAutosize
											aria-label="minimum height"
											rowsMin={8}
											placeholder=""
											autoComplete="detail"
											name="detail"
											value={values.detail}
											onChange={(e) => {
												handleChange("detail")(e);
												handleUpdate(e)
											}}
											variant="outlined"
											required
											id="detail"
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<FormControlLabel style={{marginRight: 5 }}
										control={
											<Checkbox
												checked={values.term}
												onChange={handleChange}
												name="term"
												id="term"
												color="primary"
											/>
										}
										label="I agree with"
									/>
									<TransitionsModal />
									<FormHelperText className={classes.error}>{
											errors.term && touched.term
												? errors.term
												: null
											}
									</FormHelperText>
								</Grid>
								
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								{...(disable && { disabled:true}) }
								className={classes.submit}
							>
								Proceed
              				</Button>
						</Form>
					)}}
				</Formik>
			</div>
		</div>
	);
}