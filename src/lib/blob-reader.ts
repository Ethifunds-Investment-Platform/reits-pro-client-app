/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Turns blob into base64
 */
export default async function blobReader(data: Blob): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = (reader.result as any)
      if (base64data) resolve(base64data);
      else reject(new Error("error getting file"));
    }
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(data);
  })
}


