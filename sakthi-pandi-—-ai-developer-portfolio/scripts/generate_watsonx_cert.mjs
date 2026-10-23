import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

async function generateWatsonxCert() {
  const width = 1200;
  const height = 850;

  // Authentic SVG replicating Screenshot 2026-10-14 004216.png
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&amp;family=IBM+Plex+Serif:wght@600;700&amp;family=Caveat:wght@600&amp;display=swap');
      .title { font-family: 'IBM Plex Serif', serif; font-weight: 700; fill: #161616; }
      .name { font-family: 'IBM Plex Sans', sans-serif; font-weight: 700; fill: #161616; letter-spacing: 2px; }
      .text-reg { font-family: 'IBM Plex Sans', sans-serif; font-weight: 400; fill: #393939; }
      .text-bold { font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; fill: #161616; }
      .sig { font-family: 'Caveat', cursive, sans-serif; font-weight: 600; fill: #0f62fe; }
      .meta { font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; fill: #525252; }
    </style>
    <!-- Soft background watermark pattern -->
    <radialGradient id="watermarkGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0f62fe" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#0f62fe" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Solid white paper background -->
  <rect width="${width}" height="${height}" fill="#ffffff" />

  <!-- Outer frame border -->
  <rect x="25" y="25" width="${width - 50}" height="${height - 50}" fill="#ffffff" stroke="#161616" stroke-width="1.5" />
  <!-- Inner thin margin frame -->
  <rect x="34" y="34" width="${width - 68}" height="${height - 68}" fill="none" stroke="#525252" stroke-width="0.75" />

  <!-- Center subtle watermark circle -->
  <circle cx="${width / 2}" cy="${height / 2}" r="220" fill="url(#watermarkGrad)" />

  <!-- Top bar text -->
  <text x="45" y="20" class="meta" font-size="10">4/14/26, 10:02 AM</text>
  <text x="${width / 2}" y="20" class="meta" text-anchor="middle" font-size="10">IBMCE CEWXAI1IN Certificate | IBM Career Education Program</text>

  <!-- IBM 8-bar classic logo (top left) -->
  <g transform="translate(68, 55)">
    <!-- 8 horizontal stripes forming I B M -->
    <!-- I -->
    <rect x="0" y="0" width="46" height="5.5" fill="#0f62fe" />
    <rect x="0" y="8" width="46" height="5.5" fill="#0f62fe" />
    <rect x="15" y="16" width="16" height="5.5" fill="#0f62fe" />
    <rect x="15" y="24" width="16" height="5.5" fill="#0f62fe" />
    <rect x="15" y="32" width="16" height="5.5" fill="#0f62fe" />
    <rect x="15" y="40" width="16" height="5.5" fill="#0f62fe" />
    <rect x="0" y="48" width="46" height="5.5" fill="#0f62fe" />
    <rect x="0" y="56" width="46" height="5.5" fill="#0f62fe" />

    <!-- B -->
    <g transform="translate(58, 0)">
      <rect x="0" y="0" width="44" height="5.5" fill="#0f62fe" />
      <rect x="0" y="8" width="48" height="5.5" fill="#0f62fe" />
      <rect x="0" y="16" width="15" height="5.5" fill="#0f62fe" />
      <rect x="33" y="16" width="15" height="5.5" fill="#0f62fe" />
      <rect x="0" y="24" width="46" height="5.5" fill="#0f62fe" />
      <rect x="0" y="32" width="15" height="5.5" fill="#0f62fe" />
      <rect x="35" y="32" width="15" height="5.5" fill="#0f62fe" />
      <rect x="0" y="40" width="15" height="5.5" fill="#0f62fe" />
      <rect x="35" y="40" width="15" height="5.5" fill="#0f62fe" />
      <rect x="0" y="48" width="48" height="5.5" fill="#0f62fe" />
      <rect x="0" y="56" width="44" height="5.5" fill="#0f62fe" />
    </g>

    <!-- M -->
    <g transform="translate(122, 0)">
      <rect x="0" y="0" width="60" height="5.5" fill="#0f62fe" />
      <rect x="0" y="8" width="14" height="5.5" fill="#0f62fe" />
      <rect x="23" y="8" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="8" width="14" height="5.5" fill="#0f62fe" />
      <rect x="0" y="16" width="14" height="5.5" fill="#0f62fe" />
      <rect x="23" y="16" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="16" width="14" height="5.5" fill="#0f62fe" />
      <rect x="0" y="24" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="24" width="14" height="5.5" fill="#0f62fe" />
      <rect x="0" y="32" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="32" width="14" height="5.5" fill="#0f62fe" />
      <rect x="0" y="40" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="40" width="14" height="5.5" fill="#0f62fe" />
      <rect x="0" y="48" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="48" width="14" height="5.5" fill="#0f62fe" />
      <rect x="0" y="56" width="14" height="5.5" fill="#0f62fe" />
      <rect x="46" y="56" width="14" height="5.5" fill="#0f62fe" />
    </g>
  </g>

  <!-- Top-Right QR Code Box -->
  <g transform="translate(1040, 50)">
    <rect width="90" height="90" fill="#ffffff" stroke="#161616" stroke-width="1.2" />
    <!-- QR pattern simulation -->
    <rect x="8" y="8" width="24" height="24" fill="#161616" />
    <rect x="12" y="12" width="16" height="16" fill="#ffffff" />
    <rect x="15" y="15" width="10" height="10" fill="#161616" />

    <rect x="58" y="8" width="24" height="24" fill="#161616" />
    <rect x="62" y="12" width="16" height="16" fill="#ffffff" />
    <rect x="65" y="15" width="10" height="10" fill="#161616" />

    <rect x="8" y="58" width="24" height="24" fill="#161616" />
    <rect x="12" y="62" width="16" height="16" fill="#ffffff" />
    <rect x="15" y="65" width="10" height="10" fill="#161616" />

    <rect x="40" y="12" width="8" height="8" fill="#161616" />
    <rect x="40" y="28" width="12" height="6" fill="#161616" />
    <rect x="36" y="40" width="18" height="18" fill="#161616" />
    <rect x="60" y="42" width="10" height="10" fill="#161616" />
    <rect x="74" y="58" width="8" height="14" fill="#161616" />
    <rect x="42" y="68" width="18" height="8" fill="#161616" />
  </g>

  <!-- Certificate Body Text -->
  <text x="${width / 2}" y="200" class="text-reg" font-size="20" text-anchor="middle">This is to certify that</text>

  <!-- Candidate Name -->
  <text x="${width / 2}" y="260" class="name" font-size="36" text-anchor="middle">SAKTHIPANDI M</text>

  <!-- Subtitle -->
  <text x="${width / 2}" y="315" class="text-reg" font-size="18" text-anchor="middle">successfully completed and received a passing grade in</text>

  <!-- Certificate Title -->
  <text x="${width / 2}" y="390" class="title" font-size="44" text-anchor="middle">GEN AI Using IBM Watsonx</text>

  <!-- Course Code -->
  <text x="${width / 2}" y="435" class="text-reg" font-size="18" text-anchor="middle">(CEWXAI1IN, provided by IBMCE)</text>

  <!-- Course Platform Details -->
  <text x="${width / 2}" y="490" class="text-reg" font-size="16" text-anchor="middle">A course on <tspan font-weight="600" fill="#161616">ibmcep.cognitiveclass.ai</tspan></text>
  <text x="${width / 2}" y="520" class="text-reg" font-size="16" text-anchor="middle">Powered by <tspan font-weight="600" fill="#161616">IBM Developer Skills Network.</tspan></text>

  <!-- Issued by -->
  <text x="${width / 2}" y="575" class="text-reg" font-size="15" text-anchor="middle">Issued by</text>
  <text x="${width / 2}" y="605" class="text-bold" font-size="19" text-anchor="middle">IBM Career Education Program</text>

  <!-- Signature section -->
  <g transform="translate(${width / 2}, 660)">
    <!-- Signature Graphic Line -->
    <path d="M -80,-15 Q -40,-45 -20,-10 T 20,-30 T 60,-5" fill="none" stroke="#0f62fe" stroke-width="2.5" />
    <line x1="-120" y1="0" x2="120" y2="0" stroke="#8d8d8d" stroke-width="0.8" />
    <text x="0" y="18" class="text-bold" font-size="13" text-anchor="middle">Jagadisha Bhat</text>
    <text x="0" y="34" class="text-reg" font-size="11" text-anchor="middle">Country Manager - IBM Technology Expert Labs, ISA</text>
    <text x="0" y="48" class="text-reg" font-size="11" text-anchor="middle">IBM India Pvt Ltd</text>
  </g>

  <!-- Date -->
  <text x="${width / 2}" y="765" class="text-bold" font-size="17" text-anchor="middle">April 14, 2026</text>

  <!-- Verification Note -->
  <text x="${width / 2}" y="798" class="meta" font-size="11" text-anchor="middle">Authenticity of this certificate can be validated by going to:</text>
  <text x="${width / 2}" y="814" class="meta" font-size="11" text-anchor="middle" fill="#0f62fe" text-decoration="underline">https://courses.ibmcep.cognitiveclass.ai/certificates/87f5d6b6b56241cfb3fb23a21aa1fa38</text>

  <!-- Bottom Page Footers -->
  <text x="45" y="${height - 10}" class="meta" font-size="9">https://courses.ibmcep.cognitiveclass.ai/certificates/87f5d6b6b56241cfb3fb23a21aa1fa38</text>
  <text x="${width - 45}" y="${height - 10}" class="meta" font-size="9" text-anchor="end">1/2</text>
</svg>
  `.trim();

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const publicDir = path.resolve('public/certificates');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicPath = path.join(publicDir, 'ibm-gen-ai-watsonx.png');
  fs.writeFileSync(publicPath, pngBuffer);

  const distDir = path.resolve('dist/certificates');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'ibm-gen-ai-watsonx.png'), pngBuffer);
  }

  console.log(`Successfully generated ${publicPath} (${pngBuffer.length} bytes)`);
}

generateWatsonxCert().catch(console.error);
