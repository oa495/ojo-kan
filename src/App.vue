<script setup lang="ts">

</script>

<template>
  <router-view></router-view>
  <nav>
    <router-link class="nav-link" to="/about" title="question">ùbírọ̀</router-link>
    <router-link class="nav-link" to="/" title="home">ulí</router-link>
  </nav>
</template>

<style>

@media (max-width: 1400px) {
  #app {
    flex-direction: column;
  }

  .intro, #big-circle {
    position: relative !important;
    margin: 1em auto 1em auto !important;
    min-width: 85%;
  }

  main {
    margin: 1rem;
  }
}

@media (max-width: 800px) {
  main {
    margin: 2rem !important;
  }
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
}

#big-circle {
  height: 100%;
  width: 55%;
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  /* make background a repeating svg */
  background-image: url('assets/snake.svg');
  background-repeat: repeat; 
  background-size: 6rem 6rem;
  background-position: 0 5%; /* Start position */
  animation: backgroundScroll 30s linear infinite;
}

@keyframes backgroundScroll {
  from {
    background-position: 0 0%; /* Start at top-left */
  }
  to {
    /* Move the background image the width of the container,
       or the image width if it's wider than the container */
    background-position: 100% 50%;
  }
}

:root {
  --vue-timing: 1.2s;
}

body {
  margin: 0;
  font-family: 'Ojuju', sans-serif;
  height: 98vh;
} 

nav {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: black;
  background-color: white;
}

a {
  height: 2rem;
  width: 2rem;
  margin: 0.2em;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  color: black;
}

a:hover {
  font-style: italic;
  transform: translateY(0.2em);
}

a:visited, a:active, a:focus {
  color: black;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: right;
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
  font-weight: 400;
  font-style: normal;
  font-size: 1.4rem;
  line-height: 1.6em;
  overflow-y: scroll;
  max-width: 80%;
  max-height: 75%;
  scrollbar-color: black transparent;
  scrollbar-width: thin;
  margin: 6rem;
}

::-webkit-scrollbar {
  background: black;
  width: .3em;
  border-radius: 1em;
}

/* Style the scrollbar handle */
::-webkit-scrollbar-thumb {
  background: transparent;
}

main p {
  padding: 0 0.5em;
}

.circle {
  height: 80%;
  width: 80%;
  border: 1px solid;
  border-radius: 50%;
  background-color: white;
  position: relative;
  margin: auto;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
}

.button {
  cursor: pointer;
  padding: 0.5rem;
  width: fit-content;
  background-color: white;
  border: 1px dashed black;
  font-family: "Open Sans", sans-serif;
}

.button:hover {
  background-color: black;
  color: white;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:disabled:hover {
  background-color: white;
  color: black;
}

::selection {
    background-color: #FFDA81;
    color: black;
}
::-moz-selection {
    background-color: #FFDA81;
    color: black;
}
</style>