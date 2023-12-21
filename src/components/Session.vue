<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="sessions_page">
    <p>Сеанс гемодиализа</p>
    <p>Назначение сеанса</p>
    <div class="sessions-block-wrapper">
      <div @click="selectSessionType(session.id)" class="sessions-block"
        :class="selectedSession?.id === session.id ? 'active' : ''" v-for="session in sessions" :key="session.id">{{
          session.name }}</div>
    </div>
    <p>Диализатор</p>
    <Directory @click="openDialyzerModal" :title="sessionStore.selectedDialyzer ? sessionStore.selectedDialyzer : `Спр. 'Диализаторы'`"></Directory>
    <div>
      <div style="width: 85%; display: inline-block;">
        <p>Концентратор</p>
        <Directory @click="openConcentratorModal" :title="sessionStore.selectedConcentrator ? sessionStore.selectedConcentrator : `Спр. 'Концентраторы'`"></Directory>
      </div>
      <div style="width: 15%; display: inline-block;">
        <p>Объем</p>
        <input
          style="max-width: 60px; height: 40px; border-radius: 5px;border: 1px solid #d1d5db; padding: 5px; text-align: center; margin-inline-start: 10px;"
          type="text" disabled value="10л.">
      </div>
    </div>
    <p>Тип инъекции</p>
    <div class="sessions-block-wrapper">
      <div @click="selectInjection(injection.id)" class="sessions-block"
        :class="selectedInjection?.id === injection.id ? 'active' : ''" v-for="injection in injections"
        :key="injection.id">{{
          injection.name }}</div>
    </div>
    <Directory style="margin-top: 20px;" id="needle_directory" @click="openNeedleModal" :title="sessionStore.selectedNeedle ? sessionStore.selectedNeedle : `Спр. 'Иглы'`">
    </Directory>
    <Directory style="margin-top: 20px;" id="catheter_directory" @click="openCatheterModal" :title="sessionStore.selectedCatheter ? sessionStore.selectedCatheter : `Спр. 'Катетеры'`">
    </Directory>
    <div style="display: flex; justify-content: space-between; gap: 15px;">
      <div>
        <p>Бикарбонат</p>
        <InputMask v-model="bicarbonateWeight" :mask="sessionStore.selectedBicarbonate === 'граммов' ? '999 гр' : '999 л'"
          placeholder="XXX гр/л" />

        <div class="directory_icon" @click="openBicarbonateModal">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"
              height="15px" width="15px" version="1.1" id="Layer_1" viewBox="0 0 460.088 460.088" xml:space="preserve">
              <g>
                <g>
                  <g>
                    <path
                      d="M25.555,139.872h257.526V88.761H25.555C11.442,88.761,0,100.203,0,114.316C0,128.429,11.442,139.872,25.555,139.872z" />
                    <path
                      d="M25.555,242.429h257.526v-51.111H25.555C11.442,191.318,0,202.76,0,216.874C0,230.988,11.442,242.429,25.555,242.429z" />
                    <path
                      d="M25.555,293.874v0.001C11.442,293.875,0,305.316,0,319.43s11.442,25.555,25.555,25.555h178.91     c-2.021-6.224-3.088-12.789-3.088-19.523c0-11.277,2.957-22.094,8.48-31.588H25.555z" />
                    <path
                      d="M450.623,302.611c-12.62-12.621-33.083-12.621-45.704,0l-26.535,26.535V52.926c0-17.849-14.469-32.317-32.318-32.317     s-32.318,14.469-32.318,32.317v276.22l-26.535-26.535c-12.621-12.62-33.083-12.621-45.704,0     c-12.621,12.621-12.621,33.083,0,45.704l81.7,81.699c12.596,12.6,33.084,12.643,45.714,0l81.7-81.699     C463.243,335.694,463.244,315.232,450.623,302.611z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <p>Сухой вес пациента</p>
        <InputMask v-model="patientWeight" :mask="'999 кг'" placeholder="XXX кг" style="width: 35%;" />
      </div>
      <div>
        <p>Антикоагуляция</p>
        <Directory style="margin-top: 20px;" @click="openAnticoagulationModal"
          :title="sessionStore.selectedAnticoagulation ? sessionStore.selectedAnticoagulation : `Наименование`">
        </Directory>
      </div>
      <div>
        <p>Объем</p>
        <InputMask v-model="weight" :mask="'999 ед'" placeholder="XXX ед" style="width: 35%;" />
      </div>
    </div>
    <SessionResult></SessionResult>
    <Modal v-if="modalCalled" :title="'Диализаторы'" :list="modalOption" @closeModal="hideModal"
      @selectOption="chooseOption" @removeOption="deleteOption" @addOption="pushOption"></Modal>
      <input type="text" v-model="num">
      <input type="text" v-model="count">
      <button @click="pow(num, count)">qwe</button>
  </div>
</template>
  
<script lang="ts">
import { ref, computed, watch } from 'vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { Dialyzer } from '../types/types';
import Modal from './Modal.vue';
import Directory from './Directory.vue';
import SessionResult from './SessionResult.vue';
import { useSessionStore } from "../store/session";
import InputMask from 'primevue/inputmask';

export default {
  components: {
    Dropdown,
    Modal,
    Directory,
    InputText,
    InputMask,
    SessionResult
  },
  setup() {
    const num = ref(0);
    const count = ref(0);
    const sessionStore = useSessionStore();
    const modalCalled = ref(false);
    const selectedSession = ref<Dialyzer | null>(null);
    const selectedInjection = computed(() => sessionStore.injections.find(x => x.selected));
    const modalOption = ref<String[]>([]);
    const modalOptionName = ref("");
    const modalTitle = ref("");
    const sessions = computed(() => sessionStore.sessions);
    const injections = computed(() => sessionStore.injections);
    const bicarbonateWeight = ref("");
    const patientWeight = ref("");
    const weight = ref("");
    watch(bicarbonateWeight, (newVal, oldVal) => {
      sessionStore.setBicarbonate(newVal);
    })
    watch(patientWeight, (newVal, oldVal) => {
      sessionStore.setPatientWeight(newVal);
    })
    watch(weight, (newVal, oldVal) => {
      sessionStore.setWeight(newVal);
    })
    function hideModal() {
      modalCalled.value = false;
    }
    function showModal() {
      modalCalled.value = true;
    }
    function openDialyzerModal() {
      modalOptionName.value = 'dialyzer';
      modalOption.value = sessionStore.dialyzer;
      showModal();
    }
    function openConcentratorModal() {
      modalOptionName.value = 'concentrator';
      modalOption.value = sessionStore.concentrator;
      showModal();
    }
    function openNeedleModal() {
      const found = sessionStore.injections.find(x => x.name === 'Игла')?.id;
      if (!found) {
        return;
      }
      selectInjection(found);
      modalOptionName.value = 'needle';
      modalOption.value = sessionStore.needle;
      showModal();
    }
    function openCatheterModal() {
      const found = sessionStore.injections.find(x => x.name === 'Катетер')?.id;
      if (!found) {
        return;
      }
      selectInjection(found);
      modalOptionName.value = 'catheter';
      modalOption.value = sessionStore.catheter;
      showModal();
    }
    function openBicarbonateModal() {
      modalOptionName.value = 'bicarbonate';
      modalOption.value = sessionStore.bicarbonate;
      showModal();
    }
    function openAnticoagulationModal() {
      modalOptionName.value = 'anticoagulation';
      modalOption.value = sessionStore.anticoagulation;
      showModal();
    }
    function pushOption(evt: string) {
      switch (modalOptionName.value) {
        case 'dialyzer':
          sessionStore.addDialyzer(evt)
          break;
        case 'concentrator':
          sessionStore.addConcentrator(evt)
          break;
        case 'needle':
          sessionStore.addNeedle(evt)
          break;
        case 'catheter':
          sessionStore.addCatheter(evt)
          break;
        case 'bicarbonate':
          sessionStore.addBicarbonate(evt)
          break;
        case 'anticoagulation':
          sessionStore.addAnticoagulation(evt)
          break;
      }
    }
    function deleteOption(evt: string) {
      switch (modalOptionName.value) {
        case 'dialyzer':
          sessionStore.removeDialyzer(evt)
          break;
        case 'concentrator':
          sessionStore.removeConcentrator(evt)
          break;
        case 'needle':
          sessionStore.removeNeedle(evt)
          break;
        case 'catheter':
          sessionStore.removeCatheter(evt)
          break;
        case 'bicarbonate':
          sessionStore.removeBicarbonate(evt)
          break;
        case 'anticoagulation':
          sessionStore.removeAnticoagulation(evt)
          break;
      }
    }
    function chooseOption(evt: string) {
      switch (modalOptionName.value) {
        case 'dialyzer':
          sessionStore.selectDialyzer(evt)
          break;
        case 'concentrator':
          sessionStore.selectConcentrator(evt)
          break;
        case 'needle':
          sessionStore.selectNeedle(evt)
          break;
        case 'catheter':
          sessionStore.selectCatheter(evt)
          break;
        case 'bicarbonate':
          sessionStore.selectBicarbonate(evt)
          break;
        case 'anticoagulation':
          sessionStore.selectAnticoagulation(evt)
          break;
      }
    }
    function selectSessionType(id: number) {
      if (selectedSession.value?.id === id) {
        return;
      }
      const found = sessions.value.find(x => x.id === id);
      if (!found) {
        return;
      }
      selectedSession.value = found;
      sessionStore.selectSession(id);
    }
    function selectInjection(id: number) {
      sessionStore.selectInjection(id);
      if (injections.value[0].id === id) {
        document.getElementById('catheter_directory')?.classList.add('disabled_directory');
        document.getElementById('needle_directory')?.classList.remove('disabled_directory');
        sessionStore.selectCatheter("");
        return;
      }
      if (injections.value[1].id === id) {
        document.getElementById('needle_directory')?.classList.add('disabled_directory');
        document.getElementById('catheter_directory')?.classList.remove('disabled_directory');
        sessionStore.selectNeedle("");
        return;
      }
    }
    function pow(num: number, count: number) {
      console.log(num, count, 'num, count')
      if (!num && typeof parseInt(num.toString()) !== Number) {
        return;
      }
      let result = 0;
      for (let index = 1; index <= count; index++) {
        result = result * num;
      }
      const parsedNumber = parseInt(num.toString());
      const parsedCount = parseInt(count.toString());
      if (!parsedNumber || !parsedCount) {
        return;
      }
      console.log(result, 'result')
    }
    function onWeightInput() {
      const numbers = bicarbonateWeight.value.match(/\d+/g)?.join('').slice(0, 3);
      if (sessionStore.selectedBicarbonate === 'граммов') {
        bicarbonateWeight.value = numbers + ' гр';
      }
      if (sessionStore.selectedBicarbonate === 'литров') {
        bicarbonateWeight.value = numbers + ' л';
      }
      sessionStore.setBicarbonate(bicarbonateWeight.value);
    }
    return {
      selectedSession,
      sessions,
      selectSessionType,
      modalOption,
      modalTitle,
      sessionStore,
      modalCalled,
      hideModal,
      showModal,
      openDialyzerModal,
      openConcentratorModal,
      pushOption,
      deleteOption,
      chooseOption,
      injections,
      selectedInjection,
      selectInjection,
      openNeedleModal,
      openCatheterModal,
      openBicarbonateModal,
      openAnticoagulationModal,
      onWeightInput,
      bicarbonateWeight,
      patientWeight,
      weight,
      pow,
      num,
      count
    }
  },
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.disabled_directory {
  pointer-events: none;
  opacity: 0.3;
}

.directory_icon {
  cursor: pointer;
  display: inline-block;
  position: relative;
  top: 2px;
  margin-inline-start: 5px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  height: 46px;
  /* line-height: 36px; */
}

.directory_icon div {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 100%;
}
</style>
  