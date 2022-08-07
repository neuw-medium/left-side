import { Injectable } from '@nestjs/common';
import jwksManager from "./utils/jwks.manager";

@Injectable()
export class JwksService {
    getJwks(): any {
        return jwksManager.getPublicJwks();
    }
}
