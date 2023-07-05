<script setup>
  import { computed, reactive, ref } from 'vue';

  const interval = ref(null);
  const sb = reactive({
    tiempo: '1er tiempo',
    score: {
      team1: {
        name: 'team name',
        score: 0,
      },
      team2: {
        name: 'team name',
        score: 0,
      },
    },
    timer: {
      minutes: 0,
      seconds: 0,
    },
  });

  const startCountdown = () => {
    interval.value = setInterval(() => {
      if (sb.timer.seconds < 59) {
        sb.timer.seconds++;
      } else {
        sb.timer.minutes++;
        sb.timer.seconds = 0;
      }
    }, 1000);
  };

  const timerFormat = computed(() => {
    if (sb.timer.minutes < 10 && sb.timer.seconds < 10) {
      return `0${sb.timer.minutes}:0${sb.timer.seconds}`;
    } else if (sb.timer.minutes < 10) {
      return `0${sb.timer.minutes}:${sb.timer.seconds}`;
    } else if (sb.timer.seconds < 10) {
      return `${sb.timer.minutes}:0${sb.timer.seconds}`;
    } else if (sb.timer.minutes > 10 && sb.timer.seconds > 10) {
      return `${sb.timer.minutes}:${sb.timer.seconds}`;
    }
  });

  const stopCountdown = () => {
    clearInterval(interval.value);
    sb.timer.minutes = 0;
    sb.timer.seconds = 0;
  };
</script>
<template>
  <main class="container mx-auto text-center">
    <div class="text-white mt-4 flex flex-col items-center gap-y-3">
      <section class="bg-slate-700 px-4 py-1 rounded-full">
        <span class="font-bold uppercase">{{ sb.tiempo }}</span>
      </section>
      <section class="flex items-center gap-x-4">
        <div class="flex items-center">
          <div class="bg-slate-700 px-8 py-3 rounded-s-full">
            <span class="uppercase font-bold">{{ sb.score.team1.name }}</span>
          </div>
          <div class="bg-slate-700 px-6 py-4">
            <span class="text-4xl font-bold">{{ sb.score.team1.score }}</span>
          </div>
        </div>
        <div class="flex items-center">
          <div class="bg-slate-700 px-6 py-4">
            <span class="text-4xl font-bold">{{ sb.score.team2.score }}</span>
          </div>
          <div class="bg-slate-700 px-8 py-3 rounded-e-full">
            <span class="uppercase font-bold">{{ sb.score.team2.name }}</span>
          </div>
        </div>
      </section>
      <section class="w-28 bg-slate-700 px-4 py-1 rounded-full">
        <span class="text-2xl">{{ timerFormat }}</span>
      </section>
    </div>

    <div class="mt-48">
      <h2 class="text-3xl font-bold mb-4">Controls</h2>
      <div class="space-y-4">
        <div class="flex justify-center gap-x-2 items-center">
          <label for="tiempo" class="font-bold uppercase text-sm">Tiempo</label>
          <input type="text" v-model="sb.tiempo" id="tiempo" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
        <div class="flex justify-center gap-x-2 items-center">
          <label for="team1" class="font-bold uppercase text-sm">Equipo 1</label>
          <input type="text" v-model="sb.score.team1.name" id="team1" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
        <div class="flex justify-center gap-x-2 items-center">
          <label for="team1s" class="font-bold uppercase text-sm">goles 1</label>
          <input type="number" v-model="sb.score.team1.score" id="team1s" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
        <div class="flex justify-center gap-x-2 items-center">
          <label for="team2" class="font-bold uppercase text-sm">Equipo 2</label>
          <input type="text" v-model="sb.score.team2.name" id="team2" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
        <div class="flex justify-center gap-x-2 items-center">
          <label for="team2s" class="font-bold uppercase text-sm">Goles 2</label>
          <input type="number" v-model="sb.score.team2.score" id="team2s" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
      </div>
      <div class="flex gap-x-2 justify-center mt-4">
        <button @click="startCountdown" class="py-2 px-4 bg-indigo-900 text-white rounded-xl uppercase text-sm">iniciar</button>
        <button @click="stopCountdown" class="py-2 px-4 bg-indigo-900 text-white rounded-xl uppercase text-sm">reiniciar</button>
      </div>
    </div>
  </main>
</template>
