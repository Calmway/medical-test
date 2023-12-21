<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p>Добро пожаловать на онлайн назначение сеанса</p>
  <button @click="selectSession">Выберите сеанс</button>
</template>

<script lang="ts">
import router from "../router"
export default {
  name: "Home",
  setup() {
    function selectSession() {
      router.push({name: "session"})
    }
    return {
      selectSession
    }
  },
}
</script>

<style scoped>

</style>
