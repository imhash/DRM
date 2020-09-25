import React, { useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';

import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleMapsComponent, Variants, TimelineCard } from "../../components";
import { ReadinessComponent } from "../../components";
import { ReplicationComponent } from "../../components";
//import { GoogleMapsComponent } from "../../components";
import { LinearProgressWithLabel } from "../../components";
import { DoughnutChart } from "../../components";
import { ExecutionCard1 } from "../../components";
import { ExecutionCard2 } from "../../components";
import { Canvas } from "../../components";
import { ColorAlerts } from "../../components";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
//import { TimelineCard } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 25,
    margin: 10,
    //background: '#8b0000'

  },
  mapContainer: {
    height: `100vh`,
    width: `calc(100%)`,
    backgroundColor: "#f00",
  },
  agentsContainer: {
    height: `100vh`,
    width: `calc(100%)`,
    backgroundColor: "#fff",
  },
}));

const gap = 5;
const primaryX = 5;

export default function Services(props) {
  const classes = useStyles();

  const [serviceIndex, setServiceIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

  const [services, setServices] = React.useState([]);
  const [networks, setNetworks] = React.useState(null);
  const [readiness, setReadiness] = React.useState([]);
  const [replication, setReplication] = React.useState([]);
  const [execution1, setExecution1] = React.useState([]);
  const [execution2, setExecution2] = React.useState([]);
  const [children1,setChildren1] = React.useState([]);
  const [children2,setChildren2] = React.useState([]);
  // const [canvas, setcanvas] = React.useState([]);
  const [links, setLinks] = React.useState([]);
  // Loadinf 
  const [loading, setLoading] = React.useState(false);
  const canvasRef = useRef(null)

  const handleChange = (event) => {
    setServiceIndex(event.target.value);
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  function refreshPage() {
   window.location.reload(false)

  }

  

// Auto Refresh Segment
//   setTimeout(function(){
//     refreshPage()
//  }, 10000);
  useEffect(() => {

    if (serviceIndex > -1) {
      loadNetworks();
      loadReadiness();
      loadReplication();
      loadExecution1();
      loadExecution2();
      loadChildren1();
      loadChildren2();
    }
  }, [serviceIndex]);

   // Load this effect on mount
   useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
     // setVideos(dummyData);
      setLoading(false);
    }, 1000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadServices();
    //refreshPage();
    //draw();
  }, []);



  const loadServices = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/objects/VARA.DRM.APPS",
      options
    );
    console.log(response)
    setServices(response.data.data.vara.static_values);
    setServiceIndex(0);
  };
  //var Action = services[serviceIndex].value2
  const loadExecution1 = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/executions/" +
      services[serviceIndex].value1,
      options
    );
    console.log(response)
    setExecution1(response.data);
  };
  const loadExecution2 = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/executions/" +
      services[serviceIndex].value2,
      options
    );
    console.log(response)
    setExecution2(response.data);
  };
  
  const loadChildren1 = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/executions/" +
      services[serviceIndex].value1 + "/children",
      options
    );
    console.log("children",response.data.data)
    setChildren1(response.data.data);
  };
  const loadChildren2 = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/executions/" +
      services[serviceIndex].value2 + "/children",
      options
    );
    console.log("children",response.data.data)
    setChildren2(response.data.data);
  };

  const loadNetworks = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/objects/" +
        services[serviceIndex].value4,
      options
    );
    
    setNetworks(response.data);
  };

  const loadReadiness = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/objects/" +
       services[serviceIndex].value5,
      options
    );
    var values = response.data.data.vara.static_values;
    values.sort(function(a, b){return parseInt(b) - parseInt(a)});
    setReadiness(values);
  };

  const loadReplication = async () => {
    const options = {
      headers: { Authorization: "Basic QVVUT01JQy9BVVRPTUlDOkFVVE9NSUM=" },
    };
    const response = await axios.get(
      "http://10.49.166.233:8088/ae/api/v1/100/objects/" +
       services[serviceIndex].value3,
      options
    );
    var values = response.data.data.vara.static_values;
    values.sort(function(a, b){return parseInt(b) - parseInt(a)});
    setReplication(values);
  };

//var fAction = services[serviceIndex].value1;

  // useEffect(() => {
  //   console.log('2', canvasRef)
  //   const canvas = canvasRef.current
  //   if(canvas != null)
  //   {
  //       console.log('1',canvas)
  //       const context = canvas.current.getContext('2d')
  //       draw(context)
  //   }
  // }, [canvasRef])

//   const draw = (ctx) => {
//     console.log('draw')
//     // const ctx = canvas.current.getContext('2d');
//       const width = 800
//       const height = 800

//     const { networkData } = networks;
//     const { nodes } = networkData;
//     const secondaryX = primaryX + width / 3;
//     const teritaryX = secondaryX + width / 3;

//     ctx.strokeStyle = "#044a80";
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.clearRect(primaryX + 50, 50, width / 3 - 50, height);
//     ctx.clearRect(secondaryX + 100, 50, width / 3, height);

//     ctx.setLineDash([9, 2]);
//     ctx.lineDashOffset = -this.state.offset;
//     //ctx.strokeRect(10, 10, 100, 100);
//     ctx.beginPath();

//     if (links) {
//       links.forEach((val: any) => {
//         const from = nodes.filter((node: any) => {
//           return node?.key === val.from;
//         })[0];
//         const to = nodes.filter((node: any) => {
//           return node.key === val.to;
//         })[0];
//         switch (from.col) {
//           case 1:
//             ctx.moveTo(primaryX + 50, from.row * gap + 25);
//             break;
//           case 2:
//             ctx.moveTo(secondaryX, from.row * gap + 25);
//             break;
//           case 3:
//             ctx.moveTo(teritaryX, from.row * gap + 25);
//             break;
//           default:
//             break;
//         }
//         switch (to.col) {
//           case 1:
//             ctx.lineTo(primaryX + 50, to.row * gap + 25);
//             break;
//           case 2:
//             ctx.lineTo(secondaryX, to.row * gap + 25);

//             break;

//           case 3:
//             ctx.lineTo(teritaryX - 25, to.row * gap + 25);

//             break;

//           default:
//             break;
//         }
//       });
//     }

//     ctx.lineWidth = 5;
//     ctx.stroke();
// };

  // if (services.length == 0) {
  //   return <Grid container className={classes.root} />;
  // }
//  const action = services.key.value2;
  return (
    <div className="root">
        {loading && <Grid align='right'><CircularProgress disableShrink/> </Grid>}
        {!loading &&
    <Grid container className={classes.root}>
      <Grid item xs={11} align="right" >
      

            <IconButton aria-label="add an alarm" align="right"> <AutorenewIcon />
            <Typography variant="overline">
              Auto Refresh in 90s
            </Typography>
            </IconButton>
            {/* <Grid><TimelineCard  data={children} /></Grid> */}
        </Grid>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
          <Typography variant="overline" component="h2">Services</Typography></InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={serviceIndex}
            onChange={handleChange}
          >
            {services.map((item, index) => (
              <MenuItem value={index}>{item.key}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
     
      <Grid item xs={5}>
        {/* <Typography>{services.item.value1} */}
          
          {/* </Typography> */}
      <ExecutionCard1 data={execution1} work={children1} />  
      <Grid><TimelineCard  data={children1} /></Grid>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        {/* <Typography>{services.item.value1} */}
          
          {/* </Typography> */}
      <ExecutionCard2 data={execution2} work={children2}  />  
      <Grid><TimelineCard  data={children2} /></Grid>
      </Grid>
      <Grid item xs={11}>
      
      <Typography variant="overline" component="h4">
            Readiness Information
            </Typography>
        <ReadinessComponent data={readiness}/>
      </Grid>
      <Grid item xs={11}>
      <Typography variant="overline" component="h4">
      Replication Information
            </Typography>
            {replication == null ? null : <ReplicationComponent data={replication}/>}
        {/* <ReplicationComponent data={replication}/> */}
      </Grid>
      <Grid item xs={11}>
      <Typography variant="overline" component="h4">
      Services Information
            </Typography>
        <Card>
        {/* <GoogleMapsComponent/> */}
        {/* <Typography variant="h6">   <Box p={6}>Primary Site<span style={{paddingLeft: '550px'}}>Secondary Site </span>     </Box>              </Typography> */}

         {networks == null ? null : <Canvas data={networks}/>} 
        <Card>
          {/* <DoughnutChart/> */}
        </Card>
        </Card>
      </Grid>
    </Grid>
}</div>
  );


}
// export function executionAction() {
//   //...add logic..

// if (action ===Failover) {
//   return "Failover"
//   }
// }