import { describe, it, expect, fn } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskAdd from '../tasks/TaskAdd.vue'
import { useTasksStore } from '../../stores/tasks'
import { createTestingPinia } from '@pinia/testing'

describe('TaskAdd добавление задачи', () => {
	it('Загрузка компонента', () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		expect(wrapper.isVisible()).toBeTruthy()
	})

	it('Заполнение input title', async () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		const inputTitle = wrapper.get<HTMLInputElement>('[data-test-title]')

		const testValue = 'test value'

		await inputTitle.setValue(testValue)

		expect(wrapper.vm.task.title).toEqual(testValue)
	})

	it('Заполнение textarea description', async () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		const textAreaDescription = wrapper.get<HTMLTextAreaElement>('[data-test-description]')

		const testValue = 'test value'

		await textAreaDescription.setValue(testValue)

		expect(wrapper.vm.task.description).toEqual(testValue)
	})

	it('Disabled btn add', () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		const btnAdd = wrapper.get<HTMLButtonElement>('[data-test-add]')

		expect(btnAdd.element.disabled).toEqual(true)
	})

	it('Available btn add', async () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		await wrapper.get<HTMLInputElement>('[data-test-title]').setValue('test value description')

		await wrapper.get<HTMLTextAreaElement>('[data-test-description]').setValue('test value title')

		const btnAdd = wrapper.get<HTMLButtonElement>('[data-test-add]')

		expect(btnAdd.element.disabled).toEqual(false)
	})

	it('Call method addTask', async () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		await wrapper.get<HTMLInputElement>('[data-test-title]').setValue('test value description')

		await wrapper.get<HTMLTextAreaElement>('[data-test-description]').setValue('test value title')

		const store = useTasksStore()

		const btnAdd = wrapper.get<HTMLButtonElement>('[data-test-add]')

		const argsForAddTask = { ...wrapper.vm.task }

		await btnAdd.trigger('click')

		expect(store.addTask).toHaveBeenNthCalledWith(1, argsForAddTask)
	})

	it('Disabled btn add after create task', async () => {
		const wrapper = mount(TaskAdd, {
			global: {
				plugins: [createTestingPinia({ createSpy: fn })]
			}
		})

		await wrapper.get<HTMLInputElement>('[data-test-title]').setValue('test value description')

		await wrapper.get<HTMLTextAreaElement>('[data-test-description]').setValue('test value title')

		const btnAdd = wrapper.get<HTMLButtonElement>('[data-test-add]')

		await btnAdd.trigger('click')

		expect(btnAdd.element.disabled).toEqual(true)
	})
})
