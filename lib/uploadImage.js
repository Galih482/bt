import axios from 'axios';
import crypto from 'crypto';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

async function uploadImage(content) {
    const { ext, mime } = (await fileTypeFromBuffer(content)) || {};

    if (!mime || !ext) {
        throw new Error("Unsupported file type");
    }

    const blob = new Blob([content.toArrayBuffer()], { type: mime });
    const formData = new FormData();
    const randomBytes = crypto.randomBytes(5).toString("hex");
    formData.append("file", blob, `${randomBytes}.${ext}`);

    const headers = {
        'Content-Type': `multipart/form-data; boundary=${formData.boundary}`,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    };

    try {
        const response = await axios.post("https://cdn.maelyn.tech/api/upload", formData, {
            headers: headers,
        });

        if (response.status === 200 && response.data.status === "200") {
            return response.data.data.url;
        } else {
            throw new Error(`Upload failed: ${response.data.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw error;
    }
}

export default uploadImage;