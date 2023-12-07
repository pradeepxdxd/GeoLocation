import express from "express";
import cors from 'cors'
import { SuperfaceClient } from "@superfaceai/one-sdk";
const app = express();
app.set("trust proxy", true);
app.use(cors());

const sdk = new SuperfaceClient();

async function run(ip) {
    // Load the profile
    const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");
    // Use the profile
    const result = await profile.getUseCase("IpGeolocation").perform(
        {
            ipAddress: ip
        },
        {
            provider: "ipdata",
            security: {
                apikey: {
                    apikey: "26d3e5db3eaca3ad463c360a5081a313e91fed287dcabd71c8b76bf3"
                }
            }
        }
    );

    // Handle the result
    try {
        const data = result.unwrap();
        return data;
    } catch (error) {
        console.error(error);
    }
}

app.get("/", async (req, res) => {
    res.send(await run(req.ip));
});

app.listen(3004, () => {
    console.log("SERVER RUNNIHG AT PORT 3004");
});