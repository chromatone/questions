<script setup>
import questions from '../questions.json'
import { pitchColor } from '../use/chromatone';
import { midi } from '../use/midi';


const props = defineProps({
	set: { type: [String, Number], default: 0 },
	num: { type: [String, Number], default: 0 }
})
</script>

<template lang='pug'>
.absolute.top-0.bottom-0.left-0.right-0.flex.items-center.justify-center.pointer-events-none.flex-col
	.absolute.p-4.text-4xl.opacity-40.transition.top-20.text-shadow-md(:style="{ color: pitchColor(midi?.note?.pitch, null, 0.5) }")  Set {{ set || 0 }}
	.absolute.p-4.text-28xl.opacity-20.transition.text-shadow-xl(v-if="Number(num)" :style="{ color: pitchColor(midi?.note?.pitch) }") {{ num || 0 }}
	.p-4.text-4xl.text-center.p-8.text-shadow-md {{ questions?.[set - 1]?.[num] }}
</template>