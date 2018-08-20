import Home from './components/Home.vue'
import Books from './components/book/Books.vue'
import NewBook from './components/NewBook.vue'

export const routes = [
    {path: '/', component: Home},
    {path: '/books', component: Books},
    {path: '/newBook', component: NewBook},
    {path:'*', redirect : '/'},
]