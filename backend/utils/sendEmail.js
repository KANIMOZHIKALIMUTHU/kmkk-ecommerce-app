const nodemailer = require('nodemailer');

const sendOrderEmail = async (order, user) => {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Confirmation #${order.orderId}</h1>
      <p>Dear ${user.name},</p>
      <p>Thank you for your order placed on ${new Date(order.createdAt).toLocaleDateString()}!</p>
      <h3>Order Summary:</h3>
      ${order.items.map(item => `
        <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
          <strong>${item.name}</strong> (${item.size}) x${item.quantity} - $${item.price * item.quantity}
        </div>
      `).join('')}
      <h2 style="color: #28a745;">Total: $${order.totalPrice}</h2>
      <p style="color: #666;">We'll notify you once your order ships.</p>
      <p>Best regards,<br>Clothing Store Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - ${order.orderId}`,
    html: htmlContent
  });
};

module.exports = { sendOrderEmail };
