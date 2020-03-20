const EorzeaClock = require('./eorzeaClock')

const EorzeaAreaWeather = {
  '利姆萨·罗敏萨': [
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '中拉诺西亚': [
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '拉诺西亚低地': [
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '东拉诺西亚': [
    {
      'rate': 5,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 45,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 5,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': -1,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
  ],
  '西拉诺西亚': [
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': -1,
      'weather': '强风',
      'weather_en': 'Gales',
    },
  ],
  '拉诺西亚高地': [
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': -1,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
  ],
  '拉诺西亚外地': [
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '海雾村': [
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '狼狱停船场': [
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
  ],
  '格里达尼亚': [
    {
      'rate': 5,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 15,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '黑衣森林中央林区': [
    {
      'rate': 5,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': 15,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '黑衣森林东部林区': [
    {
      'rate': 5,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': 15,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '黑衣森林南部林区': [
    {
      'rate': 5,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 5,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
    {
      'rate': 15,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': 5,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '黑衣森林北部林区': [
    {
      'rate': 5,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 5,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
    {
      'rate': 15,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 5,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '薰衣草苗圃': [
    {
      'rate': 5,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '乌尔达哈': [
    {
      'rate': 40,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 25,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '西萨纳兰': [
    {
      'rate': 40,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 25,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '中萨纳兰': [
    {
      'rate': 15,
      'weather': '扬沙',
      'weather_en': 'DustStorms',
    },
    {
      'rate': 40,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '东萨纳兰': [
    {
      'rate': 40,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 5,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': -1,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
  ],
  '南萨纳兰': [
    {
      'rate': 20,
      'weather': '热浪',
      'weather_en': 'HeatWaves',
    },
    {
      'rate': 40,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': -1,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
  ],
  '北萨纳兰': [
    {
      'rate': 5,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 15,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 30,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': -1,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
  ],
  '高脚孤丘': [
    {
      'rate': 40,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 20,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 25,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
  ],
  '摩杜纳': [
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 15,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 30,
      'weather': '妖雾',
      'weather_en': 'Gloom',
    },
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '伊修加德': [
    {
      'rate': 60,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 5,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': -1,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
  ],
  '库尔札斯中央高地': [
    {
      'rate': 20,
      'weather': '暴雪',
      'weather_en': 'Blizzards',
    },
    {
      'rate': 40,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 5,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': -1,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
  ],
  '库尔札斯西部高地': [
    {
      'rate': 20,
      'weather': '暴雪',
      'weather_en': 'Blizzards',
    },
    {
      'rate': 40,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 5,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': -1,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
  ],
  '阿巴拉提亚云海': [
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': -1,
      'weather': '灵风',
      'weather_en': 'UmbralWind',
    },
  ],
  '魔大陆阿济兹拉': [
    {
      'rate': 35,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 35,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': -1,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
  ],
  '龙堡参天高地': [
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': 10,
      'weather': '扬沙',
      'weather_en': 'DustStorms',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '龙堡内陆低地': [
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '翻云雾海': [
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '强风',
      'weather_en': 'Gales',
    },
    {
      'rate': 20,
      'weather': '灵电',
      'weather_en': 'UmbralStatic',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '田园郡': [
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
    {
      'rate': 30,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': -1,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '神拳痕': [
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 45,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
  ],
  '基拉巴尼亚边区': [
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 45,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
  ],
  '基拉巴尼亚山区': [
    {
      'rate': 10,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 50,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': -1,
      'weather': '扬沙',
      'weather_en': 'DustStorms',
    },
  ],
  '基拉巴尼亚湖区': [
    {
      'rate': 20,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': -1,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
  ],
  '黄金港': [
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '白银乡': [
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 20,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '红玉海': [
    {
      'rate': 10,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': 10,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '延夏': [
    {
      'rate': 5,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '太阳神草原': [
    {
      'rate': 5,
      'weather': '强风',
      'weather_en': 'Gales',
    },
    {
      'rate': 5,
      'weather': '微风',
      'weather_en': 'Wind',
    },
    {
      'rate': 7,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 8,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': -1,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
 
  '优雷卡常风之地': [
    {
      'rate': 30,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 30,
      'weather': '强风',
      'weather_en': 'Gales',
    },
    {
      'rate': 30,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
    {
      'rate': -1,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
  ],
  '优雷卡恒冰之地': [
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 18,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 18,
      'weather': '热浪',
      'weather_en': 'HeatWaves',
    },
    {
      'rate': 18,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
    {
      'rate': 18,
      'weather': '暴雷',
      'weather_en': 'EurekaPagosThunder',
    },
    {
      'rate': -1,
      'weather': '暴雪',
      'weather_en': 'Blizzards',
    },
  ],
  '优雷卡涌火之地': [
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 18,
      'weather': '热浪',
      'weather_en': 'HeatWaves',
    },
    {
      'rate': 18,
      'weather': '打雷',
      'weather_en': 'Thunder',
    },
    {
      'rate': 18,
      'weather': '暴雪',
      'weather_en': 'Blizzards',
    },
    {
      'rate': 18,
      'weather': '灵风',
      'weather_en': 'UmbralWind',
    },
    {
      'rate': -1,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
  ],
  '优雷卡丰水之地': [
    {
      'rate': 12,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 22,
      'weather': '暴雨',
      'weather_en': 'Showers',
    },
    {
      'rate': 22,
      'weather': '妖雾',
      'weather_en': 'Gloom',
    },
    {
      'rate': 22,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
    {
      'rate': -1,
      'weather': '小雪',
      'weather_en': 'Snow',
    },
  ],
  '水晶都': [
    {
      'rate': 20,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 5,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
  ],
  '雷克兰德': [
    {
      'rate': 20,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 5,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
  ],
  '游末邦': [
    {
      'rate': 10,
      'weather': '强风',
      'weather_en': 'Gales',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '珂露西亚岛': [
    {
      'rate': 10,
      'weather': '强风',
      'weather_en': 'Gales',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '安穆·艾兰': [
    {
      'rate': 45,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '扬沙',
      'weather_en': 'DustStorms',
    },
    {
      'rate': 10,
      'weather': '热浪',
      'weather_en': 'HeatWaves',
    },
    {
      'rate': 20,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
  ],
  '伊尔美格': [
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '雷雨',
      'weather_en': 'Thunderstorms',
    },
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
  ],
  '拉凯提卡大森林': [
    {
      'rate': 10,
      'weather': '薄雾',
      'weather_en': 'Fog',
    },
    {
      'rate': 10,
      'weather': '小雨',
      'weather_en': 'Rain',
    },
    {
      'rate': 10,
      'weather': '灵风',
      'weather_en': 'UmbralWind',
    },
    {
      'rate': 15,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    {
      'rate': 40,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 15,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
  ],
  '黑风海': [
    {
      'rate': 10,
      'weather': '阴云',
      'weather_en': 'Clouds',
    },
    {
      'rate': 10,
      'weather': '晴朗',
      'weather_en': 'FairSkies',
    },
    {
      'rate': 10,
      'weather': '碧空',
      'weather_en': 'ClearSkies',
    },
    
  ],
}

const calcSeed = (base) => {
  const tmp = (base << 11 ^ base) >>> 0
  return ((tmp >>> 8 ^ tmp) >>> 0) % 100
}

const createSeed = (eorzeaTime, step) => {
  const targetEorzeaTime = eorzeaTime.createViaAddHours(step * 8)
  const baseSeed = targetEorzeaTime.getDaysCount() * 100 + ((targetEorzeaTime.getHours() + 8 - targetEorzeaTime.getHours() % 8) % 24)
  return calcSeed(baseSeed)
}

const findWeather = (rates, seed) => {
  for (let i = 0; i < rates.length; i++) {
    const { rate, weather } = rates[i]

    if (rate === -1 || seed < rate) {
      return weather
    } else {
      seed -= rate
    }
  }
}

const createForecast = (eorzeaTime, areaWeatherRates) => {
  const initSeeds = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const currentWeatherStartTime = Math.floor(eorzeaTime.getHours() / 8) * 8

  return initSeeds
    .map(initSeed => createSeed(eorzeaTime, initSeed))
    .map((seed) => findWeather(areaWeatherRates, seed))
    .map((weather, wi) => {
      return {
        startTime: ((initSeeds[wi] + 3) * 8 + currentWeatherStartTime) % 24,
        weather,
      }
    })
}

const createTargetForecast = (eorzeaTime, areaWeatherRates, targetWeather, prevWeather) => {
  const maxAnsCount = 3
  const ans = []

  // 如果有前置天气的要求，时间回退到上一次天气
  eorzeaTime.setHours(Math.floor(eorzeaTime.getHours() / 8) * 8 - (prevWeather == null ? 0 : 8), 0, 0, 0)

  // 1152 = 12 * 32 * 3
  let maxTryCount = 1152
  let preMatched = false
  // 如果有前置天气的要求，从上一次天气开始计算
  for (let count = prevWeather == null ? 0 : -1; count < maxTryCount; count++) {
    const seed = createSeed(eorzeaTime, 0)
    const weather = findWeather(areaWeatherRates, seed)

    if ((prevWeather == null && weather === targetWeather) || (prevWeather != null && preMatched && weather === targetWeather)) {
      ans.push({
        startTime: eorzeaTime.getHours(),
        LocalTime: eorzeaTime.toLocalTimeString(),
        weather,
      })

      if (ans.length >= maxAnsCount) {
        return ans
      }
    }

    preMatched = false

    if (prevWeather != null && weather === prevWeather) {
      preMatched = true
    }

    eorzeaTime.setHours(eorzeaTime.getHours() + 8)
  }

  return ans
}

/**
 * 获取艾欧泽亚天气预报
 * @param localTimestamp 本地时间的时间戳
 * @param areaName 区域名
 * @param targetWeather 可选的目标天气
 * @param prevWeather 可选的前置目标天气
 */
const getEorzeaWeatherForecast = (localTimestamp, areaName, targetWeather, prevWeather) => {
  const eorzeaTime = EorzeaClock.fromLocalTimestamp(localTimestamp)
  const areaWeatherRates = EorzeaAreaWeather[areaName]

  if (areaWeatherRates == null) {
    return `查找不到${areaName}区域对应的天气数据`
  }

  if (targetWeather == null) {
    return createForecast(eorzeaTime, areaWeatherRates)
  }

  const possibleWeather = areaWeatherRates.map(({ weather }) => weather)

  if (!possibleWeather.includes(targetWeather)) {
    return `${areaName}区域不可能出现${targetWeather}天气`
  }

  if (prevWeather != null && !possibleWeather.includes(prevWeather)) {
    return `${areaName}区域不可能出现${prevWeather}天气`
  }

  return createTargetForecast(eorzeaTime, areaWeatherRates, targetWeather, prevWeather)
}

module.exports = getEorzeaWeatherForecast
