import nodemailer from 'nodemailer';
import AppError from "./appError";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
    }
})


export const SendMail = async (
  to: string,
  subject: string,
  html: string
): Promise<boolean> => {
  try {
    await transporter.sendMail({
        from: `"Crew Neuro" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html
    })

    return true;
  } catch (error) {
    if(process.env.NODE_ENV != 'production'){
      console.log('Error sending email:', error);
    }
    return false;
  }
};
