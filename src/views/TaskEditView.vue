<template>
	<TaskAdd :task-prop="task" @removed-task="removedTask" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useRoute, useRouter } from 'vue-router'
import TaskAdd from '@/components/tasks/TaskAdd.vue'

export default defineComponent({
	name: 'TaskEditView',
	components: { TaskAdd },
	setup() {
		const tasksStorage = useTasksStore()

		const route = useRoute()
		const router = useRouter()

		const task = computed(() => tasksStorage.getTaskById(Number(route.params.id)))

		function removedTask() {
			router.push({ name: 'tasks-list' })
		}

		return { task, removedTask }
	}
})
</script>
