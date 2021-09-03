<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
            <th v-for="(item, key) in head" :key="key" scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ item }}
            </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in body" :key="index">
            <td v-for="(field) in head" class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                        {{ item[field] }}
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Table",
    props: {
        head: {
            type: Array,
            required: true
        },
        body: {
            type: Array,
            required: true
        }
    }
}
</script>
