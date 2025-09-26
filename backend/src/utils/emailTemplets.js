export const resetPasswordTemplate = (resetLink) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <table style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #2f855a;">Reset Your Password</h2>
          <p style="margin: 20px 0; font-size: 16px;">
            We received a request to reset your password. Click the button below to create a new one.
          </p>
          <a href="${resetLink}" target="_blank" 
             style="display: inline-block; margin: 20px 0; padding: 12px 25px; background-color: #38a169; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
          <p style="font-size: 14px; color: #555;">
            If you did not request this, you can safely ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #aaa;">
            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;


export const otpVerificationTemplate = (otp) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Verification</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

      body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background-color: #f1f5f9;
        color: #111827;
      }

      .email-container {
        max-width: 500px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 40px;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
      }

      .brand {
        text-align: center;
        margin-bottom: 30px;
      }

      .brand h1 {
        color: #16a34a;
        font-size: 24px;
        font-weight: 700;
        margin: 0;
      }

      .title {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .subtext {
        text-align: center;
        font-size: 15px;
        color: #6b7280;
        margin-bottom: 30px;
      }

      .otp-box {
        background-color: #f0fdf4;
        border: 2px solid #22c55e;
        padding: 18px 24px;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
        letter-spacing: 6px;
        color: #15803d;
        border-radius: 12px;
        width: fit-content;
        margin: 0 auto 30px;
      }

      .info {
        font-size: 13px;
        color: #6b7280;
        text-align: center;
        margin-bottom: 40px;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
        border-top: 1px solid #e5e7eb;
        padding-top: 20px;
      }

      @media only screen and (max-width: 600px) {
        .email-container {
          padding: 30px 20px;
        }

        .otp-box {
          font-size: 24px;
          padding: 16px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="brand">
        <h1>YourApp</h1>
      </div>

      <div class="title">Verify Your Email</div>
      <div class="subtext">Enter the OTP below to complete your verification.</div>

      <div class="otp-box">${otp}</div>

      <div class="info">
        This OTP is valid for 10 minutes.<br/>
        If you didn’t request this, you can safely ignore this email.
      </div>

      <div class="footer">
        &copy; ${new Date().getFullYear()} YourApp Inc. All rights reserved.
      </div>
    </div>
  </body>
  </html>
`;


export const passwordResetSuccessTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Successfully Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f0fdf4;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
    }
    .container {
      max-width: 500px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: #22c55e;
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .body {
      padding: 30px;
      text-align: center;
    }
    .icon-success {
      background: #d1fae5;
      display: inline-block;
      padding: 15px;
      border-radius: 9999px;
      margin-bottom: 20px;
    }
    .icon-success svg {
      height: 36px;
      width: 36px;
      stroke: #22c55e;
    }
    .body p {
      font-size: 16px;
      line-height: 1.6;
      margin: 10px 0 0;
    }
    .footer {
      font-size: 12px;
      color: #6b7280;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="body">
      <div class="icon-success">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="2" 
          stroke="#22c55e" 
          width="36" 
          height="36"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>

      </div>
      <p>Your password has been successfully changed.</p>
      <p>You can now log in using your new password.</p>
    </div>
    <div class="footer">
      If you didn’t request this change, please contact support immediately.<br />
      &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
    </div>
  </div>
</body>
</html>
`;


export const supportEmailTemplate = ( name, email, message ) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Support Request</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <table style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #3182ce;">New Support Request</h2>
          <p style="margin: 20px 0; font-size: 16px;">
            You have received a new support request from your website.
          </p>
          <div style="text-align: left; background-color: #f1f1f1; padding: 15px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
          <p style="font-size: 14px; color: #555; margin-top: 20px;">
            Please respond to the user as soon as possible.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #aaa;">
            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
