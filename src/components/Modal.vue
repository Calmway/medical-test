<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="dynamic_modal_wrapper">
        <div class="dynamic_modal_wrapper_background" @click="closeModal"></div>
        <div
            style="position: relative; width: 100%; display: flex; height: 100%; align-items: center; justify-content: center;">
            <div class="dynamic_modal_content">
                <div class="dynamic_modal_header">
                    <div>{{ $props.title }}</div>
                    <div style="cursor: pointer;" @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
                            <path
                                d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
                        </svg>
                    </div>
                </div>
                <div class="dynamic_modal_body">
                    <div style="display: flex; justify-content: start; gap: 15px;">
                        <InputText placeholder="Поиск позиции по первым символам" type="text" v-model="searchingElem" />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                                <path
                                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
                            </svg>
                        </button>
                    </div>
                    <div style="display: flex; justify-content: start; gap: 15px; margin-top: 15px;">
                        <InputText placeholder="Добавить новую запись" type="text" v-model="addingElem" /><button
                            @click="addOption">+</button>
                    </div>
                    <div style="width: 51%; overflow-y: auto;">
                        <div class="list_element" v-for="(item, index) in reactList" :key="index">
                            <span style="height: 48px;    display: flex;    align-items: center;"
                                @click="selectOption(item)">{{ item }}</span>
                            <button @click="removeOption(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
                                    <path
                                        d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import InputText from 'primevue/inputtext';
import { ref, computed } from 'vue';
export default {
    name: "Modal",
    emits: ['closeModal', 'update:modelValue', 'selectOption', 'removeOption', 'addOption'],
    components: {
        InputText
    },
    props: {
        title: String,
        list: Array<string>,
    },
    setup(props, { emit }) {
        const searchingElem = ref("");
        const addingElem = ref("");
        const reactList = computed(() => searchingElem.value ? props?.list?.filter(x => x.toLocaleLowerCase().startsWith(searchingElem.value.toLocaleLowerCase())) : props?.list)
        function closeModal(event: Event) {
            event.stopPropagation();
            emit('closeModal');
        }
        function selectOption(index: string) {
            emit('selectOption', index);
            emit('closeModal');
        }
        function removeOption(name: string) {
            emit('removeOption', name);
        }
        function addOption() {
            const param = JSON.parse(JSON.stringify(addingElem.value));
            emit('addOption', param);
            addingElem.value = "";
        }
        return {
            props,
            closeModal,
            searchingElem,
            addingElem,
            selectOption,
            removeOption,
            reactList,
            addOption
        }
    },
}
</script>
  
<style scoped>
.dynamic_modal_wrapper {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 998;
}

.dynamic_modal_wrapper_background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
}

.dynamic_modal_header {
    display: flex;
    justify-content: space-between;
}

.dynamic_modal_header svg,
.dynamic_modal_body svg {
    height: 15px;
    width: 15px;
}

.dynamic_modal_content {
    width: 40%;
    min-height: 50%;
    max-height: 75%;
    background: #fff;
    border-radius: 30px;
    padding: 25px;
    z-index: 1000;
}

.dynamic_modal_body button {
    color: #fff;
    background: #bebebe;
    padding: 0.75rem 0.75rem;
    border: 1px solid #d1d5db;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    width: 50px;
}

.dynamic_modal_body svg path {
    fill: #fff;
}

.dynamic_modal_body button:hover,
.dynamic_modal_wrapper .dynamic_modal_body button:hover svg path {
    background: rgba(211, 209, 209, 0.255);
    color: #4b5563;
    fill: #4b5563;
}

.dynamic_modal_body .list_element span {
    display: block;
    width: 90%;
    padding: 0 15px;
}

.dynamic_modal_body .list_element:first-child {
    margin-top: 15px;
}

.dynamic_modal_body .list_element {
    border: 1px solid #4b5563;
    border-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dynamic_modal_body .list_element:last-child {
    border: 1px solid #4b5563;
}

.dynamic_modal_body .list_element {
    cursor: pointer;
}

.dynamic_modal_body .list_element button {
    background: #fff;
    border: 1px solid transparent;
}

.dynamic_modal_body .list_element button svg path {
    fill: #4b5563;
}

.dynamic_modal_body .list_element button:hover svg {
    transform: scale(1.2);
}
</style>
  