<script>

import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";

export default {
  data: function () {
    return {
      is_visible: false,
    }
  },
  components: {
    Button,
    Dialog,
    InputText,
  }
}

</script>

<template>

<header>
  <div class="flex justify-content-between overflow-auto bg-gray-800">
    <div class="flex-1 flex align-items-center justify-content-center bg-transparent">
      <img class="w-8rem" src="../assets/icon/logo-text.png" alt="теннис" />
    </div>
    <div class="flex-1 flex align-items-center justify-content-center bg-transparent">
      <div class="flag shadow-3"></div>
    </div>
    <div class="flex-1 flex align-items-center justify-content-center bg-transparent">
      <Button class="px-3 py-2 shadow-3 border-round-sm border-gray-700 bg-gray-700
                    transition-linear hover:bg-gray-900 hover:border-gray-900 transition-duration-100" @click="is_visible = true">
        <span class="pi pi-user"></span>Авторизация
      </Button>

        <!-- Диалоговое окно авторизации -->

        <!---------------------------------->
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
  transform: skew(-35deg);
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