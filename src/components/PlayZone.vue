<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  selectedCards: { type: Array,  required: true },
  currentHand:   { type: Object, default: null },
  scorePreview:  { type: Number, default: 0 },
  flashText:     { type: String, default: '' },
  flashVisible:  { type: Boolean, default: false },
})
</script>

<template>
  <div class="play-zone">
    <!-- 牌型 badge -->
    <div class="hand-type-badge" :class="{ empty: !currentHand || selectedCards.length === 0 }">
      {{ currentHand && selectedCards.length > 0 ? currentHand.name : '等待选牌' }}
    </div>

    <!-- 选中牌预览 -->
    <div class="play-cards">
      <template v-if="selectedCards.length === 0">
        <div v-for="n in 5" :key="n" class="play-placeholder">+</div>
      </template>
      <template v-else>
        <PokerCard
          v-for="(card, i) in selectedCards"
          :key="i"
          :card="card"
          size="preview"
          :clickable="false"
        />
        <div
          v-for="n in (5 - selectedCards.length)"
          :key="'ph' + n"
          class="play-placeholder"
        >+</div>
      </template>
    </div>

    <!-- 得分预览 / 提示 -->
    <div v-if="currentHand && selectedCards.length > 0" class="zone-score-preview">
      预计得分 {{ scorePreview }} 分
      ({{ currentHand.base }} + {{ selectedCards.reduce((s, c) => s + c.value, 0) }}) × {{ currentHand.mult }}
    </div>
    <div v-else class="zone-hint">选中 1–5 张牌后点击「出牌」</div>

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
  background: rgba(0,0,0,.15);
  border-bottom: 1px solid rgba(255,255,255,.06);
  position: relative;
  gap: 10px;
}

.hand-type-badge {
  font-size: 13px;
  font-weight: 700;
  padding: 5px 18px;
  border-radius: 999px;
  letter-spacing: .5px;
  background: rgba(232,104,42,.88);
  color: #fff;
  box-shadow: 0 2px 10px rgba(232,104,42,.4);
  transition: background .2s, color .2s;
}
.hand-type-badge.empty {
  background: transparent;
  color: rgba(255,255,255,.3);
  box-shadow: none;
  border: 1px dashed rgba(255,255,255,.2);
}

.play-cards {
  display: flex;
  gap: 12px;
  align-items: center;
  height: 132px;
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

.score-flash {
  position: absolute;
  top: 14px;
  right: 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-score);
  opacity: 0;
  transform: translateY(0);
  transition: opacity .25s, transform .6s ease-out;
  pointer-events: none;
}
.score-flash.show {
  opacity: 1;
  transform: translateY(-18px);
}
</style>
