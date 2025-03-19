import * as React from "react";
import { EmailData } from "../lib/definitions";

const domain = process.env.DOMAIN;

export const SignUpTemplate: React.FC<Readonly<EmailData>> = ({
  email,
  token,
}) => (
  <div>
    <h1>Welcome, {email.split("@")[0]}!</h1>

    <p>Please click the link below to confirm your email address.</p>
    <a href={`${domain}/signup/validate/${token}`}>Confirm Email</a>
  </div>
);
