import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
    books: [],
    sortTitleValue: false,
    sortDescriptionValue: false,
    selectedBooks: [],
    rates: [],
}

const getters = {
    books: state => {
        return state.books;
    },
    rates: state => {
        return state.rates;
    }
}

const mutations = {
    'ADD_NEW_BOOK': (state, payload) => {
        state.books.unshift(payload)
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
    'SORT_TITLE': (state, payload) => {
        if (!payload) {
            state.sortTitleValue = true;
            return state.books.sort(
                (element1, element2) => (element1.title.toLowerCase() < element2.title.toLowerCase() ? -1 : 1)
            );
        } else {
            state.sortTitleValue = false;
            return state.books.sort(
                (element1, element2) => (element1.title.toLowerCase() < element2.title.toLowerCase() ? 1 : -1)
            );
        }
    },
    'SORT_DESCRIPTION': (state, payload) => {
        if (!payload) {
            state.sortDescriptionValue = !state.sortDescriptionValue;
            return state.books.sort(
                (element1, element2) =>
                    element1.description < element2.description ? -1 : 1
            );
        } else {
            state.sortDescriptionValue = !state.sortDescriptionValue;
            return state.books.sort(
                (element1, element2) =>
                    element1.description < element2.description ? 1 : -1
            );
        }
    },
    'DELETE_SELECTED_BOOK': (state, payload) => {
        state.books.splice(payload, 1)
    },
    'SET_RATES': (state, payload) => {
        state.rates = payload
    },
    'UPDATE_RATE': (state, payload) => {
        state.rates = payload;
    },
    'CHECKED_BOOK' : (state,payload) => {
        if (payload.checked) {
            state.selectedBooks.push(payload)
        } else if (!payload.checked){
            state.selectedBooks.splice(payload.index, 1)
        } else {
            state.selectedBooks.splice(payload.index, 1)
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
        Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + payload.bookId + '/87f4')
            .then(response => {
                console.log(response);
            }, error => {
                console.log(error);
            })
        commit('DELETE_BOOK', payload)
    },
    updateBook({ commit }, payload) {
        const ratesList = [];
        Vue.http.post('http://bootcamp.opole.pl/books/edit-book/' + payload.bookId + '/87f4', {
            title: payload.title,
            description: payload.description
        }, {
                emulateJSON: true
            })
            .then(response => {
                Vue.http.post('http://bootcamp.opole.pl/books/rate/87f4', {
                    id: payload.bookId,
                    rate: payload.newRate
                }, {
                        emulateJSON: true
                    })
                    .then(response => {
                        Vue.http.get('http://bootcamp.opole.pl/books/my-rates/87f4')
                            .then(response => {
                                return response.body.rates
                            })
                            .then(data => {
                                for (let key in data) {
                                    ratesList.push(data[key])
                                }
                                commit('UPDATE_RATE', ratesList)
                            })
                    }, error => {
                        console.log(error);
                    })
            }, error => {
                console.log(error);
            })
        commit('UPDATE_BOOK', payload)
    },
    loadBooks({ commit }) {
        const bookList = [];
        const ratesList = [];
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
                        Vue.http.get('http://bootcamp.opole.pl/books/my-rates/87f4')
                            .then(response => {
                                return response.body.rates
                            })
                            .then(data => {
                                for (let key in data) {
                                    ratesList.push(data[key])
                                }
                            })
                        for (let key in data) {
                            bookList.push(data[key])
                        }
                    })
                for (let key in data) {
                    bookList.push(data[key])
                }
            })
        commit('SET_BOOKS', bookList)
        commit('SET_RATES', ratesList)
    },
    sortTitle({ commit }, payload) {
        commit('SORT_TITLE', payload)
    },
    sortDescription({ commit }, payload) {
        commit('SORT_DESCRIPTION', payload)
    },
    checkedBook({ commit }, payload) {
        commit('CHECKED_BOOK',payload)
    },
    deleteSelectedBooks({ commit }) {
        for (let i = 0; state.selectedBooks.length > i; ++i) {
            Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + state.selectedBooks[i].bookId + '/87f4')
                .then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                })
            console.log(state.selectedBooks[i].index);
            commit('DELETE_SELECTED_BOOK', state.selectedBooks[i].index)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}