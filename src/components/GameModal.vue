<script setup>
defineProps({
  show:   { type: Boolean, required: true },
  status: { type: String,  default: 'playing' }, // win | lose
  score:  { type: Number,  required: true },
  target: { type: Number,  required: true },
})

defineEmits(['restart'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay">
      <div class="modal" :class="status">
        <div class="modal-title">{{ status === 'win' ? '🎉 胜利！' : '失败' }}</div>
        <div class="modal-body">
          最终得分
          <span class="big">{{ score }}</span>
          <template v-if="status === 'lose'">距目标还差 {{ target - score }} 分</template>
        </div>
        <button class="btn-restart" @click="$emit('restart')">再来一局</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.72);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  z-index: 20;
}
.modal {
  background: #0c0c0c;
  border-radius: 18px;
  padding: 44px 56px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.modal.win  { border: 2px solid var(--color-gold); }
.modal.lose { border: 2px solid #444; }

.modal-title {
  font-size: 34px;
  font-weight: 700;
}
.modal.win  .modal-title { color: var(--color-gold); }
.modal.lose .modal-title { color: #888; }

.modal-body {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  color: rgba(255,255,255,.55);
  line-height: 1.8;
}
.modal-body .big {
  font-size: 30px;
  font-weight: 700;
  display: block;
}
.modal.win  .modal-body .big { color: var(--color-score); }
.modal.lose .modal-body .big { color: #aaa; }

.btn-restart {
  margin-top: 6px;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-btn);
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 10px 28px;
  box-shadow: 0 4px 14px rgba(232,104,42,.45);
  transition: transform 140ms ease, box-shadow 140ms ease;
}
.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232,104,42,.6);
}

/* Vue Transition */
.modal-enter-active { animation: modalIn .3s ease; }
.modal-leave-active { animation: modalIn .2s ease reverse; }
@keyframes modalIn {
  from { opacity: 0; transform: scale(.88); }
  to   { opacity: 1; transform: scale(1); }
}
.modal-overlay.modal-enter-active { animation: fadeIn .3s ease; }
.modal-overlay.modal-leave-active { animation: fadeIn .2s ease reverse; }
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
