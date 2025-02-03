import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import * as cheerio from "cheerio";
import fetch from "node-fetch";

export default async function (buffer) {
const { ext, mime } = await fileTypeFromBuffer(buffer)
  let form = new FormData()
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
form.append('image', blob, 'tmp.' + ext);
form.append('width', "80");
form.append('textcolor', "#000000");
form.append("bgcolor", "#ff0606");
form.append("invert", "0");
form.append("contrast", "1");
form.append("format", "ascii");

  let res = await fetch('https://www.text-image.com/convert/result.cgi', {
    method: 'POST',
    body: form
  })
  let img = await res.text()

const $ = cheerio.load(img)
const result = $('#tiresult').text().trim();
return result 
}