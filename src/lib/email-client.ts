import sgMail from "@sendgrid/mail";
import { env } from "@/env.mjs";

if (!env.SEND_GRID_API_KEY) {
  throw new Error("Failed to initialize SendGrid Key");
}

sgMail.setApiKey(env.SEND_GRID_API_KEY);

const emailClient = sgMail;

export default emailClient;
