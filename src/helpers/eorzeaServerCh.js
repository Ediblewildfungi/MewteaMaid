
const eorzeaServerCh = {
  '红玉海':
  {
    'areaid': 1,
    'serverid': 27,
  },
  '神意之地':
  {
    'areaid': 1,
    'serverid': 23,
  },
  '拉诺西亚':
  {
    'areaid': 1,
    'serverid': 3,
  },
  '幻影群岛':
  {
    'areaid': 1,
    'serverid': 5,
  },
  '萌芽池':
  {
    'areaid': 1,
    'serverid': 25,
  },
  '宇宙和音':
  {
    'areaid': 1,
    'serverid': 28,
  },
  '沃仙曦染':
  {
    'areaid': 1,
    'serverid': 29,
  },
  '晨曦王座':
  {
    'areaid': 1,
    'serverid': 30,
  },
  '白银乡':
  {
    'areaid': 6,
    'serverid': 3,
  },
  '白金幻象':
  {
    'areaid': 6,
    'serverid': 4,
  },
  '神拳痕':
  {
    'areaid': 6,
    'serverid': 2,
  },
  '潮风亭':
  {
    'areaid': 6,
    'serverid': 1,
  },
  '旅人栈桥':
  {
    'areaid': 6,
    'serverid': 5,
  },
  '拂晓之间':
  {
    'areaid': 6,
    'serverid': 6,
  },
  '龙巢神殿':
  {
    'areaid': 6,
    'serverid': 7,
  },

  '梦羽宝境':
  {
    'areaid': 6,
    'serverid': 8,
  },
  '紫水栈桥':
  {
    'areaid': 6,
    'serverid': 1,
  },
  '延夏':
  {
    'areaid': 6,
    'serverid': 2,
  },
  '静语庄园':
  {
    'areaid': 6,
    'serverid': 3,
  },
  '摩杜纳':
  {
    'areaid': 6,
    'serverid': 4,
  },
  '海猫茶屋':
  {
    'areaid': 6,
    'serverid': 5,
  },
  '柔风海湾':
  {
    'areaid': 6,
    'serverid': 6,
  },
  '琥珀原':
  {
    'areaid': 6,
    'serverid': 7,
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


