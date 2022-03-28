import { defineStore } from 'pinia'
import type { ICreateTaskAdd, ITask } from '@/interfaces'
import { taskService } from '@/services/task.service'

export type ITasksState = {
	tasks: ITask[] | null
}

export type typeTaskGetters = {
	getTaskById: (state: ITasksState) => (id: number) => ITask | null
}

export interface ITasksActions {
	getTasks: () => void
	addTask: (task: ICreateTaskAdd) => void
	editTask: (task: ITask) => void
	deleteTask: (id: number) => void
}

export const useTasksStore = defineStore<'TaskModule', ITasksState, typeTaskGetters, ITasksActions>('TaskModule', {
	state: () => ({
		tasks: null
	}),

	actions: {
		addTask(task: ICreateTaskAdd) {
			taskService.addTask(task)
			this.getTasks()
		},

		editTask(task: ITask) {
			taskService.editTask(task)
			this.getTasks()
		},

		deleteTask(id: number) {
			taskService.deleteTask(id)
			this.getTasks()
		},

		getTasks() {
			console.log('getTasks')
			this.tasks = taskService.getTasks()
		}
	},

	getters: {
		getTaskById: state => (id: number) => state.tasks?.find(task => task.id === id) || null
	}
})
