// Generates a VAPID key pair for admin push notifications.
//   node scripts/generate-vapid.mjs
// Then: wrangler secret put VAPID_PUBLIC_KEY   (paste the public key)
//       wrangler secret put VAPID_PRIVATE_KEY  (paste the private key)
import { webcrypto as c } from "node:crypto";
const b64u = (b) => Buffer.from(b).toString("base64url");
const kp = await c.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
const pub = new Uint8Array(await c.subtle.exportKey("raw", kp.publicKey));
const jwk = await c.subtle.exportKey("jwk", kp.privateKey);
console.log("VAPID_PUBLIC_KEY=" + b64u(pub));
console.log("VAPID_PRIVATE_KEY=" + jwk.d);
