<template>
    <div class="row row-margin-top">
        <app-book v-for="(book,index) in books" :key="book.id" :book="book" :index="index"></app-book>
    </div>
</template>

<script>
import Book from './Book.vue';
export default {
    components: {
        appBook:Book
    },
    mounted() {
        this.$store.dispatch('loadBooks')
    },
    computed: {
      books() {
          return this.$store.getters.books;
      }
    }
}
</script>


<style scoped>
    .row-margin-top {
        margin-top:10px;
    }
</style>



