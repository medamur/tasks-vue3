export interface ITask {
	id: number
	created: number
	modified: number
	title: string
	description: string
	completed: boolean
}

export interface ICreateTaskData {
	title: string | null
	description: string | null
	completed: boolean
}

export interface ICreateTaskAdd {
	title: string
	description: string
	completed: boolean
}
