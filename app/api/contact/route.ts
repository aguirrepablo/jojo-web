import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** Verifica el token de reCAPTCHA v3 contra Google. Devuelve true si no hay
 *  RECAPTCHA_SECRET_KEY configurada (permite desarrollo local sin claves). */
async function verifyRecaptcha(token: unknown): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
    };
    // Umbral 0.5 (recomendado por Google). Score bajo = probable bot.
    return data.success === true && (data.score ?? 0) >= 0.5;
  } catch (err) {
    console.error("reCAPTCHA verification failed:", err);
    return false;
  }
}

// Los campos del formulario van al HTML del mail: sin escapar, cualquiera podría
// inyectar links o contenido que parece salir de nuestro propio formulario.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Devuelve el texto recortado, "" si no vino, o null si no es texto o es muy largo. */
function readField(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > maxLength ? null : trimmed;
}

const EMAIL_PATTERN = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = readField(body?.name, 100);
    const email = readField(body?.email, 254);
    const phone = readField(body?.phone, 50);
    const company = readField(body?.company, 150);
    const description = readField(body?.description, 5000);
    const recaptchaToken = body?.recaptchaToken;

    if (
      name === null || email === null || phone === null ||
      company === null || description === null
    ) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!(await verifyRecaptcha(recaptchaToken))) {
      return NextResponse.json(
        { error: "reCAPTCHA validation failed" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name.replace(/\s+/g, " ")}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone || "No proporcionado"}
        Empresa: ${company || "No proporcionada"}
        Mensaje:
        ${description}
      `,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${phone ? escapeHtml(phone) : "No proporcionado"}</p>
        <p><strong>Empresa:</strong> ${company ? escapeHtml(company) : "No proporcionada"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(description).replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
