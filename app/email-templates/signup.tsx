import * as React from "react";
import { EmailData } from "../lib/definitions";

export const SignUpTemplate: React.FC<Readonly<EmailData>> = ({
  to,
  url,
}: EmailData) => (
  <div>
    <h1>Welcome, {to.split("@")[0]}!</h1>

    <p>Please click the link below to confirm your email address.</p>
    <a href={url}>Confirm Email</a>
  </div>
);
