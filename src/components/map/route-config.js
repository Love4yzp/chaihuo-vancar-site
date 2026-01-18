// src/components/map/route-config.js
// 路线和城市配置数据
// Route and City configuration data

const SHENZHEN_COORDS = { x: 66, y: 78.4 };
const HAIKOU_COORDS = { x: 60.2, y: 83.7 };
const CHENGDU_COORDS = { x: 50.5, y: 64.1 };
const CHONGQING_COORDS = { x: 54.1, y: 66.5 };
const KUNMING_COORDS = { x: 48.2, y: 75.1 };
const GUIYANG_COORDS = { x: 54.6, y: 71.9 };
const BEIJING_COORDS = { x: 69.8, y: 45.7 };
const XIAN_COORDS = { x: 58.1, y: 56.6 };
const LANZHOU_COORDS = { x: 50.1, y: 53.5 };
const XINING_COORDS = { x: 45.5, y: 53.3 };
const YINCHUAN_COORDS = { x: 53.8, y: 49.0 };
const URUMQI_COORDS = { x: 22.8, y: 37.6 };
const LHASA_COORDS = { x: 28.3, y: 65 };
const SHENYANG_COORDS = { x: 81.8, y: 42.3 };
const CHANGCHUN_COORDS = { x: 84.8, y: 36.4 };
const HARBIN_COORDS = { x: 86.2, y: 30.9 };
const HOHHOT_COORDS = { x: 61.9, y: 42.5 };
const CHANGSHA_COORDS = { x: 64, y: 68.9 };
const NANCHANG_COORDS = { x: 69, y: 68.5 };
const WUHAN_COORDS = { x: 66.5, y: 64.4 };
const FUZHOU_COORDS = { x: 74.3, y: 72.7 };
const HANGZHOU_COORDS = { x: 76.8, y: 65.8 };
const NANJING_COORDS = { x: 75.6, y: 61.7 };
const HFEI_COORDS = { x: 71.7, y: 62.1 };
const ZHENGZHOU_COORDS = { x: 66, y: 56.9 };
const SHIJIAZHUANG_COORDS = { x: 67.9, y: 49.7 };
const JINAN_COORDS = { x: 73.1, y: 53.4 };
const TAIYUAN_COORDS = { x: 63.6, y: 50.0 };
const NANNING_COORDS = { x: 57.2, y: 77.9 };

export const KEY_CITIES = [
    {
        id: 'shenzhen',
        name: '深圳',
        ...SHENZHEN_COORDS,
        date: '2026.03.01 - 2026.11.11',
        description: '创客万里行 · 从深圳出发，走遍中国，回到深圳',
        isCurrent: true,
    },
    { id: 'beijing', name: '北京', ...BEIJING_COORDS, date: '预计抵达', description: '北京 · 核心都城' },
    { id: 'nanning', name: '南宁', ...NANNING_COORDS, date: '预计抵达', description: '广西 · 绿城' },
    { id: 'haikou', name: '海口', ...HAIKOU_COORDS, date: '预计抵达', description: '海南 · 椰城' },
    { id: 'fuzhou', name: '福州', ...FUZHOU_COORDS, date: '预计抵达', description: '福建 · 榕城' },
    { id: 'hangzhou', name: '杭州', ...HANGZHOU_COORDS, date: '预计抵达', description: '浙江 · 杭城' },
    { id: 'nanjing', name: '南京', ...NANJING_COORDS, date: '预计抵达', description: '江苏 · 金陵' },
    { id: 'hefei', name: '合肥', ...HFEI_COORDS, date: '预计抵达', description: '安徽 · 庐州' },
    { id: 'nanchang', name: '南昌', ...NANCHANG_COORDS, date: '预计抵达', description: '江西 · 英雄城' },
    { id: 'wuhan', name: '武汉', ...WUHAN_COORDS, date: '预计抵达', description: '湖北 · 江城' },
    { id: 'changsha', name: '长沙', ...CHANGSHA_COORDS, date: '预计抵达', description: '湖南 · 星城' },
    { id: 'zhengzhou', name: '郑州', ...ZHENGZHOU_COORDS, date: '预计抵达', description: '河南 · 绿城' },
    { id: 'shijiazhuang', name: '石家庄', ...SHIJIAZHUANG_COORDS, date: '预计抵达', description: '河北 · 庄里' },
    { id: 'jinan', name: '济南', ...JINAN_COORDS, date: '预计抵达', description: '山东 · 泉城' },
    { id: 'taiyuan', name: '太原', ...TAIYUAN_COORDS, date: '预计抵达', description: '山西 · 龙城' },
    { id: 'chengdu', name: '成都', ...CHENGDU_COORDS, date: '预计抵达', description: '四川 · 蓉城' },
    { id: 'chongqing', name: '重庆', ...CHONGQING_COORDS, date: '预计抵达', description: '重庆 · 山城' },
    { id: 'kunming', name: '昆明', ...KUNMING_COORDS, date: '预计抵达', description: '云南 · 春城' },
    { id: 'guiyang', name: '贵阳', ...GUIYANG_COORDS, date: '预计抵达', description: '贵州 · 筑城' },
    { id: 'xian', name: '西安', ...XIAN_COORDS, date: '预计抵达', description: '陕西 · 古都' },
    { id: 'lanzhou', name: '兰州', ...LANZHOU_COORDS, date: '预计抵达', description: '甘肃 · 金城' },
    { id: 'xining', name: '西宁', ...XINING_COORDS, date: '预计抵达', description: '青海 · 夏都' },
    { id: 'yinchuan', name: '银川', ...YINCHUAN_COORDS, date: '预计抵达', description: '宁夏 · 凤城' },
    { id: 'urumqi', name: '乌鲁木齐', ...URUMQI_COORDS, date: '预计抵达', description: '新疆 · 边城' },
    { id: 'lhasa', name: '拉萨', ...LHASA_COORDS, date: '预计抵达', description: '西藏 · 圣城' },
    { id: 'shenyang', name: '沈阳', ...SHENYANG_COORDS, date: '预计抵达', description: '辽宁 · 盛京' },
    { id: 'changchun', name: '长春', ...CHANGCHUN_COORDS, date: '预计抵达', description: '吉林 · 北国春城' },
    { id: 'harbin', name: '哈尔滨', ...HARBIN_COORDS, date: '预计抵达', description: '黑龙江 · 冰城' },
    { id: 'hohhot', name: '呼和浩特', ...HOHHOT_COORDS, date: '预计抵达', description: '内蒙古 · 青城' },
];

export const ROUTE_POINTS = [
    { ...SHENZHEN_COORDS, name: '深圳' },
    { ...NANNING_COORDS, name: '南宁' },
    { ...GUIYANG_COORDS, name: '贵阳' },
    { ...CHONGQING_COORDS, name: '重庆' },
    { ...CHENGDU_COORDS, name: '成都' },
    { ...LHASA_COORDS, name: '拉萨' },
    { ...URUMQI_COORDS, name: '乌鲁木齐' },
    { ...XINING_COORDS, name: '西宁' },
    { ...LANZHOU_COORDS, name: '兰州' },
    { ...YINCHUAN_COORDS, name: '银川' },
    { ...HOHHOT_COORDS, name: '呼和浩特' },
    { ...SHIJIAZHUANG_COORDS, name: '石家庄' },
    { ...JINAN_COORDS, name: '济南' },
    { ...NANJING_COORDS, name: '南京' },
    { ...HANGZHOU_COORDS, name: '杭州' },
    { ...NANCHANG_COORDS, name: '南昌' },
    { ...CHANGSHA_COORDS, name: '长沙' },
    { ...SHENZHEN_COORDS, name: '深圳' },
];