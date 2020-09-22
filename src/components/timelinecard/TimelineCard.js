import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Services } from "../../pages";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { LinearProgressWithLabel } from "../../components";
import { SimplePopover } from "../../components";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Popover from '@material-ui/core/Popover';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import { Variants } from "../../components";
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
export default function TimelineCard(props) {
    const classes = useStyles();
    // var { tcexec = [] } =tc;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    // const child = props.data;
    //console.log(tc);
    // const 
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // if (props.data == null) {
    //   return null;
    // }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      
      const statusIcon = (status) => {
        if(status==="1900") {
          return <CheckCircleTwoToneIcon/>
        } else if(status==="0") {
            return <PlayArrowTwoToneIcon/>
          } else if(status==="0") {
          return <PlayArrowTwoToneIcon/>   }
          else
        return <CheckCircleTwoToneIcon/>
      }

    return (
        <div className="root">
        <Button aria-describedby={id}   onClick={handleClick}>
        More Info
      </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {props.data.map((item) => {
        return(
        <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
            {item.end_time}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              {/* <AssignmentTwoToneIcon /> */}
              {statusIcon(item.status)}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
               {item.name}
              </Typography>
        <Typography>{item.status_text}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        
        {/* <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
            2020-09-03T05:36:45Z
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <AssignmentTwoToneIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Update DNS
              </Typography>
              <Typography>Active</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
            2020-09-03T05:36:45Z
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <AssignmentTwoToneIcon />
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Shutdown System
              </Typography>
              <Typography>Waiting for predecessor</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
        <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
            2020-09-03T05:36:45Z
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <AssignmentTwoToneIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
              Start System
              </Typography>
              <Typography>Waiting for predecessor</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
     */}
      </Timeline>)
})} 
        </Popover>
        </div>
    )}