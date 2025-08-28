// /app/api/contact/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs";        // Force Node runtime (Nodemailer isn’t Edge-compatible)
export const dynamic = "force-dynamic"; // Avoid caching of the API route

function sanitize(input: string) {
  return String(input).replace(/[<>&"'`]/g, (c) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;", "`": "&#96;",
  }[c]!));
}

export async function POST(req: Request) {
  try {
    const { name, email, company, message, website } = await req.json();

    // Honeypot (spam bots often fill hidden fields)
    if (website) return Response.json({ ok: true });

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT ?? 465);
    const secure = (process.env.SMTP_SECURE ?? "true") === "true";

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      return Response.json({ ok: false, error: "SMTP credentials not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const to = process.env.MAIL_TO || user;
    const from = process.env.MAIL_FROM || user;

    const plain = `Name: ${name}
Email: ${email}
Company: ${company || "-"}
Message:
${message}`;

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 8px">New inquiry</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Company:</strong> ${sanitize(company || "-")}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;">${sanitize(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,                 // replies go to the sender
      subject: `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
      text: plain,
      html,
    });

    // OPTIONAL: simple auto-reply to the sender (uncomment to enable)
    // await transporter.sendMail({
    //   from,
    //   to: email,
    //   subject: "Thanks for reaching out to BrightLaunch",
    //   text: `Hi ${name},\n\nThanks for contacting us! We received your message and will get back shortly.\n\n— BrightLaunch`,
    // });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
