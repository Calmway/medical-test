<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <p>Назначения сеанса гемодиализа</p>
    <p>1.{{ activeSession?.name }}</p>
    <p>2. {{ sessionStore.selectedDialyzer }}</p>
    <p>3. {{ sessionStore.selectedConcentrator }}</p>
    <p>4. {{ chosenInjection?.name }} - {{ sessionStore.selectedNeedle ? sessionStore.selectedNeedle : sessionStore.selectedCatheter }}</p>
    <p>5. {{ sessionStore.bicarbonateWeight }}</p>
    <p>6. {{ sessionStore.selectedAnticoagulation }}</p>
    <p>7. {{ sessionStore.patientWeight }}</p>
    <p>7. {{ sessionStore.weight }}</p>
</template>
  
<script lang="ts">
import { useSessionStore } from "../store/session";
import { computed } from 'vue';
export default {
    name: "SessionResult",
    setup() {
        const sessionStore = useSessionStore();
        const activeSession = computed(() => sessionStore.sessions.find(x => x.selected === true));
        const chosenInjection = computed(() => sessionStore.injections.find(x => x.selected === true));
        return {
            activeSession,
            sessionStore,
            chosenInjection
        }
    },
}
</script>
  
<style scoped></style>
  