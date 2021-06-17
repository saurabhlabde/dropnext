import multer from 'multer'
import { nanoid } from 'nanoid';


const storage = multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
                cb(null, 'public/');
        },
        filename: (req: any, file: any, cb: any) => {
                const fileName = file.originalname.toLowerCase().split(' ').join('-');
                cb(null, fileName)
        }
});

const upload = multer({
        storage: storage,
        fileFilter: (req: any, file: any, cb: any) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                        cb(null, true);
                } else {
                        cb(null, false);
                        req.error = { id: nanoid(), message: 'Only .png, .jpg and .jpeg allowed', type: 'error' };
                        return cb(null, false, new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
        }
});

export const uploadImage = upload.single('photo')

