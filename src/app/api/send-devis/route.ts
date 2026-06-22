import { Resend } from 'resend';

function esc(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ALLOWED_SECTORS  = new Set(['ecommerce','health','realestate','food','education','fashion','construction','beauty','artisanat','travel','automotive','other']);
const ALLOWED_SERVICES = new Set(['website','mobile','seo','socialMedia','content','ads','training']);
const ALLOWED_BUDGETS  = new Set(['sub3000','3000-10000','10000-30000','30000plus','']);
const ALLOWED_CONTACTS = new Set(['whatsapp','phone','email','']);
const ALLOWED_SOURCES  = new Set(['google','instagram','facebook','referral','ads','other','']);

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = await request.json();

  // Honeypot check — bots fill hidden fields, humans don't
  if (data._hp) {
    return Response.json({ success: true });
  }

  const {
    nameType,
    fullName,
    email,
    phone,
    preferredContact,
    sectors,
    source,
    services,
    budget,
    description,
    submittedAt,
  } = data;

  // Allowlist validation
  const safeSectors  = (Array.isArray(sectors)  ? sectors  : []).filter((s: unknown) => typeof s === 'string' && ALLOWED_SECTORS.has(s));
  const safeServices = (Array.isArray(services) ? services : []).filter((s: unknown) => typeof s === 'string' && ALLOWED_SERVICES.has(s));
  const safeBudget   = ALLOWED_BUDGETS.has(String(budget))   ? String(budget)          : '';
  const safeContact  = ALLOWED_CONTACTS.has(String(preferredContact)) ? String(preferredContact) : '';
  const safeSource   = ALLOWED_SOURCES.has(String(source))   ? String(source)           : '';

  const typeLabel    = nameType === 'org' ? 'Organisation' : 'Particulier';
  const sectorsStr   = safeSectors.map(esc).join(', ');
  const servicesStr  = safeServices.map(esc).join(', ');

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
        <p><span class="label">Type :</span> ${esc(typeLabel)}</p>
        <p><span class="label">Nom :</span> ${esc(fullName)}</p>
        <p><span class="label">Email :</span> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
        <p><span class="label">Téléphone :</span> ${esc(phone)}</p>
        ${safeContact ? `<p><span class="label">Contact préféré :</span> ${esc(safeContact)}</p>` : ''}

        <h2>Détails du projet</h2>
        ${sectorsStr ? `<p><span class="label">Secteur(s) :</span> ${sectorsStr}</p>` : ''}
        ${safeSource ? `<p><span class="label">Source :</span> ${esc(safeSource)}</p>` : ''}
        <p><span class="label">Service(s) :</span> ${servicesStr}</p>
        <p><span class="label">Budget estimé :</span> ${esc(safeBudget)}</p>

        ${description ? `
        <h2>Description</h2>
        <p>${esc(description).replace(/\n/g, '<br/>')}</p>
        ` : ''}

        <div class="footer">
          Soumis le ${new Date(String(submittedAt)).toLocaleString('fr-MA')} via le formulaire EvoMarket
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
    return Response.json({ success: false }, { status: 500 });
  }
}
