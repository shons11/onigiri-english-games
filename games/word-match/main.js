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

/** 音声の女性・男性交互切り替え管理 */
let isNextVoiceFemale = true;

function getAlternateVoiceSettings() {
  const isFemale = isNextVoiceFemale;
  isNextVoiceFemale = !isNextVoiceFemale;

  let selectedVoice = null;
  if ('speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));

    if (isFemale) {
      // 語尾子音の明瞭度が高い女性ボイスを優先（Karen, Samantha, Victoria, Jenny, Zira等）
      selectedVoice = englishVoices.find(v => 
        /karen|samantha|victoria|jenny|zira|google us english|ava/i.test(v.name)
      ) || englishVoices.find(v => !/male|david|alex|fred|guy|george|mark|daniel/i.test(v.name));
    } else {
      // 好評の爽やかで明るい男性ボイス
      selectedVoice = englishVoices.find(v => 
        /google uk english male|alex|guy|daniel|oliver/i.test(v.name)
      ) || englishVoices.find(v => 
        /male|david|fred|george|mark|tom/i.test(v.name)
      );
    }
  }

  // 女性の声は落ち着いた速度（基本0.82）、男性は0.92。選択されたスピード倍率を反映
  const baseRate = isFemale ? 0.82 : 0.92;
  const calculatedRate = Math.round(baseRate * playbackSpeedMultiplier * 100) / 100;

  return {
    isFemale,
    voice: selectedVoice || null,
    // 女性は子音がはっきり抜ける自然な1.08、男性は好評の1.10
    pitch: isFemale ? 1.08 : 1.10,
    rate: calculatedRate
  };
}

/**
 * Web Speech API を用いた英語音声読み上げ（女性／男性交互 ＆ ナチュラル発声）
 * @param {string} text - 発音する英語
 * @param {HTMLElement} [elementToHighlight] - 再生中にハイライトするカード要素
 */
export function speakWord(text, elementToHighlight = null) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel();

  const voiceSettings = getAlternateVoiceSettings();

  // 末尾の子音（t, d, k, p, g, b, th, sh, ch 等）がTTSで飲み込まれず明瞭に破裂・開放されるよう制御
  const clean = text.trim().replace(/[.!]$/, '');
  const endsWithConsonant = /[bcdfghjklmnpqrstvwxz]$/i.test(clean);
  // 子音で終わる単語は感嘆符（!）を付与することで開放音（Release burst）を発生させ、母音終わりはピリオド（.）で自然に
  const formattedText = endsWithConsonant ? `${clean}!` : `${clean}.`;

  const utterance = new SpeechSynthesisUtterance(formattedText);
  utterance.lang = 'en-US';
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

  utterance.onend = () => {
    cleanup();
  };
  utterance.onerror = cleanup;

  setTimeout(cleanup, 2200);

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
      speakWord(item.speech || item.english, card);
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

