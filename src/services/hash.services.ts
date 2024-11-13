import cryto from "crypto";

export class HashService {
  hashOtp(data: string) {
    return cryto
      .createHmac("sha256", process.env.HASH_SECRET!)
      .update(data)
      .digest("hex");
  }
}
