<script setup>
  import { doc, onSnapshot } from 'firebase/firestore';
  import { computed, onMounted, reactive } from 'vue';
  import { db } from '../firebase';

  const sb = reactive({
    tiempo: '',
    score: {
      team1: {
        name: '',
        score: 0,
      },
      team2: {
        name: '',
        score: 0,
      },
    },
    timer: {
      minutes: 0,
      seconds: 0,
    },
  });

  onMounted(() => {
    onSnapshot(doc(db, 'score', 'K3bBc8Tg6kwcsmqFI4W8'), (doc) => {
      const data = doc.data();

      sb.score.team1.name = data.team_one;
      sb.score.team1.score = data.score_one;
      sb.score.team2.name = data.team_two;
      sb.score.team2.score = data.score_two;
      sb.tiempo = data.sets;
      sb.timer.minutes = data.minutes;
      sb.timer.seconds = data.seconds;
    });
  });

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
  </main>
</template>
