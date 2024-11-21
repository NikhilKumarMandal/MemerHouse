import cryto from "crypto";
import { HashService } from "./hash.services";
import { MailgenContent, SendEmailVerificationProps } from "../types/type";
import Mailgen from "mailgen";
import transporter from "../config/emailConfig";

export class OtpService {
  constructor(private hashService: HashService) {}

  genrateOtp() {
    const otp = cryto.randomInt(100000, 999999);
    return otp;
  }

  async sendEmail({
    email,
    subject,
    mailgenContent,
  }: SendEmailVerificationProps) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "nikhil",
        link: "http://localhost:5173/",
      },
    });

    console.log(mailgenContent);

    const emailBody = mailGenerator.generate(mailgenContent);
    const emailText = mailGenerator.generatePlaintext(mailgenContent);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: emailText,
      html: emailBody,
    });
  }

  verifyEmail(name: string, verifyotp: string): MailgenContent {
    return {
      body: {
        name: name,
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        dictionary: {
          OTP: verifyotp,
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
  }
}
