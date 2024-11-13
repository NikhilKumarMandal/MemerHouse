import cryto from "crypto";
import twilio from "twilio";
import { HashService } from "./hash.services";

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const client = twilio(smsSid, smsAuthToken, {
  lazyLoading: true,
});

export class OtpService {
  constructor(private hashService: HashService) {}

  genrateOtp() {
    const otp = cryto.randomInt(100000, 999999);
    return otp;
  }

  async sendBySms(phone: string, otp: number) {
    return await client.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your memerHouse OTP is ${otp}`,
    });
  }

  verifyOtp(hashedOtp: string, data: string): boolean {
    const hash = this.hashService.hashOtp(data);
    return hashedOtp === hash;
  }
}
