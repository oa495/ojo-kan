<template>
    <div class="container">
        <h1>Welcome to Oj'okan.</h1>
        <p>Oj'okan means 'one day' in English. It's an interactive narrative written in Itsẹkiri that is unveiled as you learn words from the language.</p>
        <ul>
            <li>
                <h2>Choose your pace</h2>
                <p>Change the frequency selection to unlock new modules hourly, daily, or at whatever pace works for you.</p>
            </li>
            <li>
                <h2>Save your place</h2>
                <p>Your progress is saved as long as you access the site with the same browser and device. Take a break and come back later :)</p>
            </li>
            <li>
                <h2>Stay present</h2>
                <p>Prioritize thoughtful engagement over speed. The story isn't a puzzle to be 'solved'; Take a beat after a module is completed and scroll through to see what new things you're able to pick up from the tale.</p>
            </li>
        </ul>

        <router-link to="/story" class="start">Start</router-link>
    </div>
</template>

<style scoped>
.container {
    max-width: 80%;
    margin: 0 auto;
    padding: 2rem;
    font-size: 1.6em;
}

h1 {
    font-style: normal;
    font-weight: 300;
    font-size: 4em;
}

.container p, h1, ul {
    padding: 0;
    margin: 0.3em 0;
}

ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em;
    margin-top: 2em;
}

ul li {
    max-width: 80%;
}

ul h2 {
    font-weight: 700;
}

a.start {
    text-decoration: none;
    width: 4em;
    cursor: pointer;
    padding: 1rem;
    color: white;
    background-color: black;
    border: 1px dashed white;
    float: right;
    text-align: center;
    margin-top: 4em;
}

@media (max-width: 800px) {
  ul {
    display: flex;
    flex-direction: column;
    max-width: 80%;
  }

  a.start {
    float: left;
  }
}

</style>