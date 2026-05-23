/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorMessageDto } from './global/dto';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('IdeaOut API documentation')
    .setDescription('The IdeaOut API documentation')
    .setContact(
      'AzCodes',
      'https://azcodes.ideaout.app',
      'mumuniazeez99@gmail.com',
    )
    .setVersion('1.0')
    .addServer(process.env.APP_URL!)
    .addBearerAuth()
    .addGlobalResponse({
      type: ErrorMessageDto,
      status: '4XX',
      description: 'Client side error',
    })
    .addGlobalResponse({
      type: ErrorMessageDto,
      status: '5XX',
      description: 'Server side error',
    })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

void bootstrap();
