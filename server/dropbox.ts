
import dropboxV2Api from 'dropbox-v2-api'
import { DROPBOX_TOKEN } from './env';

export const dropbox: any = dropboxV2Api.authenticate({
        token: DROPBOX_TOKEN
});