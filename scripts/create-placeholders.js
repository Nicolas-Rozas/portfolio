const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/projects');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const placeholders = [
  { name: 'nearpod', color1: '#3B82F6', color2: '#1D4ED8', text: 'N', label: 'Nearpod' },
  { name: 'seesaw', color1: '#3B82F6', color2: '#2563EB', text: 'S', label: 'Seesaw' },
  { name: 'life', color1: '#22C55E', color2: '#16A34A', text: 'L', label: 'Life Homecare' },
  { name: 'pathful', color1: '#A855F7', color2: '#7C3AED', text: 'P', label: 'Pathful' },
  { name: 'wakeful', color1: '#F59E0B', color2: '#D97706', text: 'W', label: 'Wakeful' },
  { name: 'bitennial', color1: '#F97316', color2: '#EA580C', text: 'B', label: 'Bitennial' },
  { name: 'question', color1: '#EC4899', color2: '#DB2777', text: 'Q', label: 'Question Colors' },
];

placeholders.forEach(({ name, color1, color2, text, label }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="40"/>
    </filter>
  </defs>
  <rect width="800" height="450" fill="#1A1D2B"/>
  <circle cx="200" cy="150" r="200" fill="${color1}" opacity="0.15" filter="url(#blur)"/>
  <circle cx="600" cy="300" r="180" fill="${color2}" opacity="0.15" filter="url(#blur)"/>
  <rect x="60" y="60" width="320" height="200" rx="12" fill="${color1}" opacity="0.08"/>
  <rect x="420" y="100" width="320" height="140" rx="12" fill="${color2}" opacity="0.08"/>
  <rect x="60" y="290" width="200" height="100" rx="8" fill="${color1}" opacity="0.06"/>
  <rect x="280" y="290" width="460" height="100" rx="8" fill="${color2}" opacity="0.06"/>
  <text x="400" y="200" font-family="Inter, Arial, sans-serif" font-size="96" font-weight="800" fill="${color1}" text-anchor="middle" opacity="0.3">${text}</text>
  <text x="400" y="260" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="600" fill="white" text-anchor="middle" opacity="0.7">${label}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${name}.jpg`), svg);
  console.log(`Created ${name}.jpg`);
});
console.log('Done!');
