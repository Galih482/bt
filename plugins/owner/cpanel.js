/**
@credit Tio
@Tixo MD
@Whatsapp Bot
@Support dengan Donasi ✨
wa.me/6282285357346
**/

import axios from 'axios';

let Tio = async (m, { command, usedPrefix, text }) => {
    let [cmd = '', teks = ''] = (text || '').split(' ', 2);
    
    try {
        switch (cmd) {
            case 'listuser': 
                const users = await ptero.list_usr();
                let userList = users.data
                    .map((user, i) => `- ID: ${user.attributes.id}\n- Name: ${user.attributes.username}\n- Admin: ${user.attributes.root_admin ? '✅' : '❌'}\n╌╌╌╌╌`)
                    .join('\n');
                m.reply(`List user panel:\nTotal: ${users.data.length} User\n\n${userList}`);
                break;

            case 'createuser': 
                const [no, username, first_name, admin] = teks.split('/');
                if (!no || !username || !first_name) {
                    return m.reply(`Format salah! Gunakan: .${usedPrefix + command} ${cmd} <no>/<username>/<first_name>/<admin>`);
                }
                const admins = (admin === 'yes') ? '1' : '0';
                const creates = await ptero.create_usr(username, first_name, admins);
                const { result, password } = creates;
                await m.reply('Akun berhasil dibuat. terkirim di pm')
                await conn.reply(no + info.jid, `User berhasil dibuat:\n- ID: ${result.attributes.id}\n- Username: ${result.attributes.username}\n- Admin: ${admin ? '✅' : '❌'}\n- Password: ${password}\n- Login: ${ptero.base}`);
                break;

            case 'deleteuser':
                if (!teks) return m.reply('Masukkan ID user!');
                await ptero.delete_usr(teks);
                m.reply('User berhasil dihapus.');
                break;

            case 'detailuser':
                const userId = teks;
                if (!userId) return m.reply('Harap masukkan ID user!');
                const userDetail = await ptero.detail_usr(userId);
                m.reply(`Detail User:\nUsername: ${userDetail.attributes.username}\nEmail: ${userDetail.attributes.email}\nAdmin: ${userDetail.attributes.root_admin ? '✅' : '❌'}`);
                break;
            case 'detailuser':
                const srvId = teks;
                if (!srvId) return m.reply('Harap masukkan ID server!');
                const srvDetail = await ptero.detail_srv(srvId);
                m.reply(`
Detail Server:

ID: ${srvDetail.attributes.id}
Nama: ${srvDetail.attributes.name}
Status: ${srvDetail.attributes.status}
Disk: ${srvDetail.attributes.limits.disk} GB
RAM: ${srvDetail.attributes.limits.memory} MB
CPU: ${srvDetail.attributes.limits.cpu}
Suspended: ${srvDetail.attributes.suspended ? 'Ya' : 'Tidak'}
Node: ${srvDetail.attributes.node}

Waktu:
Dibuat: ${srvDetail.attributes.created_at}
Diperbarui: ${srvDetail.attributes.updated_at}
`);
                break;

            case 'deleteserver':
                if (!teks) return m.reply('Masukkan ID server!');
                await ptero.delete_srv(teks);
                m.reply('Server berhasil dihapus.');
                break;

            case 'listserver': 
                const servers = await ptero.list_srv();
                let serverList = servers.data.map((server, i) => `- ID: ${server.attributes.id}\n- Name: ${server.attributes.name}\n- Suspend: ${server.attributes.suspended ? "✅" : "❌"}\n╌╌╌╌╌`).join('\n');
                m.reply(`List server panel:\nTotal: ${servers.data.length} Server\n\n${serverList}`);
                break;

            case 'createserver':
    const [tujuan, name, id, memory, disk, cpu] = teks.split('/');
    if (!tujuan || !name || !id || !memory || !disk || !cpu) {
        return m.reply(`Format salah! Gunakan: .${usedPrefix + command} ${cmd} <nomor_user>/<name>/<user_id>/<memory>/<disk>/<cpu>`);
    }

    const egg = global.cpanel['egg'];
    const nestData = await ptero.list_nest(egg);
    const startupCommand = nestData?.attributes?.startup || 'npm start';

    const formatSize = (value) => {
        if (value === '0') return 'Unlimited';
        return value >= 1024 ? `${(value / 1024).toFixed(2)} GB` : `${value} MB`;
    };

    const formatCPU = (value) => (value === '0' ? 'Unlimited' : `${value}%`);

    const memoryFormatted = formatSize(parseInt(memory, 10));
    const diskFormatted = formatSize(parseInt(disk, 10));
    const cpuFormatted = formatCPU(parseInt(cpu, 10));

    const newServer = await ptero.create_srv(name, id, egg, startupCommand, memory, disk, cpu);
    await m.reply('Server berhasil dibuat. terkirim di pm')
    await conn.reply(tujuan + info.jid, `Server berhasil dibuat:
    
- *ID:* ${newServer.attributes.id}
- *Nama:* ${newServer.attributes.name}
- *Memory:* ${memory == 0 ? 'Unlimited' : memoryFormatted}
- *Disk:* ${disk == 0 ? 'Unlimited' : diskFormatted}
- *CPU:* ${cpu == 0 ? 'Unlimited' : cpuFormatted}

- *Login*: ${ptero.base}
- *Password*: Gunakan dari akun yang telah di kirim.`);
    break;


            default:
                m.reply(`Perintah tidak valid. Gunakan salah satu dari:\n- listuser\n- createuser\n- detailuser\n- deleteuser\n- listserver\n- createserver\n- deleteserver`);
        }
    } catch (error) {
        console.error(error);
        throw error
    }
};

Tio.help = ['listuser','listserver','createuser','createserver','detailserver','detailuser','deleteserver','deleteuser'].map(v => `cpanel ${v}`);
Tio.tags = ['panel'];
Tio.command = ['cpanel'];
Tio.owner = true;
export default Tio;

const ptero = {
    plta: global.cpanel['plta'],
    pltc: global.cpanel['pltc'],
    base: global.cpanel['domain'],
    get headers() {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.pltc}`
        };
    },
    get password() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    },
    get description() {
        let d = new Date(new Date().setMonth(new Date().getMonth() + 1));
        let locale = 'id';
        let tanggal = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return `Expired pada ${tanggal}`;
    },
    request: async function (method, endpoint, data = null, params = {}) {
        try {
            const response = await axios({
                method,
                url: `${this.base}${endpoint}`,
                headers: this.headers,
                data,
                params,
            });
            return response.data;
        } catch (error) {
            console.error(`Error during ${method} request to ${endpoint}:`, error.response?.data || error.message);
            throw error.response?.data || error;
        }
    },
    // User Management
    list_usr: async function () {
        return await this.request('GET', '/api/application/users');
    },
    create_usr: async function (username, first_name, root_admin = 0) {
        const data = {
            email: `user-${this.password}@server.id`,
            username,
            first_name,
            last_name: 'server',
            language: 'en',
            password: this.password,
            root_admin
        };
        let result = await this.request('POST', '/api/application/users', data);
        return { password: this.password, result }
    },
    detail_usr: async function (id) {
        return await this.request('GET', `/api/application/users/${id}`);
    },
    delete_usr: async function (id) {
        return await this.request('DELETE', `/api/application/users/${id}`);
    },
    // Server Management
    list_srv: async function () {
        return await this.request('GET', '/api/application/servers');
    },
    detail_srv: async function (id) {
        return await this.request('GET', `/api/application/servers/${id}`);
    },
    create_srv: async function (name, id, egg, startup_cmd, memory, disk, cpu) {
        const data = {
            name: name,
            description: this.description,
            user: id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
            startup: startup_cmd,
            environment: {
                INST: "npm",
                USER_UPLOAD: "0",
                AUTO_UPDATE: "0",
                CMD_RUN: "npm start",
            },
            limits: {
                memory: memory,
                swap: 0,
                disk: disk,
                io: 500,
                cpu: cpu,
            },
            feature_limits: {
                databases: 0,
                backups: 0,
                allocations: 0,
            },
            deploy: {
                locations: [1],
                dedicated_ip: false,
                port_range: [],
            },
        };

        return await this.request('POST', '/api/application/servers', data);
    },
    delete_srv: async function (id) {
        return await this.request('DELETE', `/api/application/servers/${id}`);
    },
    list_nest: async function (egg) {
        const nest = await this.request('GET', `/api/application/nests/5/eggs/${egg}`);
        return nest;
    }
};