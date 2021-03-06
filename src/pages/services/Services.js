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
import CircularProgress from "@material-ui/core/CircularProgress";
import { Config } from "../../config/DefaultSettings";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { TimelineCard } from "../../components";
import { Variants } from "../../components";
import { ReadinessComponent } from "../../components";
import { ReplicationComponent } from "../../components";
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
import axios from "axios";
// import { LinearProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from "@material-ui/icons/Autorenew";

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
  let refresh_key = 0;
  const [services, setServices] = React.useState([]);
  const [networks, setNetworks] = React.useState(null);
  const [readiness, setReadiness] = React.useState([]);
  const [replication, setReplication] = React.useState([]);
  const [execution1, setExecution1] = React.useState([]);
  const [execution2, setExecution2] = React.useState([]);
  const [children1, setChildren1] = React.useState([]);
  const [children2, setChildren2] = React.useState([]);
  const [workflow, setWorkflow] = React.useState([]);
  const [links, setLinks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const canvasRef = useRef(null);
  const [count, setCount] = React.useState(0);

  const handleChange = (event) => {
      setServiceIndex(event.target.value);

 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const ref = useRef();
  const useForceUpdate = () => {
    const [, setState] = React.useState();
    return setState;
  };

  useEffect(() => {
    if(serviceIndex == -1) {
      return
    }
    const interval = setInterval(() => {
      console.log("setInterval")
      loadNetworks();
      loadReadiness();
      loadReplication();
      loadExecution1();
      loadExecution2();
      loadChildren1();
      loadChildren2();
      loadServices();

      // console.log('updated');
    }, Config.refresh_interval);

    return () => clearInterval(interval);
  }, [serviceIndex, services]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    console.log("loadServicesInterval")
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/objects/" +
        Config.application_list,
      options
    );
    // console.log("http", response.data.data.vara.static_values);
    setServices(response.data.data.vara.static_values);
    if(serviceIndex == -1) {
      setServiceIndex(0);
    }
  };

  const loadWorkflow = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/objects/" +
        "VARA.DRM.WORKFLOWS",
      options
    );
    console.log(response);

    setWorkflow(response.data.data.vara.static_values.services[1].key1.value1);
  };

  const loadExecution1 = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    console.log("http",services)
    const url = Config.base_url +
    "/" +
    Config.client +
    "/executions/" +
    services[serviceIndex].value1
    console.log(url)
    const response = await axios.get(
      url,
      options
    );
    console.log(response);
    setExecution1(response.data);
  };

  const loadExecution2 = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/executions/" +
        services[serviceIndex].value2,
      options
    );
    console.log(response);
    setExecution2(response.data);
  };

  const loadChildren1 = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/executions/" +
        services[serviceIndex].value1 +
        "/children",
      options
    );
    console.log("children", response.data.data);
    setChildren1(response.data.data);
  };
  const loadChildren2 = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/executions/" +
        services[serviceIndex].value2 +
        "/children",
      options
    );
    console.log("children", response.data.data);
    setChildren2(response.data.data);
  };

  const loadNetworks = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/objects/" +
        services[serviceIndex].value4,
      options
    );

    setNetworks(response.data);
  };

  const loadReadiness = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/objects/" +
        services[serviceIndex].value5,
      options
    );
    var values = response.data.data.vara.static_values;
    values.sort(function (a, b) {
      return parseInt(b) - parseInt(a);
    });
    setReadiness(values);
  };

  const loadReplication = async () => {
    const options = {
      headers: { Authorization: Config.authorization },
    };
    // debugger;
    const response = await axios.get(
      Config.base_url +
        "/" +
        Config.client +
        "/objects/" +
        services[serviceIndex].value3,
      options
    );
    var values = response.data.data.vara.static_values;
    values.sort(function (a, b) {
      return parseInt(b) - parseInt(a);
    });
    setReplication(values);
  };

  return (
    <div className="root">
      {/* {setCounter(1)} */}
      {loading && (
        <Grid align="right">
          <CircularProgress disableShrink />{" "}
        </Grid>
      )}
      {!loading && (
        <Grid container className={classes.root} container spacing={1}>
          {/* <Grid item xs={11} align="right">
            <IconButton aria-label="add an alarm" align="right">
              {" "}
              <AutorenewIcon />
              <Typography variant="overline">Auto Refresh in 90s</Typography>
            </IconButton>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                <Typography variant="overline" component="h2">
                  Services
                </Typography>
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={serviceIndex}
                onChange={handleChange}
                
              >
                {/* {setInterval(() => {
                  {handleChange}
                }, 100);} */}
 
                {services.map((item, index) => (
                  <MenuItem value={index}>{item.key}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <Paper>
              <ExecutionCard1
                data={execution1}
                work={children1}
                object={workflow}
              />
            </Paper>
            <Grid>
              <TimelineCard data={children1} />
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Paper>
              <ExecutionCard2 data={execution2} work={children2} />
            </Paper>
            <Grid>
              <TimelineCard data={children2} />
            </Grid>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="overline" component="h4">
              Readiness Information
            </Typography>
            <ReadinessComponent data={readiness} />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="overline" component="h4">
              Replication Information
            </Typography>
            {replication == null ? null : (
              <ReplicationComponent data={replication} />
            )}
          </Grid>
          <Grid item xs={11}>
            <Typography variant="overline" component="h4">
              Services Information
            </Typography>
            <Card>{networks == null ? null : <Canvas data={networks} />}</Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
