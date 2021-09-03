<template>
    <app-layout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ pageTitle }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="mt-10 sm:mt-0">
                        <div class="md:grid md:grid-cols-3 md:gap-6">
                            <div class="md:col-span-1">
                                <div class="px-4 sm:px-0">
                                    <div class="mt-4 mx-4">
                                        <h2 class="text-xl font-medium leading-6 text-gray-900">Steps:</h2>
                                        <p class="mt-1 text-sm text-gray-600">Current {{ currentStep + 1 }}</p>
                                    </div>
                                    <div  v-for="(step, index) in stepInformation" :key="index" class="m-2 p-2 rounded-md">
                                        <div class="hidden sm:block" aria-hidden="true">
                                            <div class="py-5">
                                                <div class="border-t border-gray-200" />
                                            </div>
                                        </div>
                                        <div class="">
                                           <div class="justify-between w-full flex">
                                               <h3 class="text-lg font-medium leading-6 text-gray-900">{{ step.title }}</h3>
                                               <p class="mt-1 text-sm text-gray-600">
                                                   {{ index + 1}}
                                               </p>
                                           </div>
                                           <p class="mt-1 text-sm text-gray-600">
                                               {{ step.description }}
                                           </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" class="h-full" @submit.prevent="submitForm">
                                    <div v-if="currentStep === 0" class="shadow overflow-hidden sm:rounded-md">
                                        <div class="px-4 py-5 bg-white sm:p-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-10 sm:col-span-5">
                                                    <label for="first-name" class="block text-sm font-medium text-gray-700">Title</label>
                                                    <input type="text" name="first-name" id="first-name" required
                                                           v-model="formSteps.assignment.title"
                                                           autocomplete="given-name"
                                                           class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                </div>
                                                <div class="col-span-10 sm:col-span-5">
                                                    <label for="description"
                                                           class="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea type="text" id="description" v-model="formSteps.assignment.description" rows="9" required
                                                           class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                </div>

                                                <div class="col-span-6 sm:col-span-3">
                                                    <select id="subject"
                                                            required
                                                            v-model="formSteps.assignment.subject"
                                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <option disabled value="" >Select an subject</option>
                                                        <option v-for="subject in subjects" :value="subject.id">{{ subject.name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button type="submit"
                                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                next
                                            </button>
                                        </div>
                                    </div>
                                    <div v-if="currentStep === 1" class="shadow overflow-hidden sm:rounded-md h-full flex flex-col justify-between">
                                        <div class="px-4 py-5 bg-white sm:p-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-6 sm:col-span-6">
                                                    <label for="school_class"
                                                           class="block text-sm font-medium text-gray-700">School Class</label>
                                                    <select id="school_class" name="school_class"
                                                            required
                                                            v-model="formSteps.currentAssignmentTeam.team_name"
                                                            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <option disabled value="" >Select an School class</option>
                                                        <option v-for="schoolClass in schoolClasses" >{{ schoolClass.name }}</option>
                                                    </select>
                                                </div>
                                                <div class="col-span-6 sm:col-span-6">
                                                    <label for="due-date"
                                                           class="block text-sm font-medium text-gray-700">Due</label>
                                                    <input class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                           type="datetime-local" id="due-date"
                                                           name="due-date"
                                                           v-model="formSteps.currentAssignmentTeam.due_date"
                                                           @change="addTeamDueDate"
                                                           >
                                                </div>
                                                <div class="col-span-6 sm:col-span-6" v-if="formSteps.assignmentTeam.length">
                                                    <div class="" v-for="teamData in formSteps.assignmentTeam">
                                                        <p class="text-sm text-gray-600">{{ teamData.team_name }}: {{ teamData.due_date }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button type="submit"
                                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue'
import {ref, reactive} from "vue";
import {Inertia} from "@inertiajs/inertia";

export default {
    name: "Create",
    components: {
        AppLayout
    },
    props: {
        pageTitle: {
            type: String,
            required: true
        },
        schoolClasses: {
            type: Array,
            required: true
        },
        subjects: {
            type: Array,
            required: true
        },
    },

    setup() {
        const currentStep = ref(0);

        const stepInformation = reactive([
            {
                title: 'Assignment information',
                description: 'The information about the assignment without the school classes and due dates'
            },
            {
                title: 'Assignment related information',
                description: 'Set due dates per school class'
            }
        ]);

        const formSteps = reactive({
            assignment: {
                title: '',
                description: '',
                subject: ''
            },
            assignmentTeam: [],
            currentAssignmentTeam: {
                team_name: '',
                due_date: ''
            }
        });

        const addTeamDueDate = () => {
            const data = formSteps.currentAssignmentTeam;

            if(!data.due_date || !data.team_name){
                return
            }

            if(!exists(data.team_name)){
                return formSteps.assignmentTeam.push({
                    team_name: data.team_name ,
                    due_date: data.due_date,
                });
            }

            return updateTeamData(data.team_name, data.due_date);
        }

        const exists = (teamName) => {
            return formSteps.assignmentTeam.filter((teamData) => teamData.team_name === teamName).length;
        }

        const updateTeamData = (teamName, dueDate) => {
            const teamDataKey = formSteps.assignmentTeam.map((teamData, index) => {
                if (teamData.team_name === teamName){
                    return index;
                }

                return null;

            }).filter((result) => result !== null);

            formSteps.assignmentTeam[teamDataKey].due_date = dueDate;
        }

        const submitForm = () => {
            if (currentStep.value === 0){
                currentStep.value++;
                return;
            }

            Inertia.post(route('assignments.store'), {

            });
        }

        return {
            formSteps,
            submitForm,
            addTeamDueDate,
            currentStep,
            stepInformation
        }
    }
}
</script>
