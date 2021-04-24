module.exports = {

    Admin: {
        id: 9000,
        group: 9000
    },
    server: {

        //运行妹抖的机器IP地址
        host: "192.168.199.100",

        //服务端口
        port: 5700,

        //KQ服务端口
        KQ_PORT: 5200,

        //Mirai http服务端口
        MI_PORT: 5700,

        //Mirai http AUTH_KEY
        MI_AUTHKEY: "MEWTEAMAID",

        //Mirai http sessionKey
        MI_SKey: "000",

        //SETU url
        SETU: "http://127.0.0.1/setu/",

        //SETU_NUM
        SETU_NUM: 29

    },
    database: {
        host: "localhost",
        user: "",
        password: "",
        database: "b1imd"
    },
    key: {

        //和风天气平台KEY
        weatherKey: "9000",

        //FFLOGS 公钥
        fflogsKey: "9000",
    }
};