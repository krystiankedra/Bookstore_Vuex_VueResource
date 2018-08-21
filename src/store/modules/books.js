import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
    books : []
}

const getters = {
    books : state => {
        return state.books;
    }
}


const mutations = {
    'ADD_NEW_BOOK': (state,payload) => {
        state.books = payload
    },
    'SET_BOOKS': (state, payload) => {
        state.books = payload
    },
    'DELETE_BOOK': (state,payload) => {
      state.books.splice(payload.index , 1)
    }
}



const actions = {
    addBook({commit},payload) {
        Vue.http.post('http://bootcamp.opole.pl/books/add-book/87f4', payload ,  {
            emulateJSON: true 
        })
        .then(response => {
            console.log(response);
        }, error => {
            console.log(error);
        })
        commit('ADD_NEW_BOOK', payload)
    },
    loadBooks ({ commit }) {
          Vue.http.get('http://bootcamp.opole.pl/books/my-books/87f4')
          .then(response => {
            return response.body.books
          })
          .then(data => {
            const bookList = [];
            for(let key in data) {
                bookList.push(data[key])
            }
            commit('SET_BOOKS', bookList)
          })
      },
    deleteBook({commit}, payload) {
        console.log(payload);
        Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + payload.bookId + '/87f4')
        .then(response => {
            console.log(response);
        }, error=> {
            console.log(error);
        })
        commit('DELETE_BOOK', payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}