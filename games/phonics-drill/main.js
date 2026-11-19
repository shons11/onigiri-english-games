/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * おにぎりのフォニックスドリル - 発音記号データ・UI制御・音声読み上げロジック (games/phonics-drill/main.js)
 * ES Modules形式
 */

/**
 * 子音編（1）・母音編（2）データ（Day5 母音編 / Day6 子音編の順番・解説・単語例に準拠）
 * - html: 英単語の該当文字を <b>...</b> でハイライト（オレンジ色＋下線）
 * - ipaHtml: 発音記号の該当記号を <b>...</b> でハイライト（オレンジ色・下線なし）
 */
export const PHONICS_DATA = {
  consonants: {
    id: 'consonants',
    title: '子音編（全24音）',
    indexLabel: '1',
    collapsibleGroups: false,
    subtitle: '喉を震わせない「無声音」と、喉を震わせる「有声音」のペアを順番にマスターしよう！',
    groups: [
      {
        id: 'consonant-all',
        badge: '子音 1〜24',
        title: '英語の子音一覧（全24音）',
        note: '子音の後ろに余計な母音（カタカナのウやオ）をつけないように発音しよう！',
        items: [
          {
            number: 1,
            symbol: 'p',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '閉じた唇を「プッ」とはじいて息だけを出す音（ピーと読んだり、カタカナの「プ」にしないよう注意！）。',
            examples: [
              { word: 'pun', html: '<b>p</b>un', ipa: 'pʌn', ipaHtml: '<b>p</b>ʌn', ja: 'ダジャレ' },
              { word: 'pull', html: '<b>p</b>ull', ipa: 'pʊl', ipaHtml: '<b>p</b>ʊl', ja: 'ひっぱる' },
              { word: 'pit', html: '<b>p</b>it', ipa: 'pɪt', ipaHtml: '<b>p</b>ɪt', ja: 'くぼみ・穴' }
            ]
          },
          {
            number: 2,
            symbol: 'b',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「p」の口のまま有声音（声帯を震わせる音）にして、「ブッ」と唇をはじいて発音するイメージ。',
            examples: [
              { word: 'bun', html: '<b>b</b>un', ipa: 'bʌn', ipaHtml: '<b>b</b>ʌn', ja: '丸いパン' },
              { word: 'bull', html: '<b>b</b>ull', ipa: 'bʊl', ipaHtml: '<b>b</b>ʊl', ja: '雄牛（おうし）' },
              { word: 'bit', html: '<b>b</b>it', ipa: 'bɪt', ipaHtml: '<b>b</b>ɪt', ja: 'すこし' }
            ]
          },
          {
            number: 3,
            symbol: 't',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '舌先を上前歯の根本にあてて、勢いよくはじきながら「トゥッ」と息を出す音。',
            examples: [
              { word: 'tent', html: '<b>t</b>en<b>t</b>', ipa: 'tent', ipaHtml: '<b>t</b>en<b>t</b>', ja: 'テント' },
              { word: 'tat', html: '<b>t</b>a<b>t</b>', ipa: 'tæt', ipaHtml: '<b>t</b>æ<b>t</b>', ja: 'タトゥー・編み物' },
              { word: 'table', html: '<b>t</b>able', ipa: 'teɪbl', ipaHtml: '<b>t</b>eɪbl', ja: 'テーブル' }
            ]
          },
          {
            number: 4,
            symbol: 'd',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「t」の口のまま有声音（声帯を震わせる音）にして、「ドゥッ」と舌先をはじいて発音するイメージ。',
            examples: [
              { word: 'dent', html: '<b>d</b>ent', ipa: 'dent', ipaHtml: '<b>d</b>ent', ja: 'へこみ' },
              { word: 'dad', html: '<b>d</b>a<b>d</b>', ipa: 'dæd', ipaHtml: '<b>d</b>æ<b>d</b>', ja: 'お父さん・パパ' },
              { word: 'dinner', html: '<b>d</b>inner', ipa: 'dɪnər', ipaHtml: '<b>d</b>ɪnər', ja: '夕食' }
            ]
          },
          {
            number: 5,
            symbol: 'k',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '舌の根本を口の天井にあてて、勢いよく離しながら「クッ」と息を出す音。',
            examples: [
              { word: 'kick', html: '<b>k</b>i<b>ck</b>', ipa: 'kɪk', ipaHtml: '<b>k</b>ɪ<b>k</b>', ja: 'ける・キック' },
              { word: 'kitchen', html: '<b>k</b>itchen', ipa: 'kɪtʃən', ipaHtml: '<b>k</b>ɪtʃən', ja: '台所・キッチン' },
              { word: 'kettle', html: '<b>k</b>ettle', ipa: 'ketl', ipaHtml: '<b>k</b>etl', ja: 'やかん' }
            ]
          },
          {
            number: 6,
            symbol: 'g',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「k」の口のまま有声音（声帯を震わせる音）にして、「グッ」と発音するイメージ。',
            examples: [
              { word: 'gut', html: '<b>g</b>ut', ipa: 'ɡʌt', ipaHtml: '<b>ɡ</b>ʌt', ja: '消化管・度胸' },
              { word: 'gate', html: '<b>g</b>ate', ipa: 'ɡeɪt', ipaHtml: '<b>ɡ</b>eɪt', ja: '門・ゲート' },
              { word: 'goat', html: '<b>g</b>oat', ipa: 'ɡoʊt', ipaHtml: '<b>ɡ</b>oʊt', ja: 'ヤギ' }
            ]
          },
          {
            number: 7,
            symbol: 'ʧ',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '舌を口の天井にあてて、勢いよくはじきながら「チュッ」と息を出す音。',
            examples: [
              { word: 'chance', html: '<b>ch</b>ance', ipa: 'tʃæns', ipaHtml: '<b>tʃ</b>æns', ja: 'チャンス・機会' },
              { word: 'change', html: '<b>ch</b>ange', ipa: 'tʃeɪndʒ', ipaHtml: '<b>tʃ</b>eɪndʒ', ja: 'かえる・変化' },
              { word: 'chore', html: '<b>ch</b>ore', ipa: 'tʃɔːr', ipaHtml: '<b>tʃ</b>ɔːr', ja: '日課・雑用' }
            ]
          },
          {
            number: 8,
            symbol: 'ʤ',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「ʧ」の口のまま有声音（声帯を震わせる音）にして、「ヂュッ（ジュッ）」と発音するイメージ。',
            examples: [
              { word: 'jump', html: '<b>j</b>ump', ipa: 'dʒʌmp', ipaHtml: '<b>dʒ</b>ʌmp', ja: 'ジャンプ・とぶ' },
              { word: 'July', html: '<b>J</b>uly', ipa: 'dʒulaɪ', ipaHtml: '<b>dʒ</b>ulaɪ', ja: '7月' },
              { word: 'jolt', html: '<b>j</b>olt', ipa: 'dʒoʊlt', ipaHtml: '<b>dʒ</b>oʊlt', ja: '揺さぶる' }
            ]
          },
          {
            number: 9,
            symbol: 'f',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '下唇に上前歯をあてて隙間から息を出す音。「ファ」と言うときの最初の音が近い。',
            examples: [
              { word: 'four', html: '<b>f</b>our', ipa: 'fɔːr', ipaHtml: '<b>f</b>ɔːr', ja: '4（よん）' },
              { word: 'fight', html: '<b>f</b>ight', ipa: 'faɪt', ipaHtml: '<b>f</b>aɪt', ja: 'たたかう' },
              { word: 'fare', html: '<b>f</b>are', ipa: 'feər', ipaHtml: '<b>f</b>eər', ja: '運賃・料金' }
            ]
          },
          {
            number: 10,
            symbol: 'v',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「f」と同じく下唇に上前歯をあてた状態で有声音にして、「ヴ」と発音するイメージ（「b」としっかり使い分けよう！）。',
            examples: [
              { word: 'vow', html: '<b>v</b>ow', ipa: 'vaʊ', ipaHtml: '<b>v</b>aʊ', ja: 'ちかい・誓う' },
              { word: 'vote', html: '<b>v</b>ote', ipa: 'voʊt', ipaHtml: '<b>v</b>oʊt', ja: '投票する' },
              { word: 'vampire', html: '<b>v</b>ampire', ipa: 'væmpaɪər', ipaHtml: '<b>v</b>æmpaɪər', ja: 'ヴァンパイア' }
            ]
          },
          {
            number: 11,
            symbol: 's',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '「ス」の音が近い。舌先を上前歯のすぐ後ろに近づけて、その隙間から強く息を出す音。',
            examples: [
              { word: 'size', html: '<b>s</b>ize', ipa: 'saɪz', ipaHtml: '<b>s</b>aɪz', ja: 'サイズ・大きさ' },
              { word: 'sour', html: '<b>s</b>our', ipa: 'saʊər', ipaHtml: '<b>s</b>aʊər', ja: 'すっぱい' },
              { word: 'sea', html: '<b>s</b>ea', ipa: 'siː', ipaHtml: '<b>s</b>iː', ja: 'うみ' }
            ]
          },
          {
            number: 12,
            symbol: 'z',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「s」の口のまま有声音（声帯を震わせる音）にして、「ズ」と発音するイメージ。',
            examples: [
              { word: 'zoo', html: '<b>z</b>oo', ipa: 'zuː', ipaHtml: '<b>z</b>uː', ja: '動物園' },
              { word: 'zebra', html: '<b>z</b>ebra', ipa: 'ziːbrə', ipaHtml: '<b>z</b>iːbrə', ja: 'シマウマ' },
              { word: 'zipper', html: '<b>z</b>ipper', ipa: 'zɪpər', ipaHtml: '<b>z</b>ɪpər', ja: 'ジッパー・チャック' }
            ]
          },
          {
            number: 13,
            symbol: 'ʃ',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '「シ」の音が近い。舌先を口の天井に近づけて、図書館で「しー！」と言うときのように隙間から強く息を出す音。',
            examples: [
              { word: 'she', html: '<b>sh</b>e', ipa: 'ʃiː', ipaHtml: '<b>ʃ</b>iː', ja: 'かのじょ' },
              { word: 'shine', html: '<b>sh</b>ine', ipa: 'ʃaɪn', ipaHtml: '<b>ʃ</b>aɪn', ja: 'ひかる・輝く' },
              { word: 'show', html: '<b>sh</b>ow', ipa: 'ʃoʊ', ipaHtml: '<b>ʃ</b>oʊ', ja: '見せる・ショー' }
            ]
          },
          {
            number: 14,
            symbol: 'ʒ',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「ʃ」の口のまま有声音にして、ものを「じーーー」っと見る時の「ジ」のように喉を震わせて発音する音（「ʤ」との違いに注意！）。',
            examples: [
              { word: 'vision', html: 'vi<b>s</b>ion', ipa: 'vɪʒən', ipaHtml: 'vɪ<b>ʒ</b>ən', ja: '視力・ビジョン' },
              { word: 'casual', html: 'ca<b>s</b>ual', ipa: 'kæʒuəl', ipaHtml: 'kæ<b>ʒ</b>uəl', ja: '気軽な・カジュアル' },
              { word: 'measure', html: 'mea<b>s</b>ure', ipa: 'meʒər', ipaHtml: 'me<b>ʒ</b>ər', ja: 'はかる' }
            ]
          },
          {
            number: 15,
            symbol: 'θ',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '舌先を上下の前歯で軽くかんで、その隙間から強く息を出す音（「ス」みたいに聞こえるけど違う音！）。',
            examples: [
              { word: 'think', html: '<b>th</b>ink', ipa: 'θɪŋk', ipaHtml: '<b>θ</b>ɪŋk', ja: 'かんがえる' },
              { word: 'three', html: '<b>th</b>ree', ipa: 'θriː', ipaHtml: '<b>θ</b>riː', ja: '3（さん）' },
              { word: 'math', html: 'ma<b>th</b>', ipa: 'mæθ', ipaHtml: 'mæ<b>θ</b>', ja: 'さんすう・数学' }
            ]
          },
          {
            number: 16,
            symbol: 'ð',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「θ」と同じく舌先を軽くかんだ状態で、声帯を震わせて有声音にする音（「ズ」とは違う音！）。',
            examples: [
              { word: 'that', html: '<b>th</b>at', ipa: 'ðæt', ipaHtml: '<b>ð</b>æt', ja: 'あれ・あの' },
              { word: 'this', html: '<b>th</b>is', ipa: 'ðɪs', ipaHtml: '<b>ð</b>ɪs', ja: 'これ・この' },
              { word: 'another', html: 'ano<b>th</b>er', ipa: 'ənʌðər', ipaHtml: 'ənʌ<b>ð</b>ər', ja: 'もうひとつの' }
            ]
          },
          {
            number: 17,
            symbol: 'h',
            voiceType: 'voiceless',
            voiceLabel: '無声音（喉が震えない）',
            guide: '最後の無声音！「ハ」の音が近い。口を開けてそのまま「ハッ」と息を出す音。',
            examples: [
              { word: 'hike', html: '<b>h</b>ike', ipa: 'haɪk', ipaHtml: '<b>h</b>aɪk', ja: 'ハイキングする' },
              { word: 'how', html: '<b>h</b>ow', ipa: 'haʊ', ipaHtml: '<b>h</b>aʊ', ja: 'どのように' },
              { word: 'he', html: '<b>h</b>e', ipa: 'hiː', ipaHtml: '<b>h</b>iː', ja: 'かれ' }
            ]
          },
          {
            number: 18,
            symbol: 'm',
            voiceType: 'voiced',
            voiceLabel: '鼻音・有声音',
            guide: '鼻から空気が抜ける鼻音！「ム」の音が近い。口を閉じて音を出し、その後唇をはじきながら開ける音。',
            examples: [
              { word: 'moon', html: '<b>m</b>oon', ipa: 'muːn', ipaHtml: '<b>m</b>uːn', ja: 'つき' },
              { word: 'me', html: '<b>m</b>e', ipa: 'miː', ipaHtml: '<b>m</b>iː', ja: 'わたしを・に' },
              { word: 'mike', html: '<b>m</b>ike', ipa: 'maɪk', ipaHtml: '<b>m</b>aɪk', ja: 'マイク' }
            ]
          },
          {
            number: 19,
            symbol: 'n',
            voiceType: 'voiced',
            voiceLabel: '鼻音・有声音',
            guide: '「ヌ」「ン」の音が近い（後ろに母音があればヌ、なければン）。舌先を上前歯の根本にあててふさぎながら鼻へ音を出し、舌を勢いよく離す。',
            examples: [
              { word: 'tent', html: 'te<b>n</b>t', ipa: 'tent', ipaHtml: 'te<b>n</b>t', ja: 'テント' },
              { word: 'band', html: 'ba<b>n</b>d', ipa: 'bænd', ipaHtml: 'bæ<b>n</b>d', ja: 'バンド' },
              { word: 'noon', html: '<b>n</b>oo<b>n</b>', ipa: 'nuːn', ipaHtml: '<b>n</b>uː<b>n</b>', ja: '正午・お昼' }
            ]
          },
          {
            number: 20,
            symbol: 'ŋ',
            voiceType: 'voiced',
            voiceLabel: '鼻音・有声音',
            guide: '「ング」と言うときの音が近い。舌の根本を口の天井にあててふさぎながら鼻へ音を出し、その後舌を天井から離す。',
            examples: [
              { word: 'think', html: 'thi<b>n</b>k', ipa: 'θɪŋk', ipaHtml: 'θɪ<b>ŋ</b>k', ja: 'かんがえる' },
              { word: 'thing', html: 'thi<b>ng</b>', ipa: 'θɪŋ', ipaHtml: 'θɪ<b>ŋ</b>', ja: 'もの・こと' },
              { word: 'going', html: 'goi<b>ng</b>', ipa: 'ɡoʊɪŋ', ipaHtml: 'ɡoʊɪ<b>ŋ</b>', ja: 'いくところ' }
            ]
          },
          {
            number: 21,
            symbol: 'j',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「ユ」の音が近い（jumpのjとは全く別の発音記号！）。舌全体を口の天井に近づけて、その隙間で空気をこすらせるイメージ。',
            examples: [
              { word: 'you', html: '<b>y</b>ou', ipa: 'juː', ipaHtml: '<b>j</b>uː', ja: 'あなた' },
              { word: 'yes', html: '<b>y</b>es', ipa: 'jes', ipaHtml: '<b>j</b>es', ja: 'はい' },
              { word: 'yawn', html: '<b>y</b>awn', ipa: 'jɔːn', ipaHtml: '<b>j</b>ɔːn', ja: 'あくびをする' }
            ]
          },
          {
            number: 22,
            symbol: 'w',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '「ワ」の音が近い。日本語のワよりももっと唇をすぼめて音を出し、音を出したまま勢いよく唇を元に戻すイメージ。',
            examples: [
              { word: 'we', html: '<b>w</b>e', ipa: 'wiː', ipaHtml: '<b>w</b>iː', ja: 'わたしたち' },
              { word: 'wet', html: '<b>w</b>et', ipa: 'wet', ipaHtml: '<b>w</b>et', ja: 'ぬれた' },
              { word: 'world', html: '<b>w</b>orld', ipa: 'wərld', ipaHtml: '<b>w</b>ərld', ja: 'せかい' }
            ]
          },
          {
            number: 23,
            symbol: 'l',
            voiceType: 'voiced',
            voiceLabel: '有声音（ライトl / ダークl）',
            guide: '後ろに母音が続く「ライトl」は舌先を上前歯の根本につけて弾く「ル」。母音が続かない「ダークl」は舌先を上前歯の後ろにつけて軽く出す「ウ」のような音。',
            examples: [
              { word: 'like', html: '<b>l</b>ike', ipa: 'laɪk', ipaHtml: '<b>l</b>aɪk', ja: 'すき（ライトl）' },
              { word: 'taller', html: 'ta<b>ll</b>er', ipa: 'tɔːlər', ipaHtml: 'tɔː<b>l</b>ər', ja: 'より背が高い（ライトl）' },
              { word: 'milk', html: 'mi<b>l</b>k', ipa: 'mɪlk', ipaHtml: 'mɪ<b>l</b>k', ja: '牛乳（ダークl）' }
            ]
          },
          {
            number: 24,
            symbol: 'r',
            voiceType: 'voiced',
            voiceLabel: '有声音（喉が震える）',
            guide: '舌先が口の天井に当たらないように「ら」から「あ」を取った音（または舌先を天井につけずに「ウレ」をほぼ同時に高速で発音する音）。',
            examples: [
              { word: 'red', html: '<b>r</b>ed', ipa: 'red', ipaHtml: '<b>r</b>ed', ja: 'あか（赤）' },
              { word: 'return', html: '<b>r</b>eturn', ipa: 'rɪtərn', ipaHtml: '<b>r</b>ɪtərn', ja: 'もどる・返す' },
              { word: 'mirror', html: 'mi<b>rr</b>or', ipa: 'mɪrər', ipaHtml: 'mɪ<b>r</b>ər', ja: 'かがみ' }
            ]
          }
        ]
      }
    ]
  },
  vowels: {
    id: 'vowels',
    title: '母音編（全22音）',
    indexLabel: '2',
    collapsibleGroups: true,
    subtitle: 'ア〜オ系・R系・二重母音の項目をクリックすると中身のリストが開くよ！',
    groups: [
      {
        id: 'vowel-a',
        badge: 'ア系',
        title: 'ア系の母音（ʌ, ɑ, ɑː, æ, ə）',
        note: '全5音',
        items: [
          {
            number: 1,
            symbol: 'ʌ',
            guide: 'はっきり「ア！」と発音するときの半分くらい口を開けて、弱く短く「ァ」と発音する音。',
            examples: [
              { word: 'fun', html: 'f<b>u</b>n', ipa: 'fʌn', ipaHtml: 'f<b>ʌ</b>n', ja: 'たのしい' },
              { word: 'cut', html: 'c<b>u</b>t', ipa: 'kʌt', ipaHtml: 'k<b>ʌ</b>t', ja: 'きる' },
              { word: 'jump', html: 'j<b>u</b>mp', ipa: 'dʒʌmp', ipaHtml: 'dʒ<b>ʌ</b>mp', ja: 'とぶ' }
            ]
          },
          {
            number: 2,
            symbol: 'ɑ',
            guide: '卵を1個口の中に詰め込む感じで思いっきり口の中を大きく開けて、「ア」と「オ」の間くらいの音を出す。',
            examples: [
              { word: 'top', html: 't<b>o</b>p', ipa: 'tɑp', ipaHtml: 't<b>ɑ</b>p', ja: 'いちばん上' },
              { word: 'hot', html: 'h<b>o</b>t', ipa: 'hɑt', ipaHtml: 'h<b>ɑ</b>t', ja: 'あつい' },
              { word: 'rock', html: 'r<b>o</b>ck', ipa: 'rɑk', ipaHtml: 'r<b>ɑ</b>k', ja: 'いわ・ロック' }
            ]
          },
          {
            number: 3,
            symbol: 'ɑː',
            guide: '口の中を大きく開けた「ɑ」の音をそのまま伸ばして「アー」と発音する（「ː」はのばし棒）。',
            examples: [
              { word: 'father', html: 'f<b>a</b>ther', ipa: 'fɑːðər', ipaHtml: 'f<b>ɑː</b>ðər', ja: 'おとうさん' },
              { word: 'calm', html: 'c<b>a</b>lm', ipa: 'kɑːm', ipaHtml: 'k<b>ɑː</b>m', ja: 'おだやかな' },
              { word: 'palm', html: 'p<b>a</b>lm', ipa: 'pɑːm', ipaHtml: 'p<b>ɑː</b>m', ja: 'てのひら' }
            ]
          },
          {
            number: 4,
            symbol: 'æ',
            guide: '「ア」と「エ」の中間の音。はっきり「ア！」と言う口を作って「エ」と言う（または高速で同時に「エア」と言うイメージ）。',
            examples: [
              { word: 'apple', html: '<b>a</b>pple', ipa: 'æpl', ipaHtml: '<b>æ</b>pl', ja: 'りんご' },
              { word: 'carrot', html: 'c<b>a</b>rrot', ipa: 'kærət', ipaHtml: 'k<b>æ</b>rət', ja: 'にんじん' },
              { word: 'catch', html: 'c<b>a</b>tch', ipa: 'kætʃ', ipaHtml: 'k<b>æ</b>tʃ', ja: 'つかまえる' }
            ]
          },
          {
            number: 5,
            symbol: 'ə',
            guide: 'ほんの少し口を開けて、何の力も入れずにただ声を出すあいまいな音（アクセントがない母音で出る音）。',
            examples: [
              { word: 'Japan', html: 'J<b>a</b>pan', ipa: 'dʒəˈpæn', ipaHtml: 'dʒ<b>ə</b>ˈpæn', ja: 'にほん' },
              { word: 'parent', html: 'par<b>e</b>nt', ipa: 'ˈperənt', ipaHtml: 'ˈper<b>ə</b>nt', ja: 'おや' },
              { word: 'children', html: 'childr<b>e</b>n', ipa: 'ˈtʃɪldrən', ipaHtml: 'ˈtʃɪldr<b>ə</b>n', ja: 'こどもたち' }
            ]
          }
        ]
      },
      {
        id: 'vowel-i',
        badge: 'イ系',
        title: 'イ系の母音（i, iː, ɪ）',
        note: '全3音',
        items: [
          {
            number: 6,
            symbol: 'i',
            guide: '日本語の「イ」に近い音。「イ」よりも気持ち口を横に引っ張るイメージで発音する。',
            examples: [
              { word: 'city', html: 'cit<b>y</b>', ipa: 'sɪti', ipaHtml: 'sɪt<b>i</b>', ja: 'まち・都市' },
              { word: 'busy', html: 'bus<b>y</b>', ipa: 'bɪzi', ipaHtml: 'bɪz<b>i</b>', ja: 'いそがしい' },
              { word: 'lady', html: 'lad<b>y</b>', ipa: 'leɪdi', ipaHtml: 'leɪd<b>i</b>', ja: '女性' }
            ]
          },
          {
            number: 7,
            symbol: 'iː',
            guide: '口を横に引っ張った「i」の音をそのまましっかり伸ばして「イー」と発音する。',
            examples: [
              { word: 'meet', html: 'm<b>ee</b>t', ipa: 'miːt', ipaHtml: 'm<b>iː</b>t', ja: 'あう' },
              { word: 'piece', html: 'p<b>ie</b>ce', ipa: 'piːs', ipaHtml: 'p<b>iː</b>s', ja: '1きれ・かけら' },
              { word: 'beat', html: 'b<b>ea</b>t', ipa: 'biːt', ipaHtml: 'b<b>iː</b>t', ja: 'うつ・ビート' }
            ]
          },
          {
            number: 8,
            symbol: 'ɪ',
            guide: '「イ」と「エ」の中間っぽい音。「イ」と言おうとする口を作って「エ」と短く発音する感じ。',
            examples: [
              { word: 'gym', html: 'g<b>y</b>m', ipa: 'dʒɪm', ipaHtml: 'dʒ<b>ɪ</b>m', ja: '体育館・ジム' },
              { word: 'kit', html: 'k<b>i</b>t', ipa: 'kɪt', ipaHtml: 'k<b>ɪ</b>t', ja: '道具セット' },
              { word: 'enable', html: '<b>e</b>nable', ipa: 'ɪneɪbl', ipaHtml: '<b>ɪ</b>neɪbl', ja: 'できるようにする' }
            ]
          }
        ]
      },
      {
        id: 'vowel-u',
        badge: 'ウ系',
        title: 'ウ系の母音（ʊ, uː）',
        note: '全2音',
        items: [
          {
            number: 9,
            symbol: 'ʊ',
            guide: '日本語の「ウ」に近い音。ただ少し唇を前に突き出して短く「ウ」と発音する。',
            examples: [
              { word: 'pull', html: 'p<b>u</b>ll', ipa: 'pʊl', ipaHtml: 'p<b>ʊ</b>l', ja: 'ひっぱる' },
              { word: 'put', html: 'p<b>u</b>t', ipa: 'pʊt', ipaHtml: 'p<b>ʊ</b>t', ja: 'おく' },
              { word: 'cook', html: 'c<b>oo</b>k', ipa: 'kʊk', ipaHtml: 'k<b>ʊ</b>k', ja: '料理する' }
            ]
          },
          {
            number: 10,
            symbol: 'uː',
            guide: '唇を前に突き出した「ʊ」の音をそのまま伸ばして「ウー」と発音する。',
            examples: [
              { word: 'pool', html: 'p<b>oo</b>l', ipa: 'puːl', ipaHtml: 'p<b>uː</b>l', ja: 'プール' },
              { word: 'cool', html: 'c<b>oo</b>l', ipa: 'kuːl', ipaHtml: 'k<b>uː</b>l', ja: 'すずしい・かっこいい' },
              { word: 'moon', html: 'm<b>oo</b>n', ipa: 'muːn', ipaHtml: 'm<b>uː</b>n', ja: 'つき' }
            ]
          }
        ]
      },
      {
        id: 'vowel-e',
        badge: 'エ系',
        title: 'エ系の母音（e）',
        note: '全1音',
        items: [
          {
            number: 11,
            symbol: 'e',
            guide: '日本語の「エ」とほとんど同じ。リラックスして息を止めないことを意識して「エ」と発音してみよう。',
            examples: [
              { word: 'bed', html: 'b<b>e</b>d', ipa: 'bed', ipaHtml: 'b<b>e</b>d', ja: 'ベッド' },
              { word: 'head', html: 'h<b>ea</b>d', ipa: 'hed', ipaHtml: 'h<b>e</b>d', ja: 'あたま' },
              { word: 'dead', html: 'd<b>ea</b>d', ipa: 'ded', ipaHtml: 'd<b>e</b>d', ja: 'しんでいる' }
            ]
          }
        ]
      },
      {
        id: 'vowel-o',
        badge: 'オ系',
        title: 'オ系の母音（ɔ, ɔː）',
        note: '全2音',
        items: [
          {
            number: 12,
            symbol: 'ɔ',
            guide: '日本語の「オ」に近いが、もっと口を縦に伸ばして発音する（※アメリカ英語では「ɑ」に近い音になる）。',
            examples: [
              { word: 'cot', html: 'c<b>o</b>t', ipa: 'kɔt', ipaHtml: 'k<b>ɔ</b>t', ja: '簡易ベッド' },
              { word: 'pod', html: 'p<b>o</b>d', ipa: 'pɔd', ipaHtml: 'p<b>ɔ</b>d', ja: '豆のさや' },
              { word: 'nod', html: 'n<b>o</b>d', ipa: 'nɔd', ipaHtml: 'n<b>ɔ</b>d', ja: 'うなずく' }
            ]
          },
          {
            number: 13,
            symbol: 'ɔː',
            guide: '口を縦に伸ばした「ɔ」の音をそのまま伸ばして「オー」と発音する（※アメリカ英語では「ɑː」に近いこともある）。',
            examples: [
              { word: 'walk', html: 'w<b>a</b>lk', ipa: 'wɔːk', ipaHtml: 'w<b>ɔː</b>k', ja: 'あるく' },
              { word: 'talk', html: 't<b>a</b>lk', ipa: 'tɔːk', ipaHtml: 't<b>ɔː</b>k', ja: 'はなす' },
              { word: 'caught', html: 'c<b>au</b>ght', ipa: 'kɔːt', ipaHtml: 'k<b>ɔː</b>t', ja: 'つかまえた' }
            ]
          }
        ]
      },
      {
        id: 'vowel-r',
        badge: 'R系',
        title: 'R系の母音（ər）',
        note: '全1音',
        items: [
          {
            number: 14,
            symbol: 'ər',
            guide: '①まず「ら」と言う（舌先が口の天井に当たる）。②次に舌先が口の天井に当たらないように「ら」と言い、そこから「あ」を取ると完成！',
            examples: [
              { word: 'serve', html: 's<b>er</b>ve', ipa: 'sərv', ipaHtml: 's<b>ər</b>v', ja: '提供する・サーブ' },
              { word: 'water', html: 'wat<b>er</b>', ipa: 'wɔːtər', ipaHtml: 'wɔːt<b>ər</b>', ja: 'みず' },
              { word: 'curt', html: 'c<b>ur</b>t', ipa: 'kərt', ipaHtml: 'k<b>ər</b>t', ja: 'そっけない' }
            ]
          }
        ]
      },
      {
        id: 'vowel-diphthong',
        badge: '二重母音',
        title: '二重母音（aɪ, eɪ, ɔɪ, aʊ, oʊ, ɪər, ʊər, eər）',
        note: '全8音',
        items: [
          {
            number: 15,
            symbol: 'aɪ',
            guide: '前半の「a（ア）」を長めに発音して、そこから滑らかに短めの「ɪ（イ）」へつなげて「アイ」と発音！',
            examples: [
              { word: 'pie', html: 'p<b>ie</b>', ipa: 'paɪ', ipaHtml: 'p<b>aɪ</b>', ja: 'パイ' },
              { word: 'bike', html: 'b<b>i</b>ke', ipa: 'baɪk', ipaHtml: 'b<b>aɪ</b>k', ja: '自転車' },
              { word: 'time', html: 't<b>i</b>me', ipa: 'taɪm', ipaHtml: 't<b>aɪ</b>m', ja: 'じかん' }
            ]
          },
          {
            number: 16,
            symbol: 'eɪ',
            guide: '前半の「e（エ）」を長めに発音して、そこから滑らかに短めの「ɪ（イ）」へつなげて「エイ」と発音！',
            examples: [
              { word: 'eight', html: '<b>ei</b>ght', ipa: 'eɪt', ipaHtml: '<b>eɪ</b>t', ja: '8（はち）' },
              { word: 'day', html: 'd<b>ay</b>', ipa: 'deɪ', ipaHtml: 'd<b>eɪ</b>', ja: '日・1日' },
              { word: 'cake', html: 'c<b>a</b>ke', ipa: 'keɪk', ipaHtml: 'k<b>eɪ</b>k', ja: 'ケーキ' }
            ]
          },
          {
            number: 17,
            symbol: 'ɔɪ',
            guide: '前半の「ɔ（オ）」を長めに発音して、そこから滑らかに短めの「ɪ（イ）」へつなげて「オイ」と発音！',
            examples: [
              { word: 'boy', html: 'b<b>oy</b>', ipa: 'bɔɪ', ipaHtml: 'b<b>ɔɪ</b>', ja: 'おとこのこ' },
              { word: 'toy', html: 't<b>oy</b>', ipa: 'tɔɪ', ipaHtml: 't<b>ɔɪ</b>', ja: 'おもちゃ' },
              { word: 'coin', html: 'c<b>oi</b>n', ipa: 'kɔɪn', ipaHtml: 'k<b>ɔɪ</b>n', ja: 'コイン・硬貨' }
            ]
          },
          {
            number: 18,
            symbol: 'aʊ',
            guide: '前半の「a（ア）」を長めに発音して、そこから滑らかに短めの「ʊ（ウ）」へつなげて「アウ」と発音！',
            examples: [
              { word: 'cow', html: 'c<b>ow</b>', ipa: 'kaʊ', ipaHtml: 'k<b>aʊ</b>', ja: 'うし' },
              { word: 'now', html: 'n<b>ow</b>', ipa: 'naʊ', ipaHtml: 'n<b>aʊ</b>', ja: 'いま' },
              { word: 'house', html: 'h<b>ou</b>se', ipa: 'haʊs', ipaHtml: 'h<b>aʊ</b>s', ja: 'いえ' }
            ]
          },
          {
            number: 19,
            symbol: 'oʊ',
            guide: '前半の「o（オ）」を長めに発音して、そこから滑らかに短めの「ʊ（ウ）」へ唇をすぼめて「オウ」と発音！',
            examples: [
              { word: 'hotel', html: 'h<b>o</b>tel', ipa: 'hoʊtel', ipaHtml: 'h<b>oʊ</b>tel', ja: 'ホテル' },
              { word: 'boat', html: 'b<b>oa</b>t', ipa: 'boʊt', ipaHtml: 'b<b>oʊ</b>t', ja: 'ボート・舟' },
              { word: 'go', html: 'g<b>o</b>', ipa: 'ɡoʊ', ipaHtml: 'ɡ<b>oʊ</b>', ja: 'いく' }
            ]
          },
          {
            number: 20,
            symbol: 'ɪər',
            guide: '前半の「ɪ（イ）」を長めに出し、そこから滑らかに舌を天井に当てないRの音「ər」へつなげる音。',
            examples: [
              { word: 'here', html: 'h<b>ere</b>', ipa: 'hɪər', ipaHtml: 'h<b>ɪər</b>', ja: 'ここに' },
              { word: 'ear', html: '<b>ear</b>', ipa: 'ɪər', ipaHtml: '<b>ɪər</b>', ja: 'みみ' },
              { word: 'near', html: 'n<b>ear</b>', ipa: 'nɪər', ipaHtml: 'n<b>ɪər</b>', ja: 'ちかくに' }
            ]
          },
          {
            number: 21,
            symbol: 'ʊər',
            guide: '前半の「ʊ（ウ）」を長めに出し、そこから滑らかに舌を天井に当てないRの音「ər」へつなげる音。',
            examples: [
              { word: 'tour', html: 't<b>our</b>', ipa: 'tʊər', ipaHtml: 't<b>ʊər</b>', ja: 'ツアー・旅行' },
              { word: 'pure', html: 'p<b>ure</b>', ipa: 'pjʊər', ipaHtml: 'pj<b>ʊər</b>', ja: '純粋な' },
              { word: 'sure', html: 's<b>ure</b>', ipa: 'ʃʊər', ipaHtml: 'ʃ<b>ʊər</b>', ja: '確信して・もちろん' }
            ]
          },
          {
            number: 22,
            symbol: 'eər',
            guide: '前半の「e（エ）」を長めに出し、そこから滑らかに舌を天井に当てないRの音「ər」へつなげる音。',
            examples: [
              { word: 'hair', html: 'h<b>air</b>', ipa: 'heər', ipaHtml: 'h<b>eər</b>', ja: 'かみの毛' },
              { word: 'air', html: '<b>air</b>', ipa: 'eər', ipaHtml: '<b>eər</b>', ja: '空気' },
              { word: 'care', html: 'c<b>are</b>', ipa: 'keər', ipaHtml: 'k<b>eər</b>', ja: '気にかける' }
            ]
          }
        ]
      }
    ]
  }
};

/** 現在選択中のモード（'consonants' [1] | 'vowels' [2]） */
let currentCategoryKey = 'consonants';

/** 音声読み上げのスピード倍率（0.5, 0.8, 1.0） */
let playbackSpeedMultiplier = 1.0;

/** クリックごとの女性・男性トグル管理（初回は女性） */
let isNextVoiceFemale = true;

/** 連続再生キャンセル用セッションID */
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
 * 単語が発音上、子音で終わるかを判定
 * @param {string} word
 * @param {string} [ipa]
 */
function endsWithConsonantSound(word, ipa = '') {
  if (ipa) {
    const cleanIpa = ipa.replace(/^\/|\/$/g, '').trim();
    return /[pbtdkgɡfvθðszʃʒmnŋlr]$/i.test(cleanIpa);
  }
  const clean = word.trim().replace(/[.!,?]$/, '').toLowerCase();
  if (/[bcdfghjklmnpqrstvwxz]e$/i.test(clean) && !/^(he|she|we|me|be|see|tree|sea|free|three)$/i.test(clean)) {
    return true;
  }
  return /[bcdfghjklmnpqrstvwxz]$/i.test(clean);
}

/**
 * 語尾の子音まで明瞭に発音されるようにテキストを整形
 * @param {string} text
 * @param {boolean} hasFinalConsonant
 */
function formatForClearArticulation(text, hasFinalConsonant) {
  const clean = text.trim().replace(/[.!,?]$/, '');
  if (!clean) return '';
  const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
  return hasFinalConsonant ? `${capitalized}!   ` : `${capitalized}.   `;
}

/**
 * クリックごとに女性 ➔ 男性 ➔ 女性... と交互に切り替わる音声設定を取得
 * @param {boolean} [hasFinalConsonant=true]
 */
function getNextVoiceSettings(hasFinalConsonant = true) {
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
 * すべての再生中ハイライトを解除
 */
function clearAllPlayingHighlights() {
  document.querySelectorAll('.phonics-row-bottom.playing, .examples-play-badge.playing').forEach((el) => {
    el.classList.remove('playing');
  });
  document.querySelectorAll('.example-word-chip.speaking-now').forEach((el) => {
    el.classList.remove('speaking-now');
  });
}

/**
 * 各単語チップクリック時：その単語1つだけを読み上げる（クリックごとに男女交互）
 * @param {{word: string, ipa: string}} example - 単語データ
 * @param {HTMLElement} chipElem - クリックされた単語チップボタン
 */
export function speakSingleExample(example, chipElem) {
  if (!('speechSynthesis' in window) || !example) return;

  activePlaybackSessionId += 1;
  const sessionId = activePlaybackSessionId;

  window.speechSynthesis.cancel();
  clearAllPlayingHighlights();

  const hasFinalConsonant = endsWithConsonantSound(example.word, example.ipa);
  const voiceSettings = getNextVoiceSettings(hasFinalConsonant);
  const formattedWord = formatForClearArticulation(example.word, hasFinalConsonant);

  if (chipElem) {
    chipElem.classList.add('speaking-now');
  }

  const utterance = new SpeechSynthesisUtterance(formattedWord);
  utterance.lang = (voiceSettings.voice && voiceSettings.voice.lang) ? voiceSettings.voice.lang : 'en-US';
  utterance.rate = voiceSettings.rate;
  utterance.pitch = voiceSettings.pitch;
  utterance.volume = 1.0;

  if (voiceSettings.voice) {
    utterance.voice = voiceSettings.voice;
  }

  const cleanup = () => {
    if (sessionId === activePlaybackSessionId && chipElem) {
      chipElem.classList.remove('speaking-now');
    }
  };

  utterance.onend = cleanup;
  utterance.onerror = cleanup;
  setTimeout(cleanup, 2400);

  window.speechSynthesis.speak(utterance);
}

/**
 * 「3単語連続できく」ボタンクリック時：3つの単語例を連続で再生（クリックごとに男女交互）
 * @param {Array<{word: string, ipa: string}>} examples - 3つの単語リスト
 * @param {HTMLElement} rowBottomElem - 2段目のコンテナ要素
 * @param {HTMLElement[]} chipElems - 各単語チップ要素の配列
 */
export function speakThreeExamples(examples, rowBottomElem, chipElems = []) {
  if (!('speechSynthesis' in window) || !Array.isArray(examples) || examples.length === 0) return;

  activePlaybackSessionId += 1;
  const sessionId = activePlaybackSessionId;

  window.speechSynthesis.cancel();
  clearAllPlayingHighlights();

  // 1回のクリックにつき同じ声（女性または男性）で3単語を連続再生し、次のクリックで男女を切り替える
  const baseVoiceSettings = getNextVoiceSettings(true);

  if (rowBottomElem) {
    rowBottomElem.classList.add('playing');
  }

  const speakWordAtIndex = (index) => {
    if (sessionId !== activePlaybackSessionId) return;

    if (index >= examples.length) {
      if (rowBottomElem) rowBottomElem.classList.remove('playing');
      chipElems.forEach((chip) => chip.classList.remove('speaking-now'));
      return;
    }

    const currentExample = examples[index];
    const hasFinalConsonant = endsWithConsonantSound(currentExample.word, currentExample.ipa);
    const formattedWord = formatForClearArticulation(currentExample.word, hasFinalConsonant);

    const wordRateBase = hasFinalConsonant ? 0.86 : 0.90;
    const wordRate = Math.round(wordRateBase * playbackSpeedMultiplier * 100) / 100;

    chipElems.forEach((chip, idx) => {
      chip.classList.toggle('speaking-now', idx === index);
    });

    const utterance = new SpeechSynthesisUtterance(formattedWord);
    utterance.lang = (baseVoiceSettings.voice && baseVoiceSettings.voice.lang) ? baseVoiceSettings.voice.lang : 'en-US';
    utterance.rate = wordRate;
    utterance.pitch = baseVoiceSettings.pitch;
    utterance.volume = 1.0;

    if (baseVoiceSettings.voice) {
      utterance.voice = baseVoiceSettings.voice;
    }

    let advanced = false;
    const nextStep = () => {
      if (advanced || sessionId !== activePlaybackSessionId) return;
      advanced = true;
      setTimeout(() => {
        speakWordAtIndex(index + 1);
      }, 220);
    };

    utterance.onend = nextStep;
    utterance.onerror = nextStep;

    window.speechSynthesis.speak(utterance);
  };

  speakWordAtIndex(0);
}

/**
 * 選択されている編（子音編 / 母音編）の発音記号リストを描画
 * @param {'consonants' | 'vowels'} categoryKey
 */
export function renderPhonicsCategory(categoryKey) {
  const category = PHONICS_DATA[categoryKey];
  const container = document.getElementById('phonicsGroupsContainer');
  const listSection = document.getElementById('phonicsListSection');
  const titleEl = document.getElementById('currentCategoryTitle');
  const subtitleEl = document.getElementById('currentCategorySubtitle');
  const indexEl = document.getElementById('currentCategoryEmoji');

  if (!category || !container) return;

  if (titleEl) titleEl.textContent = category.title;
  if (subtitleEl) subtitleEl.textContent = category.subtitle;
  if (indexEl) indexEl.textContent = category.indexLabel;

  if (listSection) {
    listSection.classList.toggle('consonant-theme', categoryKey === 'consonants');
  }

  container.innerHTML = '';

  const isCollapsible = Boolean(category.collapsibleGroups);

  category.groups.forEach((group) => {
    const groupBlock = document.createElement('div');
    // 母音編はデフォルトですべて閉じた状態（collapsed）にする
    groupBlock.className = `phonics-group-block ${isCollapsible ? 'collapsed' : ''}`;

    const cardsList = document.createElement('div');
    cardsList.className = 'phonics-cards-list';
    cardsList.id = `group-list-${group.id}`;

    if (isCollapsible) {
      const headerBtn = document.createElement('button');
      headerBtn.type = 'button';
      headerBtn.className = 'phonics-group-header';
      headerBtn.setAttribute('aria-expanded', 'false');
      headerBtn.setAttribute('aria-controls', cardsList.id);

      headerBtn.innerHTML = `
        <div class="phonics-group-title-wrap">
          <span class="phonics-group-badge">${group.badge}</span>
          <h4 class="phonics-group-title">${group.title}</h4>
        </div>
        <div class="phonics-group-right">
          <span class="phonics-group-note">${group.note}</span>
          <span class="group-accordion-indicator" aria-hidden="true">
            <span class="group-accordion-text">ひらく</span>
            <span class="group-accordion-arrow">▼</span>
          </span>
        </div>
      `;

      headerBtn.addEventListener('click', () => {
        const isNowCollapsed = groupBlock.classList.toggle('collapsed');
        headerBtn.setAttribute('aria-expanded', String(!isNowCollapsed));
        const textSpan = headerBtn.querySelector('.group-accordion-text');
        if (textSpan) {
          textSpan.textContent = isNowCollapsed ? 'ひらく' : 'とじる';
        }
      });

      groupBlock.appendChild(headerBtn);
    } else {
      const headerDiv = document.createElement('div');
      headerDiv.className = 'phonics-group-header';
      headerDiv.innerHTML = `
        <div class="phonics-group-title-wrap">
          <span class="phonics-group-badge">${group.badge}</span>
          <h4 class="phonics-group-title">${group.title}</h4>
        </div>
        <p class="phonics-group-note">${group.note}</p>
      `;
      groupBlock.appendChild(headerDiv);
    }

    group.items.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'phonics-item-card';

      // 1段目：番号 ＋ 発音記号（大） ＋ 口の作り方・音の出し方の簡易説明（単音クリック再生なし）
      const rowTop = document.createElement('div');
      rowTop.className = 'phonics-row-top';

      const voiceTypeBadgeHtml = item.voiceLabel
        ? `<span class="voice-type-tag ${item.voiceType || ''}">${item.voiceLabel}</span>`
        : '';

      rowTop.innerHTML = `
        <div class="phonics-top-left">
          <span class="phonics-number-badge" aria-label="番号 ${item.number}">${item.number}</span>
          <div class="phonics-symbol-box">
            <span class="phonics-symbol-text">${item.symbol}</span>
          </div>
          <div class="phonics-guide-box">
            <div class="phonics-guide-header">
              <span class="phonics-guide-label">👄 発音のコツ</span>
              ${voiceTypeBadgeHtml}
            </div>
            <p class="phonics-guide-text">${item.guide}</p>
          </div>
        </div>
      `;

      // 2段目：その音が入る簡単な単語3つの例（各単語クリックで単一再生 / 右側ボタンで3単語連続再生）
      const rowBottom = document.createElement('div');
      rowBottom.className = 'phonics-row-bottom';

      const examplesLeft = document.createElement('div');
      examplesLeft.className = 'examples-left-wrap';
      examplesLeft.innerHTML = `<span class="examples-label">📝 たんご例：</span>`;

      const wordsListEl = document.createElement('div');
      wordsListEl.className = 'examples-words-list';

      const chipElements = [];
      item.examples.forEach((ex) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'example-word-chip';
        chip.setAttribute('aria-label', `${ex.word}（${ex.ja}）の発音をきく`);
        const formattedIpa = ex.ipaHtml || ex.ipa;
        chip.innerHTML = `
          <span class="chip-sound-icon" aria-hidden="true">🔊</span>
          <span class="example-word-en">${ex.html}</span>
          <span class="example-word-ipa">/${formattedIpa}/</span>
          <span class="example-word-ja">（${ex.ja}）</span>
        `;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          speakSingleExample(ex, chip);
        });
        chipElements.push(chip);
        wordsListEl.appendChild(chip);
      });

      examplesLeft.appendChild(wordsListEl);

      const exampleWordsLabel = item.examples.map((ex) => ex.word).join(', ');
      const playBadge = document.createElement('button');
      playBadge.type = 'button';
      playBadge.className = 'examples-play-badge';
      playBadge.setAttribute('aria-label', `単語例 ${exampleWordsLabel} を3単語連続できく`);
      playBadge.innerHTML = `<span aria-hidden="true">🔊</span><span>3単語連続できく</span>`;

      playBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        speakThreeExamples(item.examples, rowBottom, chipElements);
      });

      rowBottom.appendChild(examplesLeft);
      rowBottom.appendChild(playBadge);

      card.appendChild(rowTop);
      card.appendChild(rowBottom);
      cardsList.appendChild(card);
    });

    groupBlock.appendChild(cardsList);
    container.appendChild(groupBlock);
  });
}

/**
 * 「子音編（1）」「母音編（2）」ボタンの切り替え初期化
 */
export function initCategoryButtons() {
  const consonantBtn = document.getElementById('consonantModeBtn');
  const vowelBtn = document.getElementById('vowelModeBtn');

  if (!consonantBtn || !vowelBtn) return;

  const selectCategory = (key) => {
    currentCategoryKey = key;
    if ('speechSynthesis' in window) {
      activePlaybackSessionId += 1;
      window.speechSynthesis.cancel();
    }

    const isConsonants = key === 'consonants';
    consonantBtn.classList.toggle('active', isConsonants);
    consonantBtn.setAttribute('aria-selected', String(isConsonants));

    vowelBtn.classList.toggle('active', !isConsonants);
    vowelBtn.setAttribute('aria-selected', String(!isConsonants));

    renderPhonicsCategory(currentCategoryKey);
  };

  consonantBtn.addEventListener('click', () => selectCategory('consonants'));
  vowelBtn.addEventListener('click', () => selectCategory('vowels'));
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
 * 解説動画リストデータ（Day4〜Day8）
 */
export const PHONICS_VIDEO_LIST = [
  {
    id: 'x6VIqq4DNxY',
    badge: 'Day 4',
    title: '【Onigiri English】Day4 発音勉強の準備体操',
    desc: '発音練習をはじめる前に知っておきたい基本と準備体操！',
    url: 'https://youtu.be/x6VIqq4DNxY?si=4iTGM7D9iaFd7pyJ',
    thumb: 'https://i.ytimg.com/vi/x6VIqq4DNxY/hqdefault.jpg'
  },
  {
    id: 'H3xJYEl0WNk',
    badge: 'Day 5',
    title: '【Onigiri English】Day5 発音：母音編',
    desc: 'ア〜オ系・R系・二重母音の口のつくりかたと発音を動画で解説！',
    url: 'https://youtu.be/H3xJYEl0WNk?si=0K7W7IEvR75IPuDB',
    thumb: 'https://i.ytimg.com/vi/H3xJYEl0WNk/hqdefault.jpg'
  },
  {
    id: 'MnvA3FTcTNE',
    badge: 'Day 6',
    title: '【Onigiri English】Day6 発音：子音編',
    desc: '有声音・無声音の違いと全24個の子音の出し方をわかりやすく解説！',
    url: 'https://youtu.be/MnvA3FTcTNE?si=4BAlXzLXylOGYFnl',
    thumb: 'https://i.ytimg.com/vi/MnvA3FTcTNE/hqdefault.jpg'
  },
  {
    id: 'tjawIPRfY-4',
    badge: 'Day 7',
    title: '【Onigiri English】Day7 発音：練習あるのみ',
    desc: '覚えた母音・子音を使って実践的に発音トレーニング！',
    url: 'https://youtu.be/tjawIPRfY-4?si=YcQetuATLms3fcDd',
    thumb: 'https://i.ytimg.com/vi/tjawIPRfY-4/hqdefault.jpg'
  },
  {
    id: 'GMj1guI9Epc',
    badge: 'Day 8',
    title: '【Onigiri English】Day8 発音：番外編、英語のリズムや音の変化について',
    desc: '英語ならではのリズムや音がつながる変化を知ってさらにレベルアップ！',
    url: 'https://youtu.be/GMj1guI9Epc?si=4VOArT61e6WuRdDP',
    thumb: 'https://i.ytimg.com/vi/GMj1guI9Epc/hqdefault.jpg'
  }
];

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
  PHONICS_VIDEO_LIST.forEach((video) => {
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
 * フォニックスドリル画面全体の初期化
 */
export function initPhonicsDrill() {
  if ('speechSynthesis' in window) {
    resolveCrossPlatformVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      resolveCrossPlatformVoices();
    };
  }

  initCategoryButtons();
  initSpeedStageButtons();
  initVideoModal();
  renderPhonicsCategory(currentCategoryKey);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhonicsDrill);
} else {
  initPhonicsDrill();
}
