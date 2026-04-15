// Ho Chi Minh travel page
// 編輯提示：
// - sections：大標與小標
// - spots：景點資料
// - foods：美食資料
// - spaPlaces：按摩店資料
// - usefulSites：實用網站 / App 連結
// - itineraryDays：每日行程
// - 搜尋「之後可放」可快速找到圖片預留區

import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Backpack,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Globe,
  Heart,
  Hotel,
  Landmark,
  Languages,
  MapPin,
  Plane,
  UtensilsCrossed,
} from 'lucide-react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

// 大標與小標導覽設定
const sections = [
  {
    id: 'basic',
    title: '基本資訊',
    icon: Plane,
    children: [
      { id: 'flight', title: '飛機航班' },
      { id: 'hotel', title: '飯店資訊' },
      { id: 'customs', title: '海關說明資訊' },
      { id: 'packing', title: '攜帶物品建議' },
    ],
  },
  {
    id: 'practical',
    title: '實用資訊',
    icon: Globe,
    children: [
      { id: 'tips', title: '注意事項' },
      { id: 'websites', title: '實用網站' },
      { id: 'language', title: '越南語' },
    ],
  },
  {
    id: 'itinerary',
    title: '行程安排',
    icon: CalendarDays,
    children: [
      { id: 'day1', title: '04/24' },
      { id: 'day2', title: '04/25' },
      { id: 'day3', title: '04/26' },
      { id: 'day4', title: '04/27' },
      { id: 'day5', title: '04/28' },
    ],
  },
  {
    id: 'spots',
    title: '景點',
    icon: Landmark,
    children: [],
  },
  {
    id: 'food',
    title: '美食',
    icon: UtensilsCrossed,
    children: [],
  },
  {
    id: 'spa',
    title: '按摩',
    icon: Heart,
    children: [],
  },
];

// 景點詳細資料：可改名稱、摘要、tags、mapUrl
const spots = [

{
  id: 'spot-war-museum',
  name: '戰爭遺跡博物館 (War Remnants Museum)',
  district: '第三郡',
  summary: '歷史重量： 這是越南觀光人次最高、也最沉重的地方。它揭露了戰爭對這塊土地造成的毀滅性打擊，尤其是化學藥劑「橘劑」對人類基因長達三代的遺傳影響，至今仍是人民心中無法抹滅的痛。導覽亮點： * 虎籠 (Tiger Cages)：復刻當年監禁政治犯的狹小空間。* 戰地攝影展：收集了世界各國戰地記者深入火線留下的最後快門紀錄。',
  tags: ['歷史', '博物館'],
  mapUrl: 'https://maps.app.goo.gl/igiGGZD4VBifDPBg7?g_st=ic',
},
{
  id: 'spot-independence-palace',
  name: '獨立宮 (Independence Palace)',
  district: '第一郡',
  summary: '歷史重量： 曾是南越總統府。1975年4月30日，北越坦克撞開大門，宣告長達20年的越戰終結。建築結合西方現代主義與東方風水，俯瞰呈現繁體「吉」字，象徵國運昌隆，最終卻見證了政權易手。導覽亮點： * 地下戰時碉堡：保留當年泛黃的作戰地圖與老式通訊設備。* 頂樓停機坪：當年撤離點留下的紅色標記。',
  tags: ['歷史', '政治'],
  mapUrl: 'https://maps.app.goo.gl/qN7XEqzJ9LrtDvuy5?g_st=ic',
},
{
  id: 'spot-tan-dinh-church',
  name: '新定教堂 (Tan Dinh Church)',
  district: '第三郡',
  summary: '歷史重量： 建於1876年，是西貢最古老的教堂之一。雖然外觀是夢幻的粉紅色，但它融合了羅曼式與哥德式的嚴謹建築風格。粉紅外觀是1950年代翻修時才決定的，沒想到成為城市中最具代表性的異國色彩。導覽亮點： * 哥德式細節：牆面雕刻極為細緻，展現了19世紀法式建築的平衡美感。',
  tags: ['宗教', '建築'],
  mapUrl: 'https://maps.app.goo.gl/CdZEJ74NcPfiZ9gY9?g_st=ic',
},
{
  id: 'spot-youth-center',
  name: '胡志明市青年文化館 (Youth Cultural Center)',
  district: '第一郡',
  summary: '歷史重量： 這裡曾是越戰時期學生運動與反戰抗爭的發源地，象徵著對和平的追求。現在則是觀察越南「經濟改革」後新一代年輕人生活型態的最佳窗口。導覽亮點： * 在地生命力：經常舉辦攝影展與文藝活動，是感受真實西貢現代脈動的地點。',
  tags: ['文化', '生活'],
  mapUrl: 'https://maps.app.goo.gl/RoPoKdaxKhHywwSC8?g_st=ic',
},
{
  id: 'spot-jade-emperor',
  name: '玉皇殿 (Jade Emperor Pagoda)',
  district: '第一郡',
  summary: '歷史重量： 1909年由華僑信徒建立，是當地華人與越南人的信仰中心。2016年美國前總統歐巴馬訪越時曾特別到此參訪。它展現了東方儒道佛合一的包容性。導覽亮點： * 紙紮與木雕：廟內神像是當地工藝巔峰之作。* 信仰氛圍：觀察信眾虔誠祈求，感受跨越百年的精神寄託。',
  tags: ['宗教', '歷史'],
  mapUrl: 'https://maps.app.goo.gl/xfTbikLf1UR2Ryg3A?g_st=ic',
},
{
  id: 'spot-book-street',
  name: '胡志明市書街 (Book Street)',
  district: '第一郡',
  summary: '歷史重量： 原本是混亂街道，由政府推動改造成文化徒步區，象徵城市對文化傳承與閱讀風氣的重視。這裡是西貢在現代化過程中，努力保留「慢活」精神的特區。導覽亮點： * 城市綠意：參天古樹配上露天咖啡座與書攤，是觀察當地人閒適生活最好地點。',
  tags: ['文化', '休閒'],
  mapUrl: 'https://maps.app.goo.gl/RoPoKdaxKhHywwSC8?g_st=ic',
},
{
  id: 'spot-notre-dame',
  name: '西貢聖母大教堂 (Notre Dame Cathedral)',
  district: '第一郡',
  summary: '歷史重量： 1880年完工，是法屬時期最宏偉的宗教建築。建材（含紅磚與花窗）全由法國馬賽運送而來，每塊紅磚經過百年依然維持鮮紅色澤，完全不需粉刷，展現極致工藝。導覽亮點： * 雙塔鐘樓：高達58公尺的尖塔。* 和平聖母像：廣場中央聖母像象徵對世界和平的祈願。',
  tags: ['宗教', '地標'],
  mapUrl: 'https://maps.app.goo.gl/GTrq4Kmtu28kgkxm8?g_st=ic',
},
{
  id: 'spot-post-office',
  name: '西貢中心郵局 (Saigon Central Post Office)',
  district: '第一郡',
  summary: '歷史重量： 完工於1891年，鋼鐵穹頂結構深受艾菲爾鐵塔設計風格影響。它不僅是古蹟，至今仍維持郵務運作，是連通越南與世界的通訊樞紐。導覽亮點： * 手繪古地圖：大廳牆面地圖記錄了19世紀法屬時期的地理樣貌。* 歷史長椅：坐在服務超過一世紀的木椅上寫明信片，非常有儀式感。',
  tags: ['建築', '歷史'],
  mapUrl: 'https://maps.app.goo.gl/mCPzdsf7fsigxcwS9?g_st=ic',
},
{
  id: 'spot-ben-thanh',
  name: '濱城市場 (Ben Thanh Market)',
  district: '第一郡',
  summary: '歷史重量： 1914年完工的正門鐘塔是西貢的靈魂座標。這裡不僅是商業核心，也是觀察在地生活百態的最佳課堂，展現了這座城市不眠的韌性。導覽亮點： * 常民文化：體驗在地食材、編織品與殺價文化。* 晝夜轉換：白天是傳統市場，傍晚轉換為熱鬧夜市。',
  tags: ['購物', '民生'],
  mapUrl: 'https://maps.google.com?q=%E6%BF%B1%E5%9F%8E%E5%B8%82%E5%A0%B4%20B%E1%BA%BFn%20Th%C3%A0nh,%20H%E1%BB%93%20Ch%C3%AD%20Minh,%20%E8%B6%8A%E5%8D%97&ftid=0x31752f3f3129e64d:0x8d6b2d79522c7f30&entry=gps&shh=CAE&lucs=,94297699,100808508,94284478,94231188,94280568,47071704,94218641,94282134,100799872,94286869&g_st=ic',
},

];

// 按摩詳細資料：可改店名、摘要、mapUrl
const spaPlaces = [
  {
    id: 'spa-rose-spa-dakao',
    name: 'Rose Spa DAKAO',
    area: '胡志明市',
    summary: '越式洗頭按摩店，可在這裡放中文翻譯圖片與店家資訊。',
    tags: ['已安排', '按摩'],
    mapUrl: 'https://maps.app.goo.gl/6fcnrTNSRGPZ1G9N6?g_st=ic',
    menuUrl: 'https://drive.google.com/drive/folders/1bBaCoMGc6TNPBW2uZbTwRcUpMWNoczn-?usp=drive_link', // 👉 填入按摩項目翻譯的網址（Google Drive、店家網頁等）
  },
  {
    id: 'spa-sunyata-retreat-hill-spa',
    name: 'Sunyata Retreat Hill Spa',
    area: '胡志明市',
    summary: '可放價目表、注意事項與中文翻譯圖片。',
    tags: ['已安排', '按摩'],
    mapUrl: 'https://maps.app.goo.gl/FdKYeTy8qp57FFT8A?g_st=ic',
    menuUrl: 'https://drive.google.com/drive/folders/1i7WWexBuLe7l851MSnugoncCJVKhH45a?usp=drive_link', // 👉 填入按摩項目翻譯的網址
  },
  {
    id: 'spa-norah-spa',
    name: 'Norah Spa',
    area: '胡志明市',
    summary: '可放療程項目與店家說明。',
    tags: ['已安排', '按摩'],
    mapUrl: 'https://maps.app.goo.gl/pDAud23HEMDfqAzb8?g_st=ic',
    menuUrl: 'https://sites.google.com/norahspa.com/norahspa/menu', // 👉 填入按摩項目翻譯的網址
  },
];

// 美食詳細資料：可改名稱、摘要、mapUrl
const foods = [
  {
    id: 'food-banh-mi',
    name: 'Bánh Mì Huỳnh Hoa',
    area: '第一郡',
    summary: '胡志明市有名的越南麵包店，現場排很多人又很熱，叫外送直接省麻煩。',
    tags: ['越南麵包', '宵夜'],
    mapUrl: 'https://maps.app.goo.gl/ouw19VMWXvdY2fno9?g_st=ic',
    menuUrl: '', // 👉 填入菜單或翻譯的網址
  },
  {
    id: 'food-pho',
    name: 'Phở Việt Nam',
    area: '第一郡',
    summary: '可放石鍋河粉、河粉店等資訊。',
    tags: ['河粉'],
    mapUrl: 'https://maps.app.goo.gl/pgzT1FTykcS1p8ZQ6?g_st=ic',
    menuUrl: 'https://drive.google.com/drive/folders/1XWkJBmj9an4nYPQ3Uy-OiWnHYEBC9AW2?usp=drive_link', // 👉 填入菜單或翻譯的網址
  },
  {
    id: 'food-coffee',
    name: 'Phuc Long Tea',
    area: '市區多處',
    summary: '越南有名奶茶品牌，離第一天按摩點很近，大部分都推烏龍奶。',
    tags: ['飲品', '奶茶'],
    mapUrl: 'https://maps.app.goo.gl/ejV7ajZ9d4qgVKjF7?g_st=ic',
    menuUrl: 'https://drive.google.com/drive/folders/1J8qYp5BklhjW7WNvwMsrR0crr_2VwGek?usp=sharing', // 👉 填入菜單或翻譯的網址
  },
{
  id: 'food-pizza-4ps',
  name: '4P’s 披薩',
  district: '第一郡',
  summary: '文化深度： 由日本人創立，將「Omotenashi」(日式款待) 精神融入義式料理。它是越南現代餐飲轉型的指標，強調農場到餐桌，甚至在越南自設乳酪工廠。美味亮點： 招牌「自製布拉塔起司」極為鮮甜。這裡的披薩象徵著西貢多元文化的融合，是當地年輕人慶祝的首選。',
  tags: ['跨國界', '必吃'],
  mapUrl: 'https://maps.app.goo.gl/Azn4Yph5ACqKyQvG9?g_st=ic',
  menuUrl: 'https://drive.google.com/drive/folders/1XqiLco6mX2vdpPrwfj4V1HKMu77gL0zs?usp=drive_link', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-crab-noodle',
  name: '蟹肉粉 Ba ba (Crab noodle Ba ba)',
  district: '第一郡',
  summary: '文化深度： Bún Riêu (螃蟹米粉) 是越南庶民美食的靈魂。Ba Ba 以濃郁的蟹膏湯底聞名，展現了越南人如何利用淡水蟹與番茄熬出清爽卻層次豐富的湯頭。美味亮點： 湯頭帶有淡淡的酸甜味，配上紮實的蟹肉塊與豬血，是感受西貢在地早餐文化最道地的方式。',
  tags: ['在地小吃', '海鮮'],
  mapUrl: 'https://maps.app.goo.gl/6NVRtGrRcdNUomd87?g_st=ic',
  menuUrl: 'https://drive.google.com/drive/folders/1m5V4iPRtJIm8mJR99jdaiLEFMjU65-GH?usp=drive_link', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-bep-me-in',
  name: '媽媽味道廚房 (Bếp Mẹ Ỉn - Lê Thánh Tôn)',
  district: '第一郡',
  summary: '文化深度： 店名意指「In 媽媽的廚房」，隱身在熱鬧街區的小巷弄內。裝潢風格充滿越南鄉村懷舊感，致力於將傳統的路邊家常菜精緻化。美味亮點： 必點「黃金煎餅 (Bánh Xèo)」，其外皮酥脆且不油膩，吃法是將餅皮與香料蔬菜包裹在一起，展現越南料理中「鮮、脆、香」的平衡。',
  tags: ['家常菜', '懷舊'],
  mapUrl: 'https://maps.app.goo.gl/dnfr45pLfYTtaDsX9?g_st=ic',
  menuUrl: 'https://drive.google.com/drive/folders/1M5l5PYQ0O22kIWSRxVLOCHT5M9Zv1vJa?usp=drive_link', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-egg-coffee',
  name: '小河內蛋咖啡 (Little HaNoi Egg Coffee)',
  district: '第一郡',
  summary: '文化深度： 蛋咖啡源於 1940 年代河內因牛奶短缺，而改用蛋黃攪打成奶油狀代替奶泡。這家店將北越的憂鬱懷舊氛圍帶入西貢小巷。美味亮點： 口感如卡士達般綿密，苦甜交織，建議用小湯匙先品嚐上層蛋泡，再與下層濃縮咖啡攪拌。',
  tags: ['咖啡', '北越特色'],
  mapUrl: 'https://maps.app.goo.gl/J7QBKniTgTHs2fnr7?g_st=ic',
  menuUrl: 'https://drive.google.com/drive/folders/1UHepK-ILyX1tPUHtoXmnQWwT8pm_EXhe?usp=drive_link', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-cocotte',
  name: 'Cocotte 法式料理 (Cocotte Bến Thành)',
  district: '第一郡',
  summary: '文化深度： 越南曾受法國統治，法式料理已融入在地基因。Cocotte 走的是「傳統家庭式」路線，讓法式餐飲不再高不可攀，反映了西貢這座城市親民的異國情調。美味亮點： 經典的「油封鴨腿」與「紅酒燉牛肉」，用最純粹的法式燉煮工法，呈現出濃郁的鄉村風味。',
  tags: ['法式', '平價'],
  mapUrl: 'https://maps.app.goo.gl/Jq3j5aAb8wo2MR3i9?g_st=ic',
  menuUrl: 'https://drive.google.com/drive/folders/1xpAxGb-LQFo-W3MJA0ubM6Amy8TqmDgI?usp=drive_link', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-bep-cuon',
  name: '貝普捲餅 (Bếp Cuốn Sài Gòn)',
  district: '第一郡',
  summary: '文化深度： 越南菜以「大量蔬菜」聞名，這家店專攻各式捲類。捲餅代表了越南料理中對食材原味的尊重，是一道極具健康意識的民族料理。美味亮點： 種類多元的春捲配上特製花生蘸醬，清爽無負擔，非常適合在胡志明市炎熱的中午享用。',
  tags: ['捲餅', '健康'],
  mapUrl: 'https://maps.app.goo.gl/bKe9da1BoFTAip7u5?g_st=ic',
  menuUrl: 'https://drive.google.com/drive/folders/18Lnr8fhPetgVYHKaU8IRPjSSKZxEsnc3', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-cong-caphe',
  name: '共咖啡 (Cộng Coffee)',
  district: '第一郡',
  summary: '文化深度： 「Cộng」意指「共產」。店內以 1970 年代北越軍隊色彩與舊家具為裝潢主題，走的是「社會主義懷舊風」，是越南目前最成功的文創品牌之一。內容亮點： 招牌「椰奶咖啡冰沙」是必喝經典。這裡不只是喝咖啡，更是在體驗越南那段特殊的時代縮影。',
  tags: ['網紅咖啡', '軍事風'],
  mapUrl: 'https://maps.app.goo.gl/aUaBSUpzuuEJuu7d9?g_st=ic',
  menuUrl: 'https://drive.google.com/file/d/1PwqKSnr8MkqIiaUJAqABoeJ_qYlkDBGW/view?usp=drive_link', // 👉 填入菜單或翻譯的網址
},
{
  id: 'food-poseidon',
  name: '波塞頓海鮮百匯 (Buffet Poseidon)',
  district: '第六郡',
  summary: '文化深度： 展現了現代西貢中產階級的消費力。Poseidon 以海鮮品項多、性價比高著稱，是當地家庭聚餐或節慶聚會的熱門場所。內容亮點： 這裡可以看見西貢人如何享用豐富的海產（螃蟹、鮮蝦、貝類），是體驗在地熱鬧、歡樂餐飲氛圍的最佳去處。',
  tags: ['海鮮', '吃到飽'],
  mapUrl: 'https://maps.app.goo.gl/JofoMcMdnUnFbsGn9?g_st=ic',
  menuUrl: '', // 👉 填入菜單或翻譯的網址
},
];

// 實用網站 / App 連結：可改名稱、說明、url
const usefulSites = [
  {
    name: 'Google Maps',
    desc: '找尋地點',
    detail: '用來查地點、看路線、確認集合位置。',
    url: 'https://www.google.com/maps?authuser=0',
  },
  {
    name: 'Grab',
    desc: '叫計程車',
    detail: '在胡志明市移動很實用，建議同行者都先安裝。',
    url: 'https://apps.apple.com/app/id647268330',
  },
  {
    name: 'Google 翻譯',
    desc: '簡易翻譯',
    detail: '適合快速查單字、簡單句子，也能搭配相機翻譯。',
    url: 'https://translate.google.com.tw/?hl=zh-TW&tab=TT&sl=en&tl=zh-TW&op=translate',
  },
  {
    name: 'ChatGPT（AI）',
    desc: '可以請它翻譯整句，或是詢問一些不知道的問題',
    detail: '例如請它翻譯「廁所在哪裡」的越南語，通常比單字式翻譯更自然。',
    url: 'https://chatgpt.com/',
  },
];

// 越南語小抄：可自行新增句子
const phraseList = [
  { zh: '你好, 唸法：新橋', vn: 'Xin chào' },
  { zh: '謝謝, 唸法：感溫', vn: 'Cảm ơn' },
  { zh: '多少錢？, 唸法：幫Ｕ頂', vn: 'Bao nhiêu tiền?' },
];

// 每日行程資料
// 可修改：purpose / time / title / summary / mapUrl
// 若已預約：加 isBooked: true
// 若要跳到詳細介紹：
// relatedSpotIds / relatedFoodIds / relatedSpaIds
const itineraryDays = [
  {
    id: 'day1',
    title: '第一天｜Friday',
    subtitle: '抵達胡志明市、濱城市場逛街、晚餐與按摩行程',
    items: [
      { purpose: '出發', time: '出發', title: '家裡', summary: '第一天清晨從家裡出發，前往桃園機場。', mapUrl: 'https://maps.google.com', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '機場', time: '4:50 AM 前', title: '桃園機場', summary: '建議在 4:50 AM 前抵達機場，預留報到與出境時間。', mapUrl: 'https://maps.app.goo.gl/Nu2J8BNBirHR6sNF8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '機場', time: '9:40 AM 抵達', title: '新山一機場', summary: '預計 9:40 AM 降落，抓約 1 小時出海關。', mapUrl: 'https://maps.app.goo.gl/Bkxd3QcLSqBLRTAfA?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '寄放行李', time: '上午', title: '飯店', summary: '先到飯店寄放行李，之後再開始市區行程。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '換匯', time: '中午前後', title: '濱城市場', summary: '準備大鈔，匯率通常會比較好。遇到擦皮鞋的人記得對他搖頭！', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: ['spot-ben-thanh'], relatedFoodIds: [] },
      { purpose: '小吃', time: '中午前後', title: '順化粿', summary: '在濱城市場周邊安排小吃。', mapUrl: 'https://maps.app.goo.gl/6k4mEDAiAUUSy5sa7?g_st=ic', relatedSpotIds: ['spot-ben-thanh'], relatedFoodIds: [] },
      { purpose: '甜點', time: '中午前後', title: '越式甜湯', summary: '在濱城市場周邊安排甜品。', mapUrl: 'https://maps.app.goo.gl/6k4mEDAiAUUSy5sa7?g_st=ic', relatedSpotIds: ['spot-ben-thanh'], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: '濱城市場編織包', summary: '逛市場找編織包，記得殺價，不殺價就是待宰肥羊。', mapUrl: 'https://maps.app.goo.gl/6k4mEDAiAUUSy5sa7?g_st=ic', relatedSpotIds: ['spot-ben-thanh'], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'waa. studios', summary: '好看的拖鞋店。', mapUrl: 'https://maps.app.goo.gl/GVukM6Eekf6bXn8B7?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'CHAUTFIFTH', summary: '卡特推薦包包，從前一站步行約 11 分鐘。', mapUrl: 'https://maps.app.goo.gl/3aAKTt9JcpiK82vW6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'ICONDENIM', summary: '男裝店。', mapUrl: 'https://maps.app.goo.gl/dxUcThKRBdJDYicE9?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'DEAR JOSÉ', summary: '女裝店。', mapUrl: 'https://maps.app.goo.gl/rZAjz4unJKjq6QpW7?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '晚餐', time: '5:00 PM（預計）', title: 'Phở Việt Nam', summary: '米其林推薦的石鍋河粉，推薦吃石鍋的品項，非常多人說世界好吃～', mapUrl: 'https://maps.app.goo.gl/pgzT1FTykcS1p8ZQ6?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-pho'] },
      { purpose: '入住 / 洗澡', time: '傍晚', title: 'Triple E Hotel Metro Bến Thành', summary: '回飯店辦理入住，稍作休息整理。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '按摩', time: '7:00 PM（已預約）', title: 'Rose Spa DAKAO', summary: '越式洗頭按摩，這間會先填按摩喜好問卷，有中文別擔心！。', mapUrl: 'https://maps.app.goo.gl/6fcnrTNSRGPZ1G9N6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [], relatedSpaIds: ['spa-rose-spa-dakao'], isBooked: true },
      { purpose: '飲料', time: '晚上', title: 'Phuc Long Tea', summary: '越南有名奶茶店，推薦烏龍奶茶，不好喝就抱歉了，我也只是聽說QQ。', mapUrl: 'https://maps.app.goo.gl/ejV7ajZ9d4qgVKjF7?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-coffee'] },
      { purpose: '宵夜', time: '宵夜', title: 'Bánh Mì Huỳnh Hoa - Lê Thị Riêng', summary: '回飯店叫宵夜，吹冷氣吃有名的越南麵包。', mapUrl: 'https://maps.app.goo.gl/ouw19VMWXvdY2fno9?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-banh-mi'] },
    ],
  },
  {
    id: 'day2',
    title: '第二天｜Saturday',
    subtitle: '獨立宮周邊、中央郵局與教堂、逛街、晚間按摩',
    items: [
      { purpose: '出發', time: '出發', title: '飯店', summary: '從飯店出發開始第二天行程。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '景點', time: '白天', title: '獨立宮', summary: '胡志明市經典歷史景點。', mapUrl: 'https://maps.app.goo.gl/pHbxxH3GfjpuKb5D9?g_st=ic', relatedSpotIds: ['spot-independence-palace'], relatedFoodIds: [] },
      { purpose: '逛街', time: '白天', title: 'Morra Perfume Experience Center', summary: '香水店，可安排短暫停留。', mapUrl: 'https://maps.app.goo.gl/p76eGDQVzgfkwyMr7?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '景點', time: '白天', title: '胡志明市青年文化館', summary: '週末有小市集，可視現場狀況停留。', mapUrl: 'https://maps.app.goo.gl/xVq61sHtaU4U5nQE7?g_st=ic', relatedSpotIds: ['spot-youth-center'], relatedFoodIds: [] },
      { purpose: '午餐', time: '12:00 PM（已訂位）', title: "4P's 披薩", summary: '已訂位 12:00 PM，越南必吃的好吃披薩，不吃後悔一輩子。', mapUrl: 'https://maps.app.goo.gl/Azn4Yph5ACqKyQvG9?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-pizza-4ps'], isBooked: true },
      { purpose: '景點', time: '下午', title: '胡志明市書街', summary: '可安排輕鬆散步與拍照。', mapUrl: 'https://maps.app.goo.gl/99EHAjFapEXRdqm98?g_st=ic', relatedSpotIds: ['spot-book-street'], relatedFoodIds: [] },
      { purpose: '景點', time: '下午', title: '西貢中央郵局', summary: '經典法式建築，很順路一起逛。', mapUrl: 'https://maps.app.goo.gl/99EHAjFapEXRdqm98?g_st=ic', relatedSpotIds: ['spot-post-office'], relatedFoodIds: [] },
      { purpose: '景點', time: '下午', title: '西貢聖母聖殿主教座堂', summary: '如果時間足夠，也可以晚上再去看，可能會有燈飾。', mapUrl: 'https://maps.app.goo.gl/zv3YfDyFR47X3C948?g_st=ic', relatedSpotIds: ['spot-notre-dame'], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'The New Playground', summary: '當地熱門的逛街地點，買買買！！！錢包請小心太扁XD。', mapUrl: 'https://maps.app.goo.gl/MXXzWHwda7ZBFQxw6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: '無印良品', summary: '聽說很多東西便宜很多，不逛白不逛！', mapUrl: 'https://maps.app.goo.gl/MXXzWHwda7ZBFQxw6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'Uniqlo', summary: '有越南限定衣服，也比其他地方便宜，逛起來！', mapUrl: 'https://maps.app.goo.gl/MXXzWHwda7ZBFQxw6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'LaMay', summary: '姊姊許願的行程。', mapUrl: 'https://maps.app.goo.gl/jzWHWyeTqbhT3AKv9?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '咖啡', time: '傍晚', title: '咖啡公寓', summary: '這裡包包不便宜，個人不推薦，但還是可以當個觀光客逛逛。', mapUrl: 'https://maps.app.goo.gl/ejV7ajZ9d4qgVKjF7?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-coffee'] },
      { purpose: '晚餐', time: '晚上', title: 'Crab noodle Ba ba', summary: '蟹肉麵，看起來很好吃，我想吃所以就排啦，希望大家喜歡，嘿嘿。', mapUrl: 'https://maps.app.goo.gl/6NVRtGrRcdNUomd87?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-crab-noodle'] },
      { purpose: '回飯店', time: '晚上', title: '回飯店', summary: '先回飯店休息或洗澡，準備出發快樂按摩。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '按摩', time: '09:00 PM（已預約）', title: 'Sunyata Retreat Hill Spa', summary: '這家三人以上有優惠，小費已含在費用裡，但不包含8%稅，已預約。', mapUrl: 'https://maps.app.goo.gl/FdKYeTy8qp57FFT8A?g_st=ic', relatedSpotIds: [], relatedFoodIds: [], relatedSpaIds: ['spa-sunyata-retreat-hill-spa'], isBooked: true },
      { purpose: '宵夜', time: '夜間', title: '夜市吃春捲', summary: '如果還有胃口，可以去逛觀光客必逛夜市（都說是觀光客必逛，就代表是台灣物價，哈哈），聽說春捲很好吃。', mapUrl: 'https://maps.app.goo.gl/7adhKxqLoWQ6bxKj6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
    ],
  },
  {
    id: 'day3',
    title: '第三天｜Sunday',
    subtitle: '玉皇殿、午餐、逛街、晚餐與夜間 Spa',
    items: [
      { purpose: '出發', time: '出發', title: '飯店', summary: '從飯店出發開始第三天行程。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '景點', time: '白天', title: '玉皇殿', summary: '寺廟景點。', mapUrl: 'https://maps.app.goo.gl/8kvkiX8wTwSR5zmT9?g_st=ic', relatedSpotIds: ['spot-jade-emperor'], relatedFoodIds: [] },
      { purpose: '購物', time: '白天', title: '樂天超市', summary: '安排伴手禮採買，可以買一些河粉泡麵、果乾、咖啡，如果有經典巧克力可以買，聽說這裡最便宜。機場世界貴，最好在這裡採買完成，不然去機場買會槌心肝啊！', mapUrl: 'https://maps.app.goo.gl/1LszDMEVwKBd6e1H7?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '回飯店', time: '白天', title: '回飯店放東西', summary: '先回飯店放置戰利品＆稍作休息。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '午餐', time: '11:30 AM（已訂位）', title: 'Bếp Mẹ Ỉn - Lê Thánh Tôn', summary: '越式鬆餅、越南料理、米其林餐廳，很多人推推，越南料理吃起來。', mapUrl: 'https://maps.app.goo.gl/dnfr45pLfYTtaDsX9?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-bep-me-in'], isBooked: true },
      { purpose: '逛街', time: '下午', title: 'In The Mood Saigon', summary: '姊姊許願行程。', mapUrl: 'https://maps.app.goo.gl/39gxqfS1STLeweSm8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'amai house', summary: '姊姊許願行程。', mapUrl: 'https://maps.app.goo.gl/QfMWyeTbdSw3yoqB6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '咖啡', time: '下午', title: 'Little HaNoi Egg Coffee (Yersin)', summary: '當地有名的咖啡廳，可以試試蛋咖啡或椰奶咖啡，聽說很好喝！', mapUrl: 'https://maps.app.goo.gl/J7QBKniTgTHs2fnr7?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-egg-coffee'] },
      { purpose: '逛街', time: '下午', title: 'grade b', summary: '姊姊許願行程。', mapUrl: 'https://maps.app.goo.gl/1LszDMEVwKBd6e1H7?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '晚餐', time: '5:30 PM（已預約）', title: 'Cocotte 法式料理 Cocotte Bến Thành', summary: '法式料理，鴨胸好吃，一起用便宜的摳摳，體驗法式料理吧！', mapUrl: 'https://maps.app.goo.gl/Jq3j5aAb8wo2MR3i9?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-cocotte'], isBooked: true },
      { purpose: '休息', time: '晚上', title: '吃完飯閒晃或是回飯店', summary: '晚餐後可視體力彈性安排。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '按摩', time: '09:00 PM（已預約）', title: 'Norah Spa', summary: '舒壓行程又要來啦，一起快樂享受吧！', mapUrl: 'https://maps.app.goo.gl/pDAud23HEMDfqAzb8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [], relatedSpaIds: ['spa-norah-spa'], isBooked: true },
      { purpose: '宵夜', time: '夜間', title: '宵夜可以叫外送或是再看看', summary: '如果餓了可再彈性安排。', mapUrl: 'https://maps.google.com', relatedSpotIds: [], relatedFoodIds: [] },
    ],
  },
  {
    id: 'day4',
    title: '第四天｜Monday',
    subtitle: '戰爭遺跡博物館、粉紅教堂周邊、午餐與彈性安排',
    items: [
      { purpose: '出發', time: '出發', title: '飯店', summary: '從飯店出發開始第四天行程。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '景點', time: '白天', title: '戰爭遺跡博物館', summary: '胡志明市經典歷史景點，一起看看過去戰爭的故事，才能知道和平得來不易，一起珍惜生活的每分每秒。', mapUrl: 'https://maps.app.goo.gl/ZYvZYUWBGNK4j2PF8?g_st=ic', relatedSpotIds: ['spot-war-museum'], relatedFoodIds: [] },
      { purpose: '午餐', time: '12:00 PM（已預約）', title: 'Bếp Cuốn Sài Gòn', summary: '越南料理餐廳，2025米其林推薦，看起來非常好吃，不好吃就罵米其林。', mapUrl: 'https://maps.app.goo.gl/bKe9da1BoFTAip7u5?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-bep-cuon'], isBooked: true },
      { purpose: '景點', time: '下午', title: '新定教堂（粉紅教堂）', summary: '大家俗稱粉紅教堂，平日才可以進去參觀，所以特別安排在今天！', mapUrl: 'https://maps.app.goo.gl/CdZEJ74NcPfiZ9gY9?g_st=ic', relatedSpotIds: ['spot-tan-dinh-church'], relatedFoodIds: [] },
      { purpose: '咖啡', time: '下午', title: 'Cộng Coffee', summary: '越南知名連鎖咖啡廳，可能沒有到世界好喝，但知名連鎖，我們就要試，選這間分店，是怕不好喝但會因為能拍到粉紅教堂而原諒，哈哈。', mapUrl: 'https://maps.app.goo.gl/aUaBSUpzuuEJuu7d9?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-cong-caphe'] },
      { purpose: '閒晃', time: '下午', title: '附近有很多好吃的，可以再去看哪裡閒晃', summary: '可依當天體力與心情彈性調整。', mapUrl: 'https://maps.google.com', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '逛街', time: '下午', title: 'Nagashoes - 95 Trần Quang Diệu', summary: 'CP值很高的鞋店，想說很閒就可以特別去逛逛。', mapUrl: 'https://maps.app.goo.gl/3utVLUUCLfxbHfFF8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '按摩', time: '晚上', title: '按摩待訂', summary: '依前幾天體驗狀況決定要安排哪間按摩。', mapUrl: 'https://maps.google.com', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '晚餐', time: '晚上', title: '晚餐', summary: '看看前幾天大家喜歡哪類型，再來安排晚餐，也可以去逛范五老街，保留彈性。', mapUrl: 'https://maps.google.com', relatedSpotIds: [], relatedFoodIds: [] },
    ],
  },
  {
    id: 'day5',
    title: '第五天｜Tuesday',
    subtitle: '最後閒晃、午餐吃到飽、回飯店與前往機場',
    items: [
      { purpose: '出發', time: '出發', title: '飯店', summary: '從飯店出發開始最後一天行程。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '閒晃 / 按摩', time: '白天', title: '附近閒晃或按摩', summary: '依最後一天狀況安排附近行程。', mapUrl: 'https://maps.google.com', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '午餐', time: '12:00 PM（已預約）', title: 'Buffet Poseidon Võ Văn Kiệt Quận 6', summary: '海鮮吃到飽，請準備好過敏藥，怕吃得太快樂，我選了一間評分最高的了！', mapUrl: 'https://maps.app.goo.gl/JofoMcMdnUnFbsGn9?g_st=ic', relatedSpotIds: [], relatedFoodIds: ['food-poseidon'], isBooked: true },
      { purpose: '回飯店', time: '下午', title: '回飯店', summary: '回飯店拿行李，就直接去機場。', mapUrl: 'https://maps.app.goo.gl/R6hKrRNAqZTdbHUN8?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
      { purpose: '機場', time: '返程前', title: '機場', summary: '怕機場太多人，所以需要預留多點前往機場及辦理登機的時間。', mapUrl: 'https://maps.app.goo.gl/7adhKxqLoWQ6bxKj6?g_st=ic', relatedSpotIds: [], relatedFoodIds: [] },
    ],
  },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionAnchor({ id, title, children, icon: Icon }) {
  return (
    <section id={id} className="scroll-mt-40">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-[#efe7d1] p-2 text-[#1f5a43]">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#173c2e]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function JumpButton({ label, targetId }) {
  return (
    <button
      onClick={() => scrollToId(targetId)}
      className="inline-flex items-center gap-1 rounded-full border border-[#e4d8bf] bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-[#d4b36a] hover:text-[#1f5a43]"
    >
      前往 {label}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </button>
  );
}

function SubTabs({ items, activeSubSection, dark = false }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-2 pb-1">
        {items.map((item) => {
          const isActive = activeSubSection === item.id;
          const base = dark
            ? 'border-[#f1dfb5]/15 bg-white/5 text-[#f2e6cb] hover:border-[#e3c067]/50 hover:bg-white/10 hover:text-[#ffe3a1]'
            : 'border-[#e8d9b6] bg-[#fbf6ea] text-[#7a4a1d] hover:border-[#d4b36a] hover:bg-[#f7efd9]';
          const active = dark
            ? 'border-[#e3c067] bg-[#29503f] text-[#ffe3a1] shadow-[inset_0_0_0_1px_rgba(243,211,116,0.35)]'
            : 'border-[#d4b36a] bg-[#f7efd9] text-[#7a4a1d]';
          return (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${isActive ? active : base}`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HoChiMinhTravelMobileGuide() {
  const [activeSection, setActiveSection] = useState('basic');
  const [activeSubSection, setActiveSubSection] = useState('flight');
  const [expandedItems, setExpandedItems] = useState({ 'day1-0': true });

  const spotMap = useMemo(() => Object.fromEntries(spots.map((s) => [s.id, s])), []);
  const foodMap = useMemo(() => Object.fromEntries(foods.map((f) => [f.id, f])), []);
  const spaMap = useMemo(() => Object.fromEntries(spaPlaces.map((s) => [s.id, s])), []);
  const currentChildren = sections.find((section) => section.id === activeSection)?.children || [];

  useEffect(() => {
    const ids = sections.map((section) => section.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0.2, 0.4, 0.6] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentChildren.length === 0) return;
    const elements = currentChildren.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSubSection(visible[0].target.id);
      },
      { rootMargin: '-180px 0px -60% 0px', threshold: [0.2, 0.4, 0.6] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeSection]);

  const toggleItineraryItem = (key) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTopTabClick = (id) => {
    setActiveSection(id);
    const firstChild = sections.find((section) => section.id === id)?.children?.[0]?.id;
    if (firstChild) setActiveSubSection(firstChild);
    scrollToId(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f1e7] via-[#fffdf8] to-[#f4efe4] text-slate-800">
      <header className="border-b border-[#d7c7a6] bg-[#12372a] text-white">
        <div className="mx-auto max-w-5xl px-4 pb-8 pt-10 sm:px-6">
          <Badge className="mb-4 rounded-full border border-[#f4d27a]/30 bg-white/10 px-3 py-1 text-xs font-medium text-[#f7e7b6]">
            Hồ Chí Minh City Travel Guide
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">胡志明登入中</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#e7dfcf] sm:text-base">
            家族旅遊伺服器連線成功，一家人的旅行進度條正在加載中，準備一起開啟胡志明的吃喝玩樂副本。
          </p>
        </div>
      </header>

      <div className="sticky top-0 z-50 border-b border-[#c9b27c]/40 bg-[#173c2e]/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-0 sm:px-6">
          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-0 px-2 sm:px-0">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleTopTabClick(section.id)}
                    className={`flex min-w-[120px] flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition sm:min-w-[148px] sm:text-[15px] ${
                      isActive
                        ? 'border-[#e3c067] bg-[#204b3a] text-[#f6df9a] shadow-[inset_0_0_0_1px_rgba(243,211,116,0.45)]'
                        : 'border-transparent bg-transparent text-white/75 hover:bg-white/10 hover:text-[#fff4cf]'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#f6df9a]' : 'text-[#d9ccb1]/70'}`} />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {currentChildren.length > 0 && (
            <div className="border-t border-[#f1dfb5]/10 px-3 py-3 sm:px-0">
              <SubTabs items={currentChildren} activeSubSection={activeSubSection} dark={true} />
            </div>
          )}
        </div>
      </div>

      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-10">
        <SectionAnchor id="basic" title="基本資訊" icon={Plane}>
          <div className="grid gap-4">
            <Card id="flight" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><Plane className="h-4 w-4 text-[#1f5a43]" /><h3 className="text-lg font-semibold">飛機航班</h3></div>
                {/* ✏️ 航班連結區：把網址填入下方 href="" 即可，可以是 Google Drive、航空公司確認信等 */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e4d8bf] bg-[#faf5eb] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">✈️ 去程航班</div>
                    <a
                      href="https://drive.google.com/drive/folders/1JoqIiricyhSf9OcZawwO8HhCVBbHvA3E?usp=drive_link" // 👉 填入去程航班截圖或電子機票的網址
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2f24]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      查看去程資訊
                    </a>
                  </div>
                  <div className="rounded-2xl border border-[#e4d8bf] bg-[#faf5eb] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">✈️ 回程航班</div>
                    <a
                      href="https://drive.google.com/drive/folders/1JoqIiricyhSf9OcZawwO8HhCVBbHvA3E?usp=drive_link" // 👉 填入回程航班截圖或電子機票的網址
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2f24]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      查看回程資訊
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="hotel" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><Hotel className="h-4 w-4 text-[#1f5a43]" /><h3 className="text-lg font-semibold">飯店資訊</h3></div>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-[#faf5eb] p-4"><div className="mb-1 text-sm font-medium text-slate-500">飯店名稱</div><div className="text-base font-semibold text-slate-900">Triple E Hotel Metro Bến Thành</div></div>
                  <div className="rounded-2xl bg-[#faf5eb] p-4"><div className="mb-1 text-sm font-medium text-slate-500">飯店地址</div><div className="text-sm leading-6 text-slate-700">156-158 Ký Con, Phường Nguyễn Thái Bình, Bến Thành, Hồ Chí Minh 700000越南</div></div>
                  <div className="rounded-2xl bg-[#faf5eb] p-4"><div className="mb-1 text-sm font-medium text-slate-500">Google 連結</div><a href="https://maps.app.goo.gl/dCB3JmrD8gXhBpBc9?g_st=ic"target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2f24]"><MapPin className="h-4 w-4" />點我開啟地圖</a></div>
                  <div className="rounded-2xl bg-[#faf5eb] p-4"><div className="mb-1 text-sm font-medium text-slate-500">飯店附近便利商店</div><a href="https://maps.app.goo.gl/aN5h3PG3GY7C54E57?g_st=ic"target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2f24]"><MapPin className="h-4 w-4" />123 Go Mart</a></div>
                </div>
              </CardContent>
            </Card>

            <Card id="customs" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><AlertTriangle className="h-4 w-4 text-[#1f5a43]" /><h3 className="text-lg font-semibold">海關說明資訊</h3></div>
                <p className="mb-4 text-sm leading-6 text-slate-600">如果太慌張，語言不通，以下內容可以在入境時出示，有英文、越南文，方便快速說明旅遊目的與基本資訊。</p>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#e4d8bf] bg-[#faf5eb] p-4"><div className="mb-2 text-sm font-semibold text-slate-900">中文</div><div className="space-y-2 text-sm leading-6 text-slate-700"><p>您好，以下是我的入境資訊：</p><p><span className="font-medium text-slate-900">目的：</span>與家人一同旅遊</p><p><span className="font-medium text-slate-900">人數：</span>4 位（含我）</p><p><span className="font-medium text-slate-900">日期：</span>2026/04/24 ~ 2026/04/28</p><p><span className="font-medium text-slate-900">攜帶物品：</span>衣服、個人藥品、其他日常用品，沒有攜帶食物及危險物品。</p><p><span className="font-medium text-slate-900">飯店：</span>Triple E Hotel Metro Bến Thành</p><p><span className="font-medium text-slate-900">行程安排：</span>主要是第一郡的餐廳、景點及按摩。</p></div></div>
                  <div className="rounded-2xl border border-[#e4d8bf] bg-white p-4"><div className="mb-2 text-sm font-semibold text-slate-900">English</div><div className="space-y-2 text-sm leading-6 text-slate-700"><p>Hello, here is my entry information:</p><p><span className="font-medium text-slate-900">Purpose:</span> Traveling with my family.</p><p><span className="font-medium text-slate-900">Number of travelers:</span> 4 people, including me.</p><p><span className="font-medium text-slate-900">Dates:</span> April 24, 2026 to April 28, 2026.</p><p><span className="font-medium text-slate-900">Items I am carrying:</span> Clothes, personal medication, and other daily necessities. I am not carrying any food or dangerous items.</p><p><span className="font-medium text-slate-900">Hotel:</span> Triple E Hotel Metro Bến Thành.</p><p><span className="font-medium text-slate-900">Travel plan:</span> We will mainly visit restaurants, attractions, and massage shops in District 1.</p></div></div>
                  <div className="rounded-2xl border border-[#d7d8b4] bg-[#eef4e7] p-4"><div className="mb-2 text-sm font-semibold text-slate-900">Tiếng Việt</div><div className="space-y-2 text-sm leading-6 text-slate-700"><p>Xin chào, đây là thông tin nhập cảnh của tôi:</p><p><span className="font-medium text-slate-900">Mục đích:</span> Tôi đi du lịch cùng gia đình.</p><p><span className="font-medium text-slate-900">Số người:</span> 4 người, bao gồm cả tôi.</p><p><span className="font-medium text-slate-900">Thời gian:</span> Từ ngày 24/04/2026 đến ngày 28/04/2026.</p><p><span className="font-medium text-slate-900">Vật dụng mang theo:</span> Quần áo, thuốc cá nhân và các vật dụng sinh hoạt hằng ngày. Tôi không mang theo thực phẩm hay vật dụng nguy hiểm.</p><p><span className="font-medium text-slate-900">Khách sạn:</span> Triple E Hotel Metro Bến Thành.</p><p><span className="font-medium text-slate-900">Lịch trình:</span> Chủ yếu là đi ăn, tham quan các địa điểm du lịch và massage ở Quận 1.</p></div></div>
                </div>
              </CardContent>
            </Card>

            <Card id="packing" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><Backpack className="h-4 w-4 text-[#1f5a43]" /><h3 className="text-lg font-semibold">攜帶物品建議</h3></div>
                <div className="flex flex-wrap gap-2">{['護照', '簽證', '行動電源（請注意有標示）', '充電器（手錶、手機）', '薄外套', '防曬', '雨具', '現金', '信用卡', '手機掛繩', '常備藥', '衣服（可以多帶幾件短袖，避免太熱想換）', '免洗內褲', '鞋子及拖鞋', '耳機', '墨鏡', '其他'].map((item) => <Badge key={item} variant="secondary" className="rounded-full bg-[#efe7d1] px-3 py-1 text-[#1f5a43]">{item}</Badge>)}</div>
              </CardContent>
            </Card>
          </div>
        </SectionAnchor>

        <SectionAnchor id="practical" title="實用資訊" icon={Globe}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card id="tips" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf] sm:col-span-2">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><AlertTriangle className="h-4 w-4 text-[#a65d2e]" /><h3 className="text-lg font-semibold">注意事項</h3></div>
                <div className="space-y-6 text-sm leading-7 text-slate-700">
                  <div>
                    <div className="mb-2 text-base font-semibold text-[#173c2e]">🇻🇳 越南行前守則：大家一起留意！</div>
                  </div>

                  <div className="rounded-2xl bg-[#faf5eb] p-4">
                    <div className="mb-2 font-semibold text-[#a65d2e]">⚠️ 路上推銷：不接、不拿、不點頭</div>
                    <p><span className="font-semibold text-slate-900">拒絕熱情陷阱：</span> 路上若有人遞椰子、要把扁擔套在你肩膀上拍照，或是蹲下要碰你的鞋子（擦鞋），請立刻移開腳步並堅定搖頭。一旦開始接觸，對方會索取高額費用。</p>
                    <p className="mt-3"><span className="font-semibold text-slate-900">路邊攤必殺價：</span> 在觀光區（如市集）買東西請務必殺價，建議從 5 到 6 折開始談，價格不滿意直接離開即可。</p>
                  </div>

                  <div className="rounded-2xl bg-[#faf5eb] p-4">
                    <div className="mb-2 font-semibold text-[#a65d2e]">🍹 飲食與水：甜度一律調整</div>
                    <p><span className="font-semibold text-slate-900">飲料必減甜：</span> 越南飲料（咖啡、果汁、茶）預設會加入大量煉乳或砂糖。為了健康，點餐時請一律交代「No sugar」（無糖）或「Less sugar」（微糖），不要喝原味的。</p>
                    <p className="mt-3"><span className="font-semibold text-slate-900">飲水安全：</span> 請堅持飲用瓶裝礦泉水。腸胃較敏感的人，盡量避開路邊攤來源不明的冰塊。</p>
                  </div>

                  <div className="rounded-2xl bg-[#faf5eb] p-4">
                    <div className="mb-2 font-semibold text-[#a65d2e]">🚦 交通安全：穩定直行</div>
                    <p><span className="font-semibold text-slate-900">過馬路心法：</span> 越南機車極多，過馬路時請保持穩定、緩慢地直行。切記「不要突然停下」或「突然奔跑」，讓機車騎士能預判你的位置並自動繞開你。</p>
                  </div>

                  <div className="rounded-2xl bg-[#faf5eb] p-4">
                    <div className="mb-2 font-semibold text-[#a65d2e]">💰 金錢細節：看清「0」的數量</div>
                    <p><span className="font-semibold text-slate-900">付款前確認：</span> 越南盾面額大、零很多。簡易換算：去掉後面三個 0，再乘以 1.3，就是大約的台幣金額。</p>
                    <p className="mt-3"><span className="font-semibold text-slate-900">財不露白：</span> 在人潮擁擠處（夜市、景點）請留意隨身包包；在路邊滑手機時請務必拿穩，防範飛車搶奪。</p>
                  </div>

                  <div className="rounded-2xl bg-[#faf5eb] p-4">
                    <div className="mb-2 font-semibold text-[#a65d2e]">🔌 其他生活小撇步</div>
                    <p><span className="font-semibold text-slate-900">插座與電壓：</span> 越南電壓為 220V。插座多為兩孔平插，一般手機、平板充電器可直接使用。</p>
                    <p className="mt-3"><span className="font-semibold text-slate-900">隨身面紙：</span> 許多在地小吃店不提供衛生紙（或需額外收費），建議包包裡隨時備著一兩包小面紙。</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="websites" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><Globe className="h-4 w-4 text-[#1f5a43]" /><h3 className="text-lg font-semibold">實用網站</h3></div>
                <div className="space-y-3">{usefulSites.map((site) => <div key={site.name} className="rounded-2xl border border-[#e4d8bf] bg-white p-4"><div className="font-medium text-slate-900">{site.name}</div><div className="mt-1 text-sm text-[#1f5a43]">{site.desc}</div><div className="mt-2 text-sm leading-6 text-slate-600">{site.detail}</div><a
                        href={site.url}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f5a43] underline underline-offset-4"
                      >
                        點我前往
                        <ExternalLink className="h-4 w-4" />
                      </a></div>)}</div>
              </CardContent>
            </Card>

            <Card id="language" className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-900"><Languages className="h-4 w-4 text-[#1f5a43]" /><h3 className="text-lg font-semibold">越南語</h3></div>
                <div className="space-y-3">{phraseList.map((item) => <div key={item.zh} className="rounded-2xl bg-[#faf5eb] p-3"><div className="text-sm font-medium text-slate-900">{item.zh}</div><div className="text-sm text-[#1f5a43]">{item.vn}</div></div>)}</div>
              </CardContent>
            </Card>
          </div>
        </SectionAnchor>

        <SectionAnchor id="itinerary" title="行程安排" icon={CalendarDays}>
          <div className="space-y-5">
            {itineraryDays.map((day, index) => (
              <Card key={day.id} id={day.id} className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]">
                <CardContent className="p-5">
                  <div className="mb-4"><div className="mb-2 inline-flex rounded-full bg-[#efe7d1] px-3 py-1 text-xs font-semibold text-[#1f5a43]">Day {index + 1}</div><h3 className="text-xl font-bold text-[#173c2e]">{day.title}</h3><p className="mt-1 text-sm text-slate-600">{day.subtitle}</p></div>
                  <div className="space-y-3">
                    {day.items.map((item, itemIndex) => {
                      const itemKey = `${day.id}-${itemIndex}`;
                      const isOpen = !!expandedItems[itemKey];
                      return (
                        <div key={itemKey} className={`overflow-hidden rounded-2xl border border-[#e4d8bf] bg-white shadow-sm ${item.isBooked ? 'relative before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[#9b3d35]' : ''}`}>
                          <button
                            type="button"
                            onClick={() => toggleItineraryItem(itemKey)}
                            className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#faf5eb]"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9f1eb] text-sm font-bold text-[#1f5a43]">
                              {itemIndex + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[#f7efd9] px-2.5 py-1 text-xs font-semibold text-[#7a4a1d]">
                                  {item.purpose}
                                </span>
                                <span className={`truncate text-base font-semibold ${item.isBooked ? 'text-[#9b3d35]' : 'text-slate-900'}`}>{item.title}</span>
                                {item.isBooked && (
                                  <span className="rounded-full bg-[#fbf1ef] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#9b3d35]">
                                    已預約
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isOpen && (
                            <div className="border-t border-[#efe7d1] bg-[#fffdf9] px-4 pb-4 pt-3">
                              <div className="pl-[3.25rem]">
                                <div className={`mb-2 text-xs font-semibold tracking-[0.16em] ${item.isBooked ? 'text-[#9b3d35]' : 'text-[#1f5a43]'}`}>{item.time}</div>
                                <p className="text-sm leading-6 text-slate-600">{item.summary}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    className="rounded-2xl bg-[#12372a] text-white hover:bg-[#0f2f24]"
                                    onClick={() => window.open(item.mapUrl, '_blank', 'noopener,noreferrer')}
                                  >
                                    <MapPin className="mr-2 h-4 w-4" />
                                    Google Maps
                                  </Button>
                                  {item.relatedSpotIds?.map((spotId) => <JumpButton key={spotId} label={spotMap[spotId]?.name || '景點'} targetId={spotId} />)}
                                  {item.relatedFoodIds?.map((foodId) => <JumpButton key={foodId} label={foodMap[foodId]?.name || '美食'} targetId={foodId} />)}
                                  {item.relatedSpaIds?.map((spaId) => <JumpButton key={spaId} label={spaMap[spaId]?.name || '按摩'} targetId={spaId} />)}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionAnchor>

        <SectionAnchor id="spots" title="景點" icon={Landmark}>
          <div className="mb-5 overflow-x-auto"><div className="flex min-w-max gap-2 pb-1">{spots.map((spot) => <button key={spot.id} onClick={() => scrollToId(spot.id)} className="rounded-full border border-[#e4d8bf] bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-700 transition hover:border-[#d4b36a] hover:bg-[#f7efd9] hover:text-[#1f5a43]">{spot.name}</button>)}</div></div>
          <div className="grid gap-4">{spots.map((spot) => <Card key={spot.id} id={spot.id} className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]"><CardContent className="p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="text-lg font-semibold text-slate-900">{spot.name}</h3><p className="mt-1 text-sm text-slate-500">{spot.district}</p></div><Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-2xl border-[#d8ccb3]"
                                    onClick={() => window.open(spot.mapUrl, '_blank', 'noopener,noreferrer')}
                                  >
                                    <MapPin className="mr-2 h-4 w-4" />
                                    地圖
                                  </Button></div><p className="mt-4 text-sm leading-6 text-slate-600">{spot.summary}</p><div className="mt-4 flex flex-wrap gap-2">{spot.tags.map((tag) => <Badge key={tag} variant="secondary" className="rounded-full bg-[#f3ecdb] text-[#5f5a4f]">{tag}</Badge>)}</div></CardContent></Card>)}</div>
        </SectionAnchor>

        <SectionAnchor id="food" title="美食" icon={UtensilsCrossed}>
          <div className="mb-5 overflow-x-auto"><div className="flex min-w-max gap-2 pb-1">{foods.map((food) => <button key={food.id} onClick={() => scrollToId(food.id)} className="rounded-full border border-[#e4d8bf] bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-700 transition hover:border-[#d4b36a] hover:bg-[#f7efd9] hover:text-[#1f5a43]">{food.name}</button>)}</div></div>
          <div className="grid gap-4">{foods.map((food) => <Card key={food.id} id={food.id} className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]"><CardContent className="p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="text-lg font-semibold text-slate-900">{food.name}</h3><p className="mt-1 text-sm text-slate-500">{food.area}</p></div><Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-2xl border-[#d8ccb3]"
                                    onClick={() => window.open(food.mapUrl, '_blank', 'noopener,noreferrer')}
                                  ><MapPin className="mr-2 h-4 w-4" />地圖</Button></div><p className="mt-4 text-sm leading-6 text-slate-600">{food.summary}</p><div className="mt-4 flex flex-wrap gap-2">{food.tags.map((tag) => <Badge key={tag} variant="secondary" className="rounded-full bg-[#e9f1eb] text-[#1f5a43]">{tag}</Badge>)}</div>{food.menuUrl ? (<div className="mt-4"><a href={food.menuUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2f24]"><ExternalLink className="h-4 w-4" />查看菜單與翻譯</a></div>) : null}</CardContent></Card>)}</div>
        </SectionAnchor>

        <SectionAnchor id="spa" title="按摩" icon={Heart}>
          <div className="mb-5 overflow-x-auto"><div className="flex min-w-max gap-2 pb-1">{spaPlaces.map((spa) => <button key={spa.id} onClick={() => scrollToId(spa.id)} className="rounded-full border border-[#e4d8bf] bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-700 transition hover:border-[#d4b36a] hover:bg-[#f7efd9] hover:text-[#1f5a43]">{spa.name}</button>)}</div></div>
          <div className="grid gap-4">{spaPlaces.map((spa) => <Card key={spa.id} id={spa.id} className="scroll-mt-40 rounded-3xl border-0 shadow-[0_10px_30px_rgba(18,55,42,0.06)] ring-1 ring-[#e4d8bf]"><CardContent className="p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="text-lg font-semibold text-slate-900">{spa.name}</h3><p className="mt-1 text-sm text-slate-500">{spa.area}</p></div><Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-2xl border-[#d8ccb3]"
                                    onClick={() => window.open(spa.mapUrl, '_blank', 'noopener,noreferrer')}
                                  ><MapPin className="mr-2 h-4 w-4" />地圖</Button></div><p className="mt-4 text-sm leading-6 text-slate-600">{spa.summary}</p><div className="mt-4 flex flex-wrap gap-2">{spa.tags.map((tag) => <Badge key={tag} variant="secondary" className="rounded-full bg-[#f3ecdb] text-[#5f5a4f]">{tag}</Badge>)}</div><div className="mt-5 rounded-2xl border border-[#e4d8bf] bg-[#faf5eb] p-4"><div className="mb-3 text-sm font-semibold text-slate-900">📋 店家項目與翻譯</div>{spa.menuUrl ? (<a href={spa.menuUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f2f24]"><ExternalLink className="h-4 w-4" />查看項目與翻譯</a>) : (<p className="text-sm text-slate-400">網址尚未填入，請在 spaPlaces 資料中加上 menuUrl</p>)}</div></CardContent></Card>)}</div>
        </SectionAnchor>
      </main>
    </div>
  );
}
