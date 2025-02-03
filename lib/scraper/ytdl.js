import ytdl from "ytdl-core";

async function yt(url, cookies) {
    
        try {
let agent = ytdl.createAgent(cookies)
            let id = await ytdl.getVideoID(url);
            let {
                formats,
                videoDetails
            } = await ytdl.getInfo(id);
            let title = videoDetails.title;
            let durasi = videoDetails.lengthSeconds;
            let desc = videoDetails.shortDescription;
            let view = videoDetails.viewCount;
            let author = videoDetails.author;
            let video = [],
                audio = []
            Object.values(formats).filter(v => v.hasVideo == true && v.container == 'mp4').forEach(v => {
                video.push(v)
            })
            Object.values(formats).filter(v => v.hasAudio == true && v.container == 'mp4').forEach(v => {
                audio.push(v)
            })
            return {
                title,
                durasi,
                view,
                author,
                desc,
                video,
                audio
            }

        } catch (e) {
            return {msg: e}
        }
    
}

export { yt }