import React, { useEffect, useRef } from "react";
import { useCanvas } from "./useCanvas";
import "./Canvas.css";
import databaseSuccess from "./svgs/database_success.png"
import databaseFailure from "./svgs/database_failure.png"
import applicationSuccess from "./svgs/application_success.png"
import applicationFailure from "./svgs/application_failure.png"

import Typography from "@material-ui/core/Typography";
//const gap = 50;
const gap = 105;
const primaryX = 230;
const LPrimaryX = 275;
var posX = 450;
var speed = 2;
var image_gap =100;
//const primaryX = 50;
const imageX = 50;
//const image = new Image(30, 30); // Using optional size for image
//image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);

var offset = 0;
const drawTypes = {
  applicationSuccess: '/siteIcons/mobile-analytics-success.svg',
  databaseSuccess: '/siteIcons/database-success.svg',
  siteSuccess: '/siteIcons/company-success.svg',
  applicationFailed: '/siteIcons/mobile-analytics-failed.svg',
  databaseFailed: '/siteIcons/database-failed.svg',
  siteFailed: '/siteIcons/company-failed.svg',
};
const drawTypes2 = {
  applicationSuccess: require("./svgs/mobile-analytics-success.svg"),
  databaseSuccess: require("./svgs/database-success.svg"),
  siteSuccess: require("./svgs/company-success.svg"),
  applicationFailed: require("./svgs/mobile-analytics-failed.svg"),
  databaseFailed: require("./svgs/database-failed.svg"),
  siteFailed: require("./svgs/company-failed.svg"),
};
//image.src = database

const imageApplicationSuccess = new Image(50, 50);
imageApplicationSuccess.src = applicationSuccess
const imageApplicationFailure = new Image(50, 50);
imageApplicationFailure.src = applicationFailure
const imageDatabaseFailure = new Image(50, 50);
imageDatabaseFailure.src = databaseFailure
const imageDatabaseSuccess= new Image(50, 50);
imageDatabaseSuccess.src = databaseSuccess
const getImage = (type,status) => {
  if(type==="Application" && status==="OK") {
    return imageApplicationSuccess
  } else if(type==="Database"&& status==="OK") {
    return imageDatabaseSuccess;
  } else if(type==="Application" && status==="FAIL") {
    return imageApplicationFailure;

  } else if(type==="Database"&& status==="OK") {
    return imageDatabaseFailure;
  } else if(type==="app") {

  } else if(type==="app") {

  }
    return imageDatabaseFailure;
  
}

const drawTypes3 = {
  applicationSuccess: new Path2D(
    '<svg  height="60" width="50" fill="#077026"  id="Layer_1" enable-background="new 0 0 512 512"  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><g><path d="m370 512h-228c-25.364 0-46-20.636-46-46v-420c0-25.364 20.636-46 46-46h228c25.364 0 46 20.636 46 46v420c0 25.364-20.636 46-46 46zm-228-480c-7.72 0-14 6.28-14 14v420c0 7.72 6.28 14 14 14h228c7.72 0 14-6.28 14-14v-420c0-7.72-6.28-14-14-14z"/><path d="m340.85 235.15c-4.097 0-8.191-1.563-11.316-4.689-19.635-19.643-45.75-30.461-73.534-30.461s-53.899 10.818-73.533 30.461c-6.246 6.25-16.378 6.252-22.628.005-6.249-6.247-6.252-16.378-.005-22.627 25.679-25.691 59.831-39.839 96.166-39.839s70.487 14.148 96.166 39.839c6.247 6.25 6.244 16.38-.005 22.627-3.124 3.122-7.219 4.684-11.311 4.684z"/><path d="m301.26 274.74c-4.095 0-8.189-1.562-11.313-4.686-9.064-9.063-21.119-14.054-33.947-14.054s-24.883 4.991-33.946 14.054c-6.248 6.248-16.379 6.248-22.627 0-6.249-6.249-6.249-16.379 0-22.627 15.106-15.107 35.198-23.427 56.573-23.427s41.467 8.32 56.573 23.427c6.249 6.248 6.249 16.379 0 22.627-3.124 3.124-7.219 4.686-11.313 4.686z"/><path d="m256 344c-13.233 0-24-10.767-24-24s10.767-24 24-24 24 10.767 24 24-10.767 24-24 24z"/><path d="m288 88h-64c-8.837 0-16-7.164-16-16s7.163-16 16-16h64c8.837 0 16 7.164 16 16s-7.163 16-16 16z"/></g></svg>'
  ),
  databaseSuccess: new Path2D(
    '<svg height="60" width="50" fill="#077026" viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg"><g id="database_server" data-name="database server"><path d="m43.82 20.01a2.986 2.986 0 0 0 -2.82-2.01h-1v-2h1a3.009 3.009 0 0 0 3-3v-8a3.009 3.009 0 0 0 -3-3h-36a3.009 3.009 0 0 0 -3 3v8a3.009 3.009 0 0 0 3 3h1v2h-1a3.009 3.009 0 0 0 -3 3v8a3.009 3.009 0 0 0 3 3h1v2h-1a3.009 3.009 0 0 0 -3 3v8a3.009 3.009 0 0 0 3 3h19v8c0 3.94 9.56 6 19 6s19-2.06 19-6v-30c0-3.83-9.01-5.87-18.18-5.99zm-38.82-6.01a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h36a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1zm33 2v2h-4v-2zm-6 0v2h-18v-2zm-20 0v2h-4v-2zm12 30h-19a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h19zm-16-12v-2h4v2zm16 0h-10v-2h10zm0-8v4h-19a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h36a.7.7 0 0 1 .14.03c-8.8.25-17.14 2.29-17.14 5.97zm36 30c0 1.36-6 4-17 4s-17-2.64-17-4v-7.18c3.29 2.09 10.16 3.18 17 3.18s13.71-1.09 17-3.18zm0-10c0 1.36-6 4-17 4s-17-2.64-17-4v-7.18c3.29 2.09 10.16 3.18 17 3.18s13.71-1.09 17-3.18zm0-10c0 1.36-6 4-17 4s-17-2.64-17-4v-7.18c3.29 2.09 10.16 3.18 17 3.18s13.71-1.09 17-3.18zm-17-6c-11 0-17-2.64-17-4s6-4 17-4 17 2.64 17 4-6 4-17 4z"/><path d="m42 35h2v2h-2z"/><path d="m42 46h2v2h-2z"/><path d="m42 55h2v2h-2z"/><path d="m11 22h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m19 22h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m11 6h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m19 6h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m22 6h14v2h-14z"/><path d="m38 6h2v2h-2z"/><path d="m22 10h14v2h-14z"/><path d="m38 10h2v2h-2z"/><path d="m11 38h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m19 38h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/></g></svg>'
  ),
  siteSuccess: new Path2D(
    '<svg height="60" width="50" fill="#077026"  id="_x31__px" enable-background="new 0 0 24 24"  viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg"><g id="XMLID_1_"><path d="m14 9.09 8.81 1.75c.71.15 1.19.75 1.19 1.46v10.2c0 .83-.67 1.5-1.5 1.5h-9c.28 0 .5-.22.5-.5v-.5h8.5c.27 0 .5-.22.5-.5v-10.2c0-.23-.16-.44-.39-.49l-8.61-1.7z"/><path d="m19.5 14c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m19.5 17c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m19.5 20c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m14 23.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-.5-13.5c0-.15.07-.29.18-.39.12-.09.27-.13.42-.1l.4.08v1.02 12.89z"/><path d="m13 23v.5c0 .28.22.5.5.5h-4c.28 0 .5-.22.5-.5v-.5z"/><path d="m10.5 5c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m11 8.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5z"/><path d="m10.5 11c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m10.5 14c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m6 14.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5z"/><path d="m5.5 5c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m5.5 8c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m5.5 11c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m9 18.5c0-.28-.23-.5-.5-.5h-3c-.28 0-.5.22-.5.5v4.5h-1v-4.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v4.5h-1z"/><path d="m5 23h4 1v.5c0 .28-.22.5-.5.5h-5c-.28 0-.5-.22-.5-.5v-.5z"/><path d="m1.75.2 10.99 1.67c.73.12 1.26.74 1.26 1.48v5.74l-.4-.08c-.15-.03-.3.01-.42.1-.11.1-.18.24-.18.39v-6.15c0-.25-.18-.46-.42-.5l-10.99-1.66c-.03-.01-.06-.01-.09-.01-.12 0-.23.04-.32.12-.12.1-.18.23-.18.38v20.82c0 .28.23.5.5.5h2.5v.5c0 .28.22.5.5.5h-3c-.83 0-1.5-.67-1.5-1.5v-20.82c0-.44.19-.86.53-1.14.34-.29.78-.41 1.22-.34z"/></g></svg>'
  ),
  applicationFailed: new Path2D(
    '<svg  height="60" width="50" fill="#c7170a"  id="Layer_1" enable-background="new 0 0 512 512"  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><g><path d="m370 512h-228c-25.364 0-46-20.636-46-46v-420c0-25.364 20.636-46 46-46h228c25.364 0 46 20.636 46 46v420c0 25.364-20.636 46-46 46zm-228-480c-7.72 0-14 6.28-14 14v420c0 7.72 6.28 14 14 14h228c7.72 0 14-6.28 14-14v-420c0-7.72-6.28-14-14-14z"/><path d="m340.85 235.15c-4.097 0-8.191-1.563-11.316-4.689-19.635-19.643-45.75-30.461-73.534-30.461s-53.899 10.818-73.533 30.461c-6.246 6.25-16.378 6.252-22.628.005-6.249-6.247-6.252-16.378-.005-22.627 25.679-25.691 59.831-39.839 96.166-39.839s70.487 14.148 96.166 39.839c6.247 6.25 6.244 16.38-.005 22.627-3.124 3.122-7.219 4.684-11.311 4.684z"/><path d="m301.26 274.74c-4.095 0-8.189-1.562-11.313-4.686-9.064-9.063-21.119-14.054-33.947-14.054s-24.883 4.991-33.946 14.054c-6.248 6.248-16.379 6.248-22.627 0-6.249-6.249-6.249-16.379 0-22.627 15.106-15.107 35.198-23.427 56.573-23.427s41.467 8.32 56.573 23.427c6.249 6.248 6.249 16.379 0 22.627-3.124 3.124-7.219 4.686-11.313 4.686z"/><path d="m256 344c-13.233 0-24-10.767-24-24s10.767-24 24-24 24 10.767 24 24-10.767 24-24 24z"/><path d="m288 88h-64c-8.837 0-16-7.164-16-16s7.163-16 16-16h64c8.837 0 16 7.164 16 16s-7.163 16-16 16z"/></g></svg>'
  ),
  databaseFailed: new Path2D(
    '<svg height="60" width="50" fill="#c7170a" viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg"><g id="database_server" data-name="database server"><path d="m43.82 20.01a2.986 2.986 0 0 0 -2.82-2.01h-1v-2h1a3.009 3.009 0 0 0 3-3v-8a3.009 3.009 0 0 0 -3-3h-36a3.009 3.009 0 0 0 -3 3v8a3.009 3.009 0 0 0 3 3h1v2h-1a3.009 3.009 0 0 0 -3 3v8a3.009 3.009 0 0 0 3 3h1v2h-1a3.009 3.009 0 0 0 -3 3v8a3.009 3.009 0 0 0 3 3h19v8c0 3.94 9.56 6 19 6s19-2.06 19-6v-30c0-3.83-9.01-5.87-18.18-5.99zm-38.82-6.01a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h36a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1zm33 2v2h-4v-2zm-6 0v2h-18v-2zm-20 0v2h-4v-2zm12 30h-19a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h19zm-16-12v-2h4v2zm16 0h-10v-2h10zm0-8v4h-19a1 1 0 0 1 -1-1v-8a1 1 0 0 1 1-1h36a.7.7 0 0 1 .14.03c-8.8.25-17.14 2.29-17.14 5.97zm36 30c0 1.36-6 4-17 4s-17-2.64-17-4v-7.18c3.29 2.09 10.16 3.18 17 3.18s13.71-1.09 17-3.18zm0-10c0 1.36-6 4-17 4s-17-2.64-17-4v-7.18c3.29 2.09 10.16 3.18 17 3.18s13.71-1.09 17-3.18zm0-10c0 1.36-6 4-17 4s-17-2.64-17-4v-7.18c3.29 2.09 10.16 3.18 17 3.18s13.71-1.09 17-3.18zm-17-6c-11 0-17-2.64-17-4s6-4 17-4 17 2.64 17 4-6 4-17 4z"/><path d="m42 35h2v2h-2z"/><path d="m42 46h2v2h-2z"/><path d="m42 55h2v2h-2z"/><path d="m11 22h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m19 22h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m11 6h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m19 6h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m22 6h14v2h-14z"/><path d="m38 6h2v2h-2z"/><path d="m22 10h14v2h-14z"/><path d="m38 10h2v2h-2z"/><path d="m11 38h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/><path d="m19 38h-4a1 1 0 0 0 -1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0 -1-1zm-1 4h-2v-2h2z"/></g></svg>'
  ),
  siteFailed: new Path2D(
    '<svg height="60" width="50" fill="#c7170a"  id="_x31__px" enable-background="new 0 0 24 24"  viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg"><g id="XMLID_1_"><path d="m14 9.09 8.81 1.75c.71.15 1.19.75 1.19 1.46v10.2c0 .83-.67 1.5-1.5 1.5h-9c.28 0 .5-.22.5-.5v-.5h8.5c.27 0 .5-.22.5-.5v-10.2c0-.23-.16-.44-.39-.49l-8.61-1.7z"/><path d="m19.5 14c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m19.5 17c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m19.5 20c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m14 23.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-.5-13.5c0-.15.07-.29.18-.39.12-.09.27-.13.42-.1l.4.08v1.02 12.89z"/><path d="m13 23v.5c0 .28.22.5.5.5h-4c.28 0 .5-.22.5-.5v-.5z"/><path d="m10.5 5c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m11 8.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5z"/><path d="m10.5 11c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m10.5 14c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m6 14.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5z"/><path d="m5.5 5c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m5.5 8c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m5.5 11c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5z"/><path d="m9 18.5c0-.28-.23-.5-.5-.5h-3c-.28 0-.5.22-.5.5v4.5h-1v-4.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v4.5h-1z"/><path d="m5 23h4 1v.5c0 .28-.22.5-.5.5h-5c-.28 0-.5-.22-.5-.5v-.5z"/><path d="m1.75.2 10.99 1.67c.73.12 1.26.74 1.26 1.48v5.74l-.4-.08c-.15-.03-.3.01-.42.1-.11.1-.18.24-.18.39v-6.15c0-.25-.18-.46-.42-.5l-10.99-1.66c-.03-.01-.06-.01-.09-.01-.12 0-.23.04-.32.12-.12.1-.18.23-.18.38v20.82c0 .28.23.5.5.5h2.5v.5c0 .28.22.5.5.5h-3c-.83 0-1.5-.67-1.5-1.5v-20.82c0-.44.19-.86.53-1.14.34-.29.78-.41 1.22-.34z"/></g></svg>'
  ),
};




export default function Canvas(props) {
  const [
    OFFSET,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
  ] = useCanvas();

  // const netdata = props.data;
  // const [offset, setOffset] = React.useState(0);
 //console.log(netdata);
  const handleClearCanvas = (event) => {
    setCoordinates([]);
  };
  useEffect(() => {
    if (props.networks) {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    // draw(ctx);
    march();
    draw2(ctx);
   
    }
  }, [canvasRef]);

  useEffect(() => {
    if(canvasRef == null) {
      return
    }
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    march();
    draw2(ctx);
    
    // draw(ctx);
  }, [props.data]);
  
  function march() {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    // ctx.clearRect(LPrimaryX + 0, 50, canvasWidth/3, canvasHeight+500);
    // ctx.clearRect(LPrimaryX + 0, 50, width/1.5, height);
    ctx.clearRect(LPrimaryX + 0, 500, canvasWidth, canvasHeight);

    // setOffset(offset + 1);
    offset = offset+1;
    if (offset > 20) {
        offset = 0;
      }
      draw(ctx);
      
      setTimeout(march, 60);
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
    console.log("----------")
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
    ctx.font = "bold 14px ARIAL";
    ctx.fillText("PRIMARY SITE", 180,  50);
    ctx.fillText("SECONDARY SITE", 880,  50);
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
          ctx.drawImage(getImage(val.value1,val.value3), primaryX, val.row * image_gap );
          ctx.restore();
          //image_gap = image_gap + 150;
          break;
        case 2:
          //image_gap = image_gap + 150;
          ctx.font = "lighter 15px Arial";
          ctx.fillText(val.key, secondaryX+300, val.row * gap + 75);
          ctx.save();
          ctx.scale(1, 1  );
          //ctx.translate(secondaryX, val.row * gap);
          //ctx.rotate((100 * Math.PI) / 180);
          //ctx.clearRect(0,0,canvasWidth,canvasHeight)
          var imageObj1 = new Image();
          imageObj1.src = drawTypes.databaseFailed
          //ctx.drawImage(imageObj1, 1000,500);
          //ctx.drawImage(image,7000, val.row * image_gap,canvasWidth,canvasHeight);
          ctx.drawImage(getImage(val.value1,val.value3), secondaryX+300, val.row * image_gap );
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
  // function moveLine (posY) {
  //   posY += speed;
    
  //   if (posY < 0 || posY > canvas.height) {
  //     speed = speed * -1;
  //   }
  // }
  //requestAnimationFrame(() => draw(ctx,i));
  const draw = (ctx) => {
    console.log("draw");
    // const ctx = canvas.current.getContext('2d');
    const width = 1000;
    const height = 1000;
   
    const networkData = getNetworkData(props.data);
    const { nodes, links } = networkData;
    const LSecondaryX = LPrimaryX + width / 2 +150;
    const LTertiaryX = LSecondaryX + width / 3;
    const img = document.createElement('img')

    ctx.strokeStyle = "#084a80";
    //ctx.strokeStyle = "#044a80";
   
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(LPrimaryX + 0, 50, width/1.5, height);
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
            ctx.lineTo(LPrimaryX + 25, to.row * gap + 25 );
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
    // if (LPrimaryX >= canvasWidth) {
    //   LPrimaryX = 0;
    //   requestAnimationFrame(100);
    // } else {
    //   LPrimaryX = LPrimaryX + 1 + canvasWidth;
    //   requestAnimationFrame(function() {
    //     //drawLines(i);
    //   });
    // }
  };
  // window.setInterval(dashInterval, 500);
//   var currentOffset = 0;

// function dashInterval() {
//    // draw();
//     currentOffset += 10;
//     if (currentOffset >= 100) currentOffset = 0;
// }
  // requestAnimationFrame(100);
  // function moveLine () {
  //   posX += speed;
    
  //   if (posX < 0 || posX > canvasWidth) {
  //     speed = speed * -1;
  //   }
  // }
  // function loop() {
  //   // clear old frame;
  //   //ctx.clearRect(0,0,canvasWidth, canvasHeight);
  //   moveLine();
  //   //drawLine();
  //   requestAnimationFrame(loop);
  // }
  // requestAnimationFrame(loop);

  return (
    <canvas
    
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
}
