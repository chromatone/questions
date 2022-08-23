<script setup>
import { midi } from '~/use/midi';
import { useScene } from '~/use/scene';
import { pitchColor } from '~/use/chromatone'

const { width, height } = useScene()
</script>

<template lang='pug'>
g(:transform="`translate(${width / 2},${height / 2})`" )
	circle.transition(
		r="200"
		:style="{ transform: `scale(${3 * midi.duration / midi.maxDuration})` }"
		:fill="pitchColor(midi?.note?.pitch, 3, 1, midi.duration / midi.maxDuration)"
		)
	//- rect(f
	//- 	:x="-acc / 2"
	//- 	:width="acc"
	//- 	height="10"
	//- 	stroke="currentColor"
	//- 	fill="none"
	//- 	rx="4"
	//- )
	//- rect(
	//- 	:x="-acc / 2"
	//- 	:width="acc"
	//- 	:transform="`scale(${midi.duration / midi.maxDuration},1)`"
	//- 	height="10"
	//- 	:fill="pitchColor(midi?.note?.pitch)"
	//- 	rx="4"
	//- )
</template>