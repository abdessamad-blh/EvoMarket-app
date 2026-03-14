import { Resend } from 'resend';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = await request.json();
  const {
    nameType,
    fullName,
    email,
    phone,
    employees,
    sectors,
    services,
    budget,
    description,
    submittedAt,
  } = data;

  const typeLabel   = nameType === 'org' ? 'Organisation' : 'Particulier';
  const sectorsStr  = (sectors  as string[]).join(', ');
  const servicesStr = (services as string[]).join(', ');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; }
        h1 { color: #F4B223; margin-top: 0; font-size: 24px; }
        h2 { color: #0A0E27; font-size: 16px; border-bottom: 2px solid #F4B223; padding-bottom: 4px; margin-top: 24px; }
        p  { margin: 6px 0; font-size: 14px; color: #333; }
        .label { font-weight: bold; color: #555; }
        .footer { margin-top: 24px; font-size: 11px; color: #aaa; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>📋 Nouveau Devis — EvoMarket</h1>

        <h2>Informations de contact</h2>
        <p><span class="label">Type :</span> ${typeLabel}</p>
        <p><span class="label">Nom :</span> ${fullName}</p>
        <p><span class="label">Email :</span> <a href="mailto:${email}">${email}</a></p>
        <p><span class="label">Téléphone :</span> ${phone}</p>
        ${employees ? `<p><span class="label">Employés :</span> ${employees}</p>` : ''}

        <h2>Détails du projet</h2>
        <p><span class="label">Secteur(s) :</span> ${sectorsStr}</p>
        <p><span class="label">Service(s) :</span> ${servicesStr}</p>
        <p><span class="label">Budget estimé :</span> ${budget}</p>

        ${description ? `
        <h2>Description</h2>
        <p>${String(description).replace(/\n/g, '<br/>')}</p>
        ` : ''}

        <div class="footer">
          Soumis le ${new Date(submittedAt as string).toLocaleString('fr-MA')} via le formulaire EvoMarket
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to Google Sheet (fire-and-forget, don't block on failure)
  if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
    fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => console.error('Google Sheet webhook error:', err));
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'EvoMarket <onboarding@resend.dev>',
      to:   process.env.RESEND_TO_EMAIL   ?? 'evomarketagency@gmail.com',
      replyTo: email as string,
      subject: `Nouveau devis de ${fullName} — EvoMarket`,
      html,
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}
