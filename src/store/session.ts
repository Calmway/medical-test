import { defineStore } from 'pinia';
import { Concentrator, Dialyzer } from '../types/types';


export const useSessionStore = defineStore('sessionStore', {
    state: () => ({
        selectedDialyzer: "",
        selectedConcentrator: "",
        selectedNeedle: "",
        selectedCatheter: "",
        selectedBicarbonate: "",
        bicarbonateWeight: "",
        patientWeight: "",
        weight: "",
        selectedAnticoagulation: "",
        dialyzer: ['Диализатор 1', 'Диализатор 2'],
        bicarbonate: ['граммов', 'литров'],
        anticoagulation: ['Вид 1','Вид 2','Вид 3',],
        concentrator: ['Концентратор 1', 'Концентратор 2'],
        needle: ['Венозные','Артериальные'],
        catheter: ['Катетер Фолея','Катетер Малеко','Катетер Пеццера','Катетер Тиманна','Катетер Нелатона'],
        sessions: [
            {
                id: 1,
                name: "HD",
                selected: false
            },
            {
                id: 2,
                name: "HDF",
                selected: false
            },
            {
                id: 3,
                name: "UF",
                selected: false
            }
        ],
        injections:
        [
            {
                id: 1,
                name: "Игла",
                selected: false,
            },
            {
                id: 2,
                name: "Катетер",
                selected: false,
            },
        ]

    }),
    getters: {
    },
    actions: {
        selectSession(id: number) {
            this.sessions.forEach(el => {
                el.selected = false;
            });
            const found = this.sessions.find(x => x.id === id);
            if (!found) {
                return;
            }
            found.selected = true;
        },
        //Dialyzer
        selectDialyzer(param: string) {
            this.selectedDialyzer = param;
        },
        addDialyzer(param: string) {
            const found = this.dialyzer.find(x => x === param);
            if (found) {
                return;
            }
            this.dialyzer.push(param);
        },
        removeDialyzer(param: string) {
            this.dialyzer.splice(this.dialyzer.findIndex(x => x === param), 1);
        },
        //Concentrator
        selectConcentrator(param: string) {
            this.selectedConcentrator = param;
        },
        addConcentrator(param: string) {
            const found = this.concentrator.find(x => x === param);
            if (found) {
                return;
            }
            this.concentrator.push(param);
        },
        removeConcentrator(param: string) {
            this.concentrator.splice(this.concentrator.findIndex(x => x === param), 1);
        },
        //needle
        selectNeedle(param: string) {
            this.selectedNeedle = param;
        },
        addNeedle(param: string) {
            const found = this.needle.find(x => x === param);
            if (found) {
                return;
            }
            this.needle.push(param);
        },
        removeNeedle(param: string) {
            this.needle.splice(this.needle.findIndex(x => x === param), 1);
        },
        //catheter
        selectCatheter(param: string) {
            this.selectedCatheter = param;
        },
        addCatheter(param: string) {
            const found = this.catheter.find(x => x === param);
            if (found) {
                return;
            }
            this.catheter.push(param);
        },
        removeCatheter(param: string) {
            this.catheter.splice(this.catheter.findIndex(x => x === param), 1);
        },
        selectInjection(id: number) {
            this.injections.forEach(el => {
                el.selected = false;
            });
            const found = this.injections.find(x => x.id === id);
            if (!found) {
                return;
            }
            found.selected = true;
        },
        //bicarbonate
        selectBicarbonate(param: string) {
            this.selectedBicarbonate = param;
        },
        addBicarbonate(param: string) {
            const found = this.bicarbonate.find(x => x === param);
            if (found) {
                return;
            }
            this.bicarbonate.push(param);
        },
        removeBicarbonate(param: string) {
            this.bicarbonate.splice(this.bicarbonate.findIndex(x => x === param), 1);
        },
        setBicarbonate(weight: string) {
            this.bicarbonateWeight = weight;
        },
        setPatientWeight(weight: string) {
            this.patientWeight = weight;
        },
        setWeight(ed: string) {
            this.weight = ed;
        },
        //anticoagulation
        selectAnticoagulation(param: string) {
            this.selectedAnticoagulation = param;
        },
        addAnticoagulation(param: string) {
            const found = this.anticoagulation.find(x => x === param);
            if (found) {
                return;
            }
            this.anticoagulation.push(param);
        },
        removeAnticoagulation(param: string) {
            this.anticoagulation.splice(this.anticoagulation.findIndex(x => x === param), 1);
        },
    },
})