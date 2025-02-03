/**
@credit Tio
@Tixo MD
@Whatsapp Bot
wa.me/6282285357346
**/

import axios from 'axios';
import moment from 'moment-timezone';

let Tio = async (m, { usedPrefix, command, conn, text }) => {
    if (!text) {
        return m.reply(await Func.exam(usedPrefix, command, 'Tiooxy'));
    }

    let Quer = text.replace("https://github.com/", "").replace("@", "");

    try {
        let res = await axios.get(`https://api.github.com/users/${Quer}`);
        let {
            login,
            type,
            name,
            followers,
            following,
            created_at,
            updated_at,
            public_gists,
            public_repos,
            twitter_username,
            bio,
            hireable,
            email,
            location,
            blog,
            company,
            avatar_url,
            html_url
        } = res.data;

        let teks = `乂 *G I T H U B*

*User Name :* ${login}
*Nick Name :* ${name || '-'}
*Followers :* ${followers}
*Following :* ${following}
*Public Gists :* ${public_gists}
*Public Repos :* ${public_repos}
*Twitter :* ${twitter_username ? twitter_username : '-'}
*Email :* ${email ? email : '-'}
*Location :* ${location ? location : '-'}
*Blog :* ${blog ? blog : '-'}
*Link :* ${html_url}
*Created Time :*
  - Date : ${moment(created_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}
  - Time : ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss')}
*Updated Time :*
  - Date : ${moment(updated_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}
  - Time : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss')}
*Bio :* ${bio || '-'}`;

        await conn.sendFile(m.chat, avatar_url, 'github-stalk.png', teks, m);

    } catch (error) {
        m.reply('User GitHub tidak ditemukan atau terjadi kesalahan.');
    }
};

Tio.help = ['githubstalk'];
Tio.tags = ['stalker'];
Tio.command = /^(g(it)?h(ub)?stalk(er)?)$/i;
Tio.limit = true;

export default Tio;