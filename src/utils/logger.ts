import { Logger, createLogger, transports, format } from "winston";
import EnvConfig from './env-config';

const envConfig = EnvConfig.getConfig();
const packageDetails = EnvConfig.getPackageDetails();

let log:Logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.label(),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: 'error'
        }),
        new transports.File ({ filename: 'logs.log' })
    ],
    defaultMeta: { application: `${envConfig.name}`, version: packageDetails.version },
});

export default log;
