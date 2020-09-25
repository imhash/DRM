import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Services } from "../../pages";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { LinearProgressWithLabel } from "..";
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

import { SimplePopover } from "..";
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
import { Variants } from "..";
import { TimelineCard } from "..";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function ExecutionCard1(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  // const props.data = props.data;
  console.log(props.data);
  console.log("executionWork",props.work);
  
  let successCount = props.work.filter(x => x.status >= 1900).length
  let failCount = props.work.filter(x => x.status < 1900).length
  let success = successCount / props.work.length * 100
  let fail = failCount / props.work.length * 100
  

//   {props.work.map((item) => {
//     return(
// <Typography>{item.status}</Typography>
//     )})}
  // console.log(props.work.length);
  // const obj = JSON.parse(props.work);
  // console.log(obj.status); 
  // const status [] = props.work
  // const failed = status.filter(word => word < '1900');
  // const success = status.filter(word => word >= '1900');
  // const progress = (success.length/(failed.length+success.length)*100)
  // console.log(failed);
  // console.log(success);
  // console.log(success.length);
  // console.log(failed.length);
  // console.log(progress); 


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  if (props.data == null) {
    return null;
  }
  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //    // setVideos(dummyData);
  //     setLoading(false);
  //   }, 5000);
  //   // Cancel the timer while unmounting
  //   return () => clearTimeout(timer);
  // }, []);
//  console.log("Progress",props.action)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
 

 // Load this effect on mount

  
  return (
    // <div className="App">
    //     {loading && <Variants />}
    //     {!loading &&
    <Grid item sm   xs={12}>
      <Card
        className={classes.root}
        variant="outlined"
        style={{ background: "#dbd9d9" }}
      >
        
        <CardContent>
          <Typography color="textSecondary" >
          {props.data.archive_key1}
          </Typography>
          
          {/* <Card align="right"> */}
     <div>   
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
          <LinearProgress variant="buffer" value={success} />
          </Box>
          <Box minWidth={35}>
  <Typography variant="body2" color="textSecondary">{success}%</Typography>
      </Box>
      </Box>
      {/* </div>   */}
           {/* <LinearProgressWithLabel /> */}
          {/* </Card> */}
          {/* <div> */}
  
      {/* <TimelineCard/> */}
    </div>
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
          <Typography
            variant="overline"
            component="h2"
            align="left"
            color="primary"
            style={{paddingLeft: '20px'}}
          >
            Worfklow: {props.data.name}
          </Typography></Box>
          <Box minWidth={35}>
      
          <Typography
            variant="overline"
            component="h2"
            align="left"
            color="textSecondary"
            style={{paddingLeft: '20px'}}
          >
            Start Time: {props.data.start_time}
          </Typography>
          <Typography
            variant="overline"
            component="h2"
            align="left"
            color="textSecondary"
            style={{paddingLeft: '20px'}}
          >
            End Time: {props.data.end_time}
          </Typography>
          <Typography
            variant="overline"
            component="h2"
            align="left"
            color="textSecondary"
            style={{paddingLeft: '20px'}}
          >
            Estimated Runtime: {props.data.estimated_runtime}
          </Typography>
          <Box width="100%" mr={1}>
          <Typography
            variant="overline"
            component="h2"
            align="left"
            color="textSecondary"
            style={{paddingLeft: '20px'}}
          >
            Status: {props.data.status_text} <span style={{paddingLeft: '400px'}}>   </span>
       
       
          </Typography>
          </Box>
          </Box>
      </Box>
        </CardContent>
        <CardActions>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={11}
            style={{
              textAlign: "right",
              // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              // borderRadius: 1,
              // border: 0,
              // color: 'white',
              // height: 30,
              // width: 10,
              // padding: '0 10px',
              // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }}
          >
            {/* <Button>Run Failover</Button> */}
            
          </Grid>
        </CardActions>
      </Card>
     
    </Grid>
  
          // }</div>
          );
}
