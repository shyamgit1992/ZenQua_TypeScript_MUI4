import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

interface MyProps{
    id ?: any
    title ?: any,
    body ?: any 
}

class SimpleCard extends Component <MyProps> {
    
  render() {

    const { classes , id, body, title }  : any = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {id}
          </Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            {body}
            <br />
          </Typography>
        </CardContent>
        
      </Card>
    );
  }
}

export default withStyles(styles)(SimpleCard);
