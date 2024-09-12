import { ethers } from "ethers";

const bytes = ethers.utils.toUtf8Bytes(JSON.stringify({  action: 'register-log' }))

console.log(bytes)
