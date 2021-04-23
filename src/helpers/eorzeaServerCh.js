
const eorzeaServerCh = {
  '红玉海':
  {
    'areaid': 1,
    'serverid': 27,
    "ename":"HongYuHai",
  },
  '神意之地':
  {
    'areaid': 1,
    'serverid': 23,
    "ename":"ShenYiZhiDi",
  },
  '拉诺西亚':
  {
    'areaid': 1,
    'serverid': 3,
    "ename":"LaNuoXiYa",
  },
  '幻影群岛':
  {
    'areaid': 1,
    'serverid': 5,
    "ename":"HuanYingQunDao",
  },
  '萌芽池':
  {
    'areaid': 1,
    'serverid': 25,
    "ename":"MengYaChi",
  },
  '宇宙和音':
  {
    'areaid': 1,
    'serverid': 28,
    "ename":"YuZhouHeYin",
  },
  '沃仙曦染':
  {
    'areaid': 1,
    'serverid': 29,
    "ename":"WoXianXiRan",
  },
  '晨曦王座':
  {
    'areaid': 1,
    'serverid': 30,
    "ename":"ChenXiWangZuo",
  },
  '白银乡':
  {
    'areaid': 6,
    'serverid': 3,
    "ename":"BaiYinXiang",
  },
  '白金幻象':
  {
    'areaid': 6,
    'serverid': 4,
    "ename":"BaiJinHuanXiang",
  },
  '神拳痕':
  {
    'areaid': 6,
    'serverid': 2,
    "ename":"ShenQuanHen",
  },
  '潮风亭':
  {
    'areaid': 6,
    'serverid': 1,
    "ename":"ChaoFengTing",
  },
  '旅人栈桥':
  {
    'areaid': 6,
    'serverid': 5,
    "ename":"LvRenZhanQiao",
  },
  '拂晓之间':
  {
    'areaid': 6,
    'serverid': 6,
    "ename":"FuXiaoZhiJian",
  },
  '龙巢神殿':
  {
    'areaid': 6,
    'serverid': 7,
    "ename":"Longchaoshendian",
  },

  '梦羽宝境':
  {
    'areaid': 6,
    'serverid': 8,
    "ename":"MengYuBaoJing",
  },
  '紫水栈桥':
  {
    'areaid': 6,
    'serverid': 1,
    "ename":"ZiShuiZhanQiao",
  },
  '延夏':
  {
    'areaid': 6,
    'serverid': 2,
    "ename":"YanXia",
  },
  '静语庄园':
  {
    'areaid': 6,
    'serverid': 3,
    "ename":"JingYuZhuangYuan",
  },
  '摩杜纳':
  {
    'areaid': 6,
    'serverid': 4,
    "ename":"MoDuNa",
  },
  '海猫茶屋':
  {
    'areaid': 6,
    'serverid': 5,
    "ename":"HaiMaoChaWu",
  },
  '柔风海湾':
  {
    'areaid': 6,
    'serverid': 6,
    "ename":"RouFengHaiWan",
  },
  '琥珀原':
  {
    'areaid': 6,
    'serverid': 7,
    "ename":"HuPoYuan",
  },
}



/**
 * 获取服务器的areaid与serverid
 * @param serverName 区域名
 */

// eorzeaServerCh

const getEorzeaServerChID = (serverName) => {

  const serverNameRates = eorzeaServerCh[serverName]

  if (serverNameRates == null) {
    return `查找不到${serverName}服务器对应的数据`
  }

  serverID = {
    areaid: eorzeaServerCh[serverName].areaid,
    serverid: eorzeaServerCh[serverName].serverid

  }

  return serverID

}

module.exports = getEorzeaServerChID


