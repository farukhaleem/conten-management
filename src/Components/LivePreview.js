import React from 'react'
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import PreviewListItem from './PreviewListItem';

const useStyles = makeStyles((theme) => ({
	paperItem: {
		minWidth: 275,
		position: 'sticky',
		top: 86
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	pos: {
		marginBottom: 12,
	},
	list: {
		padding: '10px 0 0 0',
	},
	divider: {
		margin: '16px 0px',
		flexShrink: 0,
		borderWidth: '0px 0px thin',
		borderStyle: 'solid',
		borderColor: 'rgba(0, 0, 0, 0.12)',
	}
}));



let LivePreview = (props) => {

	const classes = useStyles();

	return (
		<Card className={classes.paperItem}>
			<CardContent>
				<Box component="h2" m={0}>
					Order Detail
				</Box>
				<List className={classes.list}>
					<PreviewListItem itemTitle="Paper Topic" itemData={props.state[0].paperTopic} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Type of Paper" itemData={props.pdtCaption[0]} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Style" itemData={props.state[0].style} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Language" itemData={props.state[0].language} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Page Type" itemData={props.state[0].pageType} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Academic Level" itemData={props.state[0].academicLevel} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Subject Area" itemData={props.subject[0]} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="No. of References" itemData={props.state[0].references} style={{fontWeight: 500}}/>
					
					<Divider className={classes.divider} />
					
					<PreviewListItem itemTitle="Currency" itemData={props.state[0].currency} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="No. of pages/ words" itemData={`${props.state[0].pages} page(s)`} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Deadline" itemData={props.deadline[0]} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Cost per page" itemData={`${parseFloat(props.costPerPage[0] * props.currencyRate[0]).toFixed(2)} ${props.state[0].currency}`} style={{fontWeight: 500}}/>
					<PreviewListItem itemTitle="Assignment Cost" itemData={`${parseFloat(props.state[0].pages * props.costPerPage[0] * props.currencyRate[0]).toFixed(2)} ${props.state[0].currency}`} style={{fontWeight: 500}}/>
					
					<PreviewListItem 
						itemTitle="VAT" 
						itemData={
							`${parseFloat((props.state[0].pages * props.costPerPage[0] * props.currencyRate[0])/100*20).toFixed(2)} ${props.state[0].currency}`
						}
						style={{
							color: 'red',
							fontWeight: 500
						}} 
					/>
					
					<PreviewListItem 
						itemTitle="Discount" 
						itemData={
							`${parseFloat((props.state[0].pages * props.costPerPage[0] * props.currencyRate[0])/100*19).toFixed(2)} ${props.state[0].currency}`
						} 
						style={{
							color: '#32E340',
							fontWeight: 500
						}}
					/>
					<Divider className={classes.divider} />
					
					<PreviewListItem 
						itemTitle="Total Cost" 
						itemData={
							`${parseFloat((props.state[0].pages * props.costPerPage[0] * props.currencyRate[0])/100*101).toFixed(2)} ${props.state[0].currency}`
						} 
						style={{
							fontWeight: 700
						}}
					/>
					
				</List>
			</CardContent>
		</Card>
	)
}

export default LivePreview;