<script setup>
import LearningModule from './components/LearningModule.vue'
</script>

<template>
  <main>
    <h1>Kpi'ojo</h1>
    <p>
      Ni igba lailai awọn enia ati ẹranko ngbe lẹgbẹ ara wọn, wọn nsọ ede kanna, wọn si nhuwa bakan
      na. Ni ilu Ijapa, ti a npe ni Magunwa, iyan mu gidi gan-an ni; ko si nkankan ti ẹnu njẹ – ko
      s’agbado, ko s’iṣu, ko si ere.
    </p>
    <p>
      Laipẹ, ilu njoro, gbogbo awọn ẹranko t’o ngbe ilu na bẹrẹ si i ku nikọọkan, enia nku, papa
      awọn ọmọde. Idaamu de ba awọn ẹranko ilu na; nwọn mu owo l’ọwọ nwọn ko r’onjẹ ra;
    </p>
    <p>Ni ọjọ kan Ijapa gbọ ti awọn enian kan nsọrọ pe:</p>

    <p>“Ṣe a maa duro k’ebi pa wa ku ni? Lati ilu keji ni awọn kan ti maa nra onjẹ.”</p>
    <p>Onjẹ pọ ni ilu keji ti a nwi yi, ti a npe ni Idaha, ọja ibẹ ma nkun akunya ni ọjọ ọja ni.</p>
    <p>“Ti awa ko ba yọ’lẹ a le ra’ja ni ọja yi. A dẹ le wa ọja ta pẹlu.”</p>
    <p>
      Ijapa rẹrin nitori pe ajọfẹ ni; ijẹ-ọfẹ ti mọ l’ara. Ba wo lo ṣe maa kuro ni ilu rẹ lati lọ si
      ilu keji nigbati o le tọrọ onjẹ ni ilu rẹ? Ko le lọ wa nkan ta n’ibẹ. Iṣe nla ni yẹn!
    </p>
    <p>Ṣe Ijapa ma jẹ k’ebi pa nwu ku ni?</p>
    <p>Ijapa wa ro ninu ara rẹ pe:</p>
    <p>“Bawo ni mo ma ri onjẹ ọfe ni ilu keji yi?”</p>
    <p>
      Nigboya o ronuja ọgbọn kan ti oun yio ta – pe oun a lọ si ọja na lati tọrọ onjẹ dipo pe ki oun
      ra j’a abi k’oun ta j’a. Ijapa ba gbera ni arọ kututu, ni ọjọ-ọja-kọla, o dorikọ Magunwa, ilu
      keji.
    </p>
    <p>Ijapa rẹrin nitori pe ajọfẹ ni; ijẹ-ọfẹ ti mọ l’ara.</p>
    <p>Ba wo lo ṣe maa kuro ni ilu rẹ lati lọ si ilu keji nigba ti o le tọrọ onjẹ ni ilu rẹ?</p>
    <p>Ko le lọ wa nkan ta n’ibẹ. Iṣe nla ni yẹn!</p>
  </main>
  <LearningModule />
</template>

<style>
body {
  display: grid;
  grid-template-columns: 70%;
  margin: 0;
}

h1 {
  margin: 0;
}

button {
  all: unset;
  cursor: pointer;
  width: 100%;
  height: auto;
  display: block;
  font-weight: 300;
  transition: all 0.3s ease-in-out;
}

main {
  font-family: 'Ojuju', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 3.4rem;
  margin: 2rem;
  line-height: 1.2;
}
</style>
