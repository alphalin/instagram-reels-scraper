(async () => {
  const reelsSet = new Set();
  let lastHeight = 0;
  let noChangeCount = 0;

  console.log('🚀 開始自動捲動並擷取所有 Reels 網址...');

  while (noChangeCount < 5) { // 連續 5 次沒有新內容就停止
    // 1. 抓取當前 DOM 中的 Reel 連結並存入 Set (自動去重)
    document.querySelectorAll('a[href*="/reel/"]').forEach(a => {
      const cleanUrl = 'https://www.instagram.com' + a.getAttribute('href').split('?')[0];
      reelsSet.add(cleanUrl);
    });

    console.log(`📸 目前已累計蒐集: ${reelsSet.size} 個 Reels...`);

    // 2. 自動滾動到底部
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 1500)); // 等待 1.5 秒讓 IG 載入新內容

    // 3. 檢查頁面高度是否有變化
    const currentHeight = document.body.scrollHeight;
    if (currentHeight === lastHeight) {
      noChangeCount++;
    } else {
      noChangeCount = 0;
      lastHeight = currentHeight;
    }
  }

  console.log('\n✅ 擷取完成！');
  console.log(`🎉 總共抓取到 ${reelsSet.size} 個 Reels 網址：\n`);

  // 印出結果（可以直接複製）
  const resultText = Array.from(reelsSet).join('\n');
  console.log(resultText);

  // 自動下載成文字檔 reels_list.txt
  const blob = new Blob([resultText], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'reels_list.txt';
  a.click();
})();
