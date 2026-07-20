import { list } from '@vercel/blob';

export default async function handler(request, response) {
  try {
    const category = request.query.category;
    const prefix = category ? `gallery/${category}/` : 'gallery/';

    const { blobs } = await list({ prefix });

    const photos = blobs
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .map((b) => b.url);

    response.status(200).json({ photos });
  } catch (error) {
    response.status(500).json({ error: error.message, photos: [] });
  }
}
