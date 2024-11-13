import cryto from "crypto";
import twilio from "twilio";

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const client = twilio(smsSid, smsAuthToken, {
  lazyLoading: true,
});

export class OtpService {
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

  verifyOtp() {}
}
