import {Injectable} from '@nestjs/common';
import {FileInterface} from '../file-storage/file.interface';
import {readFile} from 'fs';
import {basename} from 'path';
import mime = require('mime-types');

@Injectable()
export class HelpersService {
    static randomString(length: number) {
        return Math.random().toString(length).substring(2, 15) + Math.random().toString(length).substring(2, 15);
    }

    static readFileFromFileSystem(path: string): Promise<FileInterface> {
        return new Promise((resolve, reject) => {
            const file: FileInterface = {buffer: undefined, mimetype: '', originalname: ''};
            readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                }
                file.buffer = data;
                file.mimetype = mime.lookup(path);
                file.originalname = basename(path);
                resolve(file);
            });
        });
    }
}
