// /app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.MAIL_TO || "you@example.com";
    const from = process.env.MAIL_FROM || "BrightLaunch <onboarding@resend.dev>"; // Updated to your subdomain when verified

    await resend.emails.send({
      from,
      to,
      subject: `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
      replyTo: email,
      text: `Name: ${name}
Email: ${email}
Company: ${company || "-"}
Message:
${message}`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}