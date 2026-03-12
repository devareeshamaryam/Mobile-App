 const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL!;
const CDN_SECRET_KEY = process.env.NEXT_PUBLIC_CDN_SECRET_KEY!;

// Image upload karna CDN par
export async function uploadToCDN(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${CDN_URL}/upload`, {
    method: 'POST',
    headers: { 'x-api-key': CDN_SECRET_KEY },
    body: formData,
  });

  const data = await res.json();
  
  if (!data.success) throw new Error('Upload fail ho gaya');
  
  return data.url;
}

// Image URL banana
export function getCDNUrl(filename: string): string {
  return `${CDN_URL}/files/${filename}`;
}