import Home from './components/Home.vue'
import Books from './components/book/Books.vue'
import NewBook from './components/NewBook.vue'
import AlertNewBook from './components/AlertNewBook.vue'
import AlertEditBook from './components/AlertEditBook.vue'

export const routes = [
    {path: '/', component: Home},
    {path: '/books', component: Books},
    {path: '/newBook', component: NewBook},
    {path: '/alertNewBook', component: AlertNewBook},
    {path: '/alertEditBook', component: AlertEditBook},
    {path:'*', redirect : '/'},
]