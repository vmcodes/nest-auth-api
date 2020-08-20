import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { configs } from "./environment";

@Module({
  imports: [
    MongooseModule.forRoot(configs.connectionString),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
