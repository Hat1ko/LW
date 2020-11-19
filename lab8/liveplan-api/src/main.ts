import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as bodyParser from 'body-parser';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {SeederService} from './shared/seeder/seeder.service';

declare const module: any;

async function bootstrap() {
    const appOptions = {cors: true, bodyParser: false};
    const app = await NestFactory.create(AppModule, appOptions);

    app.useGlobalPipes(new ValidationPipe());

    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('LiveServices')
        .setDescription('The LiveServices API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    const seeder = app.get(SeederService);
    await seeder.seed();
}

bootstrap();
