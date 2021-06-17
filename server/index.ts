import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { nanoid } from 'nanoid'
import { Folder } from 'nextcloud-node-client';

require('dotenv').config();

import { uploadImage } from './utils/multer';
import { nextCloud } from './nextcloud'
import { dropbox } from './dropbox'

const app = express()

app.use(
        cors({
                origin: process.env.CLIENT_URL
        })
);

app.use(cors());

app.use(express.json());

const PORT: number = +process.env.PORT || 5000

app.post('/upload/nextcloud', uploadImage, async (req: any, res: any) => {

        if (req.error) {
                return res.json(req.error)
        }

        const { client } = nextCloud()

        const fileType: string = req.file.mimetype?.split("/")[1]

        const imgData: Buffer = fs.readFileSync(req.file.path)

        const fileName: string = `${nanoid()}.${fileType}`

        let folder: Folder;

        folder = await client.getFolder("/upload");

        if (!folder) {
                folder = await client.createFolder("/upload");
        }

        // create file

        await folder?.createFile(fileName, imgData).then((response: any) => {

                // get image url

                // (async () => {
                //         const getFile = await folder.getFile(`/${fileName}`)

                //         const url: any = getFile.getUrl();
                // })()

                return res.json({ id: nanoid(), message: 'Image upload successfully.', type: 'success' })

        }).catch((err: any) => {

                console.log(err, 'err');


                return res.json({ id: nanoid(), message: 'Image upload failed.', type: 'error' })

        });

})

app.post('/upload/dropbox', uploadImage, async (req: any, res: any) => {

        if (req.error) {
                return res.json({ errors: req.error })
        }

        const path: any = req.file.path

        const fileType: string = req.file.mimetype?.split("/")[1]

        const image: string = `${nanoid()}.${fileType}`

        const paramsUpload = Object.freeze({
                resource: 'files/upload',
                parameters: {
                        path: `/upload/${image}`
                },
                readStream: fs.createReadStream(path)
        });

        const paramsDownload = Object.freeze({
                resource: 'files/download',
                parameters: {
                        path: `/upload/${image}`
                }
        });

        await dropbox(paramsUpload, (err: any, result: any) => {
                if (err) {

                        return res.json({ id: nanoid(), message: 'Image upload failed.', type: 'error' })

                } else {


                        // download image 

                        // (async () => {
                        //         await dropbox(paramsDownload, (err: any, result: any) => {
                        //                 if (err) {

                        //                         console.log('error download image');

                        //                 } else {

                        //                         console.log('successfully download image');

                        //                 }

                        //         }).pipe(fs.createWriteStream(`./download/${image}`));
                        // })()

                        return res.json({ id: nanoid(), message: 'Image upload successfully.', type: 'success' })
                }
        });
})

app.listen(PORT, () => {

        console.log(`Server successfully created on Port: 5000`);

});