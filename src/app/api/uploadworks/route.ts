import {createRouteHandler} from "uploadworks/server";
import {ourFileRouter} from "./main";

export const { GET, POST, PUT } = createRouteHandler({
    router: ourFileRouter,
    config: {
        bucket: process.env.BUCKET!,
        key: process.env.API_KEY!,
        webhook_secret: process.env.WEBHOOK_SECRET!,
        callbackUrl: "/api/uploadworks"
    }
});

