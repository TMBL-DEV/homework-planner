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
                    <Table :head="assignmentHead" :body="assignmentsBody"></Table>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout.vue"
import Table from "@/Components/Table";
import {computed} from "vue";

export default {
    components: {
        Table,
        AppLayout,
    },
    props: {
        pageTitle: {
            type: String,
            required: true
        },
        assignments: {
            type: Array,
            required: true
        }
    },

    setup(props) {
        const assignmentHead = ["Title", "Subject", "Status", "DueDate", "Time"];

        const states = {
            "TODO": "Todo",
            "IN_PROGRESS": "In Progress",
            "DONE": "Done"
        }

        const assignmentsBody = computed(() => {
            return props.assignments.data.map((assignment) => {
                return {
                    Title: assignment.name,
                    Subject: assignment.subject.name,
                    Status: states[assignment.state.state],
                    DueDate: (new Date(assignment.due_date.due_date)).toLocaleDateString(),
                    Time: (new Date(assignment.due_date.due_date)).toLocaleTimeString()
                }
            })
        })

        return {
            assignmentHead,
            assignmentsBody
        }
    },
}
</script>
