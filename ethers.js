import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
export const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
export const localSigner = ethers.Wallet.fromMnemonic('test test test test test test test test test test test junk');