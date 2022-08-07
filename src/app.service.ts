import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getUserPIIData(): any {
        return 'Hello World!';
    }
}
