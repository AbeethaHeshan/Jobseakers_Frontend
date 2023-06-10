// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { BASE_URL } from "@/service/network-configs/http/basicConfig";

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', BASE_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight request response
    res.status(200).end();
    return;
  }

  // Handle your API logic here
  // ...
}