#!/usr/bin/env node
// Simple network check to confirm outbound fetch works
const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Ultimate_Fighting_Championship';

async function main() {
  const res = await fetch(url, { headers: { 'accept': 'application/json' } });
  console.log('Status:', res.status);
  const json = await res.json();
  console.log('Title:', json.title);
  console.log('Description:', json.description || '(none)');
}

main().catch((e) => { console.error(e); process.exit(1); });

