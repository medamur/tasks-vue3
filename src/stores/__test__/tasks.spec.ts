import { describe, it, beforeEach, fn, expect, spyOn } from 'vitest'
import { useTasksStore } from '@/stores/tasks'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { taskService } from '@/services/task.service'

describe('Store tasks', () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ createSpy: fn }))
	})

	it('store.addTask -> taskService.addTask && store.getTasks -> undefined', () => {
		const store = useTasksStore()

		const spyTaskService = spyOn(taskService, 'addTask').mockImplementation(() => undefined)
		const spyStoreGetTasks = spyOn(store, 'getTasks').mockImplementation(() => undefined)

		const task = { completed: true, description: 'description', title: 'title' }

		store.addTask(task)

		expect(spyTaskService).toHaveBeenNthCalledWith(1, task)
		expect(spyStoreGetTasks).toHaveBeenCalledTimes(1)
	})
})
