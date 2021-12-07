import socketIOClient from "socket.io-client";
import BASEURL from "./baseurl";

const socket = socketIOClient(BASEURL);

console.log('Socket ', socket)
export default socket