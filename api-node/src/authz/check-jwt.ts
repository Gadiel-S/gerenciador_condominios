import { expressjwt as jwt} from 'express-jwt';
import jwksRsa from "jwks-rsa";
import { domain, audience } from "../configuration/env.dev";

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }) as jwksRsa.GetVerificationKey,

  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});