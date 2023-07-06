<script setup>
  import { doc, onSnapshot, setDoc } from 'firebase/firestore';
  import { onMounted, reactive, ref, watch } from 'vue';
  import { db } from '../firebase';
  import { debounce } from '../helpers';

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
    onSnapshot(getDoc(), (doc) => {
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

  watch(() => sb.set, debounce((val) => {
    setDoc(getDoc(), {sets: val}, { merge: true });
  }, 1000), { deep: true })

  watch(() => sb.score.team1.name, debounce((val) => {
    setDoc(getDoc(), {team_one: val}, { merge: true });
  }, 1000), { deep: true })

  watch(() => sb.score.team1.score, debounce((val) => {
    setDoc(getDoc(), {score_one: val}, { merge: true });
  }), { deep: true })

  watch(() => sb.score.team2.name, debounce((val) => {
    setDoc(getDoc(), {team_two: val}, { merge: true });
  }, 1000), { deep: true })

  watch(() => sb.score.team2.score, debounce((val) => {
    setDoc(getDoc(), {score_two: val}, { merge: true });
  }), { deep: true })

  const getDoc = () => doc(db, 'score', import.meta.env.VITE_FIREBASE_DOC_ID);

  const startCountdown = () => {
    interval.value = setInterval(() => {
      if (sb.timer.seconds < 59) {
        sb.timer.seconds++;
      } else {
        sb.timer.minutes++;
        sb.timer.seconds = 0;
      }

      setDoc(getDoc(), {minutes: sb.timer.minutes, seconds: sb.timer.seconds}, { merge: true });
    }, 1000);
  };

  const stopCountdown = () => {
    clearInterval(interval.value);
    sb.timer.minutes = 0;
    sb.timer.seconds = 0;

    setDoc(getDoc(), {minutes: sb.timer.minutes, seconds: sb.timer.seconds}, { merge: true });
  };
</script>
<template>
  <main class="container w-1/2 mx-auto mt-12 text-center">
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
        <button @click="stopCountdown" class="py-2 px-4 bg-amber-900 text-white rounded-xl uppercase text-sm">reiniciar tiempo</button>
      </div>
    </div>
  </main>
</template>
