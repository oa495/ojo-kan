<script setup lang="ts">
import router from './router';

</script>

<template>
  <router-view></router-view>
  <nav>
    <router-link class="link" to="/about">i</router-link>
    <router-link class="link" to="/">iloli</router-link>
  </nav>
</template>

<style>

#app {
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
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: black;
}

.link {
  text-decoration: none;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.2em;
  font-style: italic;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.about-link:hover {
  transform: translateY(0.2em);
}
</style>