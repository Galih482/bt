/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from "axios";
const apiInstance = axios.create({
        baseURL: "https://api.kome.ai",
        headers: {
            "Content-Type": "application/json",
            Referer: "https://api.kome.ai"
        }
    }),
    youtubeTranscript = async videoId => {
        try {
            const response = await apiInstance.post("/api/tools/youtube-transcripts", {
                video_id: videoId,
                format: !0
            });
            if (void 0 === response.data.transcript) throw new Error("Transcript not found");
            return response.data.transcript;
        } catch (error) {
            console.error("Error in youtubeTranscript:", error);
        }
    }, handler = async (m, {
        conn,
        usedPrefix,
        command,
        args
    }) => {
        const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
        if (!text) return m.reply(await Func.exam(usedPrefix, command, 'https://youtu.be/AJVTWqzs-3U?si=8ugopEt4hiU-fWfT'));
        const regex = /^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com|\.be)\/(?:watch\?v=|embed\/|v\/|)([A-Za-z0-9_-]+)/;
        let matches = text.match(regex)
        if (!matches || !matches[0]) return m.reply("Invalid YouTube URL");
        try {
            const transcribe = await youtubeTranscript(matches[0]);
            m.reply(transcribe);
        } catch (error) {
            console.error("Error in handler:", error);
        }
    };
handler.help = ["transkripyt"]
handler.tags = ["tools"]
handler.command = /^(transkrip(t)?(yt)?)$/i;
export default handler;