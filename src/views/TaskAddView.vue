<template>
	<TaskAdd />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskAdd from '@/components/tasks/TaskAdd.vue'

export default defineComponent({
	name: 'TaskAddView',

	components: { TaskAdd }
})
</script>
