<script setup>
import { useRafFn } from '@vueuse/core'
import { createNoise2D } from 'simplex-noise';
import ColorHash from "color-hash";
import { useScene, activeScene } from '~/use/scene';
import { useMidi, useKeyboard } from '~/use/midi'
import { useRoute, useRouter } from 'vue-router'
import { init } from './use/synth';
import { isDark, lastNote } from './use/state';
import { pitchColor } from './use/chromatone';
import { onKeyStroke } from '@vueuse/core'
import questions from './questions.json'


const { midi } = useMidi()
const route = useRoute()
const router = useRouter()

const count = ref(0)

const noise2D = createNoise2D();

const angle = ref()

const { pause, resume } = useRafFn(() => {
  count.value++
  angle.value = noise2D(1, count.value / 2000);
})

const getColor = new ColorHash({
  saturation: [0.05, 0.28, 0.62],
  lightness: [0.75, 0.87, 0.9],
})

const color1 = computed(() => getColor.hex(Math.random() * 100000 + 'a'))
const color2 = computed(() => getColor.hex(Math.random() * 100000 + 'b'))
const background = computed(() => `linear-gradient(${angle.value * 360}deg, ${color1.value}, ${color2.value})`)

const { visual, width, height } = useScene()

const changed = ref(false)

watch(() => midi.total.hits, hits => {
  if (hits == 0) {
    nextScene()
  }
})

onKeyStroke([' ', 'Enter'], () => {
  init()

  nextScene()
})

function nextScene(back = false) {
  changed.value = true
  lastNote.value = midi?.note?.pitch
  const { set, num } = route.params

  let diff = back ? -1 : 1

  let Num = Number(num) - 1
  let Set = Number(set) - 1
  let path = ''

  if (questions[Set]) {
    if (questions[Set][Num + 1 + diff]) {
      path = `/${Set + 1}/${Num + 1 + diff}`
    } else {
      if (Set + diff > 0 && Set + 1 < questions.length) {
        path = `/${Set + 1 + diff}/${!back ? 0 : questions[Set + diff].length}`
      } else {
        path = `/${1}/${1}`
      }
    }
  } else {
    path = `/${1}/${1}`
  }

  router.push(path)

}

onMounted(() => {
  useKeyboard()
})


onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  nextScene()
})

onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault()
  nextScene(true)
})


</script>

<template lang="pug">
.flex.flex-col.h-100vh.w-full(:style="{ backgroundColor: pitchColor(lastNote, isDark ? 1 : 9, 0.5) }")
  // (:style="{ background }"  )
  state-overlay
  .absolute.bottom-10vh.text-center.flex.flex-col.items-center.w-full.px-8(v-if="!changed")
    .text-sm Hold any note more than {{ midi.maxDuration / 1000 }} seconds or press Enter/Spacebar to proceed to the next question 
  state-start(@start="$router.push('/1/1')")
  .h-full.w-full
    svg#visual.h-full.w-full(
      ref="visual"
      version="1.1",
      baseProfile="full",
      :viewBox="`0 0  ${width} ${height}`",
      xmlns="http://www.w3.org/2000/svg",
    )
      defs
        filter#noiseFilter
          feTurbulence(type="fractalNoise", basefrequency="6.29", numoctaves="6", stitchtiles="stitch").
      rect(
        filter="url(#noiseFilter)"
        fill="hsl(20,70%,60%)"
        opacity="0.4"
        :width="width"
        :height="height"
        )
      scene-stats
      g(:transform="`translate(${width / 2},${height / 2})`" )
        circle.transition(
          r="100"
          :style="{ transform: `scale(${1 + 2 * midi.duration / midi.maxDuration})` }"
          :fill="pitchColor(midi?.note?.pitch, 3, 1, midi.duration / midi.maxDuration)"
          )
    router-view(v-slot="{ Component }")
      transition(name="fade" mode="out-in")
        component#content(:is="Component" :key="route.params")

//debug
</template>

<style lang="postcss">
.app {
  @apply transition duration-800ms relative overflow-y-scroll absolute min-h-full flex flex-col items-center text-left w-full;
}

.nav {
  @apply rounded-lg flex items-center flex-1 w-full bg-dark-50/40 hover_no-underline hover_shadow transition hover_bg-light-50/80;
}

.button {
  @apply p-4 shadow transition opacity-90 hover_opacity-100 flex transition flex-auto justify-center items-center rounded-xl bg-light-400 dark_bg-dark-500;

  &:hover {
    @apply bg-light-50 dark_bg-dark-50;
  }

  &.active {
    @apply bg-dark-50 text-light-200 dark_bg-light-200 dark_text-dark-500;
  }
}

.panel {
  @apply absolute p-4 m-4 bg-light-300 dark_bg-dark-300 z-20 flex flex-col gap-2 bg-opacity-90 dark_bg-opacity-90 flex items-center shadow-lg rounded-xl overflow-hidden left-2 bottom-2 max-w-sm overflow-y-scroll max-h-80vh;
}
</style>


