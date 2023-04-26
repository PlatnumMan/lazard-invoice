import 'dotenv/config';
import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import transpoter from '../helpers/emailTransport.js';
import { systemLogs } from './utils/Logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
  try {
    const sourceDirectory = fs.readFileSync(
      path.join(__dirname, template),
      'utf-8'
    );

    const compileTemplate = Handlebars.compile(sourceDirectory);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compileTemplate(payload),
    };
    await transpoter.sendMail(emailOptions);
  } catch (error) {
    systemLogs.error(`Error sending email: ${error}`);
  }
};

export default sendEmail;