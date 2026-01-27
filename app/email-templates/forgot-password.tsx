import * as React from "react";
import { EmailData } from "../lib/definitions";

export const ForgotPasswordTemplate: React.FC<Readonly<EmailData>> = ({
  to,
  url,
}) => (
  <div>
    <h1>Hey, {to.split("@")[0]}!</h1>

    <p>Please click the link below to reset your password.</p>
    <a href={url}>Reset Password</a>
  </div>
);
