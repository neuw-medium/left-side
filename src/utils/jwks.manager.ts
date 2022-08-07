import * as privateJwks from '../resources/jwks-private-with-ec.json';
import {JWK} from "node-jose";

class JwksManager {

    // private JWKS can be fetched from env/ vault for
    async getPublicJwks() {
        let keystore: JWK.KeyStore = await JWK.asKeyStore(privateJwks);
    
        return keystore.toJSON();
    }

}

const jwksManager = new JwksManager();

export default jwksManager;
