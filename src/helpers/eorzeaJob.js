

const eorzeaJobs = [
  {
    "id": 1,
    "name": "Astrologian",
    "cnName": "占星术士",
    "nickname": ["占", "占星"]
  },
  {
    "id": 2,
    "name": "Bard",
    "cnName": "吟游诗人",
    "nickname": ["吟游诗人","诗", "诗人", "唱歌的",]

  },
  {
    "id": 3,
    "name": "Black Mage",
    "cnName": "黑魔法师",
    "nickname": ["黑魔法师","黑", "黑魔", "狗黑魔", "伏地魔"]
  },
  {
    "id": 4,
    "name": "Dark Knight",
    "cnName": "暗黑骑士",
    "nickname": ["暗黑骑士","暗", "暗骑", "黑骑"]
  },
  {
    "id": 5,
    "name": "Dragoon",
    "cnName": "龙骑士",
    "nickname": ["龙骑士","龙", "龙骑", "躺尸龙"]
  },
  {
    "id": 6,
    "name": "Machinist",
    "cnName": "机工士",
    "nickname": ["机工士","机", "机工"]
  },
  {
    "id": 7,
    "name": "Monk",
    "cnName": "武僧",
    "nickname": ["武僧","僧", "扫地僧"]
  },
  {
    "id": 8,
    "name": "Ninja",
    "cnName": "忍者",
    "nickname": ["忍者","忍", "兔", "兔忍"]

  },
  {
    "id": 9,
    "name": "Paladin",
    "cnName": "骑士",
    "nickname": ["骑士","骑"]
  },
  {
    "id": 10,
    "name": "Scholar",
    "cnName": "学者",
    "nickname": ["学者","学", "小仙女"]
  },
  {
    "id": 11,
    "name": "Summoner",
    "cnName": "召唤师",
    "nickname": ["召唤师","召","召唤", "巴哈"]
  },
  {
    "id": 12,
    "name": "Warrior",
    "cnName": "战士",
    "nickname": ["战士","战"]
  },
  {
    "id": 13,
    "name": "White Mage",
    "cnName": "白魔法师",
    "nickname": ["白魔法师","白", "白魔"]
  },
  {
    "id": 14,
    "name": "Red Mage",
    "cnName": "赤魔法师",
    "nickname": ["赤魔法师","赤", "赤魔"]
  },
  {
    "id": 15,
    "name": "Samurai",
    "cnName": "武士",
    "nickname": ["武士","侍", "方向盘"]
  },
  {
    "id": 16,
    "name": "Dancer",
    "cnName": "舞者",
    "nickname": ["舞者","舞", "舞娘"]
  },
  {
    "id": 17,
    "name": "Gunbreaker",
    "cnName": "绝枪战士",
    "nickname": ["绝枪战士","绝", "绝枪"]
  }
]





/**
 * 获取职业数据
 * @param jobNickName 职业名称
 */

// getEorzeaJob

const getEorzeaJob = (jobNickName) => {

  let job = {
    ok: false
  }

  if (jobNickName) {

    for (let i = 0; i < eorzeaJobs.length; i++) {

      for (let y = 0; y < eorzeaJobs[i].nickname.length; y++) {

        if (eorzeaJobs[i].nickname[y] == jobNickName) {
          job.ok = true
          job.id = eorzeaJobs[i].id
          job.name = eorzeaJobs[i].name
          job.cnName = eorzeaJobs[i].cnName
         
          break
        }
      }
    }

  }


  return job

}

module.exports = getEorzeaJob

