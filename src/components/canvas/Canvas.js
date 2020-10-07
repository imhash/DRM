import React, { useEffect, useRef } from "react";
import { useCanvas } from "./useCanvas";
import "./Canvas.css";
import databaseSuccess from "./svgs/database_success.png";
import databaseFailure from "./svgs/database_failure.png";
import applicationSuccess from "./svgs/application_success.png";
import applicationFailure from "./svgs/application_failure.png";

import Typography from "@material-ui/core/Typography";
//const gap = 50;
const gap = 105;
const primaryX = 230;
const LPrimaryX = 275;
var posX = 450;
var speed = 2;
var image_gap = 100;
const imageX = 50;
const heartSVG =
  "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z";
const SVG_PATH = new Path2D(heartSVG);

var offset = 0;
const drawTypes = {
  applicationSuccess: "/siteIcons/mobile-analytics-success.svg",
  databaseSuccess: "/siteIcons/database-success.svg",
  siteSuccess: "/siteIcons/company-success.svg",
  applicationFailed: "/siteIcons/mobile-analytics-failed.svg",
  databaseFailed: "/siteIcons/database-failed.svg",
  siteFailed: "/siteIcons/company-failed.svg",
};
const drawTypes2 = {
  applicationSuccess: require("./svgs/mobile-analytics-success.svg"),
  databaseSuccess: require("./svgs/database-success.svg"),
  siteSuccess: require("./svgs/company-success.svg"),
  applicationFailed: require("./svgs/mobile-analytics-failed.svg"),
  databaseFailed: require("./svgs/database-failed.svg"),
  siteFailed: require("./svgs/company-failed.svg"),
};

const imageApplicationSuccess = new Image(50, 50);
imageApplicationSuccess.src = applicationSuccess;
const imageApplicationFailure = new Image(50, 50);
imageApplicationFailure.src = applicationFailure;
const imageDatabaseFailure = new Image(50, 50);
imageDatabaseFailure.src = databaseFailure;
const imageDatabaseSuccess = new Image(50, 50);
imageDatabaseSuccess.src = databaseSuccess;
const getImage = (type, status) => {
  if (type === "Application" && status === "OK") {
    return imageApplicationSuccess;
  } else if (type === "Database" && status === "OK") {
    return imageDatabaseSuccess;
  } else if (type === "Application" && status === "FAIL") {
    return imageApplicationFailure;
  } else if (type === "Database" && status === "OK") {
    return imageDatabaseFailure;
  } else if (type === "app") {
  } else if (type === "app") {
  }
  return imageDatabaseFailure;
};

export default function Canvas(props) {
  const [
    OFFSET,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
  ] = useCanvas();

  const handleClearCanvas = (event) => {
    setCoordinates([]);
  };
  useEffect(() => {
    if (props.networks) {
      const canvasObj = canvasRef.current;
      const ctx = canvasObj.getContext("2d");
      // draw(ctx);
      // march();
      draw2(ctx);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRef == null) {
      return;
    }
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();

    // march();
    draw2(ctx);

    draw(ctx);
  }, [props.data]);

  function march() {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    ctx.clearRect(LPrimaryX + 0, 50, canvasWidth/3, canvasHeight+500);
    ctx.beginPath();
    // ctx.clearRect(LPrimaryX + 0, 50, width/1.5, height);
    // ctx.clearRect(LPrimaryX + 0, 500, canvasWidth, canvasHeight);

    // setOffset(offset + 1);
    offset = offset + 1;
    if (offset > 20) {
      offset = 0;
    }
    draw(ctx);

    setTimeout(march, 1000);
  }

  const getImage2 = (item) => {
    //return SVG_PATH;
    //return drawTypes2.databaseSuccess;
    switch (item.value1) {
      case "Application":
        return item.value3 === "FAIL"
          ? drawTypes.applicationFailed
          : drawTypes.applicationSuccess;
      default:
        return drawTypes.databaseSuccess;
    }
  };

  const getNetworkData = (response) => {
    console.log("----------");
    console.log(response);
    const NTdata = response?.data?.vara?.static_values;
    console.log(NTdata);
    const nodes = NTdata.filter((item: any) => {
      return item.value2 !== "Link";
    });
    let primaryRow = 0;
    let secondayRow = 0;
    let teritoryRaw = 0;
    const nodesNT: any = [];

    nodes.forEach((element: any) => {
      const node = element;
      switch (element.value2) {
        case "Production":
          primaryRow += 1;

          node.row = primaryRow;
          node.col = 1;
          nodesNT.push(node);
          break;
        case "DR":
          secondayRow += 1;

          node.row = secondayRow;
          node.col = 2;
          nodesNT.push(node);
          break;
        case "3rd":
          teritoryRaw += 1;
          node.row = teritoryRaw;
          node.col = 3;
          nodesNT.push(node);
          break;

        default:
          break;
      }
    });
    const links = NTdata.filter((item: any) => {
      return item.value2 === "Link";
    });
    const linksNT: any = [];
    if (links) {
      links.forEach((element: any) => {
        const link = element;
        const [from, to] = link?.key?.split("-");
        link.from = from;
        link.to = to;
        linksNT.push(link);
      });
    }
    return { nodes: nodesNT, links: linksNT };
  };

  const draw2 = (ctx) => {
    const width = 800;
    const height = 800;
    const secondaryX = primaryX + canvasWidth / 3;
    const teritaryX = secondaryX + canvasWidth / 3;
    ctx.font = "bold 14px ARIAL";
    ctx.fillText("PRIMARY SITE", primaryX - 50, 50);
    ctx.fillText("SECONDARY SITE", secondaryX + 200, 50);
    const networkData = getNetworkData(props.data);
    const { nodes, links } = networkData;
    console.log(nodes);
    for (var i = 0; i < nodes.length; i++) {
      let val = nodes[i];
      console.log(val);
      // nodes?.forEach((val) => {
      const secondaryX = primaryX + canvasWidth / 3;
      const teritaryX = secondaryX + canvasWidth / 3;
      //ctx.fill(getImage(val,primaryX + 50,val.row * gap + 200));
      //ctx.fill(getImage(val,primaryX, val.row * gap));
      //image.onload = drawImageActualSize; // Draw when image has loaded
      //image_gap = image_gap + 150;
      // Load an image of intrinsic size 300x227 in CSS pixels
      //image_gap = image_gap + 100;
      switch (val.col) {
        case 1:
          // image_gap = image_gap + 150;
          ctx.font = "lighter 15px Arial";
          ctx.fillText(val.key, primaryX - 50, val.row * gap + 75);
          ctx.save();
          ctx.scale(1, 1);
          //ctx.translate(primaryX, val.row * gap);
          //ctx.clearRect(0,0,canvasWidth,canvasWidth)
          //ctx.rotate((225 * Math.PI) / 180);
          //ctx.fill(getImage(val,primaryX, val.row * gap));

          //ctx.drawImage(imageObj1, 1000,500);
          //ctx.drawImage(image,150, val.row * image_gap,canvasWidth,canvasHeight);
          ctx.drawImage(
            getImage(val.value1, val.value3),
            primaryX,
            val.row * image_gap
          );
          ctx.restore();
          //image_gap = image_gap + 150;
          break;
        case 2:
          //image_gap = image_gap + 150;
          ctx.font = "lighter 15px Arial";
          ctx.fillText(val.key, secondaryX + 250, val.row * gap + 75);
          ctx.save();
          ctx.scale(1, 1);
          //ctx.translate(secondaryX, val.row * gap);
          //ctx.rotate((100 * Math.PI) / 180);
          //ctx.clearRect(0,0,canvasWidth,canvasHeight)
          var imageObj1 = new Image();
          imageObj1.src = drawTypes.databaseFailed;
          //ctx.drawImage(imageObj1, 1000,500);
          //ctx.drawImage(image,7000, val.row * image_gap,canvasWidth,canvasHeight);
          ctx.drawImage(
            getImage(val.value1, val.value3),
            secondaryX + 250,
            val.row * image_gap
          );
          ctx.restore();
          //image_gap = image_gap + 150;
          // img.onload = function onload() {
          //   ctx.drawImage(img, secondaryX, val.row * gap);
          // };
          // img.src = getImage(val);

          break;

        case 3:
          ctx.font = "lighter 15px Arial";
          ctx.fillText(val.key, teritaryX, val.row * gap + 70);

          ctx.font = "lighter 15px Arial";
          ctx.fillText(val.key, secondaryX, val.row * gap + 70);
          ctx.save();
          ctx.scale(0.1, 0.1);
          ctx.translate(teritaryX, val.row * gap);
          //ctx.rotate((225 * Math.PI) / 180);
          //var imageObj1 = new Image();
          //imageObj1.src = 'https://s-media-cache-ak0.pinimg.com/236x/d7/b3/cf/d7b3cfe04c2dc44400547ea6ef94ba35.jpg'
          //ctx.drawImage(image,900,900,canvasWidth,canvasHeight);
          ctx.restore();
          //   img.onload = function onload() {
          //     ctx.drawImage(img, teritaryX, val.row * gap);
          //   };
          //   img.src = getImage(val);

          break;

        default:
          break;
      }
      // return <div key={val.key} />;
    }
  };

  const draw = (ctx) => {
    console.log("draw");
    // const ctx = canvas.current.getContext('2d');
    const width = 800;
    const height = 800;

    const networkData = getNetworkData(props.data);
    const { nodes, links } = networkData;
    const LSecondaryX = LPrimaryX + width / 2 + 150;
    const LTertiaryX = LSecondaryX + width / 3;
    const img = document.createElement("img");

    ctx.strokeStyle = "#084a80";
    //ctx.strokeStyle = "#044a80";

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillReact()
    ctx.clearRect(LPrimaryX + 0, 50, width / 1.5, height);
    // ctx.canvas.width = ctx.canvas.width;
    // ctx.clearRect(LSecondaryX -20, 70, width /1.5, height);
    //   setTimeout(function(){
    //     refreshPage()
    //  }, 10000);
    ctx.setLineDash([9, 2]);
    ctx.lineDashOffset = -offset;
    //ctx.strokeRect(10, 10, 100, 100);
    ctx.beginPath();

    if (links) {
      links.forEach((val: any) => {
        const from = nodes.filter((node: any) => {
          return node?.key === val.from;
        })[0];
        const to = nodes.filter((node: any) => {
          return node.key === val.to;
        })[0];
        switch (from.col) {
          case 1:
            ctx.moveTo(LPrimaryX + 25, from.row * gap + 25);
            break;
          case 2:
            ctx.moveTo(LSecondaryX, from.row * gap + 25);
            break;
          case 3:
            ctx.moveTo(LTertiaryX, from.row * gap + 25);
            break;
          default:
            break;
        }
        switch (to.col) {
          case 1:
            ctx.lineTo(LPrimaryX + 25, to.row * gap + 25);
            //ctx.requestAnimationFrame();
            break;
          case 2:
            ctx.lineTo(LSecondaryX, to.row * gap + 25);

            break;

          case 3:
            ctx.lineTo(LTertiaryX - 25, to.row * gap + 25);

            break;

          default:
            break;
        }
      });
    }

    ctx.lineWidth = 4;
    ctx.stroke();
  };

  return (
    <canvas
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
}
