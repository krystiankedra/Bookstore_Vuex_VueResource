import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
    books: [],
    sortTitleValue: false,
    sortDescriptionValue: false,
}

const getters = {
    books: state => {
        return state.books;
    }
}


const mutations = {
    'ADD_NEW_BOOK': (state, payload) => {
        state.books = payload
    },
    'SET_BOOKS': (state, payload) => {
        state.books = payload
    },
    'DELETE_BOOK': (state, payload) => {
        state.books.splice(payload.index, 1)
    },
    'UPDATE_BOOK': (state, payload) => {
        state.books[payload.index].title = payload.title
        state.books[payload.index].description = payload.description
    },
    'SORT_TITLE': (state,payload) => {
        if (!payload) {
            state.sortTitleValue = true;
            return state.books.sort(
              (element1, element2) => (element1.title < element2.title ? -1 : 1)
            );
          } else {
            state.sortTitleValue = false;
            return state.books.sort(
              (element1, element2) => (element1.title < element2.title ? 1 : -1)
            );
          }
    },
    'SORT_DESCRIPTION': (state,payload) => {
        if (!payload) {
            state.sortDescriptionValue = true;
            return state.books.sort(
              (element1, element2) =>
                element1.description < element2.description ? -1 : 1
            );
          } else {
            state.sortDescriptionValue = false;
            return state.books.sort(
              (element1, element2) =>
                element1.description < element2.description ? 1 : -1
            );
          }
    }
}



const actions = {
    addBook({ commit }, payload) {
        Vue.http.post('http://bootcamp.opole.pl/books/add-book/87f4', payload, {
            emulateJSON: true
        })
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            })
        commit('ADD_NEW_BOOK', payload)
    },
    deleteBook({ commit }, payload) {
        console.log(payload);
        Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + payload.bookId + '/87f4')
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            })
        commit('DELETE_BOOK', payload)
    },
    updateBook({ commit }, payload) {
        Vue.http.post('http://bootcamp.opole.pl/books/edit-book/' + payload.bookId + '/87f4', {
            title: payload.title,
            description: payload.description
        }, {
                emulateJSON: true
            })
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            })
        commit('UPDATE_BOOK', payload)
    },
    loadBooks({ commit }) {
        const bookList = [];
        Vue.http.get('http://bootcamp.opole.pl/books/my-books/87f4')
            .then(response => {
                return response.body.books
            })
            .then(data => {
                Vue.http.get('../../../src/data/books.json')
                    .then(response => {
                        return response.body.books
                    }, error => {
                        console.log(error);
                    })
                    .then(data => {
                        for (let key in data) {
                            bookList.push(data[key])
                        }
                    })
                for (let key in data) {
                    bookList.push(data[key])
                }
            })
        commit('SET_BOOKS', bookList)
    },
    sortTitle({commit}, payload) {
        commit('SORT_TITLE', payload)
    },
    sortDescription({commit}, payload) {
        commit('SORT_DESCRIPTION', payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}