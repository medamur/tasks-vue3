import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TasksListView from '@/views/TasksListView.vue'
import TaskEditView from '@/views/TaskEditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TaskAddView from '@/views/TaskAddView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
		{ path: '/task-edit', name: 'NotFound', component: NotFoundView },
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/task-add-view',
			name: 'task-add-view',
			component: TaskAddView
		},
		{
			path: '/tasks-list',
			name: 'tasks-list',
			component: TasksListView
		},
		{
			path: '/task-edit/:id',
			name: 'tasks-edit',
			component: TaskEditView,
			beforeEnter(to, from, next) {
				if (Number.isInteger(+to.params.id)) return next()

				next({ name: 'NotFound' })
			}
		}
	]
})

export default router
