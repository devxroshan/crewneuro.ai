export const welcomeEmail = (name: string, currentYear: string) => {
  return `
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="background-color: #1e1e2f; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🚀 Welcome to CrewNeuro</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 16px; color: #333333;">Hi ${name},</p>
          <p style="font-size: 16px; color: #333333;">
            We're thrilled to have you join <strong>CrewNeuro</strong> – your AI-powered virtual workspace!
          </p>
          <p style="font-size: 16px; color: #333333;">
            Here’s what you can do next:
          </p>
          <ul style="font-size: 16px; color: #333333; padding-left: 20px;">
            <li>Create your first project space</li>
            <li>Invite team members to collaborate</li>
            <li>Assign AI employees and let them handle tasks for you</li>
          </ul>
          <p style="font-size: 16px; color: #333333;">
            Click below to get started:
          </p>
          <p style="text-align: center;">
            <a href=${"#"} style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Go to Dashboard
            </a>
          </p>
          <p style="font-size: 14px; color: #777777; margin-top: 20px;">
            Need help? Just reply to this email – we're here for you!
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f3f3f3; text-align: center; padding: 15px; font-size: 12px; color: #555;">
          © ${currentYear} CrewNeuro. All rights reserved.
        </td>
      </tr>
    </table>
  </body>`;
};

export const emailVerification = (
  name: string,
  verificationLink: string,
  currentYear: string
) => {
  return `
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #1e1e2f; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">🔒 Verify Your Email</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 16px; color: #333333;">Hi ${name},</p>
        <p style="font-size: 16px; color: #333333;">
          Thank you for signing up with CrewNeuro! Please verify your email address by clicking the button below:
          </p>
        <p style="text-align: center;">
          <a href=${verificationLink} style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Verify Email
            </a>
            </p>
            <p style="font-size: 14px; color: #777777; margin-top: 20px;">
            If you did not create an account, no further action is required.
            </p>
            </td>
            </tr>
            <tr>
            <td style="background-color: #f3f3f3; text-align: center; padding: 15px; font-size: 12px; color: #555;">
            © ${currentYear} CrewNeuro. All rights reserved.
            </td>
            </tr>
            </table>
            </body>`;
};
