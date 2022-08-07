import { JWK, JWS } from "node-jose";
import * as privateJwks from '../resources/jwks-private-with-ec.json';
import * as jose from 'jose';
import {FlattenedJWSInput, GetKeyFunction, JWSHeaderParameters} from "jose/dist/types/types";
import EnvConfig from "./env-config";

export default class JwtUtil {
    
    static async createJWS(): Promise<string> {
        let ecKeys = privateJwks.keys.filter(k => {
            return k.kty === "EC" && k.use === "sig";
        });
    
        let ecKeystore: JWK.KeyStore = await JWK.asKeyStore(ecKeys);
    
        /*ecKeystore.*/
        
        /*JWS.createSign({
        
        }, ecKeystore.all()).update({
        
        })*/
        let jwks: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput> = jose.createLocalJWKSet(privateJwks);
    
        /*const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg: 'ES256' })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(jwks.)*/
        
        let config = EnvConfig.getConfig();
    
        const opt = { compact: true, fields: { typ: 'jwt' } };
        
        const payloadAccessToken = JSON.stringify({
            exp: Math.floor(((Date.now()) / 1000) + 3600),
            iat: Math.floor(Date.now() / 1000),
            data: {
                "user": "123"
            },
            aud: "right-side",
            iss: `${config.full_host}`
        });
    
        let token: JWS.CreateSignResult = await JWS.createSign({format: 'compact', fields: { typ: 'jwt' }}, ecKeystore.all()[0])
            .update(payloadAccessToken)
            .final();
    
        return token.toString();
    }
    
}
