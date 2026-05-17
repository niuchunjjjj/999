<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  selectedCards: { type: Array,   required: true },
  flashText:     { type: String,  default: '' },
  flashVisible:  { type: Boolean, default: false },
})
</script>

<template>
  <div class="play-zone">

    <!-- 选中牌预览 -->
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

      <!-- 占位格 -->
      <div
        v-for="n in Math.max(0, 5 - selectedCards.length)"
        :key="'ph' + n"
        class="play-placeholder"
      />
    </div>

    <!-- 提示文字 -->
    <div class="zone-hint">
      {{ selectedCards.length > 0 ? '点击「出牌」确认' : '从下方选 1–5 张牌' }}
    </div>

    <!-- 得分飞字 -->
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
  background: rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(255, 255, 255, .05);
  position: relative;
  gap: 16px;
}

/* ── 预览区布局 ── */
.play-cards {
  display: flex;
  align-items: center;
  gap: 14px;
}
.preview-inner {
  display: flex;
  gap: 14px;
  align-items: center;
}
.play-placeholder {
  width: 88px;
  height: 128px;
  border-radius: var(--radius-card);
  border: 2px dashed rgba(255, 255, 255, .1);
  background: rgba(255, 255, 255, .02);
}

/* ── 预览牌入场（从上落下）── */
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
  from { opacity: 0; transform: translateY(-32px) scale(0.88); }
  to   { opacity: 1; transform: translateY(0)     scale(1);    }
}
@keyframes previewFadeOut {
  from { opacity: 1; transform: scale(1);    }
  to   { opacity: 0; transform: scale(0.88); }
}

/* ── 提示文字 ── */
.zone-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, .28);
  letter-spacing: .5px;
}

/* ── 得分飞字 ── */
.score-flash {
  position: absolute;
  top: 20px;
  right: 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: var(--color-score);
  opacity: 0;
  transform: translateY(0) scale(0.8);
  transition: opacity .2s ease, transform .7s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  text-shadow: 0 0 16px rgba(93, 214, 122, .6), 0 0 32px rgba(93, 214, 122, .3);
}
.score-flash.show {
  opacity: 1;
  transform: translateY(-32px) scale(1.15);
}
</style>
