/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 英単語スタディ - 単語データ管理・UI制御・音声合成ロジック (games/word-match/main.js)
 * ES Modules形式
 */

/**
 * ことばの種類（10個の品詞の役割ガイド）データ
 * Day11〜Day21（英語の手札 - 構成要素）の10品詞と順番・定義・例文に準拠：
 * 1. 名詞 -> 2. 代名詞 -> 3. 限定詞 -> 4. 形容詞 -> 5. 動詞 ->
 * 6. 副詞 -> 7. 助動詞 -> 8. 前置詞 -> 9. 接続詞 -> 10. 間投詞
 */
export const WORD_TYPES_GUIDE = [
  {
    id: 'nouns',
    number: 1,
    name: 'モノ・コトの名前（名詞）',
    emoji: '🏷️',
    roleSummary: '人・もの・状態の名前を表すことばだよ！（りんご、太郎、テニス、日本、明るさ など）',
    kidExplanation:
      '数えられる名詞（apple / dog / book：複数のときは後ろに s をつける）と、数えられない名詞（water / Japan / music / love）の2種類があります。文のなかで主語（～は）や目的語（～を）になる主役の手札です！',
    examples: [
      { en: 'apple', ja: 'りんご' },
      { en: 'Taro', ja: '太郎' },
      { en: 'tennis', ja: 'テニス' },
      { en: 'Japan', ja: '日本' },
      { en: 'water', ja: '水' }
    ]
  },
  {
    id: 'pronouns',
    number: 2,
    name: '名前の代わりの言葉（代名詞）',
    emoji: '👤',
    roleSummary: '人・ものを名前の代わりに表すことばだよ！（私、あなた、あれ、これ、だれ、みんな など）',
    kidExplanation:
      '名詞の友達で、毎回「太郎は…」「このペンは…」と名前を言わなくても、「私（I）」「あなた（you）」「これ（this）」「だれ（who）」「全員（everyone）」のように代わりに表せる言葉です。',
    examples: [
      { en: 'I', ja: 'わたし' },
      { en: 'you', ja: 'あなた' },
      { en: 'this / that', ja: 'これ / あれ' },
      { en: 'who / what', ja: 'だれ / なに' }
    ]
  },
  {
    id: 'determiners',
    number: 3,
    name: '範囲や数を決める言葉（限定詞）',
    emoji: '🔍',
    roleSummary: '名詞の前に置いて「だれの？」「いくつの？」「どの？」と名詞の状態を限定することばだよ！',
    kidExplanation:
      '英語は名詞の前に「1つの（a / an）」「その（the）」「この（this）」「私の（my）」「たくさんの（many）」「2つの（two）」などをセットで置いて、どれ・何個かをはっきり決めるのが大好きです！',
    examples: [
      { en: 'a / an', ja: '1つの' },
      { en: 'the', ja: 'その・あの' },
      { en: 'my / your', ja: '私の / あなたの' },
      { en: 'two / many', ja: '2つの / たくさんの' }
    ]
  },
  {
    id: 'adjectives',
    number: 4,
    name: 'どんな状態・性質かを表す言葉（形容詞）',
    emoji: '✨',
    roleSummary: '名詞の状態や性質をもっと詳しく説明する言葉だよ！（幸せ、美しい、小さい、赤い、簡単な など）',
    kidExplanation:
      '名詞のすぐ前に置いて「red car（赤い車）」「beautiful flower（美しい花）」と説明したり、「The car is red.（その車は赤い）」のようにイコール（A＝B）でどんな状態かを説明します。',
    examples: [
      { en: 'happy', ja: '幸せな' },
      { en: 'beautiful', ja: '美しい' },
      { en: 'small', ja: '小さい' },
      { en: 'red', ja: '赤い' }
    ]
  },
  {
    id: 'actions',
    number: 5,
    name: '状態や動きを表す言葉（動詞）',
    emoji: '🏃',
    roleSummary: '何かの状態や気持ち、動作を表す、文のなかで一番たいせつな言葉だよ！（～である、走る、好き、学ぶ、遊ぶ など）',
    kidExplanation:
      '「I am happy.（私は幸せだ）」のように状態・存在（A＝B、いる）を表す特殊な「be動詞（am / is / are / was / were）」と、動作や気持ちを表す「一般動詞（run / like / play / eat）」の2つに分けられます。',
    examples: [
      { en: 'am / is / are', ja: '～だ・いる（be動詞）' },
      { en: 'run', ja: '走る' },
      { en: 'like', ja: '好き' },
      { en: 'play', ja: '遊ぶ・する' }
    ]
  },
  {
    id: 'adverbs',
    number: 6,
    name: '名詞以外をくわしくする言葉（副詞）',
    emoji: '⚡',
    roleSummary: '動詞や形容詞など「名詞以外」の状態をもっと詳しく説明する言葉だよ！（速く、とても、いつも、今、ここで など）',
    kidExplanation:
      '「どんなふうに？（fast：速く、well：上手に）」「どのくらい？（always：いつも、sometimes：時々）」「いつ・どこで？（now：今、here：ここで）」「どの程度？（very：とても）」などを付け足します。',
    examples: [
      { en: 'fast / slowly', ja: '速く / ゆっくり' },
      { en: 'very', ja: 'とても' },
      { en: 'always', ja: 'いつも' },
      { en: 'now / here', ja: '今 / ここで' }
    ]
  },
  {
    id: 'auxiliaries',
    number: 7,
    name: '動詞に意味を付け加える言葉（助動詞）',
    emoji: '🦸',
    roleSummary: '動詞のすぐ前に置いて「～できる」「～するつもり」「～すべき」など動詞を助けて意味をプラスする言葉だよ！',
    kidExplanation:
      '動詞の原形とセットで使います。「can（～できる）」「will（～するつもり・だろう）」「may（～かもしれない・～してもよい）」「must（～しなければならない）」「should（～すべき）」が代表選手です！',
    examples: [
      { en: 'can', ja: '～できる' },
      { en: 'will', ja: '～するつもり・だろう' },
      { en: 'must', ja: '～しなければならない' },
      { en: 'should', ja: '～すべき' }
    ]
  },
  {
    id: 'prepositions',
    number: 8,
    name: '場所・時間・方向などを示す言葉（前置詞）',
    emoji: '📍',
    roleSummary: '名詞の「前」に置いて、場所・時間・方向・関係などを表す言葉だよ！（中で、上で、下で、～へ、～から など）',
    kidExplanation:
      '日本語とは逆で、名詞の前に置きます。「in the box（箱の中に）」「on the table（机の上に）」「at 7:00（7時に）」「to school（学校へ）」「with my friend（友達と一緒に）」のように空間や時間のイメージでつなぎます。',
    examples: [
      { en: 'in / on / under', ja: '中で / 上で / 下で' },
      { en: 'at', ja: '～に（場所・時刻）' },
      { en: 'to / from', ja: '～へ / ～から' },
      { en: 'with / about', ja: '～と一緒に / ～について' }
    ]
  },
  {
    id: 'conjunctions',
    number: 9,
    name: '言葉や文をつなぐ言葉（接続詞）',
    emoji: '🔗',
    roleSummary: '単語と単語、文と文をつなぎ合わせる接着剤の言葉だよ！（そして、しかし、もしくは、～なので、もし～なら など）',
    kidExplanation:
      '対等につなぐ「and（～と・そして）」「but（しかし）」「or（もしくは）」「so（だから）」や、理由・条件・時を付け足す「because（～なので）」「if（もし～なら）」「when（～するとき）」「before（～する前）」があります。',
    examples: [
      { en: 'and', ja: '～と・そして' },
      { en: 'but', ja: '～だが・しかし' },
      { en: 'because', ja: '～なので' },
      { en: 'if / when', ja: 'もし～なら / ～するとき' }
    ]
  },
  {
    id: 'interjections',
    number: 10,
    name: 'とっさの感情を表す言葉（間投詞）',
    emoji: '💬',
    roleSummary: '「すごい！」「おっと！」「えーと、」など、文のどこかで自分のとっさの感情や相づちを入れる言葉だよ！',
    kidExplanation:
      'びっくりしたときや嬉しいときは後ろに「！」をつけて「Wow!（すごい！）」「Oops!（おっと！）」「Ouch!（痛っ！）」「Yay!（やったー！）」、考えながら話すときは「,」をつけて「Well,（えーと・まあ）」「Oh,（ああ）」と使います。',
    examples: [
      { en: 'Wow!', ja: 'ワオ！・すごい！' },
      { en: 'Oops!', ja: 'おっと！' },
      { en: 'Well, / Um,', ja: 'えーと、・まあ、' },
      { en: 'Yay! / Hey!', ja: 'やったー！ / ねえ！' }
    ]
  }
];

/**
 * グループ別単語データ（Day11〜Day21の10品詞順・各品詞の最後に（～詞）を付与）
 * 各アイテム: { id, japanese, english, speech, emoji, phonetic }
 * ※発音記号（phonetic）はOxford Learner's DictionariesのNorth American English (NAmE) 準拠
 */
export const WORD_GROUPS = {
  nouns: {
    id: 'nouns',
    name: 'モノ・コトの名前（名詞）',
    emoji: '🏷️',
    description: 'ひと・もの・しぜん・どうぶつ・がっこうの かもくなどの なまえ',
    subGroups: {
      nature: {
        id: 'nature',
        name: '自然',
        emoji: '🌿',
        description: '空や天気、まわりの自然',
        words: [
          { id: 'nat_1', japanese: 'そら（空）', english: 'sky', speech: 'sky', emoji: '🌤️', phonetic: '/skaɪ/' },
          { id: 'nat_2', japanese: 'たいよう（太陽）', english: 'sun', speech: 'sun', emoji: '☀️', phonetic: '/sʌn/' },
          { id: 'nat_3', japanese: 'あめ（雨）', english: 'rain', speech: 'rain', emoji: '🌧️', phonetic: '/reɪn/' },
          { id: 'nat_4', japanese: 'くも（雲）', english: 'cloud', speech: 'cloud', emoji: '☁️', phonetic: '/klaʊd/' },
          { id: 'nat_5', japanese: 'やま（山）', english: 'mountain', speech: 'mountain', emoji: '⛰️', phonetic: '/ˈmaʊntn/' },
          { id: 'nat_6', japanese: 'かわ（川）', english: 'river', speech: 'river', emoji: '🏞️', phonetic: '/ˈrɪvər/' },
          { id: 'nat_7', japanese: 'うみ（海）', english: 'sea', speech: 'sea', emoji: '🌊', phonetic: '/siː/' },
          { id: 'nat_8', japanese: 'ほし（星）', english: 'star', speech: 'star', emoji: '⭐', phonetic: '/stɑːr/' },
          { id: 'nat_9', japanese: 'はな（花）', english: 'flower', speech: 'flower', emoji: '🌸', phonetic: '/ˈflaʊər/' },
          { id: 'nat_10', japanese: 'き（木）', english: 'tree', speech: 'tree', emoji: '🌳', phonetic: '/triː/' }
        ]
      },
      subjects: {
        id: 'subjects',
        name: '教科',
        emoji: '📚',
        description: 'がっこうの じゅぎょうや かもく',
        words: [
          { id: 'sub_1', japanese: 'えいご（英語）', english: 'English', speech: 'English', emoji: '🔤', phonetic: '/ˈɪŋɡlɪʃ/' },
          { id: 'sub_2', japanese: 'さんすう（算数・数学）', english: 'math', speech: 'math', emoji: '➗', phonetic: '/mæθ/' },
          { id: 'sub_3', japanese: 'りか（理科）', english: 'science', speech: 'science', emoji: '🔬', phonetic: '/ˈsaɪəns/' },
          { id: 'sub_4', japanese: 'おんがく（音楽）', english: 'music', speech: 'music', emoji: '🎵', phonetic: '/ˈmjuːzɪk/' },
          { id: 'sub_5', japanese: 'ずこう（図工・美術）', english: 'art', speech: 'art', emoji: '🎨', phonetic: '/ɑːrt/' },
          { id: 'sub_6', japanese: 'たいいく（体育）', english: 'PE', speech: 'P E', emoji: '⚽', phonetic: '/ˌpiː ˈiː/' },
          { id: 'sub_7', japanese: 'こくご（国語）', english: 'Japanese', speech: 'Japanese', emoji: '📖', phonetic: '/ˌdʒæpəˈniːz/' },
          { id: 'sub_8', japanese: 'しゃかい（社会）', english: 'social studies', speech: 'social studies', emoji: '🗺️', phonetic: '/ˈsoʊʃl ˈstʌdiz/' }
        ]
      },
      animals: {
        id: 'animals',
        name: '動物',
        emoji: '🐾',
        description: 'どうぶつえんや いえにいる いきもの',
        words: [
          { id: 'ani_1', japanese: 'いぬ（犬）', english: 'dog', speech: 'dog', emoji: '🐶', phonetic: '/dɔːɡ/' },
          { id: 'ani_2', japanese: 'ねこ（猫）', english: 'cat', speech: 'cat', emoji: '🐱', phonetic: '/kæt/' },
          { id: 'ani_3', japanese: 'ぞう（象）', english: 'elephant', speech: 'elephant', emoji: '🐘', phonetic: '/ˈelɪfənt/' },
          { id: 'ani_4', japanese: 'ライオン', english: 'lion', speech: 'lion', emoji: '🦁', phonetic: '/ˈlaɪən/' },
          { id: 'ani_5', japanese: 'パンダ', english: 'panda', speech: 'panda', emoji: '🐼', phonetic: '/ˈpændə/' },
          { id: 'ani_6', japanese: 'うさぎ', english: 'rabbit', speech: 'rabbit', emoji: '🐰', phonetic: '/ˈræbɪt/' },
          { id: 'ani_7', japanese: 'くま（熊）', english: 'bear', speech: 'bear', emoji: '🐻', phonetic: '/ber/' },
          { id: 'ani_8', japanese: 'さる（猿）', english: 'monkey', speech: 'monkey', emoji: '🐵', phonetic: '/ˈmʌŋki/' },
          { id: 'ani_9', japanese: 'とり（鳥）', english: 'bird', speech: 'bird', emoji: '🐦', phonetic: '/bɜːrd/' },
          { id: 'ani_10', japanese: 'さかな（魚）', english: 'fish', speech: 'fish', emoji: '🐟', phonetic: '/fɪʃ/' }
        ]
      },
      people_places: {
        id: 'people_places',
        name: '人・場所',
        emoji: '🏫',
        description: 'かぞくや まちの ばしょ（Day12 普通・集合・固有名詞より）',
        words: [
          { id: 'pp_1', japanese: 'おとうさん（父）', english: 'father', speech: 'father', emoji: '👨', phonetic: '/ˈfɑːðər/' },
          { id: 'pp_2', japanese: 'おかあさん（母）', english: 'mother', speech: 'mother', emoji: '👩', phonetic: '/ˈmʌðər/' },
          { id: 'pp_3', japanese: 'せんせい（先生）', english: 'teacher', speech: 'teacher', emoji: '🧑‍🏫', phonetic: '/ˈtiːtʃər/' },
          { id: 'pp_4', japanese: 'ともだち（友達）', english: 'friend', speech: 'friend', emoji: '🤝', phonetic: '/frend/' },
          { id: 'pp_5', japanese: 'かぞく（家族）', english: 'family', speech: 'family', emoji: '👨‍👩‍👧‍👦', phonetic: '/ˈfæməli/' },
          { id: 'pp_6', japanese: 'がっこう（学校）', english: 'school', speech: 'school', emoji: '🏫', phonetic: '/skuːl/' },
          { id: 'pp_7', japanese: 'こうえん（公園）', english: 'park', speech: 'park', emoji: '⛲', phonetic: '/pɑːrk/' },
          { id: 'pp_8', japanese: 'としょかん（図書館）', english: 'library', speech: 'library', emoji: '🏛️', phonetic: '/ˈlaɪbreri/' },
          { id: 'pp_9', japanese: 'えき（駅）', english: 'station', speech: 'station', emoji: '🚉', phonetic: '/ˈsteɪʃn/' },
          { id: 'pp_10', japanese: 'にほん（日本）', english: 'Japan', speech: 'Japan', emoji: '🗾', phonetic: '/dʒəˈpæn/' }
        ]
      },
      food_things: {
        id: 'food_things',
        name: '食べ物・身の回り',
        emoji: '🍙',
        description: 'たべものや まいにち つかうモノ（Day12 普通・物質・抽象名詞より）',
        words: [
          { id: 'ft_1', japanese: 'りんご', english: 'apple', speech: 'apple', emoji: '🍎', phonetic: '/ˈæpl/' },
          { id: 'ft_2', japanese: 'コメ・ごはん', english: 'rice', speech: 'rice', emoji: '🍚', phonetic: '/raɪs/' },
          { id: 'ft_3', japanese: 'パン', english: 'bread', speech: 'bread', emoji: '🍞', phonetic: '/bred/' },
          { id: 'ft_4', japanese: 'みず（水）', english: 'water', speech: 'water', emoji: '💧', phonetic: '/ˈwɔːtər/' },
          { id: 'ft_5', japanese: 'ぎゅうにゅう（牛乳）', english: 'milk', speech: 'milk', emoji: '🥛', phonetic: '/mɪlk/' },
          { id: 'ft_6', japanese: 'ほん（本）', english: 'book', speech: 'book', emoji: '📕', phonetic: '/bʊk/' },
          { id: 'ft_7', japanese: 'えんぴつ（鉛筆）', english: 'pencil', speech: 'pencil', emoji: '✏️', phonetic: '/ˈpensl/' },
          { id: 'ft_8', japanese: 'つくえ（テーブル）', english: 'table', speech: 'table', emoji: '🪑', phonetic: '/ˈteɪbl/' },
          { id: 'ft_9', japanese: 'じかん（時間）', english: 'time', speech: 'time', emoji: '⏰', phonetic: '/taɪm/' },
          { id: 'ft_10', japanese: 'ゆめ（夢）', english: 'dream', speech: 'dream', emoji: '💭', phonetic: '/driːm/' }
        ]
      }
    }
  },
  pronouns: {
    id: 'pronouns',
    name: '名前の代わりの言葉（代名詞）',
    emoji: '👤',
    description: 'ひとや ものを なまえの かわりに さすことば（Day13 代名詞より）',
    words: [
      { id: 'pro_1', japanese: 'わたし', english: 'I', speech: 'I', emoji: '🙋', phonetic: '/aɪ/' },
      { id: 'pro_2', japanese: 'わたしたち', english: 'we', speech: 'we', emoji: '👨‍👩‍👧', phonetic: '/wi/' },
      { id: 'pro_3', japanese: 'あなた', english: 'you', speech: 'you', emoji: '👉', phonetic: '/ju/' },
      { id: 'pro_4', japanese: 'あなたたち', english: 'you', speech: 'you', emoji: '🫵', phonetic: '/ju/' },
      { id: 'pro_5', japanese: 'かれ', english: 'he', speech: 'he', emoji: '👦', phonetic: '/hi/' },
      { id: 'pro_6', japanese: 'かのじょ', english: 'she', speech: 'she', emoji: '👧', phonetic: '/ʃi/' },
      { id: 'pro_7', japanese: 'それ', english: 'it', speech: 'it', emoji: '📦', phonetic: '/ɪt/' },
      { id: 'pro_8', japanese: 'かれら/かのじょら/それら', english: 'they', speech: 'they', emoji: '👥', phonetic: '/ðeɪ/' },
      { id: 'pro_9', japanese: 'これ', english: 'this', speech: 'this', emoji: '👇', phonetic: '/ðɪs/' },
      { id: 'pro_10', japanese: 'これら', english: 'these', speech: 'these', emoji: '👐', phonetic: '/ðiːz/' },
      { id: 'pro_11', japanese: 'あれ', english: 'that', speech: 'that', emoji: '☝️', phonetic: '/ðæt/' },
      { id: 'pro_12', japanese: 'あれら', english: 'those', speech: 'those', emoji: '🙌', phonetic: '/ðoʊz/' },
      { id: 'pro_13', japanese: 'だれ', english: 'who', speech: 'who', emoji: '❓', phonetic: '/huː/' },
      { id: 'pro_14', japanese: 'なに（何）', english: 'what', speech: 'what', emoji: '❔', phonetic: '/wʌt/' },
      { id: 'pro_15', japanese: 'みんな（全員）', english: 'everyone', speech: 'everyone', emoji: '🌏', phonetic: '/ˈevriwʌn/' },
      { id: 'pro_16', japanese: 'なにか（何か）', english: 'something', speech: 'something', emoji: '🎁', phonetic: '/ˈsʌmθɪŋ/' }
    ]
  },
  determiners: {
    id: 'determiners',
    name: '範囲や数を決める言葉（限定詞）',
    emoji: '🔍',
    description: '名詞のまえにつけて「だれの・いくつの・どの」を決めることば（Day14 限定詞より）',
    words: [
      { id: 'det_1', japanese: '1つの～（子音の前）', english: 'a', speech: 'a', emoji: '1️⃣', phonetic: '/ə/' },
      { id: 'det_2', japanese: '1つの～（母音の前）', english: 'an', speech: 'an', emoji: '🍎', phonetic: '/æn/' },
      { id: 'det_3', japanese: 'その～・あの～（特定のもの）', english: 'the', speech: 'the', emoji: '⭐', phonetic: '/ðə/' },
      { id: 'det_4', japanese: 'わたしの～', english: 'my', speech: 'my', emoji: '🎒', phonetic: '/maɪ/' },
      { id: 'det_5', japanese: 'わたしたちの～', english: 'our', speech: 'our', emoji: '🏠', phonetic: '/ˈaʊər/' },
      { id: 'det_6', japanese: 'あなたの～', english: 'your', speech: 'your', emoji: '🧢', phonetic: '/jɔːr/' },
      { id: 'det_7', japanese: 'あなたたちの～', english: 'your', speech: 'your', emoji: '🏫', phonetic: '/jɔːr/' },
      { id: 'det_8', japanese: 'かれの～', english: 'his', speech: 'his', emoji: '👦', phonetic: '/hɪz/' },
      { id: 'det_9', japanese: 'かのじょの～', english: 'her', speech: 'her', emoji: '👧', phonetic: '/hɜːr/' },
      { id: 'det_10', japanese: 'かれらの・それらの～', english: 'their', speech: 'their', emoji: '👥', phonetic: '/ðer/' },
      { id: 'det_11', japanese: 'いくつかの～', english: 'some', speech: 'some', emoji: '🍪', phonetic: '/sʌm/' },
      { id: 'det_12', japanese: 'たくさんの～（数えられる）', english: 'many', speech: 'many', emoji: '📚', phonetic: '/ˈmeni/' }
    ]
  },
  adjectives: {
    id: 'adjectives',
    name: 'どんな状態・性質かを表す言葉（形容詞）',
    emoji: '✨',
    description: '名詞のようすや せいしつ、いろ・おおきさを 説明する言葉（Day15 形容詞より）',
    words: [
      { id: 'adj_1', japanese: 'おおきい（大きい）', english: 'big', speech: 'big', emoji: '🐘', phonetic: '/bɪɡ/' },
      { id: 'adj_2', japanese: 'ちいさい（小さい）', english: 'small', speech: 'small', emoji: '🐭', phonetic: '/smɔːl/' },
      { id: 'adj_3', japanese: 'よい・すてきな', english: 'good', speech: 'good', emoji: '👍', phonetic: '/ɡʊd/' },
      { id: 'adj_4', japanese: 'うれしい・幸せな', english: 'happy', speech: 'happy', emoji: '😄', phonetic: '/ˈhæpi/' },
      { id: 'adj_5', japanese: 'うつくしい（美しい）', english: 'beautiful', speech: 'beautiful', emoji: '💐', phonetic: '/ˈbjuːtɪfl/' },
      { id: 'adj_6', japanese: 'あかい（赤い）', english: 'red', speech: 'red', emoji: '🔴', phonetic: '/red/' },
      { id: 'adj_7', japanese: 'あたらしい（新しい）', english: 'new', speech: 'new', emoji: '✨', phonetic: '/nuː/' },
      { id: 'adj_8', japanese: 'ふるい（古い）', english: 'old', speech: 'old', emoji: '🕰️', phonetic: '/oʊld/' },
      { id: 'adj_9', japanese: 'あつい（暑い・熱い）', english: 'hot', speech: 'hot', emoji: '🥵', phonetic: '/hɑːt/' },
      { id: 'adj_10', japanese: 'さむい・つめたい', english: 'cold', speech: 'cold', emoji: '🥶', phonetic: '/koʊld/' },
      { id: 'adj_11', japanese: 'かわいい', english: 'cute', speech: 'cute', emoji: '🎀', phonetic: '/kjuːt/' },
      { id: 'adj_12', japanese: 'やさしい・親切な', english: 'kind', speech: 'kind', emoji: '💝', phonetic: '/kaɪnd/' }
    ]
  },
  actions: {
    id: 'actions',
    name: '状態や動きを表す言葉（動詞）',
    emoji: '🏃',
    description: '状態（be動詞）や きもち、まいにちの動作を表す言葉（Day16 動詞より）',
    words: [
      { id: 'act_0a', japanese: '～だ・いる（わたし I のとき）', english: 'am', speech: 'am', emoji: '🙋', phonetic: '/æm/' },
      { id: 'act_0b', japanese: '～だ・いる（かれ・それ 1つのとき）', english: 'is', speech: 'is', emoji: '☝️', phonetic: '/ɪz/' },
      { id: 'act_0c', japanese: '～だ・いる（あなた・複数のとき）', english: 'are', speech: 'are', emoji: '👥', phonetic: '/ɑːr/' },
      { id: 'act_0d', japanese: 'すき（好き）', english: 'like', speech: 'like', emoji: '❤️', phonetic: '/laɪk/' },
      { id: 'act_1', japanese: 'はしる（走る）', english: 'run', speech: 'run', emoji: '🏃', phonetic: '/rʌn/' },
      { id: 'act_2', japanese: 'あるく（歩く）', english: 'walk', speech: 'walk', emoji: '🚶', phonetic: '/wɔːk/' },
      { id: 'act_3', japanese: 'たべる（食べる）', english: 'eat', speech: 'eat', emoji: '🍙', phonetic: '/iːt/' },
      { id: 'act_4', japanese: 'のむ（飲む）', english: 'drink', speech: 'drink', emoji: '🥤', phonetic: '/drɪŋk/' },
      { id: 'act_5', japanese: 'ねる（眠る）', english: 'sleep', speech: 'sleep', emoji: '💤', phonetic: '/sliːp/' },
      { id: 'act_6', japanese: 'べんきょうする', english: 'study', speech: 'study', emoji: '✏️', phonetic: '/ˈstʌdi/' },
      { id: 'act_7', japanese: 'あそぶ・スポーツをする', english: 'play', speech: 'play', emoji: '🎮', phonetic: '/pleɪ/' },
      { id: 'act_8', japanese: 'よむ（読む）', english: 'read', speech: 'read', emoji: '📖', phonetic: '/riːd/' },
      { id: 'act_9', japanese: 'かく（書く）', english: 'write', speech: 'write', emoji: '✍️', phonetic: '/raɪt/' },
      { id: 'act_10', japanese: 'わらう（笑う）', english: 'smile', speech: 'smile', emoji: '😊', phonetic: '/smaɪl/' }
    ]
  },
  adverbs: {
    id: 'adverbs',
    name: '名詞以外をくわしくする言葉（副詞）',
    emoji: '⚡',
    description: 'うごきの様子・頻度・時・場所・程度をくわしくする言葉（Day17 副詞より）',
    words: [
      { id: 'adv_1', japanese: 'はやく（速く）', english: 'fast', speech: 'fast', emoji: '💨', phonetic: '/fæst/' },
      { id: 'adv_2', japanese: 'ゆっくりと', english: 'slowly', speech: 'slowly', emoji: '🐢', phonetic: '/ˈsloʊli/' },
      { id: 'adv_3', japanese: 'じょうずに（よく）', english: 'well', speech: 'well', emoji: '👏', phonetic: '/wel/' },
      { id: 'adv_4', japanese: 'とても', english: 'very', speech: 'very', emoji: '🌟', phonetic: '/ˈveri/' },
      { id: 'adv_5', japanese: 'いつも', english: 'always', speech: 'always', emoji: '🔁', phonetic: '/ˈɔːlweɪz/' },
      { id: 'adv_6', japanese: 'たいてい（普段は）', english: 'usually', speech: 'usually', emoji: '📅', phonetic: '/ˈjuːʒuəli/' },
      { id: 'adv_7', japanese: 'ときどき', english: 'sometimes', speech: 'sometimes', emoji: '🌤️', phonetic: '/ˈsʌmtaɪmz/' },
      { id: 'adv_8', japanese: 'いちども～ない', english: 'never', speech: 'never', emoji: '🚫', phonetic: '/ˈnevər/' },
      { id: 'adv_9', japanese: 'いま（今）', english: 'now', speech: 'now', emoji: '⏰', phonetic: '/naʊ/' },
      { id: 'adv_10', japanese: 'ここで（ここに）', english: 'here', speech: 'here', emoji: '📍', phonetic: '/hɪr/' },
      { id: 'adv_11', japanese: 'いっしょに', english: 'together', speech: 'together', emoji: '🤝', phonetic: '/təˈɡeðər/' }
    ]
  },
  auxiliaries: {
    id: 'auxiliaries',
    name: '動詞に意味を付け加える言葉（助動詞）',
    emoji: '🦸',
    description: '動詞のまえにおいて「できる・つもり・すべき」を足す言葉（Day18 助動詞より）',
    words: [
      { id: 'aux_1', japanese: '～できる', english: 'can', speech: 'can', emoji: '💪', phonetic: '/kæn/' },
      { id: 'aux_2', japanese: '～できた・～できますか（丁寧）', english: 'could', speech: 'could', emoji: '✨', phonetic: '/kʊd/' },
      { id: 'aux_3', japanese: '～するつもり・～だろう', english: 'will', speech: 'will', emoji: '🚀', phonetic: '/wɪl/' },
      { id: 'aux_4', japanese: '～だろう（過去）・～くれませんか', english: 'would', speech: 'would', emoji: '🎩', phonetic: '/wʊd/' },
      { id: 'aux_5', japanese: '～かもしれない・～してもよい', english: 'may', speech: 'may', emoji: '🍀', phonetic: '/meɪ/' },
      { id: 'aux_6', japanese: '～かもしれない（弱めの推測）', english: 'might', speech: 'might', emoji: '💭', phonetic: '/maɪt/' },
      { id: 'aux_7', japanese: '～しなければならない・～に違いない', english: 'must', speech: 'must', emoji: '🔥', phonetic: '/mʌst/' },
      { id: 'aux_8', japanese: '～すべきだ', english: 'should', speech: 'should', emoji: '💡', phonetic: '/ʃʊd/' },
      { id: 'aux_9', japanese: '～しましょうか？', english: 'shall', speech: 'shall', emoji: '🤝', phonetic: '/ʃæl/' }
    ]
  },
  prepositions: {
    id: 'prepositions',
    name: '場所・時間・方向などを示す言葉（前置詞）',
    emoji: '📍',
    description: '名詞のまえにおいて 場所・方向・時間・関係を示す言葉（Day19 前置詞より）',
    words: [
      { id: 'prep_1', japanese: '～に（特定の場所・時刻）', english: 'at', speech: 'at', emoji: '🎯', phonetic: '/æt/' },
      { id: 'prep_2', japanese: '～のうえに・曜日や日付に', english: 'on', speech: 'on', emoji: '📕', phonetic: '/ɑːn/' },
      { id: 'prep_3', japanese: '～のなかに・月や季節に', english: 'in', speech: 'in', emoji: '📦', phonetic: '/ɪn/' },
      { id: 'prep_4', japanese: '～のしたに', english: 'under', speech: 'under', emoji: '⬇️', phonetic: '/ˈʌndər/' },
      { id: 'prep_5', japanese: '～の横に・～のそばに', english: 'by', speech: 'by', emoji: '↔️', phonetic: '/baɪ/' },
      { id: 'prep_6', japanese: '～へ（目的地に向かって）', english: 'to', speech: 'to', emoji: '➡️', phonetic: '/tuː/' },
      { id: 'prep_7', japanese: '～から（出発点・出身）', english: 'from', speech: 'from', emoji: '🛫', phonetic: '/frʌm/' },
      { id: 'prep_8', japanese: '～のために・～の間（期間）', english: 'for', speech: 'for', emoji: '🎁', phonetic: '/fɔːr/' },
      { id: 'prep_9', japanese: '～といっしょに', english: 'with', speech: 'with', emoji: '👫', phonetic: '/wɪð/' },
      { id: 'prep_10', japanese: '～について', english: 'about', speech: 'about', emoji: '💬', phonetic: '/əˈbaʊt/' },
      { id: 'prep_11', japanese: '～の前に', english: 'before', speech: 'before', emoji: '⏪', phonetic: '/bɪˈfɔːr/' },
      { id: 'prep_12', japanese: '～の後に', english: 'after', speech: 'after', emoji: '⏩', phonetic: '/ˈæftər/' }
    ]
  },
  conjunctions: {
    id: 'conjunctions',
    name: '言葉や文をつなぐ言葉（接続詞）',
    emoji: '🔗',
    description: '単語と単語、文と文をつなぎ合わせる言葉（Day20 接続詞より）',
    words: [
      { id: 'conj_1', japanese: '～と… ／ そして', english: 'and', speech: 'and', emoji: '➕', phonetic: '/ænd/' },
      { id: 'conj_2', japanese: '～だが、しかし', english: 'but', speech: 'but', emoji: '⚡', phonetic: '/bʌt/' },
      { id: 'conj_3', japanese: '～もしくは（または）', english: 'or', speech: 'or', emoji: '⚖️', phonetic: '/ɔːr/' },
      { id: 'conj_4', japanese: '～だから（そこで）', english: 'so', speech: 'so', emoji: '👉', phonetic: '/soʊ/' },
      { id: 'conj_5', japanese: 'なぜなら～なので', english: 'because', speech: 'because', emoji: '💡', phonetic: '/bɪˈkɔːz/' },
      { id: 'conj_6', japanese: 'もし～なら', english: 'if', speech: 'if', emoji: '🌱', phonetic: '/ɪf/' },
      { id: 'conj_7', japanese: '～するとき', english: 'when', speech: 'when', emoji: '⏱️', phonetic: '/wen/' },
      { id: 'conj_8', japanese: '～する前に', english: 'before', speech: 'before', emoji: '⏮️', phonetic: '/bɪˈfɔːr/' }
    ]
  },
  interjections: {
    id: 'interjections',
    name: 'とっさの感情を表す言葉（間投詞）',
    emoji: '💬',
    description: 'びっくり・喜び・相づちなど とっさの感情を表す言葉（Day21 間投詞より）',
    words: [
      { id: 'int_1', japanese: 'すごい！・うわあ！', english: 'Wow!', speech: 'Wow', emoji: '🤩', phonetic: '/waʊ/' },
      { id: 'int_2', japanese: 'ああ、なるほど', english: 'Oh,', speech: 'Oh', emoji: '😮', phonetic: '/oʊ/' },
      { id: 'int_3', japanese: '痛っ！（いたい！）', english: 'Ouch!', speech: 'Ouch', emoji: '💥', phonetic: '/aʊtʃ/' },
      { id: 'int_4', japanese: 'おっと！（しまった）', english: 'Oops!', speech: 'Oops', emoji: '💦', phonetic: '/uːps/' },
      { id: 'int_5', japanese: 'やったー！', english: 'Yay!', speech: 'Yay', emoji: '🙌', phonetic: '/jeɪ/' },
      { id: 'int_6', japanese: 'えーと、・まあ、', english: 'Well,', speech: 'Well', emoji: '🤔', phonetic: '/wel/' },
      { id: 'int_7', japanese: 'えーっと、', english: 'Um,', speech: 'Um', emoji: '💭', phonetic: '/ʌm/' },
      { id: 'int_8', japanese: 'ねえ！（よびかけ）', english: 'Hey!', speech: 'Hey', emoji: '👋', phonetic: '/heɪ/' }
    ]
  }
};

/** 現在選択されているメイングループ（Day11〜12の順番に合わせて名詞から開始） */
let currentGroupId = 'nouns';

/** 現在選択されているサブグループ（モノ・コトの名前用） */
let currentSubGroupId = 'nature';

/** 音声再生スピード倍率（0.5, 0.8, 1.0） */
let playbackSpeedMultiplier = 1.0;

/** 音声の女性・男性交互切り替え管理（初回は女性から開始） */
let isNextVoiceFemale = true;

/** キャッシュされた最適音声（Voice A: 女性 / Voice B: 男性） */
let cachedVoices = {
  female: null,
  male: null
};

/**
 * en-US 音声かどうかを判定するヘルパー
 * @param {SpeechSynthesisVoice} voice
 */
function isEnUsVoice(voice) {
  if (!voice || !voice.lang) return false;
  const lang = voice.lang.replace('_', '-').toLowerCase();
  return lang === 'en-us' || lang.startsWith('en-us');
}

/**
 * 端末・ブラウザごとの音声リストから最適な女性音声（Voice A）・男性音声（Voice B）を選定
 */
export function resolveCrossPlatformVoices() {
  if (!('speechSynthesis' in window)) return;

  const allVoices = window.speechSynthesis.getVoices();
  if (!allVoices || allVoices.length === 0) return;

  const enUsVoices = allVoices.filter(isEnUsVoice);
  const allEnVoices = allVoices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  const femalePool = enUsVoices.length > 0 ? enUsVoices : allEnVoices;

  // 男性音声名の判定正規表現
  const maleNamePattern = /\b(male|david|guy|mark|alex|daniel|oliver|george|fred|tom|aaron|reed|evan|nathan|roger|steffan|christopher|eric|andrew|brian)\b|en-us-x-(iom|sfg|tpd)/i;
  // 女性音声名の判定正規表現
  const femaleNamePattern = /\b(female|zira|samantha|victoria|karen|jenny|aria|ava|allison|susan|fiona|cora|michelle|monica)\b/i;

  // 【女性（Voice A）優先順位】
  // 1. 'Google US English'（Chrome/Android/PC共通のクリアな女性音声）
  // 2. 'Samantha' (iOS/macOS標準のクリアな女性声)
  // 3. 'Microsoft Zira' / 'Jenny' / 'Aria' または 'Natural' を含む en-US 女性音声
  // 4. 名前・URIに女性名または 'female' を含む en-US 音声
  // 5. 男性名を含まない en-US デフォルト音声
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

  // 【男性（Voice B）優先順位】
  // 1. Google US English の男性バリアント（Android等で存在する場合）
  // 2. en-US の実在する男性音声（Microsoft David / Guy / Mark / Natural男性、macOS/iOSの Alex / Aaron / Tom / Fred 等）
  // 3. Chrome標準の Google 男性音声（'Google UK English Male'）および英語圏の明瞭な男性音声（Daniel / Oliver 等）
  // 4. 名前・URIに 'male' を含む英語音声
  // 5. ピッチ変更が確実に効くローカル音声（localService: true）、または女性音声のピッチ下げフォールバック
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
 * 単語が子音（発音上）で終わるかを判定するヘルパー
 * `write`, `smile`, `science`, `Japanese`, `giraffe` など末尾がサイレントeの単語も子音終わりとして正確に判定する
 * @param {string} word - 英語テキスト
 * @param {string} [phonetic] - 発音記号（指定されている場合）
 */
function endsWithConsonantSound(word, phonetic = '') {
  if (phonetic) {
    const cleanIpa = phonetic.replace(/^\/|\/$/g, '').trim();
    // IPAの末尾が子音記号（p, b, t, d, k, g, ɡ, f, v, θ, ð, s, z, ʃ, ʒ, m, n, ŋ, l, r）で終わるか判定
    return /[pbtdkgɡfvθðszʃʒmnŋlr]$/i.test(cleanIpa);
  }
  const clean = word.trim().replace(/[.!,?]$/, '').toLowerCase();
  // サイレントeで終わるが発音上は子音で終わる単語（write, smile, science, japanese, giraffe 等）
  if (/[bcdfghjklmnpqrstvwxz]e$/i.test(clean) && !/^(he|she|we|me|be|see|tree|sea|free|three)$/i.test(clean)) {
    return true;
  }
  // 通常の子音文字で終わる単語（sky, play, study 等 母音発音の y は除外）
  return /[bcdfghjklmnpqrstvwxz]$/i.test(clean);
}

/**
 * 末尾の子音がTTSエンジンで飲み込まれず（無破裂化せず）、明瞭に開放発音されるようテキストを整形
 * @param {string} text - 元の英単語テキスト
 * @param {boolean} hasFinalConsonant - 発音上、末尾が子音で終わるかどうか
 */
function formatForClearArticulation(text, hasFinalConsonant) {
  const clean = text.trim().replace(/[.!,?]$/, '');
  if (!clean) return '';

  // 先頭を大文字化することで、代名詞（it等）や動詞（eat, write等）が機能語・弱形として語尾省略（[ɪʔ]等）されるのを防止
  const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);

  // 末尾に空白パディングを付与し、ブラウザの音声出力バッファが語尾の無声破裂音（/t/, /k/, /p/ 等）の余韻をクリップするのを防止
  return hasFinalConsonant ? `${capitalized}!   ` : `${capitalized}.   `;
}

/**
 * クリックごとに女性 ➔ 男性 ➔ 女性... と切り替わる音声設定を取得
 * @param {boolean} [hasFinalConsonant=true] - 末尾が子音で終わる単語かどうか
 */
function getAlternateVoiceSettings(hasFinalConsonant = true) {
  // 常に最新の音声リストから解決を試みる
  resolveCrossPlatformVoices();

  const isFemale = isNextVoiceFemale;
  isNextVoiceFemale = !isNextVoiceFemale;

  const selectedVoice = isFemale ? cachedVoices.female : (cachedVoices.male || cachedVoices.female);

  // 男性ボイスが女性ボイスと別エンジン（実在する男性ボイス）かどうかを判定
  const isDistinctMaleVoice = !isFemale && cachedVoices.male && cachedVoices.male !== cachedVoices.female;

  // 基本再生速度（rate）: 0.9 をアプリの「1倍」とする。
  // 子音終わりの単語は語尾子音の調音フレームを確保するためわずかに丁寧な速度（0.86）に補正
  const BASE_RATE = hasFinalConsonant ? 0.86 : 0.90;
  const calculatedRate = Math.round(BASE_RATE * playbackSpeedMultiplier * 100) / 100;

  // ピッチ設定：
  // - 女性音声: 0.95（少し低めで落ち着いたナチュラルなトーン）
  // - 男性音声（専用男性ボイスの場合）: 1.06（0.85に下げすぎると語尾が低音で潰れて子音が消えるため、子音が際立つ明瞭なピッチを維持）
  // - 男性音声（単一音声のフォールバック時のみ）: 0.85（同一ボイスを男性化）
  const targetPitch = isFemale
    ? 0.95
    : (isDistinctMaleVoice ? 1.06 : 0.85);

  return {
    isFemale,
    voice: selectedVoice,
    pitch: targetPitch,
    rate: calculatedRate
  };
}

/**
 * Web Speech API を用いた英語音声読み上げ（クロスプラットフォーム対応・男女交互再生・語尾子音強化）
 * @param {string} text - 発音する英語
 * @param {HTMLElement} [elementToHighlight] - 再生中にハイライトするカード要素
 * @param {string} [phonetic] - 発音記号（語尾子音判定の精度向上用）
 */
export function speakWord(text, elementToHighlight = null, phonetic = '') {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported in this browser.');
    return;
  }

  // 連打時の音重なりや詰まりを防ぐため、再生直前にキューを安全にリセット
  window.speechSynthesis.cancel();

  const hasFinalConsonant = endsWithConsonantSound(text, phonetic);
  const voiceSettings = getAlternateVoiceSettings(hasFinalConsonant);
  const formattedText = formatForClearArticulation(text, hasFinalConsonant);

  const utterance = new SpeechSynthesisUtterance(formattedText);
  // 選択された音声のlangに合わせる（不一致によるブラウザ側のデフォルト女性音声への強制上書きを防止）
  utterance.lang = (voiceSettings.voice && voiceSettings.voice.lang) ? voiceSettings.voice.lang : 'en-US';
  utterance.rate = voiceSettings.rate;
  utterance.pitch = voiceSettings.pitch;
  utterance.volume = 1.0;

  if (voiceSettings.voice) {
    utterance.voice = voiceSettings.voice;
  }

  if (elementToHighlight) {
    elementToHighlight.classList.add('playing');
  }

  const cleanup = () => {
    if (elementToHighlight) {
      elementToHighlight.classList.remove('playing');
    }
  };

  utterance.onend = cleanup;
  utterance.onerror = cleanup;

  setTimeout(cleanup, 2500);

  window.speechSynthesis.speak(utterance);
}

/**
 * グループ内の総単語数を取得するヘルパー
 * @param {object} group
 */
function getGroupTotalWordCount(group) {
  if (!group) return 0;
  if (Array.isArray(group.words)) return group.words.length;
  if (group.subGroups) {
    return Object.values(group.subGroups).reduce((sum, sub) => sum + (sub.words ? sub.words.length : 0), 0);
  }
  return 0;
}

/**
 * サブカテゴリ切替タブ（モノ・コトの名前の中分類）のレンダリングと制御
 * @param {object} group - 現在選択中のメイングループ
 */
export function renderSubGroupTabs(group) {
  const subTabsContainer = document.getElementById('subGroupTabsContainer');
  if (!subTabsContainer) return;

  if (!group || !group.subGroups) {
    subTabsContainer.classList.add('hidden');
    subTabsContainer.innerHTML = '';
    return;
  }

  subTabsContainer.classList.remove('hidden');
  subTabsContainer.innerHTML = `<span class="sub-group-label">📂 しゅるいをえらぶ：</span>`;

  const subGroupsList = Object.values(group.subGroups);
  if (!group.subGroups[currentSubGroupId] && subGroupsList.length > 0) {
    currentSubGroupId = subGroupsList[0].id;
  }

  subGroupsList.forEach((subGroup) => {
    const subBtn = document.createElement('button');
    subBtn.type = 'button';
    subBtn.className = `sub-group-tab-btn ${subGroup.id === currentSubGroupId ? 'active' : ''}`;
    subBtn.setAttribute('data-sub-group-id', subGroup.id);
    subBtn.innerHTML = `
      <span>${subGroup.emoji}</span>
      <span>${subGroup.name}</span>
      <span class="tab-badge">${subGroup.words.length}</span>
    `;

    subBtn.addEventListener('click', () => {
      currentSubGroupId = subGroup.id;

      subTabsContainer.querySelectorAll('.sub-group-tab-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-sub-group-id') === subGroup.id);
      });

      renderWordList(currentGroupId);
    });

    subTabsContainer.appendChild(subBtn);
  });
}

/**
 * 単語リストのレンダリング
 * @param {string} groupId - 表示対象のグループID
 */
export function renderWordList(groupId) {
  const group = WORD_GROUPS[groupId];
  const listContainer = document.getElementById('wordListContainer');
  const groupNameElem = document.getElementById('currentGroupName');
  
  if (!group || !listContainer) return;

  // サブグループを持つカテゴリ（モノ・コトの名前）かどうかを判定
  let targetWords = [];
  if (group.subGroups) {
    const subGroup = group.subGroups[currentSubGroupId] || Object.values(group.subGroups)[0];
    if (subGroup) {
      currentSubGroupId = subGroup.id;
      targetWords = subGroup.words;
      if (groupNameElem) {
        groupNameElem.textContent = `${group.emoji} ${group.name} ＞ ${subGroup.emoji} ${subGroup.name}（${targetWords.length}単語）`;
      }
    }
  } else {
    targetWords = group.words || [];
    if (groupNameElem) {
      groupNameElem.textContent = `${group.emoji} ${group.name}（${targetWords.length}単語）`;
    }
  }

  // リストを構築
  listContainer.innerHTML = '';

  targetWords.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'word-item-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${item.japanese}、英語で ${item.english}、発音記号 ${item.phonetic}、クリックして発音`);

    card.innerHTML = `
      <div class="word-japanese-col">
        <span class="word-emoji" aria-hidden="true">${item.emoji}</span>
        <span>${item.japanese}</span>
      </div>
      <div class="word-english-col">
        <span class="word-english-text">${item.english}</span>
        <span class="word-phonetic" title="アメリカ発音記号">${item.phonetic}</span>
        <button class="sound-btn" type="button" aria-label="${item.english} の発音をきく">
          🔊
        </button>
      </div>
    `;

    // クリックおよびキーボードEnterで発音
    const playHandler = (e) => {
      e.stopPropagation();
      speakWord(item.speech || item.english, card, item.phonetic);
    };

    card.addEventListener('click', playHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playHandler(e);
      }
    });

    listContainer.appendChild(card);
  });
}

/**
 * 指定グループIDに「英単語じてん」のタブを切り替えるヘルパー
 * @param {string} groupId
 */
export function switchGroupTab(groupId) {
  const group = WORD_GROUPS[groupId];
  if (!group) return;

  currentGroupId = group.id;

  document.querySelectorAll('.group-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-group-id') === group.id);
  });

  renderSubGroupTabs(group);
  renderWordList(currentGroupId);
}

/**
 * グループ切替タブのレンダリングと制御
 */
export function initGroupTabs() {
  const tabsContainer = document.getElementById('groupTabsContainer');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = '';

  Object.values(WORD_GROUPS).forEach((group) => {
    const totalCount = getGroupTotalWordCount(group);
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.className = `group-tab-btn ${group.id === currentGroupId ? 'active' : ''}`;
    tabBtn.setAttribute('data-group-id', group.id);
    tabBtn.innerHTML = `
      <span>${group.emoji}</span>
      <span>${group.name}</span>
      <span class="tab-badge">${totalCount}</span>
    `;

    tabBtn.addEventListener('click', () => {
      switchGroupTab(group.id);
    });

    tabsContainer.appendChild(tabBtn);
  });

  // 初期状態のサブタブ表示制御
  renderSubGroupTabs(WORD_GROUPS[currentGroupId]);
}

/**
 * 「ことばの種類（品詞の役割）」リストのレンダリング
 */
export function renderWordTypesList() {
  const container = document.getElementById('wordTypesListContainer');
  if (!container) return;

  container.innerHTML = '';

  WORD_TYPES_GUIDE.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'word-type-card';
    card.setAttribute('role', 'listitem');

    const examplesHtml = item.examples
      .map(
        (ex) => `
          <span class="word-type-example-chip">
            <span class="word-type-example-en">${ex.en}</span>
            <span>（${ex.ja}）</span>
          </span>
        `
      )
      .join('');

    card.innerHTML = `
      <div class="word-type-card-top">
        <div class="word-type-title-wrap">
          <span class="word-type-num-badge" aria-label="${item.number}番">${item.number}</span>
          <span class="word-type-emoji" aria-hidden="true">${item.emoji}</span>
          <h4 class="word-type-name">${item.name}</h4>
        </div>
        <button
          type="button"
          class="word-type-jump-btn"
          data-jump-group="${item.id}"
          aria-label="${item.name} の単語を英単語じてんで見る"
        >
          <span>📖</span>
          <span>この種類の単語を見る →</span>
        </button>
      </div>

      <div class="word-type-desc">
        <strong>💡 どんな役割？：</strong>${item.roleSummary}<br />
        <span>${item.kidExplanation}</span>
      </div>

      <div class="word-type-examples-row">
        <span class="word-type-examples-label">📝 たとえば：</span>
        ${examplesHtml}
      </div>
    `;

    const jumpBtn = card.querySelector('.word-type-jump-btn');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        const targetGroupId = jumpBtn.getAttribute('data-jump-group');
        const typesCard = document.getElementById('wordTypesModeCard');
        const dictCard = document.getElementById('dictModeCard');
        const typesArea = document.getElementById('wordTypesArea');
        const dictArea = document.getElementById('dictionaryArea');

        if (typesCard && dictCard && typesArea && dictArea) {
          typesCard.classList.remove('active');
          typesCard.setAttribute('aria-expanded', 'false');
          dictCard.classList.add('active');
          dictCard.setAttribute('aria-expanded', 'true');

          typesArea.classList.add('hidden');
          dictArea.classList.remove('hidden');
        }

        if (targetGroupId) {
          switchGroupTab(targetGroupId);
        }

        if (dictArea) {
          dictArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    container.appendChild(card);
  });
}

/**
 * クイズ準備中モーダル制御
 */
export function initModals() {
  const quizCard = document.getElementById('quizModeCard');
  const modal = document.getElementById('quizComingSoonModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (quizCard && modal) {
    quizCard.addEventListener('click', () => {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      if (closeBtn) closeBtn.focus();
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/**
 * サブゲーム選択（ことばの種類 / 英単語じてん / 単語クイズ）のUI連動
 */
export function initModeSelection() {
  const typesCard = document.getElementById('wordTypesModeCard');
  const dictCard = document.getElementById('dictModeCard');
  const typesArea = document.getElementById('wordTypesArea');
  const dictArea = document.getElementById('dictionaryArea');

  if (typesCard && dictCard && typesArea && dictArea) {
    typesCard.addEventListener('click', () => {
      typesCard.classList.add('active');
      typesCard.setAttribute('aria-expanded', 'true');
      dictCard.classList.remove('active');
      dictCard.setAttribute('aria-expanded', 'false');

      typesArea.classList.remove('hidden');
      dictArea.classList.add('hidden');

      typesArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    dictCard.addEventListener('click', () => {
      dictCard.classList.add('active');
      dictCard.setAttribute('aria-expanded', 'true');
      typesCard.classList.remove('active');
      typesCard.setAttribute('aria-expanded', 'false');

      dictArea.classList.remove('hidden');
      typesArea.classList.add('hidden');

      dictArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/**
 * 再生スピード変更プルダウンの制御
 */
export function initSpeedControl() {
  const speedSelect = document.getElementById('playbackSpeedSelect');
  if (!speedSelect) return;

  speedSelect.addEventListener('change', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
      playbackSpeedMultiplier = val;
    }
  });
}

/**
 * 画面全体の初期化
 */
export function initWordMatch() {
  if ('speechSynthesis' in window) {
    resolveCrossPlatformVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      resolveCrossPlatformVoices();
    };
  }

  renderWordTypesList();
  initGroupTabs();
  renderWordList(currentGroupId);
  initSpeedControl();
  initModeSelection();
  initModals();
}

// 読み込み完了時に実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWordMatch);
} else {
  initWordMatch();
}


