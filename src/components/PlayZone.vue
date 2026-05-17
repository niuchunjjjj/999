<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  selectedCards: { type: Array,   required: true },
  currentHand:   { type: Object,  default: null },
  scorePreview:  { type: Number,  default: 0 },
  flashText:     { type: String,  default: '' },
  flashVisible:  { type: Boolean, default: false },
})
</script>

<template>
  <div class="play-zone">

    <!-- 牌型 badge -->
    <div class="hand-type-badge" :class="{ empty: !currentHand || selectedCards.length === 0 }">
      {{ currentHand && selectedCards.length > 0 ? currentHand.name : '等待选牌' }}
    </div>

    <!-- 选中牌预览：每张牌有入场动画 -->
    <div class="play-cards">
      <TransitionGroup name="preview" tag="div" class="preview-inner">
        <PokerCard
          v-for="(card, i) in selectedCards"
          :key="card.id"
          :card="card"
          size="preview"
          :clickable="false"
          :style="{ '--preview-delay': `${i * 50}ms` }"
        />
      </TransitionGroup>

      <!-- 占位符：补足 5 格 -->
      <div
        v-for="n in Math.max(0, 5 - selectedCards.length)"
        :key="'ph' + n"
        class="play-placeholder"
      >+</div>
    </div>

    <!-- 得分预览 / 提示 -->
    <Transition name="hint">
      <div v-if="currentHand && selectedCards.length > 0" class="zone-score-preview" key="preview">
        预计得分 {{ scorePreview }} 分
        ({{ currentHand.base }} + {{ selectedCards.reduce((s, c) => s + c.value, 0) }}) × {{ currentHand.mult }}
      </div>
      <div v-else class="zone-hint" key="hint">选中 1–5 张牌后点击「出牌」</div>
    </Transition>

    <!-- 得分飞字（强化版） -->
    <div class="score-flash" :class="{ show: flashVisible }">{{ flashText }}</div>

  </div>
</template>

<style scoped>
.play-zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.15);
  border-bottom: 1px solid rgba(255,255,255,.06);
  position: relative;
  gap: 10px;
}

/* ── 牌型 badge ── */
.hand-type-badge {
  font-size: 13px;
  font-weight: 700;
  padding: 5px 18px;
  border-radius: 999px;
  letter-spacing: .5px;
  background: rgba(232,104,42,.88);
  color: #fff;
  box-shadow: 0 2px 10px rgba(232,104,42,.4);
  transition: background .3s, color .3s, box-shadow .3s;
}
.hand-type-badge.empty {
  background: transparent;
  color: rgba(255,255,255,.3);
  box-shadow: none;
  border: 1px dashed rgba(255,255,255,.2);
}

/* ── 预览区布局 ── */
.play-cards {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 132px;
}
.preview-inner {
  display: flex;
  gap: 12px;
  align-items: center;
}
.play-placeholder {
  width: 88px;
  height: 128px;
  border-radius: var(--radius-card);
  border: 2px dashed rgba(255,255,255,.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,.2);
  font-size: 22px;
}

/* ── 预览牌入场动画（从上方落下） ── */
:deep(.preview-enter-active) {
  animation: previewDropIn 450ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--preview-delay, 0ms);
}
:deep(.preview-leave-active) {
  animation: previewFadeOut 280ms ease both;
}
:deep(.preview-move) {
  transition: transform 350ms ease;
}

@keyframes previewDropIn {
  from {
    opacity: 0;
    transform: translateY(-32px) scale(0.88);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes previewFadeOut {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.88); }
}

/* ── 提示文字过渡 ── */
.hint-enter-active, .hint-leave-active { transition: opacity .3s, transform .3s; }
.hint-enter-from { opacity: 0; transform: translateY(6px); }
.hint-leave-to   { opacity: 0; transform: translateY(-6px); }
.hint-leave-active { position: absolute; }

.zone-hint {
  font-size: 12px;
  color: rgba(255,255,255,.32);
  letter-spacing: .5px;
}
.zone-score-preview {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-score);
  letter-spacing: .5px;
}

/* ── 得分飞字（强化版） ── */
.score-flash {
  position: absolute;
  top: 18px;
  right: 32px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-score);
  opacity: 0;
  transform: translateY(0) scale(0.8);
  transition: opacity .2s ease, transform .7s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  text-shadow: 0 0 16px rgba(93,214,122,.6), 0 0 32px rgba(93,214,122,.3);
}
.score-flash.show {
  opacity: 1;
  transform: translateY(-28px) scale(1.1);
}
</style>
