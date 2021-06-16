import Client, { Server } from "nextcloud-node-client";
import { NEXTCLOUD_PASSWORD, NEXTCLOUD_URL, NEXTCLOUD_USERNAME } from './env'

export const nextCloud = () => {

        const server: Server = new Server(
                {
                        basicAuth:
                        {
                                username: NEXTCLOUD_USERNAME,
                                password: NEXTCLOUD_PASSWORD,
                        },
                        url: NEXTCLOUD_URL,
                });

        const client = new Client(server);


        return { client }
}
