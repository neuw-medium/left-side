import {Controller, Get} from '@nestjs/common';
import {JwksService} from "./jwks.service";
import EnvConfig from "./utils/env-config";

@Controller('/.well-known')
export class JwksController {
    
    constructor(private readonly jwksService: JwksService) {}
    
    @Get('/jwks')
    getJwks(): any {
        return this.jwksService.getJwks();
    }
    
    @Get('/openid-configuration')
    getOpenIdConfig(): any {
        return {
            "jwks_uri": EnvConfig.getConfig().jwks_uri
        }
    }
}
