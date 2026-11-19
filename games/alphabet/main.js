/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * まずはここから！ アルファベット - データ・4本線書き順SVG・男女交互音声読み上げロジック (games/alphabet/main.js)
 * ES Modules形式
 */

/**
 * アルファベット26文字データ（A〜Z）
 * - 文字（黄色枠：4本線なし・枠いっぱい表示）
 * - 発音記号・読み方
 * - 4本線の書き方＆書き順ガイド（読み方と「音をきく」の間に配置）
 * - 🔊 音をきく
 */
export const ALPHABET_LIST = [
  { number: 1, upper: 'A', lower: 'a', speech: 'a', ipa: '/eɪ/', kana: 'エイ' },
  { number: 2, upper: 'B', lower: 'b', speech: 'b', ipa: '/biː/', kana: 'ビー' },
  { number: 3, upper: 'C', lower: 'c', speech: 'c', ipa: '/siː/', kana: 'スィー' },
  { number: 4, upper: 'D', lower: 'd', speech: 'd', ipa: '/diː/', kana: 'ディー' },
  { number: 5, upper: 'E', lower: 'e', speech: 'e', ipa: '/iː/', kana: 'イー' },
  { number: 6, upper: 'F', lower: 'f', speech: 'f', ipa: '/ef/', kana: 'エフ' },
  { number: 7, upper: 'G', lower: 'g', speech: 'g', ipa: '/dʒiː/', kana: 'ヂィー（ジー）' },
  { number: 8, upper: 'H', lower: 'h', speech: 'h', ipa: '/eɪtʃ/', kana: 'エイチ' },
  { number: 9, upper: 'I', lower: 'i', speech: 'i', ipa: '/aɪ/', kana: 'アイ' },
  { number: 10, upper: 'J', lower: 'j', speech: 'j', ipa: '/dʒeɪ/', kana: 'ジェイ' },
  { number: 11, upper: 'K', lower: 'k', speech: 'k', ipa: '/keɪ/', kana: 'ケイ' },
  { number: 12, upper: 'L', lower: 'l', speech: 'l', ipa: '/el/', kana: 'エル' },
  { number: 13, upper: 'M', lower: 'm', speech: 'm', ipa: '/em/', kana: 'エム' },
  { number: 14, upper: 'N', lower: 'n', speech: 'n', ipa: '/en/', kana: 'エヌ' },
  { number: 15, upper: 'O', lower: 'o', speech: 'o', ipa: '/oʊ/', kana: 'オウ' },
  { number: 16, upper: 'P', lower: 'p', speech: 'p', ipa: '/piː/', kana: 'ピー' },
  { number: 17, upper: 'Q', lower: 'q', speech: 'q', ipa: '/kjuː/', kana: 'キュー' },
  { number: 18, upper: 'R', lower: 'r', speech: 'r', ipa: '/ɑːr/', kana: 'アール' },
  { number: 19, upper: 'S', lower: 's', speech: 's', ipa: '/es/', kana: 'エス' },
  { number: 20, upper: 'T', lower: 't', speech: 't', ipa: '/tiː/', kana: 'ティー' },
  { number: 21, upper: 'U', lower: 'u', speech: 'u', ipa: '/juː/', kana: 'ユー' },
  { number: 22, upper: 'V', lower: 'v', speech: 'vee', ipa: '/viː/', kana: 'ヴィー' },
  { number: 23, upper: 'W', lower: 'w', speech: 'w', ipa: '/ˈdʌbljuː/', kana: 'ダブリュー' },
  { number: 24, upper: 'X', lower: 'x', speech: 'x', ipa: '/eks/', kana: 'エックス' },
  { number: 25, upper: 'Y', lower: 'y', speech: 'y', ipa: '/waɪ/', kana: 'ワイ' },
  { number: 26, upper: 'Z', lower: 'z', speech: 'zee', ipa: '/ziː/', kana: 'ズィー' }
];

/**
 * 4本線（第1線 y=18, 第2線 y=42, 第3線[基準線] y=72, 第4線 y=94）上の書き順データ
 * 大文字（左側 x=30..90）と小文字（右側 x=135..195）の各画のSVGパスと開始番号座標 (nx, ny)
 */
export const FOUR_LINE_STROKES = {
  A: {
    upper: [
      { d: 'M 60 18 L 40 72', nx: 50, ny: 14 },
      { d: 'M 60 18 L 80 72', nx: 70, ny: 14 },
      { d: 'M 46 53 L 74 53', nx: 36, ny: 53 }
    ],
    lower: [
      { d: 'M 176 48 C 166 39, 146 42, 146 57 C 146 72, 166 74, 176 64', nx: 164, ny: 34 },
      { d: 'M 176 42 L 176 72', nx: 186, ny: 40 }
    ]
  },
  B: {
    upper: [
      { d: 'M 44 18 L 44 72', nx: 33, ny: 18 },
      { d: 'M 44 18 L 64 18 C 78 18, 78 44, 62 44 L 44 44 L 65 44 C 80 44, 80 72, 64 72 L 44 72', nx: 58, ny: 12 }
    ],
    lower: [
      { d: 'M 148 18 L 148 72', nx: 137, ny: 18 },
      { d: 'M 148 50 C 156 40, 178 42, 178 57 C 178 72, 156 74, 148 64', nx: 164, ny: 35 }
    ]
  },
  C: {
    upper: [
      { d: 'M 78 27 C 68 15, 40 18, 40 45 C 40 72, 68 75, 78 63', nx: 84, ny: 20 }
    ],
    lower: [
      { d: 'M 176 49 C 168 40, 148 42, 148 57 C 148 72, 168 74, 176 65', nx: 182, ny: 42 }
    ]
  },
  D: {
    upper: [
      { d: 'M 44 18 L 44 72', nx: 33, ny: 18 },
      { d: 'M 44 18 L 58 18 C 84 18, 84 72, 58 72 L 44 72', nx: 58, ny: 12 }
    ],
    lower: [
      { d: 'M 176 50 C 168 40, 146 42, 146 57 C 146 72, 168 74, 176 64', nx: 160, ny: 35 },
      { d: 'M 176 18 L 176 72', nx: 186, ny: 18 }
    ]
  },
  E: {
    upper: [
      { d: 'M 44 18 L 44 72', nx: 33, ny: 18 },
      { d: 'M 44 18 L 76 18', nx: 60, ny: 11 },
      { d: 'M 44 44 L 70 44', nx: 80, ny: 44 },
      { d: 'M 44 72 L 76 72', nx: 84, ny: 72 }
    ],
    lower: [
      { d: 'M 148 56 L 176 56 C 176 40, 148 40, 148 57 C 148 72, 168 74, 176 66', nx: 138, ny: 56 }
    ]
  },
  F: {
    upper: [
      { d: 'M 46 18 L 46 72', nx: 35, ny: 18 },
      { d: 'M 46 18 L 76 18', nx: 62, ny: 11 },
      { d: 'M 46 44 L 70 44', nx: 80, ny: 44 }
    ],
    lower: [
      { d: 'M 174 24 C 170 16, 158 17, 158 28 L 158 72', nx: 182, ny: 20 },
      { d: 'M 146 42 L 172 42', nx: 136, ny: 42 }
    ]
  },
  G: {
    upper: [
      { d: 'M 78 27 C 66 15, 40 18, 40 45 C 40 72, 74 75, 78 55 L 78 46', nx: 84, ny: 20 },
      { d: 'M 62 46 L 80 46', nx: 52, ny: 46 }
    ],
    lower: [
      { d: 'M 176 49 C 166 40, 146 42, 146 57 C 146 72, 166 74, 176 64', nx: 160, ny: 35 },
      { d: 'M 176 42 L 176 82 C 176 95, 154 96, 148 87', nx: 186, ny: 42 }
    ]
  },
  H: {
    upper: [
      { d: 'M 42 18 L 42 72', nx: 31, ny: 18 },
      { d: 'M 42 44 L 76 44', nx: 59, ny: 34 },
      { d: 'M 76 18 L 76 72', nx: 86, ny: 18 }
    ],
    lower: [
      { d: 'M 148 18 L 148 72', nx: 137, ny: 18 },
      { d: 'M 148 52 C 154 41, 174 41, 174 53 L 174 72', nx: 164, ny: 34 }
    ]
  },
  I: {
    upper: [
      { d: 'M 46 18 L 74 18', nx: 36, ny: 18 },
      { d: 'M 60 18 L 60 72', nx: 60, ny: 9 },
      { d: 'M 46 72 L 74 72', nx: 36, ny: 72 }
    ],
    lower: [
      { d: 'M 162 28 L 162 31', nx: 174, ny: 28 },
      { d: 'M 162 42 L 162 72', nx: 150, ny: 44 }
    ]
  },
  J: {
    upper: [
      { d: 'M 68 18 L 68 58 C 68 73, 46 74, 42 61', nx: 78, ny: 18 }
    ],
    lower: [
      { d: 'M 166 28 L 166 31', nx: 178, ny: 28 },
      { d: 'M 166 42 L 166 83 C 166 95, 148 95, 144 86', nx: 154, ny: 44 }
    ]
  },
  K: {
    upper: [
      { d: 'M 44 18 L 44 72', nx: 33, ny: 18 },
      { d: 'M 76 18 L 44 47', nx: 84, ny: 18 },
      { d: 'M 54 39 L 78 72', nx: 68, ny: 45 }
    ],
    lower: [
      { d: 'M 148 18 L 148 72', nx: 137, ny: 18 },
      { d: 'M 174 42 L 148 59', nx: 182, ny: 40 },
      { d: 'M 157 53 L 176 72', nx: 174, ny: 58 }
    ]
  },
  L: {
    upper: [
      { d: 'M 46 18 L 46 72', nx: 35, ny: 18 },
      { d: 'M 46 72 L 76 72', nx: 62, ny: 83 }
    ],
    lower: [
      { d: 'M 162 18 L 162 72', nx: 150, ny: 18 }
    ]
  },
  M: {
    upper: [
      { d: 'M 36 18 L 36 72', nx: 26, ny: 18 },
      { d: 'M 36 18 L 60 72 L 84 18', nx: 48, ny: 11 },
      { d: 'M 84 18 L 84 72', nx: 94, ny: 18 }
    ],
    lower: [
      { d: 'M 138 42 L 138 72', nx: 128, ny: 42 },
      { d: 'M 138 51 C 143 41, 160 41, 160 52 L 160 72', nx: 150, ny: 34 },
      { d: 'M 160 51 C 165 41, 182 41, 182 52 L 182 72', nx: 174, ny: 34 }
    ]
  },
  N: {
    upper: [
      { d: 'M 42 18 L 42 72', nx: 31, ny: 18 },
      { d: 'M 42 18 L 78 72 L 78 18', nx: 54, ny: 12 }
    ],
    lower: [
      { d: 'M 148 42 L 148 72', nx: 137, ny: 42 },
      { d: 'M 148 52 C 154 41, 174 41, 174 53 L 174 72', nx: 164, ny: 34 }
    ]
  },
  O: {
    upper: [
      { d: 'M 60 18 C 36 18, 36 72, 60 72 C 84 72, 84 18, 60 18', nx: 60, ny: 10 }
    ],
    lower: [
      { d: 'M 162 42 C 142 42, 142 72, 162 72 C 182 72, 182 42, 162 42', nx: 162, ny: 33 }
    ]
  },
  P: {
    upper: [
      { d: 'M 44 18 L 44 72', nx: 33, ny: 18 },
      { d: 'M 44 18 L 64 18 C 80 18, 80 46, 64 46 L 44 46', nx: 58, ny: 11 }
    ],
    lower: [
      { d: 'M 148 42 L 148 94', nx: 137, ny: 44 },
      { d: 'M 148 50 C 156 40, 178 42, 178 57 C 178 72, 156 74, 148 64', nx: 164, ny: 34 }
    ]
  },
  Q: {
    upper: [
      { d: 'M 60 18 C 36 18, 36 72, 60 72 C 84 72, 84 18, 60 18', nx: 60, ny: 10 },
      { d: 'M 63 56 L 80 75', nx: 86, ny: 64 }
    ],
    lower: [
      { d: 'M 176 50 C 166 40, 146 42, 146 57 C 146 72, 166 74, 176 64', nx: 160, ny: 34 },
      { d: 'M 176 42 L 176 94', nx: 186, ny: 44 }
    ]
  },
  R: {
    upper: [
      { d: 'M 44 18 L 44 72', nx: 33, ny: 18 },
      { d: 'M 44 18 L 64 18 C 80 18, 80 46, 64 46 L 44 46', nx: 58, ny: 11 },
      { d: 'M 58 46 L 78 72', nx: 74, ny: 53 }
    ],
    lower: [
      { d: 'M 152 42 L 152 72', nx: 141, ny: 42 },
      { d: 'M 152 54 C 156 42, 168 41, 176 45', nx: 166, ny: 34 }
    ]
  },
  S: {
    upper: [
      { d: 'M 75 26 C 68 15, 42 16, 42 31 C 42 48, 78 42, 78 60 C 78 74, 50 75, 42 64', nx: 83, ny: 20 }
    ],
    lower: [
      { d: 'M 174 48 C 168 40, 148 41, 148 50 C 148 59, 176 56, 176 65 C 176 73, 154 74, 148 66', nx: 182, ny: 42 }
    ]
  },
  T: {
    upper: [
      { d: 'M 60 18 L 60 72', nx: 49, ny: 30 },
      { d: 'M 38 18 L 82 18', nx: 38, ny: 10 }
    ],
    lower: [
      { d: 'M 162 24 L 162 72', nx: 151, ny: 24 },
      { d: 'M 146 42 L 178 42', nx: 136, ny: 42 }
    ]
  },
  U: {
    upper: [
      { d: 'M 42 18 L 42 54 C 42 75, 78 75, 78 54 L 78 18', nx: 31, ny: 18 }
    ],
    lower: [
      { d: 'M 148 42 L 148 60 C 148 74, 168 74, 174 62', nx: 137, ny: 42 },
      { d: 'M 174 42 L 174 72', nx: 184, ny: 42 }
    ]
  },
  V: {
    upper: [
      { d: 'M 40 18 L 60 72 L 80 18', nx: 31, ny: 18 }
    ],
    lower: [
      { d: 'M 146 42 L 162 72 L 178 42', nx: 137, ny: 42 }
    ]
  },
  W: {
    upper: [
      { d: 'M 32 18 L 45 72 L 60 32 L 75 72 L 88 18', nx: 23, ny: 18 }
    ],
    lower: [
      { d: 'M 138 42 L 149 72 L 162 49 L 175 72 L 186 42', nx: 129, ny: 42 }
    ]
  },
  X: {
    upper: [
      { d: 'M 42 18 L 78 72', nx: 32, ny: 18 },
      { d: 'M 78 18 L 42 72', nx: 88, ny: 18 }
    ],
    lower: [
      { d: 'M 148 42 L 176 72', nx: 138, ny: 42 },
      { d: 'M 176 42 L 148 72', nx: 186, ny: 42 }
    ]
  },
  Y: {
    upper: [
      { d: 'M 40 18 L 60 46', nx: 30, ny: 18 },
      { d: 'M 80 18 L 60 46', nx: 90, ny: 18 },
      { d: 'M 60 46 L 60 72', nx: 72, ny: 56 }
    ],
    lower: [
      { d: 'M 148 42 L 162 72', nx: 138, ny: 42 },
      { d: 'M 176 42 L 152 94', nx: 186, ny: 42 }
    ]
  },
  Z: {
    upper: [
      { d: 'M 42 18 L 78 18', nx: 32, ny: 18 },
      { d: 'M 78 18 L 42 72', nx: 86, ny: 26 },
      { d: 'M 42 72 L 78 72', nx: 62, ny: 84 }
    ],
    lower: [
      { d: 'M 148 42 L 176 42', nx: 138, ny: 42 },
      { d: 'M 176 42 L 148 72', nx: 185, ny: 48 },
      { d: 'M 148 72 L 176 72', nx: 164, ny: 84 }
    ]
  }
};

/** 画数ごとのカラー設定（1画目:青、2画目:オレンジ、3画目:緑、4画目:紫） */
const STROKE_COLORS = ['#2563EB', '#EA580C', '#059669', '#7C3AED'];

/**
 * 4本線（ペンマンシップ）と書き順（番号＋矢印）を描画するSVGマークアップを生成
 * @param {string} upperChar - 'A'〜'Z'
 */
export function buildFourLineStrokeSvg(upperChar) {
  const strokeData = FOUR_LINE_STROKES[upperChar];
  if (!strokeData) return '';

  const renderLetterStrokes = (strokes) =>
    strokes
      .map((s, idx) => {
        const color = STROKE_COLORS[idx % STROKE_COLORS.length];
        const markerId = `arrow-s${(idx % STROKE_COLORS.length) + 1}`;
        const strokeNum = idx + 1;
        return `
          <path
            d="${s.d}"
            fill="none"
            stroke="${color}"
            stroke-width="3.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            marker-end="url(#${markerId})"
          />
          <circle cx="${s.nx}" cy="${s.ny}" r="6.5" fill="${color}" />
          <text
            x="${s.nx}"
            y="${s.ny + 3.2}"
            text-anchor="middle"
            fill="#FFFFFF"
            font-size="8.5"
            font-weight="900"
            font-family="Outfit, sans-serif"
          >${strokeNum}</text>
        `;
      })
      .join('');

  return `
    <svg class="fourline-svg" viewBox="0 0 216 104" aria-hidden="true">
      <defs>
        <marker id="arrow-s1" markerWidth="5" markerHeight="5" refX="3.6" refY="2.5" orient="auto">
          <path d="M0,0.5 L4.5,2.5 L0,4.5 Z" fill="#2563EB" />
        </marker>
        <marker id="arrow-s2" markerWidth="5" markerHeight="5" refX="3.6" refY="2.5" orient="auto">
          <path d="M0,0.5 L4.5,2.5 L0,4.5 Z" fill="#EA580C" />
        </marker>
        <marker id="arrow-s3" markerWidth="5" markerHeight="5" refX="3.6" refY="2.5" orient="auto">
          <path d="M0,0.5 L4.5,2.5 L0,4.5 Z" fill="#059669" />
        </marker>
        <marker id="arrow-s4" markerWidth="5" markerHeight="5" refX="3.6" refY="2.5" orient="auto">
          <path d="M0,0.5 L4.5,2.5 L0,4.5 Z" fill="#7C3AED" />
        </marker>
      </defs>

      <!-- 4本線（第1線・第2線[点線]・第3線[赤色の基準線]・第4線） -->
      <line x1="8" y1="18" x2="208" y2="18" stroke="#94A3B8" stroke-width="1.2" />
      <line x1="8" y1="42" x2="208" y2="42" stroke="#64748B" stroke-width="1.2" stroke-dasharray="4 3" />
      <line x1="8" y1="72" x2="208" y2="72" stroke="#EF4444" stroke-width="1.8" />
      <line x1="8" y1="94" x2="208" y2="94" stroke="#94A3B8" stroke-width="1.2" />

      <!-- 中央の区切り線 -->
      <line x1="112" y1="12" x2="112" y2="98" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="2 2" />

      <!-- 大文字・小文字の書き順パス -->
      ${renderLetterStrokes(strokeData.upper)}
      ${renderLetterStrokes(strokeData.lower)}
    </svg>
  `;
}

/**
 * アルファベット解説動画データ（Day 3）
 */
export const ALPHABET_VIDEO_LIST = [
  {
    id: 'hUQpXHtVzdI',
    badge: 'Day 3',
    title: '【Onigiri English】Day3 文字 / alphabet',
    desc: 'アルファベットの大文字・小文字と読み方の基本を動画で楽しくチェックしよう！',
    url: 'https://youtu.be/hUQpXHtVzdI?si=fy3At03i0j6E8mPV',
    thumb: 'https://i.ytimg.com/vi/hUQpXHtVzdI/hqdefault.jpg'
  }
];

/** 音声読み上げのスピード倍率（0.5, 0.8, 1.0） */
let playbackSpeedMultiplier = 1.0;

/** クリックごとの女性・男性トグル管理（初回は女性） */
let isNextVoiceFemale = true;

/** 再生キャンセル用セッションID */
let activePlaybackSessionId = 0;

/** クロスプラットフォーム最適音声キャッシュ */
let cachedVoices = {
  female: null,
  male: null
};

/**
 * en-US 音声かどうかを判定
 * @param {SpeechSynthesisVoice} voice
 */
function isEnUsVoice(voice) {
  if (!voice || !voice.lang) return false;
  const lang = voice.lang.replace('_', '-').toLowerCase();
  return lang === 'en-us' || lang.startsWith('en-us');
}

/**
 * 端末・ブラウザの音声リストから最適な女性音声（Voice A）・男性音声（Voice B）を選定
 */
export function resolveCrossPlatformVoices() {
  if (!('speechSynthesis' in window)) return;

  const allVoices = window.speechSynthesis.getVoices();
  if (!allVoices || allVoices.length === 0) return;

  const enUsVoices = allVoices.filter(isEnUsVoice);
  const allEnVoices = allVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const femalePool = enUsVoices.length > 0 ? enUsVoices : allEnVoices;

  const maleNamePattern = /\b(male|david|guy|mark|alex|daniel|oliver|george|fred|tom|aaron|reed|evan|nathan|roger|steffan|christopher|eric|andrew|brian)\b|en-us-x-(iom|sfg|tpd)/i;
  const femaleNamePattern = /\b(female|zira|samantha|victoria|karen|jenny|aria|ava|allison|susan|fiona|cora|michelle|monica)\b/i;

  const femaleVoice =
    femalePool.find(v => v.name.includes('Google US English') && !maleNamePattern.test(`${v.name} ${v.voiceURI}`)) ||
    femalePool.find(v => v.name.includes('Samantha')) ||
    femalePool.find(v =>
      (v.name.includes('Microsoft Zira') ||
        v.name.includes('Jenny') ||
        v.name.includes('Aria') ||
        (v.name.includes('Natural') && !maleNamePattern.test(v.name)))
    ) ||
    femalePool.find(v => femaleNamePattern.test(`${v.name} ${v.voiceURI}`)) ||
    femalePool.find(v => !maleNamePattern.test(`${v.name} ${v.voiceURI}`) && v.default) ||
    femalePool.find(v => !maleNamePattern.test(`${v.name} ${v.voiceURI}`)) ||
    femalePool[0] ||
    null;

  const maleVoice =
    enUsVoices.find(v => v.name.includes('Google US English') && maleNamePattern.test(`${v.name} ${v.voiceURI}`)) ||
    enUsVoices.find(v =>
      v.name.includes('Microsoft David') ||
      v.name.includes('Microsoft Guy') ||
      v.name.includes('Microsoft Mark') ||
      (v.name.includes('Natural') && maleNamePattern.test(v.name))
    ) ||
    enUsVoices.find(v => /\b(alex|aaron|tom|fred|evan|nathan|reed|david|guy|mark)\b/i.test(v.name)) ||
    enUsVoices.find(v => maleNamePattern.test(`${v.name} ${v.voiceURI}`)) ||
    allEnVoices.find(v => v.name.includes('Google UK English Male')) ||
    allEnVoices.find(v => maleNamePattern.test(`${v.name} ${v.voiceURI}`)) ||
    enUsVoices.find(v => v !== femaleVoice && v.localService) ||
    enUsVoices.find(v => v.localService) ||
    femaleVoice ||
    null;

  cachedVoices.female = femaleVoice;
  cachedVoices.male = maleVoice;
}

/**
 * 発音記号（IPA）の末尾が子音かどうかを判定
 * @param {string} ipa
 */
function endsWithConsonantIpa(ipa = '') {
  const cleanIpa = ipa.replace(/^\/|\/$/g, '').trim();
  return /[pbtdkgɡfvθðszʃʒmnŋlr]$/i.test(cleanIpa);
}

/**
 * クリックごとに女性 ➔ 男性 ➔ 女性... と交互に切り替わる音声設定を取得
 * @param {boolean} [hasFinalConsonant=false]
 */
function getNextVoiceSettings(hasFinalConsonant = false) {
  resolveCrossPlatformVoices();

  const isFemale = isNextVoiceFemale;
  isNextVoiceFemale = !isNextVoiceFemale;

  const selectedVoice = isFemale ? cachedVoices.female : (cachedVoices.male || cachedVoices.female);
  const isDistinctMaleVoice = !isFemale && cachedVoices.male && cachedVoices.male !== cachedVoices.female;

  const BASE_RATE = hasFinalConsonant ? 0.86 : 0.90;
  const calculatedRate = Math.round(BASE_RATE * playbackSpeedMultiplier * 100) / 100;

  // 女性デフォルトピッチ: 0.95 / 男性ピッチ: 専用男性ボイスは1.06（単一音声フォールバック時は0.85）
  const targetPitch = isFemale ? 0.95 : (isDistinctMaleVoice ? 1.06 : 0.85);

  return {
    isFemale,
    voice: selectedVoice,
    pitch: targetPitch,
    rate: calculatedRate
  };
}

/**
 * アルファベット1文字の音声再生（クリックごとに男女交互）
 * @param {object} item - アルファベットデータ
 * @param {HTMLElement} cardElem - クリックされたカード要素
 */
export function speakAlphabet(item, cardElem) {
  if (!('speechSynthesis' in window) || !item) return;

  activePlaybackSessionId += 1;
  const sessionId = activePlaybackSessionId;

  window.speechSynthesis.cancel();
  document.querySelectorAll('.alphabet-item-card.playing').forEach((el) => {
    el.classList.remove('playing');
  });

  const hasFinalConsonant = endsWithConsonantIpa(item.ipa);
  const voiceSettings = getNextVoiceSettings(hasFinalConsonant);

  // ピリオド（.）を付けず空白パディングのみ付与し、単一文字（f, a 等）や vee / zee を正確に発音させる
  const spokenText = `${item.speech}   `;
  const utterance = new SpeechSynthesisUtterance(spokenText);

  utterance.lang = (voiceSettings.voice && voiceSettings.voice.lang) ? voiceSettings.voice.lang : 'en-US';
  utterance.rate = voiceSettings.rate;
  utterance.pitch = voiceSettings.pitch;
  utterance.volume = 1.0;

  if (voiceSettings.voice) {
    utterance.voice = voiceSettings.voice;
  }

  if (cardElem) {
    cardElem.classList.add('playing');
  }

  const cleanup = () => {
    if (sessionId === activePlaybackSessionId && cardElem) {
      cardElem.classList.remove('playing');
    }
  };

  utterance.onend = cleanup;
  utterance.onerror = cleanup;
  setTimeout(cleanup, 2400);

  window.speechSynthesis.speak(utterance);
}

/**
 * アルファベット一覧リストを描画
 * （文字[黄色枠いっぱい]・発音記号＆読み方・4本線書き順ガイド・音をきくボタン）
 */
export function renderAlphabetList() {
  const container = document.getElementById('alphabetCardsContainer');
  if (!container) return;

  container.innerHTML = '';

  ALPHABET_LIST.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'alphabet-item-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute(
      'aria-label',
      `${item.number}番 アルファベット ${item.upper}（${item.kana}）、発音記号 ${item.ipa}。クリックして発音をきく`
    );

    const fourLineSvgHtml = buildFourLineStrokeSvg(item.upper);

    card.innerHTML = `
      <div class="alphabet-card-left">
        <span class="alphabet-number-badge" aria-label="番号 ${item.number}">${item.number}</span>
        <div class="alphabet-letter-box" aria-hidden="true">
          <span class="alphabet-upper">${item.upper}</span>
          <span class="alphabet-lower">${item.lower}</span>
        </div>
        <div class="alphabet-reading-row">
          <span class="alphabet-ipa-badge">${item.ipa}</span>
          <span class="alphabet-kana-badge">${item.kana}</span>
        </div>
      </div>

      <div class="alphabet-fourline-wrap" aria-label="${item.upper} と ${item.lower} の4本線を使った書き方">
        <div class="fourline-header">
          <span>✏️ 4本線を使った書き方</span>
          <button
            type="button"
            class="practice-launch-btn"
            aria-label="${item.upper} と ${item.lower} のかく練習をする！"
          >
            <span>✨</span>
            <span>かく練習をする！</span>
          </button>
        </div>
        ${fourLineSvgHtml}
      </div>

      <span class="alphabet-sound-action" aria-hidden="true">
        <span>🔊</span>
        <span>音をきく</span>
      </span>
    `;

    const practiceBtn = card.querySelector('.practice-launch-btn');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openPracticeModal(item);
      });
    }

    card.addEventListener('click', (e) => {
      if (e.target && e.target.closest('.practice-launch-btn')) return;
      speakAlphabet(item, card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.target && e.target.closest('.practice-launch-btn')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        speakAlphabet(item, card);
      }
    });

    container.appendChild(card);
  });
}

/**
 * SVGパス文字列 ('M ... L ... C ...') から高密度サンプル点列 [{x, y}] を生成
 * @param {string} pathData
 */
function samplePointsFromSvgPath(pathData) {
  const svgNs = 'http://www.w3.org/2000/svg';
  const tempSvg = document.createElementNS(svgNs, 'svg');
  const tempPath = document.createElementNS(svgNs, 'path');
  tempPath.setAttribute('d', pathData);
  tempSvg.appendChild(tempPath);

  tempSvg.style.position = 'absolute';
  tempSvg.style.width = '0';
  tempSvg.style.height = '0';
  tempSvg.style.opacity = '0';
  tempSvg.style.pointerEvents = 'none';
  document.body.appendChild(tempSvg);

  const totalLen = tempPath.getTotalLength();
  const points = [];

  if (totalLen < 2.5) {
    // 'i' や 'j' の点などの極小ストローク
    const p0 = tempPath.getPointAtLength(0);
    const p1 = tempPath.getPointAtLength(totalLen);
    points.push({ x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2, isDot: true });
  } else {
    const step = 1.6;
    const count = Math.max(8, Math.ceil(totalLen / step));
    for (let i = 0; i <= count; i++) {
      const pt = tempPath.getPointAtLength((i / count) * totalLen);
      points.push({ x: pt.x, y: pt.y, isDot: false });
    }
  }

  document.body.removeChild(tempSvg);
  return points;
}

/** 書き方練習モーダルの状態管理 */
let practiceState = {
  isOpen: false,
  item: null,
  roundIndex: 0, // 0, 1, 2 (全3回)
  strokes: [], // [{ d, points: [{x,y,isDot}], progressIndex: 0, completed: false }]
  activeStrokeIdx: 0,
  isPointerDown: false,
  isRoundTransitioning: false,
  sparkles: [], // [{ x, y, vx, vy, size, alpha, color, rotation, vRot }]
  animFrameId: null,
  timers: []
};

const SPARKLE_PALETTE = ['#F59E0B', '#FBBF24', '#FEF08A', '#FF7E36', '#EC4899', '#38BDF8', '#A855F7'];

/**
 * キラキラ粒子を追加生成（SVG論理座標系 x: 0..216, y: 0..104）
 */
function spawnSparklesAt(svgX, svgY, count = 5) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.25 + Math.random() * 1.15;
    practiceState.sparkles.push({
      x: svgX + (Math.random() - 0.5) * 3.5,
      y: svgY + (Math.random() - 0.5) * 3.5,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.2,
      size: 1.8 + Math.random() * 2.6,
      alpha: 1.0,
      decay: 0.022 + Math.random() * 0.025,
      color: SPARKLE_PALETTE[Math.floor(Math.random() * SPARKLE_PALETTE.length)],
      rotation: Math.random() * Math.PI,
      vRot: (Math.random() - 0.5) * 0.14
    });
  }
}

/**
 * 指定アルファベットの大文字＋小文字ストローク配列を構築
 */
function buildPracticeStrokesForLetter(upperChar) {
  const data = FOUR_LINE_STROKES[upperChar];
  if (!data) return [];

  const combined = [...data.upper, ...data.lower];
  return combined.map((stroke) => {
    const pts = samplePointsFromSvgPath(stroke.d);
    return {
      d: stroke.d,
      points: pts,
      progressIndex: -1, // -1: 未着手, 0..points.length-1: 進行中
      completed: false
    };
  });
}

/**
 * 4つ星（キラキラ）シェイプをCanvasに描画
 */
function drawFourPointStar(ctx, cx, cy, outerR, innerR, rotation) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / 4;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * キャンバスの座標変換パラメータ（論理座標 216x104 をキャンバス中央に最大化配置）を取得
 */
function getPracticeCanvasTransform(canvas) {
  const cw = canvas.width;
  const ch = canvas.height;
  const logicalW = 216;
  const logicalH = 104;

  const scale = Math.min(cw / logicalW, ch / logicalH) * 0.92;
  const offsetX = (cw - logicalW * scale) / 2;
  const offsetY = (ch - logicalH * scale) / 2;

  return { scale, offsetX, offsetY, logicalW, logicalH };
}

/**
 * 練習キャンバスの描画ループ
 */
function renderPracticeCanvasFrame() {
  if (!practiceState.isOpen) return;

  const canvas = document.getElementById('practiceTraceCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const targetW = Math.max(1, Math.floor(rect.width * dpr));
  const targetH = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const { scale, offsetX, offsetY } = getPracticeCanvasTransform(canvas);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // 1. 4本線（ペンマンシップライン）を描画
  ctx.lineCap = 'round';

  // 第1線 (y=18)
  ctx.beginPath();
  ctx.moveTo(8, 18);
  ctx.lineTo(208, 18);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1.0;
  ctx.setLineDash([]);
  ctx.stroke();

  // 第2線 [点線] (y=42)
  ctx.beginPath();
  ctx.moveTo(8, 42);
  ctx.lineTo(208, 42);
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1.0;
  ctx.setLineDash([4, 3]);
  ctx.stroke();

  // 第3線 [赤色の基準線] (y=72)
  ctx.beginPath();
  ctx.moveTo(8, 72);
  ctx.lineTo(208, 72);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.6;
  ctx.setLineDash([]);
  ctx.stroke();

  // 第4線 (y=94)
  ctx.beginPath();
  ctx.moveTo(8, 94);
  ctx.lineTo(208, 94);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 1.0;
  ctx.setLineDash([]);
  ctx.stroke();

  // 中央の区切り線 (x=112)
  ctx.beginPath();
  ctx.moveTo(112, 10);
  ctx.lineTo(112, 98);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 0.9;
  ctx.setLineDash([2.5, 2.5]);
  ctx.stroke();
  ctx.setLineDash([]);

  // 2. 灰色のベース文字（大文字・小文字の全ストローク）を描画
  practiceState.strokes.forEach((stroke) => {
    const pts = stroke.points;
    if (!pts.length) return;

    ctx.save();
    ctx.strokeStyle = '#CBD5E1';
    ctx.fillStyle = '#CBD5E1';
    ctx.lineWidth = 6.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (pts[0].isDot) {
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 3.6, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();
  });

  // 3. なぞった部分（キラキラの線）を描画
  const now = performance.now();
  practiceState.strokes.forEach((stroke) => {
    const pts = stroke.points;
    if (!pts.length || stroke.progressIndex < 0) return;

    ctx.save();

    // 外側の黄金グロー
    const grad = ctx.createLinearGradient(20, 15, 195, 85);
    grad.addColorStop(0, '#F59E0B');
    grad.addColorStop(0.35, '#FBBF24');
    grad.addColorStop(0.65, '#FF7E36');
    grad.addColorStop(1, '#EC4899');

    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = grad;
    ctx.fillStyle = '#F59E0B';
    ctx.lineWidth = 6.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (pts[0].isDot) {
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 4.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 2.0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const endIdx = Math.min(stroke.progressIndex, pts.length - 1);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i <= endIdx; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // 内側の明るいハイライト芯線
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#FEF9C3';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // なぞった線の上にきらめく星を配置
      for (let i = 0; i <= endIdx; i += 7) {
        const p = pts[i];
        const pulse = 0.65 + 0.35 * Math.sin(now * 0.008 + i);
        ctx.fillStyle = i % 14 === 0 ? '#FFFFFF' : '#FDE047';
        drawFourPointStar(ctx, p.x, p.y, 2.7 * pulse, 1.0 * pulse, now * 0.003 + i);
      }
    }

    ctx.restore();
  });

  // 4. 現在なぞるべき位置のガイドマーカー（ぷるぷる光るスタート/現在地ガイド）
  if (
    !practiceState.isRoundTransitioning &&
    practiceState.activeStrokeIdx < practiceState.strokes.length
  ) {
    const activeStroke = practiceState.strokes[practiceState.activeStrokeIdx];
    const pts = activeStroke.points;
    if (pts.length > 0) {
      const targetIdx = Math.min(Math.max(0, activeStroke.progressIndex + 1), pts.length - 1);
      const targetPt = pts[targetIdx];
      const pulseR = 4.6 + 1.2 * Math.sin(now * 0.009);

      ctx.save();
      ctx.beginPath();
      ctx.arc(targetPt.x, targetPt.y, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 126, 54, 0.28)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(targetPt.x, targetPt.y, 3.1, 0, Math.PI * 2);
      ctx.fillStyle = '#FF7E36';
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
      ctx.restore();
    }
  }

  // 5. キラキラパーティクルの更新と描画
  for (let i = practiceState.sparkles.length - 1; i >= 0; i--) {
    const sp = practiceState.sparkles[i];
    sp.x += sp.vx;
    sp.y += sp.vy;
    sp.rotation += sp.vRot;
    sp.alpha -= sp.decay;

    if (sp.alpha <= 0) {
      practiceState.sparkles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, sp.alpha);
    ctx.fillStyle = sp.color;
    drawFourPointStar(ctx, sp.x, sp.y, sp.size, sp.size * 0.38, sp.rotation);
    ctx.restore();
  }

  ctx.restore();

  practiceState.animFrameId = requestAnimationFrame(renderPracticeCanvasFrame);
}

/**
 * ポインター（マウス/タッチ）位置を論理SVG座標 (0..216, 0..104) に変換
 */
function getLogicalPointerPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const px = (e.clientX - rect.left) * dpr;
  const py = (e.clientY - rect.top) * dpr;

  const { scale, offsetX, offsetY } = getPracticeCanvasTransform(canvas);
  return {
    x: (px - offsetX) / scale,
    y: (py - offsetY) / scale
  };
}

/**
 * 1回分（大文字＋小文字すべて）のなぞり完了時処理
 */
function handleRoundCompleted() {
  if (practiceState.isRoundTransitioning) return;
  practiceState.isRoundTransitioning = true;
  practiceState.isPointerDown = false;

  const completedRounds = practiceState.roundIndex + 1;
  const remainRounds = 3 - completedRounds;

  const roundNotice = document.getElementById('practiceRoundNotice');
  const roundNoticeText = document.getElementById('practiceRoundNoticeText');
  const goodJobOverlay = document.getElementById('practiceGoodJobOverlay');
  const remainBadge = document.getElementById('practiceRemainBadge');
  const subStatus = document.getElementById('practiceModalSubStatus');

  if (remainRounds > 0) {
    // 「あと2回！」または「あと1回！」を表示して次のラウンドへ
    if (roundNotice && roundNoticeText) {
      roundNoticeText.textContent = `あと${remainRounds}回！`;
      roundNotice.classList.add('show');
      roundNotice.setAttribute('aria-hidden', 'false');
    }
    if (subStatus) {
      subStatus.textContent = `あと${remainRounds}回！ 続けてなぞってみよう！`;
    }

    const t = setTimeout(() => {
      if (!practiceState.isOpen) return;
      if (roundNotice) {
        roundNotice.classList.remove('show');
        roundNotice.setAttribute('aria-hidden', 'true');
      }
      practiceState.roundIndex += 1;
      practiceState.strokes = buildPracticeStrokesForLetter(practiceState.item.upper);
      practiceState.activeStrokeIdx = 0;
      practiceState.isRoundTransitioning = false;

      if (remainBadge) {
        remainBadge.textContent = `あと${remainRounds}回！`;
      }
    }, 950);
    practiceState.timers.push(t);
  } else {
    // 3回完了！ Good Job！ を1秒表示して元の画面に戻る
    if (remainBadge) {
      remainBadge.textContent = '3かい クリア！';
    }
    if (subStatus) {
      subStatus.textContent = 'Good Job！ 3かい きれいに書けたね！';
    }
    if (goodJobOverlay) {
      goodJobOverlay.classList.add('show');
      goodJobOverlay.setAttribute('aria-hidden', 'false');
    }

    const t = setTimeout(() => {
      closePracticeModal();
    }, 1000);
    practiceState.timers.push(t);
  }
}

/**
 * 1回のポインター移動イベントでなぞり位置が進めるサンプル点数の上限値
 * （一気に先へ飛んでしまう現象を防ぎ、一定の速度まででしかなぞれないように制限）
 */
export const MAX_TRACE_STEP_PER_EVENT = 2;

/** なぞり判定の許容半径（SVG論理座標系） */
export const TRACE_HIT_RADIUS = 10.5;

/**
 * ポインター移動・押下時のなぞり判定
 */
function processPracticePointerAt(logicalPt) {
  if (!practiceState.isOpen || practiceState.isRoundTransitioning) return;
  if (practiceState.activeStrokeIdx >= practiceState.strokes.length) return;

  const stroke = practiceState.strokes[practiceState.activeStrokeIdx];
  const pts = stroke.points;
  if (!pts.length) return;

  // 点ストローク ('i' や 'j' の点) の場合
  if (pts[0].isDot) {
    const dist = Math.hypot(logicalPt.x - pts[0].x, logicalPt.y - pts[0].y);
    if (dist <= 13) {
      stroke.progressIndex = 0;
      stroke.completed = true;
      spawnSparklesAt(pts[0].x, pts[0].y, 12);
      practiceState.activeStrokeIdx += 1;
      if (practiceState.activeStrokeIdx >= practiceState.strokes.length) {
        handleRoundCompleted();
      }
    }
    return;
  }

  // 通常ストローク：現在の進捗インデックスの直後から MAX_TRACE_STEP_PER_EVENT 点ずつ連続して判定範囲内にある場合のみ前進
  const nextStepStart = stroke.progressIndex + 1;
  const maxStepEnd = Math.min(pts.length - 1, stroke.progressIndex + MAX_TRACE_STEP_PER_EVENT);

  let advanced = false;
  let latestPt = null;

  for (let i = nextStepStart; i <= maxStepEnd; i++) {
    const p = pts[i];
    const d = Math.hypot(logicalPt.x - p.x, logicalPt.y - p.y);
    if (d <= TRACE_HIT_RADIUS) {
      stroke.progressIndex = i;
      latestPt = p;
      advanced = true;
    } else {
      // 途中の点を飛ばして先の点へワープしないよう、外れた時点でループを止める
      break;
    }
  }

  if (advanced && latestPt) {
    spawnSparklesAt(latestPt.x, latestPt.y, 4);
  }

  // 終端まで到達したらストローク完了とみなす
  if (stroke.progressIndex >= pts.length - 1) {
    stroke.progressIndex = pts.length - 1;
    stroke.completed = true;
    const endPt = pts[pts.length - 1];
    spawnSparklesAt(endPt.x, endPt.y, 14);

    practiceState.activeStrokeIdx += 1;
    if (practiceState.activeStrokeIdx >= practiceState.strokes.length) {
      handleRoundCompleted();
    }
  }
}

/**
 * 「かく練習をする！」モーダルを開く
 * @param {object} item - アルファベット要素
 */
export function openPracticeModal(item) {
  const modal = document.getElementById('practiceModal');
  const badge = document.getElementById('practiceLetterBadge');
  const remainBadge = document.getElementById('practiceRemainBadge');
  const subStatus = document.getElementById('practiceModalSubStatus');
  const roundNotice = document.getElementById('practiceRoundNotice');
  const goodJobOverlay = document.getElementById('practiceGoodJobOverlay');

  if (!modal || !item) return;

  practiceState.timers.forEach((t) => clearTimeout(t));
  practiceState.timers = [];
  if (practiceState.animFrameId) {
    cancelAnimationFrame(practiceState.animFrameId);
    practiceState.animFrameId = null;
  }

  practiceState.isOpen = true;
  practiceState.item = item;
  practiceState.roundIndex = 0;
  practiceState.strokes = buildPracticeStrokesForLetter(item.upper);
  practiceState.activeStrokeIdx = 0;
  practiceState.isPointerDown = false;
  practiceState.isRoundTransitioning = false;
  practiceState.sparkles = [];

  if (badge) badge.textContent = `${item.upper} ${item.lower}`;
  if (remainBadge) remainBadge.textContent = '1かいめ（3かい中）';
  if (subStatus) subStatus.textContent = '灰色の線を マウスや指でなぞって キラキラにしよう！';
  if (roundNotice) {
    roundNotice.classList.remove('show');
    roundNotice.setAttribute('aria-hidden', 'true');
  }
  if (goodJobOverlay) {
    goodJobOverlay.classList.remove('show');
    goodJobOverlay.setAttribute('aria-hidden', 'true');
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('practice-modal-open');

  practiceState.animFrameId = requestAnimationFrame(renderPracticeCanvasFrame);
}

/**
 * 「かく練習をする！」モーダルを閉じる
 */
export function closePracticeModal() {
  const modal = document.getElementById('practiceModal');
  const roundNotice = document.getElementById('practiceRoundNotice');
  const goodJobOverlay = document.getElementById('practiceGoodJobOverlay');

  practiceState.isOpen = false;
  practiceState.isPointerDown = false;
  practiceState.isRoundTransitioning = false;

  practiceState.timers.forEach((t) => clearTimeout(t));
  practiceState.timers = [];

  if (practiceState.animFrameId) {
    cancelAnimationFrame(practiceState.animFrameId);
    practiceState.animFrameId = null;
  }

  if (roundNotice) {
    roundNotice.classList.remove('show');
    roundNotice.setAttribute('aria-hidden', 'true');
  }
  if (goodJobOverlay) {
    goodJobOverlay.classList.remove('show');
    goodJobOverlay.setAttribute('aria-hidden', 'true');
  }

  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.classList.remove('practice-modal-open');
}

/**
 * 書き方練習モーダルのイベント初期化
 */
export function initPracticeModal() {
  const modal = document.getElementById('practiceModal');
  const closeBtn = document.getElementById('closePracticeModalBtn');
  const canvas = document.getElementById('practiceTraceCanvas');

  if (!modal || !canvas) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closePracticeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePracticeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePracticeModal();
    }
  });

  canvas.addEventListener('pointerdown', (e) => {
    if (!practiceState.isOpen || practiceState.isRoundTransitioning) return;
    canvas.setPointerCapture(e.pointerId);
    practiceState.isPointerDown = true;
    const pt = getLogicalPointerPos(e, canvas);
    processPracticePointerAt(pt);
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!practiceState.isOpen || !practiceState.isPointerDown || practiceState.isRoundTransitioning) {
      return;
    }
    const pt = getLogicalPointerPos(e, canvas);
    processPracticePointerAt(pt);
  });

  const endPointer = () => {
    practiceState.isPointerDown = false;
  };

  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
}

/**
 * 3段階スピード倍率ボタン（0.5倍 / 0.8倍 / 1倍）の初期化
 */
export function initSpeedStageButtons() {
  const buttons = document.querySelectorAll('.speed-stage-btn');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.getAttribute('data-speed') || '1.0');
      if (!isNaN(val) && val > 0) {
        playbackSpeedMultiplier = val;
      }

      buttons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
    });
  });
}

/**
 * 「動画のせつめいをチェック！」モーダルの初期化と開閉制御
 */
export function initVideoModal() {
  const openBtn = document.getElementById('openVideoModalBtn');
  const modal = document.getElementById('videoListModal');
  const closeIconBtn = document.getElementById('closeVideoModalBtn');
  const closeFooterBtn = document.getElementById('closeVideoModalFooterBtn');
  const listContainer = document.getElementById('videoModalList');

  if (!openBtn || !modal || !listContainer) return;

  listContainer.innerHTML = '';
  ALPHABET_VIDEO_LIST.forEach((video) => {
    const link = document.createElement('a');
    link.href = video.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'video-list-item';
    link.setAttribute('aria-label', `${video.title} を YouTube で開く`);

    link.innerHTML = `
      <div class="video-item-left">
        <div class="video-thumb-wrap">
          <img src="${video.thumb}" alt="" class="video-thumb-img" loading="lazy" />
        </div>
        <div class="video-item-info">
          <span class="video-item-badge">${video.badge}</span>
          <span class="video-item-title">${video.title}</span>
          <span class="video-item-desc">${video.desc}</span>
        </div>
      </div>
      <span class="video-item-action" aria-hidden="true">
        <span>▶️</span>
        <span>動画を見る</span>
      </span>
    `;
    listContainer.appendChild(link);
  });

  const openModal = () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-modal-open');
    if (closeIconBtn) closeIconBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-modal-open');
  };

  openBtn.addEventListener('click', openModal);
  if (closeIconBtn) closeIconBtn.addEventListener('click', closeModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * アルファベット画面全体の初期化
 */
export function initAlphabetPage() {
  if ('speechSynthesis' in window) {
    resolveCrossPlatformVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      resolveCrossPlatformVoices();
    };
  }

  initSpeedStageButtons();
  initVideoModal();
  initPracticeModal();
  renderAlphabetList();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAlphabetPage);
} else {
  initAlphabetPage();
}
