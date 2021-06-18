import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import PlaceOrderForm from './PlaceOrderForm';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import HeaderMenu from './HeaderMenu';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LivePreview from './LivePreview';
import { fetchCurrency } from './../Services/getOrdersService';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      paddingBottom: 50,
      position: 'relative',
      background: '#f4f0f4'
    },
  }));

function PlaceOrder() {
    const classes = useStyles();
    
    let initialState = {
      paperTopic: "",
      paperType: "",
      deadline: "",
      style: "",
      language: "",
      pages: "",
      subjectArea: "",
      references: "",
      currency:"GBP",
      costPerPage: 9,
      totalCost: 0,
      pageType: "single space",
      academicLevel: "High School",
      detail: "",
      term: false,
      sub_area_caption: '',
    }

    let currency = {
      USD : 1.42,
      AUD : 1.84,
      GBP : 1,
    } 

    useEffect(() => {
      async function fetchData() {
        currency = await fetchCurrency();
      }
      fetchData();
    }, [])  

    let state = useState(initialState);
    let pdtCaption = useState('');
    let subject = useState('');
    let costPerPage = useState(9);
    let currencyRate = useState(currency.GBP);
    let deadline = useState('10 Days');
    
    return (

        <div className={classes.root}>
            
            <HeaderMenu />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container component="main" maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>Order Your Paper Now</h1>
                            <p>Order with us now at {localStorage.getItem('domain_name')} ensures that you get premium quality custom papers written by professional experts. Our custom academic papers are 100% non- plagiarized and you get top grades.</p>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Card className={classes.paperItem}>
                            <CardContent>
                              <PlaceOrderForm 
                                state={state} 
                                pdtCaption={pdtCaption}
                                subject={subject}
                                currency={currency}
                                currencyRate={currencyRate}
                                costPerPage={costPerPage}
                                deadline={deadline}
                              />
                              </CardContent>
                          </Card>  
                        </Grid>

                        <Grid item xs={12} sm={4} >
                          <LivePreview 
                            state={state} 
                            pdtCaption={pdtCaption} 
                            currencyRate={currencyRate}
                            deadline={deadline}
                            subject={subject} 
                            costPerPage={costPerPage}
                          />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default PlaceOrder;