<script setup>
import { midi, stopAll, midiAttack, midiRelease } from '~/use/midi.js'
import { onKeyStroke } from '@vueuse/core'

const props = defineProps({
  toChannel: {
    type: Boolean,
    default: true,
  }
});

onKeyStroke(' ', ev => {
  ev.preventDefault()
  midi.playing = !midi.playing
});
</script>

<template lang="pug">
.z-40.flex.flex-col.gap-2.pt-10 
  .p-2.border.border-red-500.text-red-500(v-if="!midi?.enabled") MIDI is not available. Use a 
    a.font-normal.underline(href="https://caniuse.com/?search=midi" target="_blank") compatible browser 
    span or 
    a.font-normal.underline(href="https://apps.apple.com/ru/app/web-midi-browser/id953846217" target="_blank") Web MIDI Browser on iOS
  .flex.flex-wrap.gap-4.justify-center.min-w-40(v-else)
    .p-2(v-if="Object.keys(midi.inputs).length == 0") Plug in your MIDI device
    template(v-else)
      midi-input(
        :input="input"
        :iid="iid"
        v-for="(input, iid) in midi.inputs" 
        :key="iid"
        )
</template>

<style lang="postcss" scoped>
input.ch {
  @apply pl-2 w-2.5em bg-transparent;
}
</style>