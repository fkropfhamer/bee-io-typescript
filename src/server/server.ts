import * as express from "express";
import * as http from "http";
import Config from "../global/config";

export default class Server {
    private app: express.Express;
    private server: http.Server;


    constructor() {
        this.app = express();
        this.app.use(express.static("public"));

        this.server = http.createServer(this.app);
        this.server.listen(Config.PORT, () => {
            console.log(`server is listening on port ${Config.PORT}`);
        });
    }
}