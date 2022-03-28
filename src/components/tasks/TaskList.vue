<template>
	<div v-for="task of tasks" :key="task.id" @click="$router.push('/task-edit/' + task.id)">
		title: {{ task.title }} <br />
		description: {{ task.description }}

		<br />
		<br />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ITask } from '@/interfaces'

export default defineComponent({
	name: 'TaskList',

	props: {
		tasks: {
			type: Array as PropType<ITask[]>
		}
	}
})
</script>
