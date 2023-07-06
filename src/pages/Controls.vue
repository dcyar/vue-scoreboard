<script setup>
  import { doc, onSnapshot } from 'firebase/firestore';
  import { onMounted, reactive, ref, watch } from 'vue';
  import { db } from '../firebase';

  const interval = ref(null);
  const sb = reactive({
    set: '',
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
      sb.set = data.sets;
      sb.timer.minutes = data.minutes;
      sb.timer.seconds = data.seconds;
    });
  });

  watch(sb, () => {
    console.log('cambio');
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

  const stopCountdown = () => {
    clearInterval(interval.value);
    sb.timer.minutes = 0;
    sb.timer.seconds = 0;
  };
</script>
<template>
  <main class="container mx-auto mt-12 text-center">
    <div>
      <h2 class="text-3xl font-bold mb-4">Controls</h2>
      <div class="space-y-4">
        <div class="flex justify-center gap-x-2 items-center">
          <label for="tiempo" class="font-bold uppercase text-sm">Tiempo</label>
          <input type="text" v-model="sb.set" id="tiempo" class="p-1 border border-slate-400 rounded-md outline-none" />
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
