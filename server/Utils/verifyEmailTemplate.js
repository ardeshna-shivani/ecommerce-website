const VerificationEmail = (username, otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body{
            font-family: Arial,sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333
        }

        .container{
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
      font-size: 24px;
      color: #333333;
    }

    .content {
      margin-top: 20px;
      font-size: 16px;
      color: #555555;
    }
      .otp{
      margin: 20px 0;
      background-color: #f9f9f9;
      border: 1px dashed #ccc;
      padding: 15px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #ff5252;
      border-radius: 6px;
    }
      .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #888888;
    }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Hii ${username} Please verify your email address</h1>
        </div>
        <div class="content">
            <p>Thank you for registering Ecommerce App. Plese use the otp below to verify your email Address:</p>
            <div class="otp">${otp}</div>
            <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>

        <div class="footer">
            <p>&copy; 2024 Ecommerce App. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`
}

export default VerificationEmail;