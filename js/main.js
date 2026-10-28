/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Onigiri English - ポータル画面用ロジック (js/main.js)
 * ES Modules形式
 */

/**
 * 準備中モーダルを開く
 * @param {string} [gameTitle] - クリックされたゲーム名（任意）
 */
export function showComingSoonModal(gameTitle = '') {
  const modalOverlay = document.getElementById('comingSoonModal');
  const modalMessage = document.getElementById('modalMessage');
  
  if (!modalOverlay) {
    return;
  }

  // ゲーム名がある場合はメッセージに反映
  if (modalMessage) {
    if (gameTitle) {
      modalMessage.textContent = `「${gameTitle}」は現在準備中です！お楽しみに！`;
    } else {
      modalMessage.textContent = 'このゲームは現在準備中です！お楽しみに！';
    }
  }

  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');

  // フォーカスを閉じるボタンへ移動
  const closeBtn = modalOverlay.querySelector('.modal-btn-close');
  if (closeBtn) {
    closeBtn.focus();
  }
}

/**
 * 準備中モーダルを閉じる
 */
export function closeComingSoonModal() {
  const modalOverlay = document.getElementById('comingSoonModal');
  if (!modalOverlay) return;

  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

/**
 * ポータル画面の初期化処理
 */
export function initPortal() {
  // 「準備中」タグ・属性を持つカード要素を取得
  const comingSoonCards = document.querySelectorAll(
    '.game-card[data-status="coming-soon"], [data-coming-soon="true"]'
  );

  comingSoonCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      // リンク遷移をブロック
      event.preventDefault();

      // カードのタイトルを取得
      const titleElement = card.querySelector('.game-title');
      const gameTitle = titleElement ? titleElement.textContent.trim() : '';

      // 準備中メッセージ（モーダル）を表示
      showComingSoonModal(gameTitle);
    });
  });

  // モーダルの閉じるボタンのイベント設定
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeComingSoonModal();
    });
  }

  // モーダル背景クリックで閉じる設定
  const modalOverlay = document.getElementById('comingSoonModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        closeComingSoonModal();
      }
    });
  }

  // Escapeキーで閉じる設定
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeComingSoonModal();
    }
  });
}

// ページ読み込み完了時に自動初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortal);
} else {
  initPortal();
}
