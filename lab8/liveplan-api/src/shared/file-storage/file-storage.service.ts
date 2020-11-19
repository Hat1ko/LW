import {BadRequestException, HttpService, Injectable} from '@nestjs/common';
import {Client} from 'minio';
import {ConfigService} from '../config/config.service';
import {FileInterface} from './file.interface';

@Injectable()
export class FileStorageService {
    private minioClient: Client;
    private bucket: string = 'liveplan';
    private readonly urlPrefix: string;

    constructor(
        configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.minioClient = new Client({
            endPoint: configService.get('MINIO_HOST'),
            port: Number(configService.get('MINIO_PORT')),
            useSSL: configService.get('MINIO_USE_SSL') === 'true',
            accessKey: configService.get('MINIO_ACCESS_KEY'),
            secretKey: configService.get('MINIO_SECRET_KEY'),
        });
        this.urlPrefix = configService.get('MINIO_URL_PREFIX');
    }

    public removeObject(url: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const path = url.replace(`${this.urlPrefix}/${this.bucket}`, '');
            this.minioClient.removeObject(this.bucket, path, (e) => e ? reject(false) : resolve(true));
        });
    }

    public removeObjects(urls: string[]): Promise<boolean> {
        urls = urls.map((item) => item.replace(`${this.urlPrefix}/${this.bucket}`, ''));
        return new Promise((resolve, reject) =>
            this.minioClient.removeObjects(this.bucket, urls, (e) => e ? reject(false) : resolve(true)),
        );
    }

    public saveImage(file: FileInterface, path?: string) {
        if (!file || !file.mimetype) {
            throw new BadRequestException('Image is required');
        } else if (
            !file.mimetype.includes('image') &&
            !file.mimetype.includes('png') &&
            !file.mimetype.includes('jpg') && !file.mimetype.includes('webp')) {
            throw new BadRequestException('Image type is invalid');
        }
        return this.putObject(file, path);
    }

    async saveFileFromUrl(url: string, name: string, mimeType: string, folderPath: string = 'images')
        : Promise<string> {
        try {
            const response = await this.httpService.axiosRef({
                url: url,
                method: 'GET',
                responseType: 'stream',
            });

            return await this.putObject({
                buffer: response.data,
                originalname: name,
                mimetype: mimeType,
            }, folderPath);
        } catch (e) {
            console.log(e);
        }
    }

    private putObject(file: FileInterface, folderPath: string = 'images'): Promise<string> {
        return new Promise((resolve, reject) => {
            const folder = this.createFolderPath(folderPath);
            const fileName = this.fileNameTransformer(file);
            const metaData = {'Content-Type': file.mimetype};

            this.minioClient.putObject(this.bucket, `${folder}/${fileName}`,
                file.buffer, null, metaData, (err) => {
                    err ? reject(err) : resolve(this.createFullFilePath(folder, fileName));
                });
        });
    }

    private createFullFilePath(folder: string, file: string): string {
        return `${this.urlPrefix}/${this.bucket}/${folder}/${file}`;
    }

    private createFolderPath(preFolderPath: string): string {
        return `${preFolderPath}/${new Date().getFullYear()}/${new Date().getMonth()}`;
    }

    private fileNameTransformer(file: FileInterface): string {
        return `${new Date().getTime()}.${file.originalname.replace(/ /g, '_')}`;
    }
}
