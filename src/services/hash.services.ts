import cryto from "crypto";
import bcrypt from "bcryptjs";

export class HashService {
  hashOtp(data: string) {
    return cryto
      .createHmac("sha256", process.env.HASH_SECRET!)
      .update(data)
      .digest("hex");
  }

  async hashPassword(data: string) {
    return await bcrypt.hash(data, 10);
  }
}
