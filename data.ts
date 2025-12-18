import { Level } from './types';

export const GAME_LEVELS: Level[] = [
  // --- Database Challenge Levels (1-4) ---
  {
    id: '1',
    title: '第一關：藥物交互作用挑戰',
    description: '有一名第二型糖尿病患者68歲男性使用insulin aspart中，近一週因泌尿道感染就診，請你進入圖書館Lexidrug使用相互作用這功能查詢以下以下哪種抗生素會與insulin aspart引起藥物交互作用：',
    type: 'choice',
    options: [
      'Levofloxacin',
      'Nitrofurantoin',
      'Cefixime',
      'Cephalexin'
    ],
    answer: 0
  },
  {
    id: '2',
    title: '第二關：臨床決策支援',
    description: '關於血糖控制，在Dynamed 中有關於 Insulin Therapy for Adults With Type 2 Diabetes 的資訊, 其中提到American Diabetes Association(ADA)對於HbA1c > 10% (86 mmol/mol) 或血糖值 ≥ 300 mg/dL (16.7mmol/L) 的病人，無論之前是否接受降血糖治療，均應立即開始施打胰島素進行治療, 其建議等級是',
    type: 'choice',
    options: ['ADA A級', 'ADA B級', 'ADA C級', 'ADA D級', 'ADA E級'],
    answer: 4
  },
  {
    id: '3',
    title: '第三關：PubMed 醫學文獻尋寶',
    description: '回到資料庫探險！你的任務是運用 PubMed，找出有關人工智慧(AI)介入對血糖控制(glycemic control)的有效性的一篇Meta Analysis文章，這篇文章於2025年8月刊登於Primary Care Diabetes這本期刊。請輸入該文章的DOI。',
    type: 'input',
    answer: [
      '10.1016/j.pcd.2025.05.004',
      'doi: 10.1016/j.pcd.2025.05.004',
      '10.1016/j.pcd.2025.05.004.',
      'doi: 10.1016/j.pcd.2025.05.004.'
    ]
  },
  {
    id: '4',
    title: '第四關：InCites JCR 期刊影響力評估',
    description: '前面查到的 Primary Care Diabetes 這本期刊不知道評價如何，聽說期刊有一個叫作影響指數(Impact Factor)的指標，請你利用Incites JCR 資料庫查查看這本期刊在2024年的IF(Impact Factor)是幾分? 它在PRIMARY HEALTH CARE這個領域，是屬於Ｑ幾的等級呢？',
    type: 'multiple_input',
    answers: ['2.3', 'Q2'],
    answer_placeholder: ['請輸入IF...', '請輸入Q等級...']
  },

  // --- Reality Adventure Levels (5-7) ---
  {
    id: '5',
    title: '第一關：圖書館尋寶',
    description: '歡迎來到我們的圖書館！請問，本館主要位於台中榮總的哪一棟大樓？',
       type: 'choice',
    options: ['急診大樓七樓', '教學大樓', '研究大樓'],
    answer: 0
  },
  {
    id: '6',
    title: '第二關：寧靜守護者',
    description: '為了大家的安寧，圖書館增設了「降躁艙」。請移動腳步尋找這台機器，感應NFC後取得4位數密碼。',
    type: 'input',
    answer: ['3915']
  },
  {
    id: '7',
    title: '第三關：自助服務新體驗',
    description: '圖書館重新整修後，引進了全新的「自助借書機」，讓借書更方便快速！請移動腳步尋找這台機器，感應NFC後取得4位數密碼。',
    type: 'input',
    answer: ['3915']
  },
];

export const DATABASE_LEVEL_IDS = ['1', '2', '3', '4'];
export const REALITY_LEVEL_IDS = ['5', '6', '7'];