import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";




export const signProtocol = async (req, res) => {

    try{

        const privateKey = process.env.PRIVATE_KEY;
        console.log("signing protocol");
        const client = new SignProtocolClient(SpMode.OnChain, {
            chain: EvmChains.sepolia,
            account: privateKeyToAccount(privateKey), // Optional, depending on environment
        });

        const response = await client.createSchema({
            name: "SDK Test",
            data: [
              { name: "contractDetails", type: "string" },
              { name: "signer", type: "address" },
            ],
          });

          console.log(response);

          return res.sendStatus(200);


    } catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}
