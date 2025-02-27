import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  //? CORS
  app.enableCors();

  //? config swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(
      'This is the API documentation for the Fastify-based project',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
