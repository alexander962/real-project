<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html {
  height: 100%;
}

@media(max-width: 1024px) {
  #app {
    display: block;
    position: static;
  }
}
</style>
