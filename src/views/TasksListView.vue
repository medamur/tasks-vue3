<template>
	<TaskList v-if="tasks" :tasks="tasks" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { ITask } from '@/interfaces'
import { useTasksStore } from '@/stores/tasks'
import TaskList from '@/components/tasks/TaskList.vue'

export default defineComponent({
	name: 'TasksListView',

	components: { TaskList },

	setup() {
		const tasksStorage = useTasksStore()

		const tasks = computed<ITask[] | null>(() => {
			return tasksStorage.tasks
		})

		return { tasks }
	}
})
</script>
