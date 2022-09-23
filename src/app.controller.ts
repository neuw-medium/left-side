import {Controller, Get, HttpCode, HttpStatus, Logger, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import logger from "./utils/logger";
import JwtUtil from "./utils/jwt.util";

@Controller('/apis/v1')
export class AppController {
    
    private readonly logger = new Logger(AppController.name);
    
    constructor(private readonly appService: AppService) {
    
    }
    
    @HttpCode(HttpStatus.OK)
    @Get('/user')
    async getUser(@Query("id") id: string): Promise<any> {
        this.logger.log(`request param id = ${id}`);
        let token = await JwtUtil.createJWS();
        return this.appService.getUserPIIData(token);
    }
}
