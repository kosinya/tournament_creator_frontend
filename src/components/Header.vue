<script>

import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import Menubar from 'primevue/menubar';

import router from '../router/router.js'

export default {
  data: function () {
    return {
      is_visible: false,
      items: [
        {
          label: 'Главная',
          icon: 'pi pi-home',
          link: '/main'
        },
        {
          label: 'Общая таблица',
          icon: 'pi pi-list',
          link: '/players'
        },
        {
          label: 'Подзраделения',
          icon: 'pi pi-building-columns',
          link: '/departments'
        }
      ]
    }
  },
  components: {
    Button,
    Dialog,
    InputText,
    Menubar
  }
}

</script>

<template>

<header class="bg-gray-900 p-3">
  <div class="flex justify-content-center bg-gray-200 border-round-xl border-transparent">
    <Menubar class="bg-transparent border-transparent w-full" :model="items">
      <template #item="{item}">
          <RouterLink :to="item.link" class="flex px-4 py-2 items-center cursor-pointer hover:text-white
                          active:bg-black-alpha-10 text-gray-900 no-underline">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </RouterLink>
      </template>
      <template #end>
        <Button class="border-round-lg px-4"><i class="pi pi-user"></i>Войти</Button>
      </template>
    </Menubar>
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