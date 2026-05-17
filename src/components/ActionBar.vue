<script setup>
defineProps({
  canPlay:    { type: Boolean, required: true },
  canDiscard: { type: Boolean, required: true },
})

defineEmits(['play', 'discard', 'restart'])
</script>

<template>
  <div class="action-bar">
    <button class="btn btn-play"    :disabled="!canPlay"    @click="$emit('play')">出牌</button>
    <button class="btn btn-discard" :disabled="!canDiscard" @click="$emit('discard')">弃牌</button>
    <button class="btn btn-restart"                         @click="$emit('restart')">重新开始</button>
  </div>
</template>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 12px 24px;
  background: rgba(0,0,0,.32);
  border-top: 1px solid rgba(255,255,255,.06);
  flex-shrink: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: var(--radius-btn);
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 28px;
  transition: transform 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
  letter-spacing: .3px;
  outline: none;
}
.btn:not(:disabled):hover  { transform: translateY(-2px); }
.btn:not(:disabled):active { transform: translateY(0); }
.btn:disabled { opacity: .35; cursor: not-allowed; }

.btn-play {
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 4px 14px rgba(232,104,42,.45);
}
.btn-play:not(:disabled):hover { box-shadow: 0 6px 20px rgba(232,104,42,.6); }

.btn-discard {
  background: var(--color-discard);
  color: #fff;
  box-shadow: 0 4px 14px rgba(168,50,50,.4);
}
.btn-discard:not(:disabled):hover { box-shadow: 0 6px 20px rgba(168,50,50,.55); }

.btn-restart {
  background: transparent;
  color: rgba(255,255,255,.65);
  border: 1.5px solid rgba(255,255,255,.28);
}
.btn-restart:hover { border-color: rgba(255,255,255,.6); color: #fff; }
</style>
