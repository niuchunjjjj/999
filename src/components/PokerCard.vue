<script setup>
import { computed } from 'vue'

const props = defineProps({
  card:      { type: Object,  required: true },
  selected:  { type: Boolean, default: false },
  clickable: { type: Boolean, default: true },
  size:      { type: String,  default: 'normal' }, // 'normal' | 'preview'
})

const emit = defineEmits(['click'])

const isRed = computed(() => props.card.suit === '♥' || props.card.suit === '♦')
</script>

<template>
  <div
    class="poker-card"
    :class="{
      'red-card':      isRed,
      'black-card':   !isRed,
      'card-selected': selected,
      'card-preview':  size === 'preview',
      'card-normal':   size === 'normal',
    }"
    @click="clickable && emit('click')"
  >
    <div class="corner tl">
      <span class="rank">{{ card.rank }}</span>
      <span class="suit">{{ card.suit }}</span>
    </div>
    <div class="center-suit">{{ card.suit }}</div>
    <div class="corner br">
      <span class="rank">{{ card.rank }}</span>
      <span class="suit">{{ card.suit }}</span>
    </div>
  </div>
</template>

<style scoped>
.poker-card {
  background: var(--color-card-bg);
  border-radius: var(--radius-card);
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,.2), 0 0 0 1px rgba(0,0,0,.08);
  transition: transform var(--ease-card), box-shadow var(--ease-card);
  user-select: none;
  flex-shrink: 0;
}

/* Sizes */
.card-normal {
  width: 80px;
  height: 116px;
  cursor: pointer;
}
.card-normal .corner .rank { font-size: 14px; }
.card-normal .corner .suit { font-size: 11px; }
.card-normal .center-suit  { font-size: 38px; }

.card-preview {
  width: 88px;
  height: 128px;
  cursor: default;
}
.card-preview .corner .rank { font-size: 16px; }
.card-preview .corner .suit { font-size: 13px; }
.card-preview .center-suit  { font-size: 46px; }

/* States */
.card-normal:not(.card-selected):hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,.24);
}
.card-selected {
  transform: translateY(-12px);
  box-shadow: 0 0 0 2.5px var(--color-accent), 0 8px 22px rgba(232,104,42,.38);
}

/* Colors */
.corner {
  position: absolute;
  line-height: 1;
  font-weight: 700;
}
.corner.tl { top: 5px; left: 7px; }
.corner.br { bottom: 5px; right: 7px; transform: rotate(180deg); }
.corner .rank, .corner .suit { display: block; }

.center-suit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
}

.red-card .corner,
.red-card .center-suit { color: var(--color-card-red); }

.black-card .corner,
.black-card .center-suit { color: #1a1a1a; }
</style>
