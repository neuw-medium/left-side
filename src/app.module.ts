import {Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { JwksController } from './jwks.controller';
import { AppService } from './app.service';
import {JwksService} from "./jwks.service";

@Module({
    imports: [],
    controllers: [AppController, JwksController],
    providers: [AppService, JwksService, Logger],
})
export class AppModule {}
