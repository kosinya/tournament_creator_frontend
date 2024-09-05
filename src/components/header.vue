<script>

import Button from "primevue/button";

export default {
  components: {
    Button,
  }
}

</script>

<template>

<header>
  <div class="flex overflow-auto bg-cyan-100 shadow-5">
    <div class="flex-1 flex align-items-center justify-content-center bg-transparent">
      <img class="w-2rem mr-1" src="../assets/icon/icon.ico" alt="" />
      <img class="w-8rem" src="../assets/icon/text-logo.png" alt="" />
    </div>
    <div class="flex-1 flex align-items-center justify-content-center bg-transparent">
      <div class="flag shadow-3"></div>
    </div>
    <div class="flex-1 flex align-items-center justify-content-center bg-transparent">
      <Button class="px-3 py-2 shadow-3 transition-ease-in-out border-round-sm m-auto">
        <span class="pi pi-user"></span>Авторизация
      </Button>
    </div>
  </div>
</header>

</template>

<style scoped>
/* Flag */
.flag {
  width: 100%;
  height: 60px;
  position: relative;
  background: #138808;
  transform: skew(-45deg);
}

.flag::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 33.33%;
  background-color: #1E63FF;

}

.flag::after {
  content: "";
  position: absolute;
  top: 33.33%;
  left: 0;
  width: 100%;
  height: 33.33%;
  background-color: whitesmoke;
}
/******************************/

</style>