<script setup>
const props = defineProps({
	num: { type: [String, Number], default: 0 }
})
</script>

<template lang='pug'>
.absolute.top-0.bottom-0.left-0.right-0.flex.items-center.justify-center.pointer-events-none
	.p-4.text-5xl Phrase {{ num }}
</template>