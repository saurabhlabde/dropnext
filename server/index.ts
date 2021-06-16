import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { nanoid } from 'nanoid'
import dropboxV2Api from 'dropbox-v2-api'
import { Folder } from 'nextcloud-node-client';
import { uploadImage } from './utils/multer';
import { nextCloud } from './nextcloud'
import { DROPBOX_TOKEN } from './env';

require('dotenv').config();

const app = express()

app.use(
        cors({
                origin: "http://localhost:3000"
        })
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
        res.json({ hello: 'hello index' })
})

app.post('/upload/nextcloud', uploadImage, async (req: any, res: any) => {

        if (req.error) {
                return res.json({ errors: req.error })
        }

        const { client } = nextCloud()

        const fileType: string = req.file.mimetype?.split("/")[1]

        const imgData: Buffer = fs.readFileSync(req.file.path)

        const fileName: string = `${nanoid()}.${fileType}`

        const folder: Folder = await client.getFolder("/upload");

        if (!folder) {
                return res.json({ errors: 'folder not found' })
        }

        await folder?.createFile(fileName, imgData).then((res: any) => {
                return res.json({ success: "Your file has been successfully added." })
        }).catch((err: any) => {
                return res.json({ errors: err })
        });

})

app.post('/upload/dropbox', uploadImage, (req: any, res: any) => {

        if (req.error) {
                return res.json({ errors: req.error })
        }

        const path: any = req.file.path

        const fileType: string = req.file.mimetype?.split("/")[1]

        const dropbox: any = dropboxV2Api.authenticate({
                token: DROPBOX_TOKEN
        });

        const params = Object.freeze({
                resource: 'files/upload',
                parameters: {
                        path: `/upload/${nanoid()}.${fileType}`
                },
                readStream: fs.createReadStream(path)
        });

        let dropboxPromise = new Promise(function (resolve: any, reject: any) {
                dropbox(params, function (err: any, result: any) {
                        if (err) {
                                reject(err);
                        } else {
                                resolve(result);
                        }
                });
        });

        dropboxPromise.then(function (resultObj) {
                return res.json({ success: "Your file has been successfully added." })
        }).catch(function (err) {
                return res.json({ errors: err })
        });
})

app.listen(5000, () => {
        console.log(`Server successfully created on Port: 5000`);
});