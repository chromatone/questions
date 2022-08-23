<script setup>
import questions from '../questions.json'
import { pitchColor } from '../use/chromatone';
import { midi } from '../use/midi';


const props = defineProps({
	num: { type: [String, Number], default: 0 }
})
</script>

<template lang='pug'>
.absolute.top-0.bottom-0.left-0.right-0.flex.items-center.justify-center.pointer-events-none.flex-col
	.absolute.p-4.text-24xl.opacity-20.transition(:style="{ color: pitchColor(midi?.note?.pitch) }") {{ num || 0 }}
	.p-4.text-5xl.text-center.p-8 {{ questions[num - 1] }}
</template>