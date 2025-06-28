import './style.css'

const app = document.getElementById('app');

app.innerHTML = `
  <div class="container">
    <h1 class="title">Baking Guide</h1>
    <h2 class="subtitle">유튜브 링크를 추가하거나 영상 링크를 첨부해주세요!</h2>
    <div class="input-section">
      <input class="youtube-input" id="youtube-input" type="text" placeholder="https://youtube.com/watch?v=..." />
      <button class="analyze-btn" id="analyze-btn">AI 분석 Start</button>
    </div>
    <div class="result-section" id="result-section">
      <!-- AI 분석 결과가 여기에 표시됩니다 -->
    </div>
    <div class="caution-section" id="caution-section">
      <!-- 주의해야 할 점이 여기에 표시됩니다 -->
    </div>
    <div class="chat-section">
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-row">
        <input class="chat-input" id="chat-input" type="text" placeholder="AI에게 궁금한 점을 물어보세요!" />
        <button class="chat-send-btn" id="chat-send-btn">전송</button>
      </div>
    </div>
  </div>
`;

// AI 분석 Start 버튼 클릭 시 동작
const analyzeBtn = document.getElementById('analyze-btn');
const youtubeInput = document.getElementById('youtube-input');
const resultSection = document.getElementById('result-section');
const cautionSection = document.getElementById('caution-section');

analyzeBtn.addEventListener('click', () => {
  const url = youtubeInput.value.trim();
  if (!url || !url.startsWith('http')) {
    resultSection.innerHTML = '<span style="color:#c00">유효한 유튜브 링크를 입력해 주세요.</span>';
    cautionSection.innerHTML = '';
    return;
  }
  // 로딩 메시지 표시
  resultSection.innerHTML = `<div style='color:#8033cc; font-size:22px; font-weight:500;'>해당 영상에서 레시피를 추출 중...</div>`;
  cautionSection.innerHTML = '';
  setTimeout(() => {
    // 실제 레시피 추출 결과 예시 표시
    resultSection.innerHTML = `
      <h3>유튜브 영상에서 추출한 레시피</h3>
      <div style='font-size:15px; color:#888; margin-bottom:8px;'>분석한 영상: <a href='${url}' target='_blank' style='color:#8033cc; text-decoration:underline;'>${url}</a></div>
      <strong>재료</strong>
      <ul>
        <li>강력분 300g</li>
        <li>설탕 40g</li>
        <li>소금 6g</li>
        <li>드라이이스트 5g</li>
        <li>우유 180ml</li>
        <li>버터 30g</li>
        <li>달걀 1개</li>
      </ul>
      <strong>과정</strong>
      <ol>
        <li>강력분, 설탕, 소금, 이스트를 볼에 넣고 섞는다.</li>
        <li>우유와 달걀을 넣고 반죽한다.</li>
        <li>버터를 넣고 10분간 치대어 반죽을 완성한다.</li>
        <li>1차 발효(40분) 후, 가스를 빼고 성형한다.</li>
        <li>2차 발효(30분) 후, 180℃로 예열한 오븐에 20분간 굽는다.</li>
      </ol>
      <strong>예상 소요 시간</strong>: 1시간 40분<br />
      <strong>난이도</strong>: 중<br />
      <strong>팁</strong>: 반죽 온도는 26~28℃를 유지하세요.<br />
      <div style="color:#8033cc; font-size:18px; margin-top:8px;">(실제 AI 분석 결과는 추후 연동 예정)</div>
    `;
    cautionSection.innerHTML = `
      <div class="caution-box">
        <h4>⚠️ 주의해야 할 점</h4>
        <ul>
          <li>반죽 온도를 일정하게 유지하세요.</li>
          <li>발효 시간을 꼭 지키세요.</li>
          <li>오븐 예열을 충분히 하세요.</li>
          <li>재료 계량을 정확히 하세요.</li>
        </ul>
      </div>
    `;
  }, 1500);
});

// AI 채팅 상담 기능
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatMessages = document.getElementById('chat-messages');

function addChatMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'user' ? 'chat-user' : 'chat-ai';
  msgDiv.innerHTML = `<b>${sender === 'user' ? '나' : 'AI'}:</b> ${text}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIDemoAnswer(question) {
  // 키워드 기반 예시 답변
  const q = question.toLowerCase();
  if (q.includes('설탕') && q.includes('줄이면')) {
    return `설탕을 줄이면 단맛이 약해지고, 빵의 색이 연해질 수 있습니다. 식감은 조금 더 단단해질 수 있어요. 굽는 시간은 크게 변하지 않지만, 설탕이 너무 적으면 발효가 느려질 수 있습니다.`;
  }
  if ((q.includes('버터') && q.includes('대체')) || (q.includes('버터') && q.includes('없')) ) {
    return `버터 대신 식물성 오일(카놀라유, 해바라기유 등)을 사용할 수 있습니다. 맛과 풍미는 다소 약해질 수 있고, 식감은 조금 더 촉촉해질 수 있습니다. 실패 확률은 낮지만, 오일은 버터보다 수분이 많으니 양을 10% 정도 줄여주세요.`;
  }
  if (q.includes('발효')) {
    return `발효가 잘 안 된다면 온도(26~28℃)와 습도를 확인하세요. 이스트 양을 늘리거나, 발효 시간을 10~20분 더 늘려보세요. 실패 확률은 온도와 시간에 크게 영향을 받습니다.`;
  }
  if (q.includes('굽는 시간')) {
    return `빵의 크기와 오븐의 성능에 따라 굽는 시간이 달라질 수 있습니다. 표면이 진한 갈색이 되고, 두드렸을 때 속이 비어있는 소리가 나면 완성입니다. 5분 단위로 추가 확인하세요.`;
  }
  if (q.includes('맛')) {
    return `맛은 재료의 신선도와 배합, 발효 상태에 따라 달라집니다. 설탕, 버터, 소금의 비율을 조절해 원하는 맛을 찾을 수 있습니다.`;
  }
  if (q.includes('글루텐프리')) {
    return `글루텐프리로 만들려면 쌀가루, 아몬드가루 등 대체 가루를 사용하세요. 식감이 다소 퍽퍽해질 수 있으니, 전분이나 계란을 추가해 촉촉함을 보완하세요. 실패 확률은 일반 레시피보다 높을 수 있습니다.`;
  }
  if ((q.includes('우유') && (q.includes('대신') || q.includes('없')))) {
    return `우유 대신 두유, 아몬드밀크, 오트밀크 등 식물성 우유를 사용할 수 있습니다. 맛과 색이 약간 달라질 수 있지만, 대부분의 레시피에 무리 없이 적용 가능합니다.`;
  }
  if ((q.includes('계란') && (q.includes('대신') || q.includes('없')))) {
    return `계란 없이 만들려면 아쿠아파바(병아리콩 삶은 물), 바나나, 사과퓨레 등으로 대체할 수 있습니다. 식감이 다소 달라질 수 있으니, 소량씩 테스트해보세요.`;
  }
  if (q.includes('촉촉')) {
    return `더 촉촉하게 만들고 싶다면 우유, 버터, 오일의 양을 소량 늘리거나, 굽는 시간을 3~5분 줄여보세요. 꿀이나 올리고당을 소량 추가해도 촉촉함이 유지됩니다.`;
  }
  if (q.includes('쫄깃')) {
    return `쫄깃한 식감을 원한다면 반죽을 충분히 치대고, 강력분 비율을 높여보세요. 오버나이트(저온숙성) 발효도 쫄깃함에 도움이 됩니다.`;
  }
  if (q.includes('실패 확률')) {
    return `실패 확률이 높은 구간은 1차 발효와 굽기 단계입니다. 온도, 시간, 재료 계량을 정확히 지키면 실패 확률을 크게 줄일 수 있습니다.`;
  }
  if (q.includes('맛') && q.includes('진하게')) {
    return `맛을 더 진하게 하려면 버터, 설탕, 소금의 양을 10% 정도 늘려보세요. 또는 천연 발효종을 사용하면 풍미가 깊어집니다.`;
  }
  // 기본 답변
  return `좋은 질문이에요! 해당 재료나 과정에 대해 더 구체적으로 알려주시면, 맛, 식감, 굽는 시간, 실패 확률 등 예측 정보를 드릴 수 있습니다.`;
}

function handleChatSend() {
  const question = chatInput.value.trim();
  if (!question) return;
  addChatMessage('user', question);
  chatInput.value = '';
  setTimeout(() => {
    const aiAnswer = getAIDemoAnswer(question);
    addChatMessage('ai', aiAnswer);
  }, 600);
}

chatSendBtn.addEventListener('click', handleChatSend);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleChatSend();
});
