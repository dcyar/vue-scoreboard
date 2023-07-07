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
  });

  onMounted(() => {
    onSnapshot(doc(db, 'score', import.meta.env.VITE_FIREBASE_DOC_ID), (doc) => {
      const data = doc.data();

      sb.score.team1.name = data.team_one;
      sb.score.team1.score = data.score_one;
      sb.score.team2.name = data.team_two;
      sb.score.team2.score = data.score_two;
      sb.tiempo = data.sets;
    });
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
    </div>
  </main>
</template>
