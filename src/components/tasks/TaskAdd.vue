<template>
	<h2>add task</h2>

	<input v-model="task.title" data-test-title type="text" />
	<textarea v-model="task.description" data-test-description />

	<input v-model="task.completed" :disabled="!isEdit" type="checkbox" />

	<button v-if="isEdit" @click="removeTask">Remove</button>

	<button v-if="isEdit" :disabled="!isSaveChange" @click="saveTask">Edit</button>

	<button v-else data-test-add :disabled="!isAdd" @click="saveTask">Add</button>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { ICreateTaskAdd, ICreateTaskData, ITask } from '@/interfaces'

export default defineComponent({
	name: 'TaskAdd',

	props: {
		taskProp: {
			type: Object as PropType<ITask>
		}
	},

	emits: ['removed-task'],

	setup(props, { emit }) {
		const taskStore = useTasksStore()

		const task = ref<ICreateTaskData>({
			completed: false,
			title: null,
			description: null
		})

		const isAdd = computed(() => !!(task.value.title?.length && task.value.description?.length) || false)

		const isEdit = computed(() => !!props.taskProp)

		const isSaveChange = computed(() => {
			return (
				isAdd.value &&
				(task.value.title !== props.taskProp?.title ||
					task.value.description !== props.taskProp?.description ||
					task.value.completed !== props.taskProp?.completed)
			)
		})

		onMounted(() => {
			if (props.taskProp) {
				task.value.title = props.taskProp?.title
				task.value.description = props.taskProp.description
				task.value.completed = props.taskProp.completed
			}
		})

		function saveTask() {
			if (isEdit.value) editTask()
			else addTask()
		}

		function editTask() {
			const data = {
				...props.taskProp,
				...task.value
			} as ITask

			taskStore.editTask(data)
		}

		function addTask() {
			taskStore.addTask({ ...task.value } as ICreateTaskAdd)

			clearField()
		}

		function removeTask() {
			taskStore.deleteTask(Number(props.taskProp?.id))
			emit('removed-task')
		}

		function clearField() {
			task.value.title = null
			task.value.description = null
		}

		return { task, isAdd, isEdit, isSaveChange, saveTask, removeTask }
	}
})
</script>
