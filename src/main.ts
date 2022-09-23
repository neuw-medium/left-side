import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import EnvConfig from "./utils/env-config";
import {textSync} from "figlet";
import winston, {createLogger, format, transports} from "winston";
import {LoggerService} from "@nestjs/common";

async function bootstrap() {
    
    let config = EnvConfig.getConfig();
    let packageDetails = EnvConfig.getPackageDetails();
    
    let winstonLogger: winston.Logger = createLogger({
        level: 'debug',
        format: format.combine(
            format.errors({ stack: true }),
            format.timestamp(),
            format.label(),
            format.json()
        ),
        transports: [
            new transports.Console(),
            new transports.File ({ filename: 'logs.log' })
        ],
        defaultMeta: { application: `${config.name}`, version: packageDetails.version },
    });
    
    let customLogger:LoggerService = {
        debug(message: any, ...optionalParams: any[]): any {
            winstonLogger.debug({
                message: message,
                component: optionalParams[0]
            })
        },
        error(message: any, ...optionalParams: any[]): any {
            winstonLogger.error({
                message: message,
                component: optionalParams[0]
            })
        },
        verbose(message: any, ...optionalParams: any[]): any {
            winstonLogger.verbose({
                message: message,
                component: optionalParams[0]
            })
        },
        warn(message: any, ...optionalParams: any[]): any {
            winstonLogger.warn({
                message: message,
                component: optionalParams[0]
            })
        },
        log: (message: any, ...optionalParams: any[]) => {
            winstonLogger.log('info',{
                message: message,
                component: optionalParams[0]
            })
        }
    }
    
    const app = await NestFactory.create(AppModule, {
        logger: customLogger
    });
    
    /*console.log(config);*/
    console.log("config.prod",config.prod);
    if (config.prod === false) {
        app.enableCors({
            origin: '*'
        });
    }
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    await app.listen(config.port);

    
    app.useLogger(customLogger);

    return config;
}

bootstrap().then((c) => {
    console.log(`Server is up on port ${c.port}`);
    console.log(textSync(c.name.toUpperCase(), {
        font: 'Big',
        horizontalLayout: 'full'
    }));
});
