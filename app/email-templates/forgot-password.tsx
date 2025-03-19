import * as React from "react";
import { EmailData } from "../lib/definitions";

const domain = process.env.DOMAIN;

export const ForgotPasswordTemplate: React.FC<Readonly<EmailData>> = ({
  email,
  token,
}) => (
  <div>
    <h1>Hey, {email.split("@")[0]}!</h1>

    <p>Please click the link below to reset your password.</p>
    <a href={`${domain}/forgot-password/${token}`}>Reset Password</a>
  </div>
);
