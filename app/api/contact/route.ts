// /app/api/contact/route.ts
import nodemailer from 'nodemailer';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `BrightLaunch <${process.env.GOOGLE_EMAIL}>`, // Sender appears as hello@brightlaunchweb.com
      to: process.env.MAIL_TO, // Recipient (your email)
      replyTo: email, // Replies go to the user's email
      subject: `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
      text: `Name: ${name}
Email: ${email}
Company: ${company || "-"}
Message:
${message}`,
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `BrightLaunch <${process.env.GOOGLE_EMAIL}>`,
      to: email,
      subject: "Thanks for reaching out to BrightLaunch",
      text: `Hi ${name},\n\nThanks for contacting us! We received your message and will get back shortly.\n\n— BrightLaunch`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
