import { SignUpTemplate } from "@/app/email-templates/signup";
import { Resend } from "resend";
import { EmailData } from "../definitions";
import { ForgotPasswordTemplate } from "@/app/email-templates/forgot-password";

const apiKey = process.env.RESEND_API_KEY;
const senderAddress = process.env.RESEND_SENDER;
const resend = new Resend(apiKey);

export async function sendEmail(emailData: EmailData) {
  try {
    const { to, subject } = emailData;
    const templateNode = getTemplate(emailData);

    const { data, error } = await resend.emails.send({
      from: `CarHistory <${senderAddress}>`,
      to: [to],
      subject: subject,
      react: templateNode as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}

const getTemplate = (emailData: EmailData) => {
  switch (emailData.template) {
    case "signup":
      return SignUpTemplate(emailData);
    case "forgot-password":
      return ForgotPasswordTemplate(emailData);
    default:
      return SignUpTemplate(emailData);
  }
};
