/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 英単語スタディ - 単語データ管理・UI制御・音声合成ロジック (games/word-match/main.js)
 * ES Modules形式
 */

/**
 * グループ別単語データ
 * 各アイテム: { id, japanese, english, speech, emoji, phonetic }
 * ※発音記号（phonetic）はOxford Learner's DictionariesのNorth American English (NAmE) 準拠
 */
export const WORD_GROUPS = {
  pronouns: {
    id: 'pronouns',
    name: '代名詞',
    emoji: '👤',
    description: 'ひとや ものを あらわすことば',
    words: [
      { id: 'pro_1', japanese: 'わたし', english: 'I', speech: 'I', emoji: '🙋', phonetic: '/aɪ/' },
      { id: 'pro_2', japanese: 'あなた', english: 'you', speech: 'you', emoji: '👉', phonetic: '/ju/' },
      { id: 'pro_3', japanese: 'かれ', english: 'he', speech: 'he', emoji: '👦', phonetic: '/hi/' },
      { id: 'pro_4', japanese: 'かのじょ', english: 'she', speech: 'she', emoji: '👧', phonetic: '/ʃi/' },
      { id: 'pro_5', japanese: 'それ', english: 'it', speech: 'it', emoji: '📦', phonetic: '/ɪt/' },
      { id: 'pro_6', japanese: 'わたしたち', english: 'we', speech: 'we', emoji: '👨‍👩‍👧', phonetic: '/wi/' },
      { id: 'pro_7', japanese: 'かれら / 彼女ら', english: 'they', speech: 'they', emoji: '👥', phonetic: '/ðeɪ/' },
      { id: 'pro_8', japanese: 'わたしの', english: 'my', speech: 'my', emoji: '🎒', phonetic: '/maɪ/' },
      { id: 'pro_9', japanese: 'あなたの', english: 'your', speech: 'your', emoji: '🧢', phonetic: '/jɔːr/' },
      { id: 'pro_10', japanese: 'わたしたちの', english: 'our', speech: 'our', emoji: '🏠', phonetic: '/ˈaʊər/' },
    ]
  },
  nature: {
    id: 'nature',
    name: '名詞：自然',
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
      { id: 'nat_10', japanese: 'き（木）', english: 'tree', speech: 'tree', emoji: '🌳', phonetic: '/triː/' },
    ]
  },
  subjects: {
    id: 'subjects',
    name: '名詞：教科',
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
      { id: 'sub_8', japanese: 'しゃかい（社会）', english: 'social studies', speech: 'social studies', emoji: '🗺️', phonetic: '/ˈsoʊʃl ˈstʌdiz/' },
    ]
  },
  animals: {
    id: 'animals',
    name: '名詞：動物',
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
      { id: 'ani_10', japanese: 'さかな（魚）', english: 'fish', speech: 'fish', emoji: '🐟', phonetic: '/fɪʃ/' },
    ]
  },
  actions: {
    id: 'actions',
    name: '日常の動作',
    emoji: '🏃',
    description: 'まいにちの うごきや どうさ',
    words: [
      { id: 'act_1', japanese: 'はしる（走る）', english: 'run', speech: 'run', emoji: '🏃', phonetic: '/rʌn/' },
      { id: 'act_2', japanese: 'あるく（歩く）', english: 'walk', speech: 'walk', emoji: '🚶', phonetic: '/wɔːk/' },
      { id: 'act_3', japanese: 'たべる（食べる）', english: 'eat', speech: 'eat', emoji: '🍙', phonetic: '/iːt/' },
      { id: 'act_4', japanese: 'のむ（飲む）', english: 'drink', speech: 'drink', emoji: '🥤', phonetic: '/drɪŋk/' },
      { id: 'act_5', japanese: 'ねる（眠る）', english: 'sleep', speech: 'sleep', emoji: '💤', phonetic: '/sliːp/' },
      { id: 'act_6', japanese: 'べんきょうする', english: 'study', speech: 'study', emoji: '✏️', phonetic: '/ˈstʌdi/' },
      { id: 'act_7', japanese: 'あそぶ（遊ぶ）', english: 'play', speech: 'play', emoji: '🎮', phonetic: '/pleɪ/' },
      { id: 'act_8', japanese: 'よむ（読む）', english: 'read', speech: 'read', emoji: '📖', phonetic: '/riːd/' },
      { id: 'act_9', japanese: 'かく（書く）', english: 'write', speech: 'write', emoji: '✍️', phonetic: '/raɪt/' },
      { id: 'act_10', japanese: 'わらう（笑う）', english: 'smile', speech: 'smile', emoji: '😊', phonetic: '/smaɪl/' },
    ]
  }
};

/** 現在選択されているグループ */
let currentGroupId = 'pronouns';

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
 * 単語リストのレンダリング
 * @param {string} groupId - 表示対象のグループID
 */
export function renderWordList(groupId) {
  const group = WORD_GROUPS[groupId];
  const listContainer = document.getElementById('wordListContainer');
  const groupNameElem = document.getElementById('currentGroupName');
  
  if (!group || !listContainer) return;

  if (groupNameElem) {
    groupNameElem.textContent = `${group.emoji} ${group.name}（${group.words.length}単語）`;
  }

  // リストを構築
  listContainer.innerHTML = '';

  group.words.forEach((item) => {
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
 * グループ切替タブのレンダリングと制御
 */
export function initGroupTabs() {
  const tabsContainer = document.getElementById('groupTabsContainer');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = '';

  Object.values(WORD_GROUPS).forEach((group) => {
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.className = `group-tab-btn ${group.id === currentGroupId ? 'active' : ''}`;
    tabBtn.setAttribute('data-group-id', group.id);
    tabBtn.innerHTML = `
      <span>${group.emoji}</span>
      <span>${group.name}</span>
      <span class="tab-badge">${group.words.length}</span>
    `;

    tabBtn.addEventListener('click', () => {
      currentGroupId = group.id;

      // タブのactive状態を更新
      document.querySelectorAll('.group-tab-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-group-id') === group.id);
      });

      renderWordList(currentGroupId);
    });

    tabsContainer.appendChild(tabBtn);
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
 * サブゲーム選択（図鑑 / クイズ）のUI連動
 */
export function initModeSelection() {
  const dictCard = document.getElementById('dictModeCard');
  const dictArea = document.getElementById('dictionaryArea');

  if (dictCard && dictArea) {
    dictCard.addEventListener('click', () => {
      dictCard.classList.add('active');
      dictArea.classList.remove('hidden');

      // 辞書エリアまでスムーズスクロール
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


