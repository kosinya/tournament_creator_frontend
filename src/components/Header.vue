<script>

import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import Menubar from 'primevue/menubar';

export default {
  data: function () {
    return {
      is_visible: false,
      items: [
        {
          label: 'Главная',
          icon: 'pi pi-home'
        },
        {
          label: 'Общая таблица',
          icon: 'pi pi-list'
        },
        {
          label: 'Подзраделения',
          icon: 'pi pi-building-columns'
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
  <div class="flex justify-content-center bg-gray-100 border-round-xl border-transparent">
    <Menubar class="bg-transparent border-transparent w-full" :model="items">
      <template #item="{item}">
        <div class="flex px-4 py-2 items-center cursor-pointer p-menuitem-active active:bg-black-alpha-10">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </div>
      </template>
      <template #end>
        <Button class="border-round-lg px-4"><i class="pi pi-user"></i>Войти</Button>
      </template>
    </Menubar>
  </div>
</header>

</template>

<style scoped>

p-menuitem-active {
  background-color: var(--primary-color);
}

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