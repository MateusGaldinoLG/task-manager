import { env } from "./config/env.js";
import { buildApp } from "./index.js";


async function start(){
    const app = await buildApp();

    try {
        await app.listen({
            port: env.PORT,
            host: "0.0.0.0"
        })
    } catch (error) {
        app.log.error(error);
    }
}

void start();