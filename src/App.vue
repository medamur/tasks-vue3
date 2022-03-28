<template>
	<div style="display: flex; gap: 20px">
		<router-link to="/">Main</router-link>
		<router-link to="/tasks-list">Tasks list</router-link>
		<router-link to="/task-add-view">Task add view</router-link>
	</div>

	<router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useTasksStore } from '@/stores/tasks'

export default defineComponent({
	name: 'App',

	setup() {
		const tasksStorage = useTasksStore()

		onBeforeMount(() => {
			tasksStorage.getTasks()
		})
	}
})
</script>
