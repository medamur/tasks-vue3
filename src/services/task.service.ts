import type { ICreateTaskAdd, ITask } from '@/interfaces'

export class TaskService {
	addTask(task: ICreateTaskAdd) {
		const created = Date.now()

		const newTask = {
			...task,
			created,
			id: created,
			modified: created
		}

		const tasks: ITask[] | [] = JSON.parse(localStorage.getItem('tasks') || '[]')

		localStorage.removeItem('tasks')
		localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
	}

	deleteTask(id: number) {
		const tasks: ITask[] | [] = JSON.parse(localStorage.getItem('tasks') || '[]')

		const taskIdx = tasks.findIndex(task => task.id === id)
		tasks.splice(taskIdx, 1)

		localStorage.removeItem('tasks')
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	editTask(task: ITask) {
		const tasks: ITask[] | [] = JSON.parse(localStorage.getItem('tasks') || '[]')

		const taskIdx = tasks.findIndex(task => task.id === task.id)
		tasks.splice(taskIdx, 1, task)

		localStorage.removeItem('tasks')
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	getTasks(): [] | ITask[] {
		return JSON.parse(localStorage.getItem('tasks') || '[]')
	}
}

export const taskService = new TaskService()
