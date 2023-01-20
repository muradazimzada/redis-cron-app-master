import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const microservice =
  //   await NestFactory.createMicroservice<MicroserviceOptions>({
  //     transport: Transport.RMQ,
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'suits_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   });
  // app.connectMicroservice(microservice);
  await app.listen(3000);
}
bootstrap()
  .then(() => {
    console.log('Bootstrap  complete!');
  })
  .catch((error) => {
    console.log('Bootstrap failed: ', error);
    process.exit(1);
  });
