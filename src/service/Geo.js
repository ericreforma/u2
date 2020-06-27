const cities = [
	{
		"title": "Zunyi",
		"chinese_title": "遵义市",
		"province": "Guizhou",
	},
	{
		"title": "Zunhua",
		"chinese_title": "遵化市",
		"province": "Hebei",
	},
	{
		"title": "Zouping",
		"chinese_title": "邹平市",
		"province": "Shandong",
	},
	{
		"title": "Zoucheng",
		"chinese_title": "邹城市",
		"province": "Shandong",
	},
	{
		"title": "Ziyang",
		"chinese_title": "资阳市",
		"province": "Sichuan",
	},
	{
		"title": "Zixing",
		"chinese_title": "资兴市",
		"province": "Hunan",
	},
	{
		"title": "Zigong",
		"chinese_title": "自贡市",
		"province": "Sichuan",
	},
	{
		"title": "Zichang",
		"chinese_title": "子长市",
		"province": "Shaanxi",
	},
	{
		"title": "Zibo",
		"chinese_title": "淄博市",
		"province": "Shandong",
	},
	{
		"title": "Zhuzhou",
		"chinese_title": "株洲市",
		"province": "Hunan",
	},
	{
		"title": "Zhuozhou",
		"chinese_title": "涿州市",
		"province": "Hebei",
	},
	{
		"title": "Zhumadian",
		"chinese_title": "驻马店市",
		"province": "Henan",
	},
	{
		"title": "Zhuji",
		"chinese_title": "诸暨市",
		"province": "Zhejiang",
	},
	{
		"title": "Zhuhai",
		"chinese_title": "珠海市",
		"province": "Guangdong",
	},
	{
		"title": "Zhucheng",
		"chinese_title": "诸城市",
		"province": "Shandong",
	},
	{
		"title": "Zhuanghe",
		"chinese_title": "庄河市",
		"province": "Liaoning",
	},
	{
		"title": "Zhoushan",
		"chinese_title": "舟山市",
		"province": "Zhejiang",
	},
	{
		"title": "Zhoukou",
		"chinese_title": "周口市",
		"province": "Henan",
	},
	{
		"title": "Zhongxiang",
		"chinese_title": "钟祥市",
		"province": "Hubei",
	},
	{
		"title": "Zhongwei",
		"chinese_title": "中卫市",
		"province": "Ningxia",
	},
	{
		"title": "Zhongshan",
		"chinese_title": "中山市",
		"province": "Guangdong",
	},
	{
		"title": "Zhijiang",
		"chinese_title": "枝江市",
		"province": "Hubei",
	},
	{
		"title": "Zhenjiang",
		"chinese_title": "镇江市",
		"province": "Jiangsu",
	},
	{
		"title": "Zhengzhou",
		"chinese_title": "郑州市",
		"province": "Henan",
	},
	{
		"title": "Zhaoyuan",
		"chinese_title": "招远市",
		"province": "Shandong",
	},
	{
		"title": "Zhaotong",
		"chinese_title": "昭通市",
		"province": "Yunnan",
	},
	{
		"title": "Zhaoqing",
		"chinese_title": "肇庆市",
		"province": "Guangdong",
	},
	{
		"title": "Zhaodong",
		"chinese_title": "肇东市",
		"province": "Heilongjiang",
	},
	{
		"title": "Zhanjiang",
		"chinese_title": "湛江市",
		"province": "Guangdong",
	},
	{
		"title": "Zhangzhou",
		"chinese_title": "漳州市",
		"province": "Fujian",
	},
	{
		"title": "Zhangye",
		"chinese_title": "张掖市",
		"province": "Gansu",
	},
	{
		"title": "Zhangshu",
		"chinese_title": "樟树市",
		"province": "Jiangxi",
	},
	{
		"title": "Zhangping",
		"chinese_title": "漳平市",
		"province": "Fujian",
	},
	{
		"title": "Zhangjiakou",
		"chinese_title": "张家口市",
		"province": "Hebei",
	},
	{
		"title": "Zhangjiajie",
		"chinese_title": "张家界市",
		"province": "Hunan",
	},
	{
		"title": "Zhangjiagang",
		"chinese_title": "张家港市",
		"province": "Jiangsu",
	},
	{
		"title": "Zhalantun",
		"chinese_title": "扎兰屯市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Zaozhuang",
		"chinese_title": "枣庄市",
		"province": "Shandong",
	},
	{
		"title": "Zaoyang",
		"chinese_title": "枣阳市",
		"province": "Hubei",
	},
	{
		"title": "Yuzhou",
		"chinese_title": "禹州市",
		"province": "Henan",
	},
	{
		"title": "Yuyao",
		"chinese_title": "余姚市",
		"province": "Zhejiang",
	},
	{
		"title": "Yuxi",
		"chinese_title": "玉溪市",
		"province": "Yunnan",
	},
	{
		"title": "Yushu",
		"chinese_title": "榆树市",
		"province": "Jilin",
	},
	{
		"title": "Yushu",
		"chinese_title": "玉树市",
		"province": "Qinghai",
	},
	{
		"title": "Yunfu",
		"chinese_title": "云浮市",
		"province": "Guangdong",
	},
	{
		"title": "Yuncheng",
		"chinese_title": "运城市",
		"province": "Shanxi",
	},
	{
		"title": "Yumen",
		"chinese_title": "玉门市",
		"province": "Gansu",
	},
	{
		"title": "Yulin",
		"chinese_title": "玉林市",
		"province": "Guangxi",
	},
	{
		"title": "Yulin",
		"chinese_title": "榆林市",
		"province": "Shaanxi",
	},
	{
		"title": "Yuhuan",
		"chinese_title": "玉环市",
		"province": "Zhejiang",
	},
	{
		"title": "Yueyang",
		"chinese_title": "岳阳市",
		"province": "Hunan",
	},
	{
		"title": "Yueqing",
		"chinese_title": "乐清市",
		"province": "Zhejiang",
	},
	{
		"title": "Yucheng",
		"chinese_title": "禹城市",
		"province": "Shandong",
	},
	{
		"title": "Yuanping",
		"chinese_title": "原平市",
		"province": "Shanxi",
	},
	{
		"title": "Yuanjiang",
		"chinese_title": "沅江市",
		"province": "Hunan",
	},
	{
		"title": "Yongzhou",
		"chinese_title": "永州市",
		"province": "Hunan",
	},
	{
		"title": "Yongkang",
		"chinese_title": "永康市",
		"province": "Zhejiang",
	},
	{
		"title": "Yongji",
		"chinese_title": "永济市",
		"province": "Shanxi",
	},
	{
		"title": "Yongcheng",
		"chinese_title": "永城市",
		"province": "Henan",
	},
	{
		"title": "Yong'an",
		"chinese_title": "永安市",
		"province": "Fujian",
	},
	{
		"title": "Yizheng",
		"chinese_title": "仪征市",
		"province": "Jiangsu",
	},
	{
		"title": "Yiyang",
		"chinese_title": "益阳市",
		"province": "Hunan",
	},
	{
		"title": "Yixing",
		"chinese_title": "宜兴市",
		"province": "Jiangsu",
	},
	{
		"title": "Yiwu",
		"chinese_title": "义乌市",
		"province": "Zhejiang",
	},
	{
		"title": "Yining",
		"chinese_title": "伊宁市",
		"province": "Xinjiang",
	},
	{
		"title": "Yingtan",
		"chinese_title": "鹰潭市",
		"province": "Jiangxi",
	},
	{
		"title": "Yingkou",
		"chinese_title": "营口市",
		"province": "Liaoning",
	},
	{
		"title": "Yingde",
		"chinese_title": "英德市",
		"province": "Guangdong",
	},
	{
		"title": "Yingcheng",
		"chinese_title": "应城市",
		"province": "Hubei",
	},
	{
		"title": "Yinchuan",
		"chinese_title": "银川市",
		"province": "Ningxia",
	},
	{
		"title": "Yima",
		"chinese_title": "义马市",
		"province": "Henan",
	},
	{
		"title": "Yidu",
		"chinese_title": "宜都市",
		"province": "Hubei",
	},
	{
		"title": "Yichun",
		"chinese_title": "伊春市",
		"province": "Heilongjiang",
	},
	{
		"title": "Yichun",
		"chinese_title": "宜春市",
		"province": "Jiangxi",
	},
	{
		"title": "Yicheng",
		"chinese_title": "宜城市",
		"province": "Hubei",
	},
	{
		"title": "Yichang",
		"chinese_title": "宜昌市",
		"province": "Hubei",
	},
	{
		"title": "Yibin",
		"chinese_title": "宜宾市",
		"province": "Sichuan",
	},
	{
		"title": "Yantai",
		"chinese_title": "烟台市",
		"province": "Shandong",
	},
	{
		"title": "Yanshi",
		"chinese_title": "偃师市",
		"province": "Henan",
	},
	{
		"title": "Yanji",
		"chinese_title": "延吉市",
		"province": "Jilin",
	},
	{
		"title": "Yangzhou",
		"chinese_title": "扬州市",
		"province": "Jiangsu",
	},
	{
		"title": "Yangzhong",
		"chinese_title": "扬中市",
		"province": "Jiangsu",
	},
	{
		"title": "Yangquan",
		"chinese_title": "阳泉市",
		"province": "Shanxi",
	},
	{
		"title": "Yangjiang",
		"chinese_title": "阳江市",
		"province": "Guangdong",
	},
	{
		"title": "Yangchun",
		"chinese_title": "阳春市",
		"province": "Guangdong",
	},
	{
		"title": "Yancheng",
		"chinese_title": "盐城市",
		"province": "Jiangsu",
	},
	{
		"title": "Yan'an",
		"chinese_title": "延安市",
		"province": "Shaanxi",
	},
	{
		"title": "Yakeshi",
		"chinese_title": "牙克石市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Ya'an",
		"chinese_title": "雅安市",
		"province": "Sichuan",
	},
	{
		"title": "Xuzhou",
		"chinese_title": "徐州市",
		"province": "Jiangsu",
	},
	{
		"title": "Xuchang",
		"chinese_title": "许昌市",
		"province": "Henan",
	},
	{
		"title": "Xuanwei",
		"chinese_title": "宣威市",
		"province": "Yunnan",
	},
	{
		"title": "Xuancheng",
		"chinese_title": "宣城市",
		"province": "Anhui",
	},
	{
		"title": "Xinzhou",
		"chinese_title": "忻州市",
		"province": "Shanxi",
	},
	{
		"title": "Xinzheng",
		"chinese_title": "新郑市",
		"province": "Henan",
	},
	{
		"title": "Xinyu",
		"chinese_title": "新余市",
		"province": "Jiangxi",
	},
	{
		"title": "Xinyi",
		"chinese_title": "信宜市",
		"province": "Guangdong",
	},
	{
		"title": "Xinyi",
		"chinese_title": "新沂市",
		"province": "Jiangsu",
	},
	{
		"title": "Xinyang",
		"chinese_title": "信阳市",
		"province": "Henan",
	},
	{
		"title": "Xinxiang",
		"chinese_title": "新乡市",
		"province": "Henan",
	},
	{
		"title": "Xintai",
		"chinese_title": "新泰市",
		"province": "Shandong",
	},
	{
		"title": "Xinmin",
		"chinese_title": "新民市",
		"province": "Liaoning",
	},
	{
		"title": "Xinmi",
		"chinese_title": "新密市",
		"province": "Henan",
	},
	{
		"title": "Xinle",
		"chinese_title": "新乐市",
		"province": "Hebei",
	},
	{
		"title": "Xinji",
		"chinese_title": "辛集市",
		"province": "Hebei",
	},
	{
		"title": "Xining",
		"chinese_title": "西宁市",
		"province": "Qinghai",
	},
	{
		"title": "Xingyi",
		"chinese_title": "兴义市",
		"province": "Guizhou",
	},
	{
		"title": "Xingyang",
		"chinese_title": "荥阳市",
		"province": "Henan",
	},
	{
		"title": "Xingtai",
		"chinese_title": "邢台市",
		"province": "Hebei",
	},
	{
		"title": "Xingren",
		"chinese_title": "兴仁市",
		"province": "Guizhou",
	},
	{
		"title": "Xingping",
		"chinese_title": "兴平市",
		"province": "Shaanxi",
	},
	{
		"title": "Xingning",
		"chinese_title": "兴宁市",
		"province": "Guangdong",
	},
	{
		"title": "Xinghua",
		"chinese_title": "兴化市",
		"province": "Jiangsu",
	},
	{
		"title": "Xingcheng",
		"chinese_title": "兴城市",
		"province": "Liaoning",
	},
	{
		"title": "Xilinhot",
		"chinese_title": "锡林浩特市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Xigazê",
		"chinese_title": "日喀则市",
		"province": "Tibet",
	},
	{
		"title": "Xichang",
		"chinese_title": "西昌市",
		"province": "Sichuan",
	},
	{
		"title": "Xiaoyi",
		"chinese_title": "孝义市",
		"province": "Shanxi",
	},
	{
		"title": "Xiaogan",
		"chinese_title": "孝感市",
		"province": "Hubei",
	},
	{
		"title": "Xianyang",
		"chinese_title": "咸阳市",
		"province": "Shaanxi",
	},
	{
		"title": "Xiantao",
		"chinese_title": "仙桃市",
		"province": "Hubei",
	},
	{
		"title": "Xianning",
		"chinese_title": "咸宁市",
		"province": "Hubei",
	},
	{
		"title": "Xiangyang",
		"chinese_title": "襄阳市",
		"province": "Hubei",
	},
	{
		"title": "Xiangxiang",
		"chinese_title": "湘乡市",
		"province": "Hunan",
	},
	{
		"title": "Xiangtan",
		"chinese_title": "湘潭市",
		"province": "Hunan",
	},
	{
		"title": "Xiangcheng",
		"chinese_title": "项城市",
		"province": "Henan",
	},
	{
		"title": "Xiamen",
		"chinese_title": "厦门市",
		"province": "Fujian",
	},
	{
		"title": "Xi'an",
		"chinese_title": "西安市",
		"province": "Shaanxi",
	},
	{
		"title": "Wuzhou",
		"chinese_title": "梧州市",
		"province": "Guangxi",
	},
	{
		"title": "Wuzhong",
		"chinese_title": "吴忠市",
		"province": "Ningxia",
	},
	{
		"title": "Wuzhishan",
		"chinese_title": "五指山市",
		"province": "Hainan",
	},
	{
		"title": "Wuyishan",
		"chinese_title": "武夷山市",
		"province": "Fujian",
	},
	{
		"title": "Wuxue",
		"chinese_title": "武穴市",
		"province": "Hubei",
	},
	{
		"title": "Wuxi",
		"chinese_title": "无锡市",
		"province": "Jiangsu",
	},
	{
		"title": "Wuwei",
		"chinese_title": "无为市",
		"province": "Anhui",
	},
	{
		"title": "Wuwei",
		"chinese_title": "武威市",
		"province": "Gansu",
	},
	{
		"title": "Wusu",
		"chinese_title": "乌苏市",
		"province": "Xinjiang",
	},
	{
		"title": "Wujiaqu",
		"chinese_title": "五家渠市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Wuhu",
		"chinese_title": "芜湖市",
		"province": "Anhui",
	},
	{
		"title": "Wuhan",
		"chinese_title": "武汉市",
		"province": "Hubei",
	},
	{
		"title": "Wuhai",
		"chinese_title": "乌海市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Wugang",
		"chinese_title": "舞钢市",
		"province": "Henan",
	},
	{
		"title": "Wugang",
		"chinese_title": "武冈市",
		"province": "Hunan",
	},
	{
		"title": "Wudalianchi",
		"chinese_title": "五大连池市",
		"province": "Heilongjiang",
	},
	{
		"title": "Wuchuan",
		"chinese_title": "吴川市",
		"province": "Guangdong",
	},
	{
		"title": "Wuchang",
		"chinese_title": "五常市",
		"province": "Heilongjiang",
	},
	{
		"title": "Wu'an",
		"chinese_title": "武安市",
		"province": "Hebei",
	},
	{
		"title": "Wenzhou",
		"chinese_title": "温州市",
		"province": "Zhejiang",
	},
	{
		"title": "Wenshan",
		"chinese_title": "文山市",
		"province": "Yunnan",
	},
	{
		"title": "Wenling",
		"chinese_title": "温岭市",
		"province": "Zhejiang",
	},
	{
		"title": "Wenchang",
		"chinese_title": "文昌市",
		"province": "Hainan",
	},
	{
		"title": "Weinan",
		"chinese_title": "渭南市",
		"province": "Shaanxi",
	},
	{
		"title": "Weihui",
		"chinese_title": "卫辉市",
		"province": "Henan",
	},
	{
		"title": "Weihai",
		"chinese_title": "威海市",
		"province": "Shandong",
	},
	{
		"title": "Weifang",
		"chinese_title": "潍坊市",
		"province": "Shandong",
	},
	{
		"title": "Wanyuan",
		"chinese_title": "万源市",
		"province": "Sichuan",
	},
	{
		"title": "Wanning",
		"chinese_title": "万宁市",
		"province": "Hainan",
	},
	{
		"title": "Wafangdian",
		"chinese_title": "瓦房店市",
		"province": "Liaoning",
	},
	{
		"title": "ÜrümqiÜrümqi",
		"chinese_title": "乌鲁木齐市",
		"province": "Xinjiang",
	},
	{
		"title": "Ulanqab",
		"chinese_title": "乌兰察布市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Ulanhot",
		"chinese_title": "乌兰浩特市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Turpan",
		"chinese_title": "吐鲁番市",
		"province": "Xinjiang",
	},
	{
		"title": "Tumxuk",
		"chinese_title": "图木舒克市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Tumen",
		"chinese_title": "图们市",
		"province": "Jilin",
	},
	{
		"title": "Tongxiang",
		"chinese_title": "桐乡市",
		"province": "Zhejiang",
	},
	{
		"title": "Tongren",
		"chinese_title": "铜仁市",
		"province": "Guizhou",
	},
	{
		"title": "Tongling",
		"chinese_title": "铜陵市",
		"province": "Anhui",
	},
	{
		"title": "Tongliao",
		"chinese_title": "通辽市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Tongjiang",
		"chinese_title": "同江市",
		"province": "Heilongjiang",
	},
	{
		"title": "Tonghua",
		"chinese_title": "通化市",
		"province": "Jilin",
	},
	{
		"title": "Tongchuan",
		"chinese_title": "铜川市",
		"province": "Shaanxi",
	},
	{
		"title": "Tongcheng",
		"chinese_title": "桐城市",
		"province": "Anhui",
	},
	{
		"title": "Tiemenguan",
		"chinese_title": "铁门关市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Tieling",
		"chinese_title": "铁岭市",
		"province": "Liaoning",
	},
	{
		"title": "Tieli",
		"chinese_title": "铁力市",
		"province": "Heilongjiang",
	},
	{
		"title": "Tianshui",
		"chinese_title": "天水市",
		"province": "Gansu",
	},
	{
		"title": "Tianmen",
		"chinese_title": "天门市",
		"province": "Hubei",
	},
	{
		"title": "Tianjin",
		"chinese_title": "天津市",
		"province": "municipal",
	},
	{
		"title": "Tianchang",
		"chinese_title": "天长市",
		"province": "Anhui",
	},
	{
		"title": "Tengzhou",
		"chinese_title": "滕州市",
		"province": "Shandong",
	},
	{
		"title": "Tengchong",
		"chinese_title": "腾冲市",
		"province": "Yunnan",
	},
	{
		"title": "Taonan",
		"chinese_title": "洮南市",
		"province": "Jilin",
	},
	{
		"title": "Tangshan",
		"chinese_title": "唐山市",
		"province": "Hebei",
	},
	{
		"title": "Taizhou",
		"chinese_title": "泰州市",
		"province": "Jiangsu",
	},
	{
		"title": "Taizhou",
		"chinese_title": "台州市",
		"province": "Zhejiang",
	},
	{
		"title": "Taiyuan",
		"chinese_title": "太原市",
		"province": "Shanxi",
	},
	{
		"title": "Taixing",
		"chinese_title": "泰兴市",
		"province": "Jiangsu",
	},
	{
		"title": "Taishan",
		"chinese_title": "台山市",
		"province": "Guangdong",
	},
	{
		"title": "Taicang",
		"chinese_title": "太仓市",
		"province": "Jiangsu",
	},
	{
		"title": "Tai'an",
		"chinese_title": "泰安市",
		"province": "Shandong",
	},
	{
		"title": "Tacheng",
		"chinese_title": "塔城市",
		"province": "Xinjiang",
	},
	{
		"title": "Suzhou",
		"chinese_title": "宿州市",
		"province": "Anhui",
	},
	{
		"title": "Suzhou",
		"chinese_title": "苏州市",
		"province": "Jiangsu",
	},
	{
		"title": "Suqian",
		"chinese_title": "宿迁市",
		"province": "Jiangsu",
	},
	{
		"title": "Suizhou",
		"chinese_title": "随州市",
		"province": "Hubei",
	},
	{
		"title": "Suining",
		"chinese_title": "遂宁市",
		"province": "Sichuan",
	},
	{
		"title": "Suihua",
		"chinese_title": "绥化市",
		"province": "Heilongjiang",
	},
	{
		"title": "Suifenhe",
		"chinese_title": "绥芬河市",
		"province": "Heilongjiang",
	},
	{
		"title": "Songzi",
		"chinese_title": "松滋市",
		"province": "Hubei",
	},
	{
		"title": "Songyuan",
		"chinese_title": "松原市",
		"province": "Jilin",
	},
	{
		"title": "Siping",
		"chinese_title": "四平市",
		"province": "Jilin",
	},
	{
		"title": "Sihui",
		"chinese_title": "四会市",
		"province": "Guangdong",
	},
	{
		"title": "Shuozhou",
		"chinese_title": "朔州市",
		"province": "Shanxi",
	},
	{
		"title": "Shulan",
		"chinese_title": "舒兰市",
		"province": "Jilin",
	},
	{
		"title": "Shuifu",
		"chinese_title": "水富市",
		"province": "Yunnan",
	},
	{
		"title": "Shuangyashan",
		"chinese_title": "双鸭山市",
		"province": "Heilongjiang",
	},
	{
		"title": "Shuangliao",
		"chinese_title": "双辽市",
		"province": "Jilin",
	},
	{
		"title": "Shuanghe",
		"chinese_title": "双河市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Shouguang",
		"chinese_title": "寿光市",
		"province": "Shandong",
	},
	{
		"title": "Shizuishan",
		"chinese_title": "石嘴山市",
		"province": "Ningxia",
	},
	{
		"title": "Shiyan",
		"chinese_title": "十堰市",
		"province": "Hubei",
	},
	{
		"title": "Shishou",
		"chinese_title": "石首市",
		"province": "Hubei",
	},
	{
		"title": "Shishi",
		"chinese_title": "石狮市",
		"province": "Fujian",
	},
	{
		"title": "Shijiazhuang",
		"chinese_title": "石家庄市",
		"province": "Hebei",
	},
	{
		"title": "Shihezi",
		"chinese_title": "石河子市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Shifang",
		"chinese_title": "什邡市",
		"province": "Sichuan",
	},
	{
		"title": "Shenzhou",
		"chinese_title": "深州市",
		"province": "Hebei",
	},
	{
		"title": "Shenzhen",
		"chinese_title": "深圳市",
		"province": "Guangdong",
	},
	{
		"title": "Shenyang",
		"chinese_title": "沈阳市",
		"province": "Liaoning",
	},
	{
		"title": "Shenmu",
		"chinese_title": "神木市",
		"province": "Shaanxi",
	},
	{
		"title": "Shengzhou",
		"chinese_title": "嵊州市",
		"province": "Zhejiang",
	},
	{
		"title": "Shehong",
		"chinese_title": "射洪市",
		"province": "Sichuan",
	},
	{
		"title": "Shaoyang",
		"chinese_title": "邵阳市",
		"province": "Hunan",
	},
	{
		"title": "Shaoxing",
		"chinese_title": "绍兴市",
		"province": "Zhejiang",
	},
	{
		"title": "Shaowu",
		"chinese_title": "邵武市",
		"province": "Fujian",
	},
	{
		"title": "Shaoshan",
		"chinese_title": "韶山市",
		"province": "Hunan",
	},
	{
		"title": "Shaoguan",
		"chinese_title": "韶关市",
		"province": "Guangdong",
	},
	{
		"title": "Shaodong",
		"chinese_title": "邵东市",
		"province": "Hunan",
	},
	{
		"title": "Shanwei",
		"chinese_title": "汕尾市",
		"province": "Guangdong",
	},
	{
		"title": "Shantou",
		"chinese_title": "汕头市",
		"province": "Guangdong",
	},
	{
		"title": "Shannan",
		"chinese_title": "山南市",
		"province": "Tibet",
	},
	{
		"title": "Shangzhi",
		"chinese_title": "尚志市",
		"province": "Heilongjiang",
	},
	{
		"title": "Shangri-La",
		"chinese_title": "香格里拉市",
		"province": "Yunnan",
	},
	{
		"title": "Shangrao",
		"chinese_title": "上饶市",
		"province": "Jiangxi",
	},
	{
		"title": "Shangqiu",
		"chinese_title": "商丘市",
		"province": "Henan",
	},
	{
		"title": "Shangluo",
		"chinese_title": "商洛市",
		"province": "Shaanxi",
	},
	{
		"title": "Shanghai",
		"chinese_title": "上海市",
		"province": "municipal",
	},
	{
		"title": "Shahe",
		"chinese_title": "沙河市",
		"province": "Hebei",
	},
	{
		"title": "Sanya",
		"chinese_title": "三亚市",
		"province": "Hainan",
	},
	{
		"title": "Sansha",
		"chinese_title": "三沙市",
		"province": "Hainan",
	},
	{
		"title": "Sanming",
		"chinese_title": "三明市",
		"province": "Fujian",
	},
	{
		"title": "Sanmenxia",
		"chinese_title": "三门峡市",
		"province": "Henan",
	},
	{
		"title": "Sanhe",
		"chinese_title": "三河市",
		"province": "Hebei",
	},
	{
		"title": "Ruzhou",
		"chinese_title": "汝州市",
		"province": "Henan",
	},
	{
		"title": "Rushan",
		"chinese_title": "乳山市",
		"province": "Shandong",
	},
	{
		"title": "Ruili",
		"chinese_title": "瑞丽市",
		"province": "Yunnan",
	},
	{
		"title": "Ruijin",
		"chinese_title": "瑞金市",
		"province": "Jiangxi",
	},
	{
		"title": "Ruichang",
		"chinese_title": "瑞昌市",
		"province": "Jiangxi",
	},
	{
		"title": "Ruian",
		"chinese_title": "瑞安市",
		"province": "Zhejiang",
	},
	{
		"title": "Rugao",
		"chinese_title": "如皋市",
		"province": "Jiangsu",
	},
	{
		"title": "Rongcheng",
		"chinese_title": "荣成市",
		"province": "Shandong",
	},
	{
		"title": "Rizhao",
		"chinese_title": "日照市",
		"province": "Shandong",
	},
	{
		"title": "Renqiu",
		"chinese_title": "任丘市",
		"province": "Hebei",
	},
	{
		"title": "Renhuai",
		"chinese_title": "仁怀市",
		"province": "Guizhou",
	},
	{
		"title": "Quzhou",
		"chinese_title": "衢州市",
		"province": "Zhejiang",
	},
	{
		"title": "Qujing",
		"chinese_title": "曲靖市",
		"province": "Yunnan",
	},
	{
		"title": "Qufu",
		"chinese_title": "曲阜市",
		"province": "Shandong",
	},
	{
		"title": "Quanzhou",
		"chinese_title": "泉州市",
		"province": "Fujian",
	},
	{
		"title": "Qixia",
		"chinese_title": "栖霞市",
		"province": "Shandong",
	},
	{
		"title": "Qitaihe",
		"chinese_title": "七台河市",
		"province": "Heilongjiang",
	},
	{
		"title": "Qiqihar",
		"chinese_title": "齐齐哈尔市",
		"province": "Heilongjiang",
	},
	{
		"title": "Qionglai",
		"chinese_title": "邛崃市",
		"province": "Sichuan",
	},
	{
		"title": "Qionghai",
		"chinese_title": "琼海市",
		"province": "Hainan",
	},
	{
		"title": "Qinzhou",
		"chinese_title": "钦州市",
		"province": "Guangxi",
	},
	{
		"title": "Qinyang",
		"chinese_title": "沁阳市",
		"province": "Henan",
	},
	{
		"title": "Qinhuangdao",
		"chinese_title": "秦皇岛市",
		"province": "Hebei",
	},
	{
		"title": "Qingzhou",
		"chinese_title": "青州市",
		"province": "Shandong",
	},
	{
		"title": "Qingzhen",
		"chinese_title": "清镇市",
		"province": "Guizhou",
	},
	{
		"title": "Qingyuan",
		"chinese_title": "清远市",
		"province": "Guangdong",
	},
	{
		"title": "Qingyang",
		"chinese_title": "庆阳市",
		"province": "Gansu",
	},
	{
		"title": "Qingtongxia",
		"chinese_title": "青铜峡市",
		"province": "Ningxia",
	},
	{
		"title": "Qingdao",
		"chinese_title": "青岛市",
		"province": "Shandong",
	},
	{
		"title": "Qidong",
		"chinese_title": "启东市",
		"province": "Jiangsu",
	},
	{
		"title": "Qianshan",
		"chinese_title": "潜山市",
		"province": "Anhui",
	},
	{
		"title": "Qianjiang",
		"chinese_title": "潜江市",
		"province": "Hubei",
	},
	{
		"title": "Qian'an",
		"chinese_title": "迁安市",
		"province": "Hebei",
	},
	{
		"title": "Qamdo",
		"chinese_title": "昌都市",
		"province": "Tibet",
	},
	{
		"title": "Puyang",
		"chinese_title": "濮阳市",
		"province": "Henan",
	},
	{
		"title": "Putian",
		"chinese_title": "莆田市",
		"province": "Fujian",
	},
	{
		"title": "Puning",
		"chinese_title": "普宁市",
		"province": "Guangdong",
	},
	{
		"title": "Pu'er",
		"chinese_title": "普洱市",
		"province": "Yunnan",
	},
	{
		"title": "Pizhou",
		"chinese_title": "邳州市",
		"province": "Jiangsu",
	},
	{
		"title": "Pingxiang",
		"chinese_title": "凭祥市",
		"province": "Guangxi",
	},
	{
		"title": "Pingxiang",
		"chinese_title": "萍乡市",
		"province": "Jiangxi",
	},
	{
		"title": "Pingquan",
		"chinese_title": "平泉市",
		"province": "Hebei",
	},
	{
		"title": "Pingliang",
		"chinese_title": "平凉市",
		"province": "Gansu",
	},
	{
		"title": "Pinghu",
		"chinese_title": "平湖市",
		"province": "Zhejiang",
	},
	{
		"title": "Pingguo",
		"chinese_title": "平果市",
		"province": "Guangxi",
	},
	{
		"title": "Pingdu",
		"chinese_title": "平度市",
		"province": "Shandong",
	},
	{
		"title": "Pingdingshan",
		"chinese_title": "平顶山市",
		"province": "Henan",
	},
	{
		"title": "Pengzhou",
		"chinese_title": "彭州市",
		"province": "Sichuan",
	},
	{
		"title": "Penglai",
		"chinese_title": "蓬莱市",
		"province": "Shandong",
	},
	{
		"title": "Panzhou",
		"chinese_title": "盘州市",
		"province": "Guizhou",
	},
	{
		"title": "Panzhihua",
		"chinese_title": "攀枝花市",
		"province": "Sichuan",
	},
	{
		"title": "Panshi",
		"chinese_title": "磐石市",
		"province": "Jilin",
	},
	{
		"title": "Panjin",
		"chinese_title": "盘锦市",
		"province": "Liaoning",
	},
	{
		"title": "Ordos",
		"chinese_title": "鄂尔多斯市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Nyingchi",
		"chinese_title": "林芝市",
		"province": "Tibet",
	},
	{
		"title": "Ningxiang",
		"chinese_title": "宁乡市",
		"province": "Hunan",
	},
	{
		"title": "Ningguo",
		"chinese_title": "宁国市",
		"province": "Anhui",
	},
	{
		"title": "Ningde",
		"chinese_title": "宁德市",
		"province": "Fujian",
	},
	{
		"title": "Ningbo",
		"chinese_title": "宁波市",
		"province": "Zhejiang",
	},
	{
		"title": "Ning'an",
		"chinese_title": "宁安市",
		"province": "Heilongjiang",
	},
	{
		"title": "Nenjiang",
		"chinese_title": "嫩江市",
		"province": "Heilongjiang",
	},
	{
		"title": "Neijiang",
		"chinese_title": "内江市",
		"province": "Sichuan",
	},
	{
		"title": "Nehe",
		"chinese_title": "讷河市",
		"province": "Heilongjiang",
	},
	{
		"title": "Nanyang",
		"chinese_title": "南阳市",
		"province": "Henan",
	},
	{
		"title": "Nanxiong",
		"chinese_title": "南雄市",
		"province": "Guangdong",
	},
	{
		"title": "Nantong",
		"chinese_title": "南通市",
		"province": "Jiangsu",
	},
	{
		"title": "Nanping",
		"chinese_title": "南平市",
		"province": "Fujian",
	},
	{
		"title": "Nanning",
		"chinese_title": "南宁市",
		"province": "Guangxi",
	},
	{
		"title": "Nanjing",
		"chinese_title": "南京市",
		"province": "Jiangsu",
	},
	{
		"title": "Nangong",
		"chinese_title": "南宫市",
		"province": "Hebei",
	},
	{
		"title": "Nanchong",
		"chinese_title": "南充市",
		"province": "Sichuan",
	},
	{
		"title": "Nanchang",
		"chinese_title": "南昌市",
		"province": "Jiangxi",
	},
	{
		"title": "Nan'an",
		"chinese_title": "南安市",
		"province": "Fujian",
	},
	{
		"title": "Nagqu",
		"chinese_title": "那曲市",
		"province": "Tibet",
	},
	{
		"title": "Muling",
		"chinese_title": "穆棱市",
		"province": "Heilongjiang",
	},
	{
		"title": "Mudanjiang",
		"chinese_title": "牡丹江市",
		"province": "Heilongjiang",
	},
	{
		"title": "Mohe",
		"chinese_title": "漠河市",
		"province": "Heilongjiang",
	},
	{
		"title": "Mishan",
		"chinese_title": "密山市",
		"province": "Heilongjiang",
	},
	{
		"title": "Mingguang",
		"chinese_title": "明光市",
		"province": "Anhui",
	},
	{
		"title": "Miluo",
		"chinese_title": "汨罗市",
		"province": "Hunan",
	},
	{
		"title": "Mile",
		"chinese_title": "弥勒市",
		"province": "Yunnan",
	},
	{
		"title": "Mianzhu",
		"chinese_title": "绵竹市",
		"province": "Sichuan",
	},
	{
		"title": "Mianyang",
		"chinese_title": "绵阳市",
		"province": "Sichuan",
	},
	{
		"title": "Mengzi",
		"chinese_title": "蒙自市",
		"province": "Yunnan",
	},
	{
		"title": "Mengzhou",
		"chinese_title": "孟州市",
		"province": "Henan",
	},
	{
		"title": "Meizhou",
		"chinese_title": "梅州市",
		"province": "Guangdong",
	},
	{
		"title": "Meishan",
		"chinese_title": "眉山市",
		"province": "Sichuan",
	},
	{
		"title": "Meihekou",
		"chinese_title": "梅河口市",
		"province": "Jilin",
	},
	{
		"title": "Maoming",
		"chinese_title": "茂名市",
		"province": "Guangdong",
	},
	{
		"title": "Manzhouli",
		"chinese_title": "满洲里市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Mangshi",
		"chinese_title": "芒市",
		"province": "Yunnan",
	},
	{
		"title": "Mangnai",
		"chinese_title": "茫崖市",
		"province": "Qinghai",
	},
	{
		"title": "Macheng",
		"chinese_title": "麻城市",
		"province": "Hubei",
	},
	{
		"title": "Macau",
		"chinese_title": "澳门特别行政区",
		"province": "autonomous",
	},
	{
		"title": "Ma'anshan",
		"chinese_title": "马鞍山市",
		"province": "Anhui",
	},
	{
		"title": "Luzhou",
		"chinese_title": "泸州市",
		"province": "Sichuan",
	},
	{
		"title": "Lushui",
		"chinese_title": "泸水市",
		"province": "Yunnan",
	},
	{
		"title": "Lushan",
		"chinese_title": "庐山市",
		"province": "Jiangxi",
	},
	{
		"title": "Luoyang",
		"chinese_title": "洛阳市",
		"province": "Henan",
	},
	{
		"title": "Luohe",
		"chinese_title": "漯河市",
		"province": "Henan",
	},
	{
		"title": "Luoding",
		"chinese_title": "罗定市",
		"province": "Guangdong",
	},
	{
		"title": "Lüliang",
		"chinese_title": "吕梁市",
		"province": "Shanxi",
	},
	{
		"title": "Lufeng",
		"chinese_title": "陆丰市",
		"province": "Guangdong",
	},
	{
		"title": "Luanzhou",
		"chinese_title": "滦州市",
		"province": "Hebei",
	},
	{
		"title": "Lu'an",
		"chinese_title": "六安市",
		"province": "Anhui",
	},
	{
		"title": "Loudi",
		"chinese_title": "娄底市",
		"province": "Hunan",
	},
	{
		"title": "Longyan",
		"chinese_title": "龙岩市",
		"province": "Fujian",
	},
	{
		"title": "Longquan",
		"chinese_title": "龙泉市",
		"province": "Zhejiang",
	},
	{
		"title": "Longnan",
		"chinese_title": "陇南市",
		"province": "Gansu",
	},
	{
		"title": "Longkou",
		"chinese_title": "龙口市",
		"province": "Shandong",
	},
	{
		"title": "Longjing",
		"chinese_title": "龙井市",
		"province": "Jilin",
	},
	{
		"title": "Longhai",
		"chinese_title": "龙海市",
		"province": "Fujian",
	},
	{
		"title": "Longgang",
		"chinese_title": "龙港市",
		"province": "Zhejiang",
	},
	{
		"title": "Longchang",
		"chinese_title": "隆昌市",
		"province": "Sichuan",
	},
	{
		"title": "Liyang",
		"chinese_title": "溧阳市",
		"province": "Jiangsu",
	},
	{
		"title": "Liuzhou",
		"chinese_title": "柳州市",
		"province": "Guangxi",
	},
	{
		"title": "Liuyang",
		"chinese_title": "浏阳市",
		"province": "Hunan",
	},
	{
		"title": "Liupanshui",
		"chinese_title": "六盘水市",
		"province": "Guizhou",
	},
	{
		"title": "Lishui",
		"chinese_title": "丽水市",
		"province": "Zhejiang",
	},
	{
		"title": "Lipu",
		"chinese_title": "荔浦市",
		"province": "Guangxi",
	},
	{
		"title": "Linzhou",
		"chinese_title": "林州市",
		"province": "Henan",
	},
	{
		"title": "Linyi",
		"chinese_title": "临沂市",
		"province": "Shandong",
	},
	{
		"title": "Linxiang",
		"chinese_title": "临湘市",
		"province": "Hunan",
	},
	{
		"title": "Linxia",
		"chinese_title": "临夏市",
		"province": "Gansu",
	},
	{
		"title": "Linqing",
		"chinese_title": "临清市",
		"province": "Shandong",
	},
	{
		"title": "Linjiang",
		"chinese_title": "临江市",
		"province": "Jilin",
	},
	{
		"title": "Linhai",
		"chinese_title": "临海市",
		"province": "Zhejiang",
	},
	{
		"title": "Lingyuan",
		"chinese_title": "凌源市",
		"province": "Liaoning",
	},
	{
		"title": "Lingwu",
		"chinese_title": "灵武市",
		"province": "Ningxia",
	},
	{
		"title": "Linghai",
		"chinese_title": "凌海市",
		"province": "Liaoning",
	},
	{
		"title": "Lingbao",
		"chinese_title": "灵宝市",
		"province": "Henan",
	},
	{
		"title": "Linfen",
		"chinese_title": "临汾市",
		"province": "Shanxi",
	},
	{
		"title": "Lincang",
		"chinese_title": "临沧市",
		"province": "Yunnan",
	},
	{
		"title": "Liling",
		"chinese_title": "醴陵市",
		"province": "Hunan",
	},
	{
		"title": "Lijiang",
		"chinese_title": "丽江市",
		"province": "Yunnan",
	},
	{
		"title": "Lichuan",
		"chinese_title": "利川市",
		"province": "Hubei",
	},
	{
		"title": "Liaoyuan",
		"chinese_title": "辽源市",
		"province": "Jilin",
	},
	{
		"title": "Liaoyang",
		"chinese_title": "辽阳市",
		"province": "Liaoning",
	},
	{
		"title": "Liaocheng",
		"chinese_title": "聊城市",
		"province": "Shandong",
	},
	{
		"title": "Lianzhou",
		"chinese_title": "连州市",
		"province": "Guangdong",
	},
	{
		"title": "Lianyungang",
		"chinese_title": "连云港市",
		"province": "Jiangsu",
	},
	{
		"title": "Lianyuan",
		"chinese_title": "涟源市",
		"province": "Hunan",
	},
	{
		"title": "Lianjiang",
		"chinese_title": "廉江市",
		"province": "Guangdong",
	},
	{
		"title": "Lhasa",
		"chinese_title": "拉萨市",
		"province": "Tibet",
	},
	{
		"title": "Leshan",
		"chinese_title": "乐山市",
		"province": "Sichuan",
	},
	{
		"title": "Leping",
		"chinese_title": "乐平市",
		"province": "Jiangxi",
	},
	{
		"title": "Lengshuijiang",
		"chinese_title": "冷水江市",
		"province": "Hunan",
	},
	{
		"title": "Leling",
		"chinese_title": "乐陵市",
		"province": "Shandong",
	},
	{
		"title": "Leizhou",
		"chinese_title": "雷州市",
		"province": "Guangdong",
	},
	{
		"title": "Leiyang",
		"chinese_title": "耒阳市",
		"province": "Hunan",
	},
	{
		"title": "Lechang",
		"chinese_title": "乐昌市",
		"province": "Guangdong",
	},
	{
		"title": "Laohekou",
		"chinese_title": "老河口市",
		"province": "Hubei",
	},
	{
		"title": "Lanzhou",
		"chinese_title": "兰州市",
		"province": "Gansu",
	},
	{
		"title": "Lanxi",
		"chinese_title": "兰溪市",
		"province": "Zhejiang",
	},
	{
		"title": "Langzhong",
		"chinese_title": "阆中市",
		"province": "Sichuan",
	},
	{
		"title": "Langfang",
		"chinese_title": "廊坊市",
		"province": "Hebei",
	},
	{
		"title": "Laizhou",
		"chinese_title": "莱州市",
		"province": "Shandong",
	},
	{
		"title": "Laiyang",
		"chinese_title": "莱阳市",
		"province": "Shandong",
	},
	{
		"title": "Laixi",
		"chinese_title": "莱西市",
		"province": "Shandong",
	},
	{
		"title": "Laibin",
		"chinese_title": "来宾市",
		"province": "Guangxi",
	},
	{
		"title": "Kuytun",
		"chinese_title": "奎屯市",
		"province": "Xinjiang",
	},
	{
		"title": "Kuqa",
		"chinese_title": "库车市",
		"province": "Xinjiang",
	},
	{
		"title": "Kunyu",
		"chinese_title": "昆玉市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Kunshan",
		"chinese_title": "昆山市",
		"province": "Jiangsu",
	},
	{
		"title": "Kunming",
		"chinese_title": "昆明市",
		"province": "Yunnan",
	},
	{
		"title": "Korla",
		"chinese_title": "库尔勒市",
		"province": "Xinjiang",
	},
	{
		"title": "Kokdala",
		"chinese_title": "可克达拉市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Khorgas",
		"chinese_title": "霍尔果斯市",
		"province": "Xinjiang",
	},
	{
		"title": "Kashgar",
		"chinese_title": "喀什市",
		"province": "Xinjiang",
	},
	{
		"title": "Karamay",
		"chinese_title": "克拉玛依市",
		"province": "Xinjiang",
	},
	{
		"title": "Kangding",
		"chinese_title": "康定市",
		"province": "Sichuan",
	},
	{
		"title": "Kaiyuan",
		"chinese_title": "开原市",
		"province": "Liaoning",
	},
	{
		"title": "Kaiyuan",
		"chinese_title": "开远市",
		"province": "Yunnan",
	},
	{
		"title": "Kaiping",
		"chinese_title": "开平市",
		"province": "Guangdong",
	},
	{
		"title": "Kaili",
		"chinese_title": "凯里市",
		"province": "Guizhou",
	},
	{
		"title": "Kaifeng",
		"chinese_title": "开封市",
		"province": "Henan",
	},
	{
		"title": "Jurong",
		"chinese_title": "句容市",
		"province": "Jiangsu",
	},
	{
		"title": "Jiyuan",
		"chinese_title": "济源市",
		"province": "Henan",
	},
	{
		"title": "Jixi",
		"chinese_title": "鸡西市",
		"province": "Heilongjiang",
	},
	{
		"title": "Jiuquan",
		"chinese_title": "酒泉市",
		"province": "Gansu",
	},
	{
		"title": "Jiujiang",
		"chinese_title": "九江市",
		"province": "Jiangxi",
	},
	{
		"title": "Jishou",
		"chinese_title": "吉首市",
		"province": "Hunan",
	},
	{
		"title": "Jinzhou",
		"chinese_title": "晋州市",
		"province": "Hebei",
	},
	{
		"title": "Jinzhou",
		"chinese_title": "锦州市",
		"province": "Liaoning",
	},
	{
		"title": "Jinzhong",
		"chinese_title": "晋中市",
		"province": "Shanxi",
	},
	{
		"title": "Jinshi",
		"chinese_title": "津市市",
		"province": "Hunan",
	},
	{
		"title": "Jinjiang",
		"chinese_title": "晋江市",
		"province": "Fujian",
	},
	{
		"title": "Jining",
		"chinese_title": "济宁市",
		"province": "Shandong",
	},
	{
		"title": "Jinhua",
		"chinese_title": "金华市",
		"province": "Zhejiang",
	},
	{
		"title": "Jingzhou",
		"chinese_title": "荆州市",
		"province": "Hubei",
	},
	{
		"title": "Jingxi",
		"chinese_title": "靖西市",
		"province": "Guangxi",
	},
	{
		"title": "Jingshan",
		"chinese_title": "京山市",
		"province": "Hubei",
	},
	{
		"title": "Jingmen",
		"chinese_title": "荆门市",
		"province": "Hubei",
	},
	{
		"title": "Jingjiang",
		"chinese_title": "靖江市",
		"province": "Jiangsu",
	},
	{
		"title": "Jinghong",
		"chinese_title": "景洪市",
		"province": "Yunnan",
	},
	{
		"title": "Jinggangshan",
		"chinese_title": "井冈山市",
		"province": "Jiangxi",
	},
	{
		"title": "Jingdezhen",
		"chinese_title": "景德镇市",
		"province": "Jiangxi",
	},
	{
		"title": "Jincheng",
		"chinese_title": "晋城市",
		"province": "Shanxi",
	},
	{
		"title": "Jinchang",
		"chinese_title": "金昌市",
		"province": "Gansu",
	},
	{
		"title": "Jinan",
		"chinese_title": "济南市",
		"province": "Shandong",
	},
	{
		"title": "Jilin",
		"chinese_title": "吉林市",
		"province": "Jilin",
	},
	{
		"title": "Jieyang",
		"chinese_title": "揭阳市",
		"province": "Guangdong",
	},
	{
		"title": "Jiexiu",
		"chinese_title": "介休市",
		"province": "Shanxi",
	},
	{
		"title": "Jieshou",
		"chinese_title": "界首市",
		"province": "Anhui",
	},
	{
		"title": "Jiayuguan",
		"chinese_title": "嘉峪关市",
		"province": "Gansu",
	},
	{
		"title": "Jiaxing",
		"chinese_title": "嘉兴市",
		"province": "Zhejiang",
	},
	{
		"title": "Jiaozuo",
		"chinese_title": "焦作市",
		"province": "Henan",
	},
	{
		"title": "Jiaozhou",
		"chinese_title": "胶州市",
		"province": "Shandong",
	},
	{
		"title": "Jiaohe",
		"chinese_title": "蛟河市",
		"province": "Jilin",
	},
	{
		"title": "Jianyang",
		"chinese_title": "简阳市",
		"province": "Sichuan",
	},
	{
		"title": "Jiangyou",
		"chinese_title": "江油市",
		"province": "Sichuan",
	},
	{
		"title": "Jiangyin",
		"chinese_title": "江阴市",
		"province": "Jiangsu",
	},
	{
		"title": "Jiangshan",
		"chinese_title": "江山市",
		"province": "Zhejiang",
	},
	{
		"title": "Jiangmen",
		"chinese_title": "江门市",
		"province": "Guangdong",
	},
	{
		"title": "Jiande",
		"chinese_title": "建德市",
		"province": "Zhejiang",
	},
	{
		"title": "Jian'ou",
		"chinese_title": "建瓯市",
		"province": "Fujian",
	},
	{
		"title": "Jiamusi",
		"chinese_title": "佳木斯市",
		"province": "Heilongjiang",
	},
	{
		"title": "Ji'an",
		"chinese_title": "吉安市",
		"province": "Jiangxi",
	},
	{
		"title": "Ji'an",
		"chinese_title": "集安市",
		"province": "Jilin",
	},
	{
		"title": "Huzhou",
		"chinese_title": "湖州市",
		"province": "Zhejiang",
	},
	{
		"title": "Huyanghe",
		"chinese_title": "胡杨河市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Huozhou",
		"chinese_title": "霍州市",
		"province": "Shanxi",
	},
	{
		"title": "Hunchun",
		"chinese_title": "珲春市",
		"province": "Jilin",
	},
	{
		"title": "Hulunbuir",
		"chinese_title": "呼伦贝尔市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Huludao",
		"chinese_title": "葫芦岛市",
		"province": "Liaoning",
	},
	{
		"title": "Hulin",
		"chinese_title": "虎林市",
		"province": "Heilongjiang",
	},
	{
		"title": "Huizhou",
		"chinese_title": "惠州市",
		"province": "Guangdong",
	},
	{
		"title": "Huixian",
		"chinese_title": "辉县市",
		"province": "Henan",
	},
	{
		"title": "Huazhou",
		"chinese_title": "化州市",
		"province": "Guangdong",
	},
	{
		"title": "Huaying",
		"chinese_title": "华蓥市",
		"province": "Sichuan",
	},
	{
		"title": "Huayin",
		"chinese_title": "华阴市",
		"province": "Shaanxi",
	},
	{
		"title": "Huating",
		"chinese_title": "华亭市",
		"province": "Gansu",
	},
	{
		"title": "Huangshi",
		"chinese_title": "黄石市",
		"province": "Hubei",
	},
	{
		"title": "Huangshan",
		"chinese_title": "黄山市",
		"province": "Anhui",
	},
	{
		"title": "Huanghua",
		"chinese_title": "黄骅市",
		"province": "Hebei",
	},
	{
		"title": "Huanggang",
		"chinese_title": "黄冈市",
		"province": "Hubei",
	},
	{
		"title": "Huairen",
		"chinese_title": "怀仁市",
		"province": "Shanxi",
	},
	{
		"title": "Huainan",
		"chinese_title": "淮南市",
		"province": "Anhui",
	},
	{
		"title": "Huaihua",
		"chinese_title": "怀化市",
		"province": "Hunan",
	},
	{
		"title": "Huaibei",
		"chinese_title": "淮北市",
		"province": "Anhui",
	},
	{
		"title": "Huai'an",
		"chinese_title": "淮安市",
		"province": "Jiangsu",
	},
	{
		"title": "Huadian",
		"chinese_title": "桦甸市",
		"province": "Jilin",
	},
	{
		"title": "Houma",
		"chinese_title": "侯马市",
		"province": "Shanxi",
	},
	{
		"title": "Hotan",
		"chinese_title": "和田市",
		"province": "Xinjiang",
	},
	{
		"title": "Hongjiang",
		"chinese_title": "洪江市",
		"province": "Hunan",
	},
	{
		"title": "Honghu",
		"chinese_title": "洪湖市",
		"province": "Hubei",
	},
	{
		"title": "Hong Kong",
		"chinese_title": "香港特别行政区",
		"province": "autonomous",
	},
	{
		"title": "Holingol",
		"chinese_title": "霍林郭勒市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Hohhot",
		"chinese_title": "呼和浩特市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Hezuo",
		"chinese_title": "合作市",
		"province": "Gansu",
	},
	{
		"title": "Hezhou",
		"chinese_title": "贺州市",
		"province": "Guangxi",
	},
	{
		"title": "Heze",
		"chinese_title": "菏泽市",
		"province": "Shandong",
	},
	{
		"title": "Heyuan",
		"chinese_title": "河源市",
		"province": "Guangdong",
	},
	{
		"title": "Heshan",
		"chinese_title": "鹤山市",
		"province": "Guangdong",
	},
	{
		"title": "Heshan",
		"chinese_title": "合山市",
		"province": "Guangxi",
	},
	{
		"title": "Hengyang",
		"chinese_title": "衡阳市",
		"province": "Hunan",
	},
	{
		"title": "Hengshui",
		"chinese_title": "衡水市",
		"province": "Hebei",
	},
	{
		"title": "Helong",
		"chinese_title": "和龙市",
		"province": "Jilin",
	},
	{
		"title": "Hejin",
		"chinese_title": "河津市",
		"province": "Shanxi",
	},
	{
		"title": "Hejian",
		"chinese_title": "河间市",
		"province": "Hebei",
	},
	{
		"title": "Heihe",
		"chinese_title": "黑河市",
		"province": "Heilongjiang",
	},
	{
		"title": "Hegang",
		"chinese_title": "鹤岗市",
		"province": "Heilongjiang",
	},
	{
		"title": "Hefei",
		"chinese_title": "合肥市",
		"province": "Anhui",
	},
	{
		"title": "Hechi",
		"chinese_title": "河池市",
		"province": "Guangxi",
	},
	{
		"title": "Hebi",
		"chinese_title": "鹤壁市",
		"province": "Henan",
	},
	{
		"title": "Harbin",
		"chinese_title": "哈尔滨市",
		"province": "Heilongjiang",
	},
	{
		"title": "Hanzhong",
		"chinese_title": "汉中市",
		"province": "Shaanxi",
	},
	{
		"title": "Hangzhou",
		"chinese_title": "杭州市",
		"province": "Zhejiang",
	},
	{
		"title": "Handan",
		"chinese_title": "邯郸市",
		"province": "Hebei",
	},
	{
		"title": "Hanchuan",
		"chinese_title": "汉川市",
		"province": "Hubei",
	},
	{
		"title": "Hancheng",
		"chinese_title": "韩城市",
		"province": "Shaanxi",
	},
	{
		"title": "Hami",
		"chinese_title": "哈密市",
		"province": "Xinjiang",
	},
	{
		"title": "Haiyang",
		"chinese_title": "海阳市",
		"province": "Shandong",
	},
	{
		"title": "Haining",
		"chinese_title": "海宁市",
		"province": "Zhejiang",
	},
	{
		"title": "Haimen",
		"chinese_title": "海门市",
		"province": "Jiangsu",
	},
	{
		"title": "Hailun",
		"chinese_title": "海伦市",
		"province": "Heilongjiang",
	},
	{
		"title": "Hailin",
		"chinese_title": "海林市",
		"province": "Heilongjiang",
	},
	{
		"title": "Haikou",
		"chinese_title": "海口市",
		"province": "Hainan",
	},
	{
		"title": "Haidong",
		"chinese_title": "海东市",
		"province": "Qinghai",
	},
	{
		"title": "Haicheng",
		"chinese_title": "海城市",
		"province": "Liaoning",
	},
	{
		"title": "Hai'an",
		"chinese_title": "海安市",
		"province": "Jiangsu",
	},
	{
		"title": "Guyuan",
		"chinese_title": "固原市",
		"province": "Ningxia",
	},
	{
		"title": "Gujiao",
		"chinese_title": "古交市",
		"province": "Shanxi",
	},
	{
		"title": "Guiyang",
		"chinese_title": "贵阳市",
		"province": "Guizhou",
	},
	{
		"title": "Guixi",
		"chinese_title": "贵溪市",
		"province": "Jiangxi",
	},
	{
		"title": "Guiping",
		"chinese_title": "桂平市",
		"province": "Guangxi",
	},
	{
		"title": "Guilin",
		"chinese_title": "桂林市",
		"province": "Guangxi",
	},
	{
		"title": "Guigang",
		"chinese_title": "贵港市",
		"province": "Guangxi",
	},
	{
		"title": "Guangzhou",
		"chinese_title": "广州市",
		"province": "Guangdong",
	},
	{
		"title": "Guangyuan",
		"chinese_title": "广元市",
		"province": "Sichuan",
	},
	{
		"title": "Guangshui",
		"chinese_title": "广水市",
		"province": "Hubei",
	},
	{
		"title": "Guanghan",
		"chinese_title": "广汉市",
		"province": "Sichuan",
	},
	{
		"title": "Guangde",
		"chinese_title": "广德市",
		"province": "Anhui",
	},
	{
		"title": "Guang'an",
		"chinese_title": "广安市",
		"province": "Sichuan",
	},
	{
		"title": "Gongzhuling",
		"chinese_title": "公主岭市",
		"province": "Jilin",
	},
	{
		"title": "Gongyi",
		"chinese_title": "巩义市",
		"province": "Henan",
	},
	{
		"title": "Gongqingcheng",
		"chinese_title": "共青城市",
		"province": "Jiangxi",
	},
	{
		"title": "Golmud",
		"chinese_title": "格尔木市",
		"province": "Qinghai",
	},
	{
		"title": "Genhe",
		"chinese_title": "根河市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Gejiu",
		"chinese_title": "个旧市",
		"province": "Yunnan",
	},
	{
		"title": "Gaozhou",
		"chinese_title": "高州市",
		"province": "Guangdong",
	},
	{
		"title": "Gaoyou",
		"chinese_title": "高邮市",
		"province": "Jiangsu",
	},
	{
		"title": "Gaoping",
		"chinese_title": "高平市",
		"province": "Shanxi",
	},
	{
		"title": "Gaomi",
		"chinese_title": "高密市",
		"province": "Shandong",
	},
	{
		"title": "Gaobeidian",
		"chinese_title": "高碑店市",
		"province": "Hebei",
	},
	{
		"title": "Gao'an",
		"chinese_title": "高安市",
		"province": "Jiangxi",
	},
	{
		"title": "Ganzhou",
		"chinese_title": "赣州市",
		"province": "Jiangxi",
	},
	{
		"title": "Gaizhou",
		"chinese_title": "盖州市",
		"province": "Liaoning",
	},
	{
		"title": "Fuzhou",
		"chinese_title": "福州市",
		"province": "Fujian",
	},
	{
		"title": "Fuzhou",
		"chinese_title": "抚州市",
		"province": "Jiangxi",
	},
	{
		"title": "Fuyuan",
		"chinese_title": "抚远市",
		"province": "Heilongjiang",
	},
	{
		"title": "Fuyu",
		"chinese_title": "扶余市",
		"province": "Jilin",
	},
	{
		"title": "Fuyang",
		"chinese_title": "阜阳市",
		"province": "Anhui",
	},
	{
		"title": "Fuxin",
		"chinese_title": "阜新市",
		"province": "Liaoning",
	},
	{
		"title": "Fushun",
		"chinese_title": "抚顺市",
		"province": "Liaoning",
	},
	{
		"title": "Fuquan",
		"chinese_title": "福泉市",
		"province": "Guizhou",
	},
	{
		"title": "Fuqing",
		"chinese_title": "福清市",
		"province": "Fujian",
	},
	{
		"title": "Fukang",
		"chinese_title": "阜康市",
		"province": "Xinjiang",
	},
	{
		"title": "Fujin",
		"chinese_title": "富锦市",
		"province": "Heilongjiang",
	},
	{
		"title": "Fuding",
		"chinese_title": "福鼎市",
		"province": "Fujian",
	},
	{
		"title": "Fu'an",
		"chinese_title": "福安市",
		"province": "Fujian",
	},
	{
		"title": "Foshan",
		"chinese_title": "佛山市",
		"province": "Guangdong",
	},
	{
		"title": "Fenyang",
		"chinese_title": "汾阳市",
		"province": "Shanxi",
	},
	{
		"title": "Fengzhen",
		"chinese_title": "丰镇市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Fengcheng",
		"chinese_title": "丰城市",
		"province": "Jiangxi",
	},
	{
		"title": "Fengcheng",
		"chinese_title": "凤城市",
		"province": "Liaoning",
	},
	{
		"title": "Feicheng",
		"chinese_title": "肥城市",
		"province": "Shandong",
	},
	{
		"title": "Fangchenggang",
		"chinese_title": "防城港市",
		"province": "Guangxi",
	},
	{
		"title": "Ezhou",
		"chinese_title": "鄂州市",
		"province": "Hubei",
	},
	{
		"title": "Ergun",
		"chinese_title": "额尔古纳市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Erenhot",
		"chinese_title": "二连浩特市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Enshi",
		"chinese_title": "恩施市",
		"province": "Hubei",
	},
	{
		"title": "Enping",
		"chinese_title": "恩平市",
		"province": "Guangdong",
	},
	{
		"title": "Emeishan",
		"chinese_title": "峨眉山市",
		"province": "Sichuan",
	},
	{
		"title": "Duyun",
		"chinese_title": "都匀市",
		"province": "Guizhou",
	},
	{
		"title": "Dunhuang",
		"chinese_title": "敦煌市",
		"province": "Gansu",
	},
	{
		"title": "Dunhua",
		"chinese_title": "敦化市",
		"province": "Jilin",
	},
	{
		"title": "Dujiangyan",
		"chinese_title": "都江堰市",
		"province": "Sichuan",
	},
	{
		"title": "Dongying",
		"chinese_title": "东营市",
		"province": "Shandong",
	},
	{
		"title": "Dongyang",
		"chinese_title": "东阳市",
		"province": "Zhejiang",
	},
	{
		"title": "Dongxing",
		"chinese_title": "东兴市",
		"province": "Guangxi",
	},
	{
		"title": "Dongtai",
		"chinese_title": "东台市",
		"province": "Jiangsu",
	},
	{
		"title": "Dongning",
		"chinese_title": "东宁市",
		"province": "Heilongjiang",
	},
	{
		"title": "Dongguan",
		"chinese_title": "东莞市",
		"province": "Guangdong",
	},
	{
		"title": "Donggang",
		"chinese_title": "东港市",
		"province": "Liaoning",
	},
	{
		"title": "Dongfang",
		"chinese_title": "东方市",
		"province": "Hainan",
	},
	{
		"title": "Dingzhou",
		"chinese_title": "定州市",
		"province": "Hebei",
	},
	{
		"title": "Dingxi",
		"chinese_title": "定西市",
		"province": "Gansu",
	},
	{
		"title": "Diaobingshan",
		"chinese_title": "调兵山市",
		"province": "Liaoning",
	},
	{
		"title": "Dezhou",
		"chinese_title": "德州市",
		"province": "Shandong",
	},
	{
		"title": "Deyang",
		"chinese_title": "德阳市",
		"province": "Sichuan",
	},
	{
		"title": "Dexing",
		"chinese_title": "德兴市",
		"province": "Jiangxi",
	},
	{
		"title": "Dengzhou",
		"chinese_title": "邓州市",
		"province": "Henan",
	},
	{
		"title": "Dengta",
		"chinese_title": "灯塔市",
		"province": "Liaoning",
	},
	{
		"title": "Dengfeng",
		"chinese_title": "登封市",
		"province": "Henan",
	},
	{
		"title": "Delingha",
		"chinese_title": "德令哈市",
		"province": "Qinghai",
	},
	{
		"title": "Dehui",
		"chinese_title": "德惠市",
		"province": "Jilin",
	},
	{
		"title": "Dazhou",
		"chinese_title": "达州市",
		"province": "Sichuan",
	},
	{
		"title": "Daye",
		"chinese_title": "大冶市",
		"province": "Hubei",
	},
	{
		"title": "Datong",
		"chinese_title": "大同市",
		"province": "Shanxi",
	},
	{
		"title": "Dashiqiao",
		"chinese_title": "大石桥市",
		"province": "Liaoning",
	},
	{
		"title": "Daqing",
		"chinese_title": "大庆市",
		"province": "Heilongjiang",
	},
	{
		"title": "Danzhou",
		"chinese_title": "儋州市",
		"province": "Hainan",
	},
	{
		"title": "Danyang",
		"chinese_title": "丹阳市",
		"province": "Jiangsu",
	},
	{
		"title": "Danjiangkou",
		"chinese_title": "丹江口市",
		"province": "Hubei",
	},
	{
		"title": "Dangyang",
		"chinese_title": "当阳市",
		"province": "Hubei",
	},
	{
		"title": "Dandong",
		"chinese_title": "丹东市",
		"province": "Liaoning",
	},
	{
		"title": "Dalian",
		"chinese_title": "大连市",
		"province": "Liaoning",
	},
	{
		"title": "Dali",
		"chinese_title": "大理市",
		"province": "Yunnan",
	},
	{
		"title": "Da'an",
		"chinese_title": "大安市",
		"province": "Jilin",
	},
	{
		"title": "Cixi",
		"chinese_title": "慈溪市",
		"province": "Zhejiang",
	},
	{
		"title": "Chuzhou",
		"chinese_title": "滁州市",
		"province": "Anhui",
	},
	{
		"title": "Chuxiong",
		"chinese_title": "楚雄市",
		"province": "Yunnan",
	},
	{
		"title": "Chongzuo",
		"chinese_title": "崇左市",
		"province": "Guangxi",
	},
	{
		"title": "Chongzhou",
		"chinese_title": "崇州市",
		"province": "Sichuan",
	},
	{
		"title": "Chongqing",
		"chinese_title": "重庆市",
		"province": "municipal",
	},
	{
		"title": "Chizhou",
		"chinese_title": "池州市",
		"province": "Anhui",
	},
	{
		"title": "Chishui",
		"chinese_title": "赤水市",
		"province": "Guizhou",
	},
	{
		"title": "Chifeng",
		"chinese_title": "赤峰市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Chibi",
		"chinese_title": "赤壁市",
		"province": "Hubei",
	},
	{
		"title": "Chenzhou",
		"chinese_title": "郴州市",
		"province": "Hunan",
	},
	{
		"title": "Chengjiang",
		"chinese_title": "澄江市",
		"province": "Yunnan",
	},
	{
		"title": "Chengdu",
		"chinese_title": "成都市",
		"province": "Sichuan",
	},
	{
		"title": "Chengde",
		"chinese_title": "承德市",
		"province": "Hebei",
	},
	{
		"title": "Chaozhou",
		"chinese_title": "潮州市",
		"province": "Guangdong",
	},
	{
		"title": "Chaoyang",
		"chinese_title": "朝阳市",
		"province": "Liaoning",
	},
	{
		"title": "Chaohu",
		"chinese_title": "巢湖市",
		"province": "Anhui",
	},
	{
		"title": "Changzhou",
		"chinese_title": "常州市",
		"province": "Jiangsu",
	},
	{
		"title": "Changzhi",
		"chinese_title": "长治市",
		"province": "Shanxi",
	},
	{
		"title": "Changyuan",
		"chinese_title": "长垣市",
		"province": "Henan",
	},
	{
		"title": "Changyi",
		"chinese_title": "昌邑市",
		"province": "Shandong",
	},
	{
		"title": "Changshu",
		"chinese_title": "常熟市",
		"province": "Jiangsu",
	},
	{
		"title": "Changsha",
		"chinese_title": "长沙市",
		"province": "Hunan",
	},
	{
		"title": "Changning",
		"chinese_title": "常宁市",
		"province": "Hunan",
	},
	{
		"title": "Changji",
		"chinese_title": "昌吉市",
		"province": "Xinjiang",
	},
	{
		"title": "Changge",
		"chinese_title": "长葛市",
		"province": "Henan",
	},
	{
		"title": "Changde",
		"chinese_title": "常德市",
		"province": "Hunan",
	},
	{
		"title": "Changchun",
		"chinese_title": "长春市",
		"province": "Jilin",
	},
	{
		"title": "Cenxi",
		"chinese_title": "岑溪市",
		"province": "Guangxi",
	},
	{
		"title": "Cangzhou",
		"chinese_title": "沧州市",
		"province": "Hebei",
	},
	{
		"title": "Bozhou",
		"chinese_title": "亳州市",
		"province": "Anhui",
	},
	{
		"title": "Botou",
		"chinese_title": "泊头市",
		"province": "Hebei",
	},
	{
		"title": "Bole",
		"chinese_title": "博乐市",
		"province": "Xinjiang",
	},
	{
		"title": "Binzhou",
		"chinese_title": "彬州市",
		"province": "Shaanxi",
	},
	{
		"title": "Binzhou",
		"chinese_title": "滨州市",
		"province": "Shandong",
	},
	{
		"title": "Bijie",
		"chinese_title": "毕节市",
		"province": "Guizhou",
	},
	{
		"title": "Benxi",
		"chinese_title": "本溪市",
		"province": "Liaoning",
	},
	{
		"title": "Bengbu",
		"chinese_title": "蚌埠市",
		"province": "Anhui",
	},
	{
		"title": "Beizhen",
		"chinese_title": "北镇市",
		"province": "Liaoning",
	},
	{
		"title": "Beitun",
		"chinese_title": "北屯市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Beipiao",
		"chinese_title": "北票市",
		"province": "Liaoning",
	},
	{
		"title": "Beiliu",
		"chinese_title": "北流市",
		"province": "Guangxi",
	},
	{
		"title": "Beijing",
		"chinese_title": "北京市",
		"province": "municipal",
	},
	{
		"title": "Beihai",
		"chinese_title": "北海市",
		"province": "Guangxi",
	},
	{
		"title": "Bei'an",
		"chinese_title": "北安市",
		"province": "Heilongjiang",
	},
	{
		"title": "Bazhou",
		"chinese_title": "霸州市",
		"province": "Hebei",
	},
	{
		"title": "Bazhong",
		"chinese_title": "巴中市",
		"province": "Sichuan",
	},
	{
		"title": "Bayannur",
		"chinese_title": "巴彦淖尔市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Barkam",
		"chinese_title": "马尔康市",
		"province": "Sichuan",
	},
	{
		"title": "Baotou",
		"chinese_title": "包头市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Baoshan",
		"chinese_title": "保山市",
		"province": "Yunnan",
	},
	{
		"title": "Baoji",
		"chinese_title": "宝鸡市",
		"province": "Shaanxi",
	},
	{
		"title": "Baoding",
		"chinese_title": "保定市",
		"province": "Hebei",
	},
	{
		"title": "Baiyin",
		"chinese_title": "白银市",
		"province": "Gansu",
	},
	{
		"title": "Baishan",
		"chinese_title": "白山市",
		"province": "Jilin",
	},
	{
		"title": "Baise",
		"chinese_title": "百色市",
		"province": "Guangxi",
	},
	{
		"title": "Baicheng",
		"chinese_title": "白城市",
		"province": "Jilin",
	},
	{
		"title": "Arxan",
		"chinese_title": "阿尔山市",
		"province": "Inner Mongolia",
	},
	{
		"title": "Artux",
		"chinese_title": "阿图什市",
		"province": "Xinjiang",
	},
	{
		"title": "Aral",
		"chinese_title": "阿拉尔市",
		"province": "Xinjiang (XPCC)",
	},
	{
		"title": "Anyang",
		"chinese_title": "安阳市",
		"province": "Henan",
	},
	{
		"title": "Anshun",
		"chinese_title": "安顺市",
		"province": "Guizhou",
	},
	{
		"title": "Anshan",
		"chinese_title": "鞍山市",
		"province": "Liaoning",
	},
	{
		"title": "Anqiu",
		"chinese_title": "安丘市",
		"province": "Shandong",
	},
	{
		"title": "Anqing",
		"chinese_title": "安庆市",
		"province": "Anhui",
	},
	{
		"title": "Anning",
		"chinese_title": "安宁市",
		"province": "Yunnan",
	},
	{
		"title": "Anlu",
		"chinese_title": "安陆市",
		"province": "Hubei",
	},
	{
		"title": "Ankang",
		"chinese_title": "安康市",
		"province": "Shaanxi",
	},
	{
		"title": "Anguo",
		"chinese_title": "安国市",
		"province": "Hebei",
	},
	{
		"title": "Anda",
		"chinese_title": "安达市",
		"province": "Heilongjiang",
	},
	{
		"title": "Altay",
		"chinese_title": "阿勒泰市",
		"province": "Xinjiang",
	},
	{
		"title": "Alashankou",
		"chinese_title": "阿拉山口市",
		"province": "Xinjiang",
	},
	{
		"title": "Aksu",
		"chinese_title": "阿克苏市",
		"province": "Xinjiang",
	}
];

const provinces = [
	{ title: 'Guizhou', chinese_title: '贵州' },
	{ title: 'Hebei', chinese_title: '河北' },
	{ title: 'Shandong', chinese_title: '山东' },
	{ title: 'Sichuan', chinese_title: '四川' },
	{ title: 'Hunan', chinese_title: '湖南' },
	{ title: 'Shaanxi', chinese_title: '陕西' },
	{ title: 'Henan', chinese_title: '河南' },
	{ title: 'Zhejiang', chinese_title: '浙江' },
	{ title: 'Guangdong', chinese_title: '广东' },
	{ title: 'Liaoning', chinese_title: '辽宁' },
	{ title: 'Hubei', chinese_title: '湖北' },
	{ title: 'Ningxia', chinese_title: '宁夏' },
	{ title: 'Jiangsu', chinese_title: '江苏' },
	{ title: 'Yunnan', chinese_title: '云南' },
	{ title: 'Heilongjiang', chinese_title: '黑龙江' },
	{ title: 'Fujian', chinese_title: '福建' },
	{ title: 'Gansu', chinese_title: '甘肃' },
	{ title: 'Jiangxi', chinese_title: '江西' },
	{ title: 'Inner Mongolia', chinese_title: '内蒙古' },
	{ title: 'Jilin', chinese_title: '吉林' },
	{ title: 'Qinghai', chinese_title: '青海' },
	{ title: 'Shanxi', chinese_title: '山西' },
	{ title: 'Guangxi', chinese_title: '广西' },
	{ title: 'Xinjiang', chinese_title: '新疆' },
	{ title: 'Anhui', chinese_title: '安徽' },
	{ title: 'Tibet', chinese_title: '西藏' },
	{ title: 'Hainan', chinese_title: '海南' },
];

export {
	cities,
	provinces,
};
