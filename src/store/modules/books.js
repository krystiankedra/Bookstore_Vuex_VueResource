import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
    books: [],
    sortTitleValue: false,
    sortDescriptionValue: false,
    selectedBooks: [],
    rates: [],
    inputToSelectAll: false,
}

const getters = {
    books: state => {
        return state.books;
    },
    rates: state => {
        return state.rates;
    },
    inputToSelectAll: state => {
        return state.inputToSelectAll;
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
    'EDIT_BOOK': (state, payload) => {
        state.books[payload.index].title = payload.title
        state.books[payload.index].description = payload.description
    },
    'SORT_BY_TITLE': (state, payload) => {
        if (payload) {
            state.sortTitleValue = !state.sortTitleValue;
            return state.books.sort(
                (element1, element2) =>
                    element1.title.toLowerCase() < element2.title.toLowerCase() ? -1 : 1
            );
        } else {
            state.sortTitleValue = !state.sortTitleValue;
            return state.books.sort(
                (element1, element2) =>
                    element1.title.toLowerCase() < element2.title.toLowerCase() ? 1 : -1
            );
        }
    },
    'SORT_BY_DESCRIPTION': (state, payload) => {
        if (payload) {
            state.sortDescriptionValue = !state.sortDescriptionValue;
            return state.books.sort(
                (element1, element2) =>
                    element1.description.toLowerCase() < element2.description.toLowerCase() ? -1 : 1
            );
        } else {
            state.sortDescriptionValue = !state.sortDescriptionValue;
            return state.books.sort(
                (element1, element2) =>
                    element1.description.toLowerCase() < element2.description.toLowerCase() ? 1 : -1
            );
        }
    },
    'DELETE_CHECKED_BOOK': (state, payload) => {
        state.books.splice(payload, 1)
    },
    'SET_RATES': (state, payload) => {
        state.rates = payload
    },
    'EDIT_RATE': (state, payload) => {
        state.rates = payload;
    },
    'SELECT_CHECKED_BOOK': (state, payload) => {
        if (payload.checked) {
            state.selectedBooks.unshift(payload)
        } else if (!payload.checked) {
            state.selectedBooks.splice(payload.index, 1)
        } else {
            state.selectedBooks.splice(payload.index, 1)
        }

    },
    'SELECT_HEAD_CHECKED_INPUT': (state, payload) => {
        state.inputToSelectAll = payload;
    },
    'SELECT_ALL_INPUTS_CHECKED': (state, payload) => {
        if(state.selectedBooks.length > state.books.length) {
            return false
        } else {
            if (payload.checked) {
                state.selectedBooks.unshift(payload)
            } else if (!payload.checked) {
                state.selectedBooks.splice(payload.index, 1)
            } else {
                state.selectedBooks.splice(payload.index, 1)
            }
        }
    }
}

const actions = {
    addNewBook({ commit }, payload) {
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
    editBook({ commit }, payload) {
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
                                commit('EDIT_RATE', ratesList)
                            })
                    }, error => {
                        console.log(error);
                    })
            }, error => {
                console.log(error);
            })
        commit('EDIT_BOOK', payload)
    },
    setBooksRates({ commit }) {
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
    sortByTitle({ commit }, payload) {
        commit('SORT_BY_TITLE', payload)
    },
    sortByDescription({ commit }, payload) {
        commit('SORT_BY_DESCRIPTION', payload)
    },
    selectCheckedBook({ commit }, payload) {
        commit('SELECT_CHECKED_BOOK', payload)
    },
    deleteSelectedBook({ commit }) {
        for (let i = 0; state.selectedBooks.length > i; ++i) {
            Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + state.selectedBooks[i].bookId + '/87f4')
                .then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                })
            commit('DELETE_CHECKED_BOOK', state.selectedBooks[i].index)   
        }
    },
    selectHeadCheckedInput({ commit }, payload) {
        commit('SELECT_HEAD_CHECKED_INPUT', payload)
    },
    selectAllInputsChecked({ commit }, payload) {
        commit('SELECT_ALL_INPUTS_CHECKED', payload)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}