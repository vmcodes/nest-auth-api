import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClusterService } from "./cluster.service";
import { ValidationPipe } from "@nestjs/common";
import * as compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
  console.log(`NEST (${process.pid}) IS RUNNING ON `, 8080);
}

ClusterService.clusterize(bootstrap);
