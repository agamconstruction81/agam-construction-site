import { del } from '@vercel/blob';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { url, password } = request.body || {};

  if (password !== process.env.ADMIN_PASSWORD) {
    return response.status(401).json({ error: 'Incorrect password' });
  }

  if (!url) {
    return response.status(400).json({ error: 'Missing url' });
  }

  try {
    await del(url);
    response.status(200).json({ success: true });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
