<script setup>
import { computed } from 'vue'

const props = defineProps({
  score:         { type: Number,  required: true },
  target:        { type: Number,  required: true },
  handsLeft:     { type: Number,  required: true },
  discardsLeft:  { type: Number,  required: true },
  currentHand:   { type: Object,  default: null },
  selectedCards: { type: Array,   required: true },
  scorePreview:  { type: Number,  default: 0 },
  canPlay:       { type: Boolean, required: true },
  canDiscard:    { type: Boolean, required: true },
})

defineEmits(['play', 'discard', 'restart'])

const cardSum = computed(() =>
  props.selectedCards.reduce((s, c) => s + c.value, 0)
)
const hasSelection = computed(() =>
  props.selectedCards.length > 0 && props.currentHand
)
</script>

<template>
  <aside class="left-panel">

    <!-- 标题区 -->
    <div class="panel-header">
      <div class="game-title">小丑牌</div>
      <div class="round-badge">第 1 关</div>
    </div>

    <!-- 目标分 -->
    <div class="target-block">
      <div class="block-label">目标得分</div>
      <div class="target-value">★ {{ target }}</div>
    </div>

    <div class="divider" />

    <!-- 当前得分 -->
    <div class="score-block">
      <div class="block-label">当前得分</div>
      <div class="score-value" :key="score">{{ score }}</div>
    </div>

    <div class="divider" />

    <!-- 手牌类型 + 得分预览 -->
    <div class="hand-info-block">
      <div
        class="hand-type-badge"
        :class="{ empty: !hasSelection }"
      >
        {{ hasSelection ? currentHand.name : '等待选牌' }}
      </div>

      <Transition name="formula">
        <div v-if="hasSelection" class="formula-block" key="formula">
          <div class="formula-line">
            <span class="chips">{{ currentHand.base }} + {{ cardSum }}</span>
            <span class="op">×</span>
            <span class="mult">{{ currentHand.mult }}</span>
          </div>
          <div class="formula-result">≈ {{ scorePreview }} 分</div>
        </div>
        <div v-else class="formula-placeholder" key="placeholder">
          选牌后显示得分预览
        </div>
      </Transition>
    </div>

    <div class="divider" />

    <!-- 出牌 / 弃牌次数 -->
    <div class="resources-block">
      <div class="resource-row">
        <span class="resource-label">出牌机会</span>
        <div class="pips">
          <span
            v-for="n in 4"
            :key="n"
            class="pip"
            :class="{ active: n <= handsLeft }"
          />
        </div>
        <span class="resource-count" :key="handsLeft">{{ handsLeft }}</span>
      </div>
      <div class="resource-row">
        <span class="resource-label">弃牌机会</span>
        <div class="pips">
          <span
            v-for="n in 3"
            :key="n"
            class="pip pip-discard"
            :class="{ active: n <= discardsLeft }"
          />
        </div>
        <span class="resource-count discard">{{ discardsLeft }}</span>
      </div>
    </div>

    <div class="divider" />

    <!-- 操作按钮 -->
    <div class="actions-block">
      <button class="btn btn-play"    :disabled="!canPlay"    @click="$emit('play')">
        <span class="btn-icon">▶</span> 出牌
      </button>
      <button class="btn btn-discard" :disabled="!canDiscard" @click="$emit('discard')">
        <span class="btn-icon">✕</span> 弃牌
      </button>
      <button class="btn btn-restart"                         @click="$emit('restart')">
        重新开始
      </button>
    </div>

  </aside>
</template>

<style scoped>
.left-panel {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, .45);
  border-right: 1px solid rgba(255, 255, 255, .08);
  padding: 16px 14px;
  gap: 0;
  overflow: hidden;
}

/* ── 标题 ── */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.game-title {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
}
.round-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 99px;
  background: rgba(255, 255, 255, .12);
  color: rgba(255, 255, 255, .6);
  letter-spacing: .5px;
}

/* ── 目标分 ── */
.target-block {
  margin-bottom: 10px;
}
.block-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .38);
  margin-bottom: 2px;
}
.target-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: .5px;
}

/* ── 当前分 ── */
.score-block {
  margin: 10px 0;
}
.score-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 42px;
  font-weight: 800;
  color: var(--color-score);
  line-height: 1;
  letter-spacing: -1px;
  animation: scorePop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes scorePop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.18); color: #fff; text-shadow: 0 0 16px rgba(93, 214, 122, .8); }
  100% { transform: scale(1); }
}

/* ── 分隔线 ── */
.divider {
  height: 1px;
  background: rgba(255, 255, 255, .08);
  margin: 8px 0;
}

/* ── 手牌类型 ── */
.hand-info-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 0;
}
.hand-type-badge {
  font-size: 13px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 999px;
  text-align: center;
  background: rgba(232, 104, 42, .9);
  color: #fff;
  box-shadow: 0 2px 10px rgba(232, 104, 42, .4);
  transition: background .3s, color .3s, box-shadow .3s;
  letter-spacing: .5px;
}
.hand-type-badge.empty {
  background: transparent;
  color: rgba(255, 255, 255, .3);
  box-shadow: none;
  border: 1px dashed rgba(255, 255, 255, .2);
}

.formula-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.formula-line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
}
.chips { color: #6ad4f5; }
.op    { color: rgba(255, 255, 255, .4); font-size: 11px; }
.mult  { color: #f5a623; font-size: 15px; }
.formula-result {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-score);
  letter-spacing: .3px;
}
.formula-placeholder {
  font-size: 10px;
  color: rgba(255, 255, 255, .22);
  text-align: center;
  letter-spacing: .3px;
}

.formula-enter-active, .formula-leave-active { transition: opacity .25s, transform .25s; }
.formula-enter-from { opacity: 0; transform: translateY(4px); }
.formula-leave-to   { opacity: 0; transform: translateY(-4px); }
.formula-leave-active { position: absolute; }

/* ── 资源（出牌/弃牌次数）── */
.resources-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 0;
}
.resource-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.resource-label {
  font-size: 10px;
  color: rgba(255, 255, 255, .4);
  letter-spacing: .5px;
  flex: 1;
}
.pips {
  display: flex;
  gap: 4px;
}
.pip {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .15);
  transition: background .3s;
}
.pip.active {
  background: var(--color-accent);
  box-shadow: 0 0 6px rgba(232, 104, 42, .6);
}
.pip.pip-discard.active {
  background: #e06060;
  box-shadow: 0 0 6px rgba(224, 96, 96, .6);
}
.resource-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-accent);
  width: 18px;
  text-align: right;
}
.resource-count.discard { color: #e06060; }

/* ── 按钮 ── */
.actions-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 8px;
}
.btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: var(--radius-btn);
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 11px 0;
  transition: transform 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
  letter-spacing: .3px;
  outline: none;
}
.btn-icon {
  font-size: 11px;
  opacity: .8;
}
.btn:not(:disabled):hover  { transform: translateY(-2px); }
.btn:not(:disabled):active { transform: translateY(0); }
.btn:disabled { opacity: .32; cursor: not-allowed; }

.btn-play {
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 4px 14px rgba(232, 104, 42, .45);
}
.btn-play:not(:disabled):hover { box-shadow: 0 6px 20px rgba(232, 104, 42, .6); }

.btn-discard {
  background: var(--color-discard);
  color: #fff;
  box-shadow: 0 4px 14px rgba(168, 50, 50, .4);
}
.btn-discard:not(:disabled):hover { box-shadow: 0 6px 20px rgba(168, 50, 50, .55); }

.btn-restart {
  background: transparent;
  color: rgba(255, 255, 255, .5);
  border: 1.5px solid rgba(255, 255, 255, .2);
  font-size: 12px;
}
.btn-restart:hover { border-color: rgba(255, 255, 255, .5); color: rgba(255, 255, 255, .85); }
</style>
