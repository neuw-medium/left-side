import { Injectable } from '@nestjs/common';
import axios from "axios";
import EnvConfig from "./utils/env-config";
import JwtUtil from "./utils/jwt.util";

@Injectable()
export class AppService {
    getUserPIIData(token: string): any {
        return axios.create({
            method: 'POST',
            headers: {
                'x-data-token': token
            }
        }).post(EnvConfig.getConfig().right_side.url).then(async r => {
            let dec = await JwtUtil.decryptData(r.data["data-token"]).then(res => {
                /*console.log("data-token", res.toString())*/
                return res;
            })
            return {
                actual: r.data,
                "data": JSON.parse(dec.toString())
            };
        });
    }
}
