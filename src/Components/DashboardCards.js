import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import HistoryIcon from '@material-ui/icons/History';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '30px 0 0'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tokenLink: {
    textDecoration: 'none',
    color: '#1A73E8',
    padding: 4,
    lineHeight: 1,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  icons: {
    fontSize: 46,
    background: '#ebebeb',
    color: '#3f51b5',
    padding: 10,
    borderRadius: '50%',
  },
  actionCard: {
    padding: '0 16px 16px',
    justifyContent: 'flex-end',
  },
  clsBtn: {
    background: '#E3EEFC',
    borderRadius: 2,
    padding: 3
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 82,
    padding: '0 16px 0px 16px'
  },
  typo: {
    marginLeft: 10
  },
  tokenHeading: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 0
  },
}));

export default function DashboardCards() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent className={classes.flexBox}>
              <ShoppingCartIcon className={classes.icons} />
              <div className={classes.typo}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.tokenHeading}>
                  Place New Order
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.tokenpara}>
                  Click to Place your order here.
                  </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.actionCard}>
              <Button size="small" className={`${classes.clsBtn} cls-btn`}>
                <Link
                  to="/placeorder"
                  className={classes.tokenLink}
                >
                  Details
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent className={classes.flexBox}>
              <LocalAtmIcon className={classes.icons} />
              <div className={classes.typo}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.tokenHeading}>
                  Payment History
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.tokenpara}>
                  Click to see your payment history.
                  </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.actionCard}>
              <Button size="small" className={`${classes.clsBtn} cls-btn`}>
                <Link
                  to="/order_preview"
                  className={classes.tokenLink}
                >
                  Details
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent className={classes.flexBox}>
              <TrackChangesIcon className={classes.icons} />
              <div className={classes.typo}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.tokenHeading}>
                Track Order
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.tokenpara}>
                  Track your active orders here.
                  </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.actionCard}>
              <Button size="small" className={`${classes.clsBtn} cls-btn`}>
                <Link
                  to="/track_order"
                  className={classes.tokenLink}
                >
                  Details
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent className={classes.flexBox}>
              <HistoryIcon className={classes.icons} />
              <div className={classes.typo}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.tokenHeading}>
                  Order History
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.tokenpara}>
                  Click to see all your orders history.
                  </Typography>
              </div>
            </CardContent>
            <CardActions className={classes.actionCard}>
              <Button size="small" className={`${classes.clsBtn} cls-btn`}>
                <Link
                  to="/order_preview"
                  className={classes.tokenLink}
                >
                  Details
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}
