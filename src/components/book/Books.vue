<template>
  <div class="row row-margin-top">
    <div class="col-md-12 margin-block">
      <div class="row">
        <div class="col-md-6">
          <input type="text" v-model="filtredBookInputs" class="form-control input-filter-margin-bottom" placeholder="Search...">
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" :class="[sortTitleValue ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']" @click="sortByTitle(sortTitleValue = !sortTitleValue)">
          Sort Title</button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" :class="[sortDescriptionValue ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']" @click="sortByDescription(sortDescriptionValue = !sortDescriptionValue)">
          Sort Description</button>
        </div>
        <div class="col-md-2">
          <label class="text-center">Select All</label>
          <input class="input-select-all-inputs" type="checkbox" v-model="inputToSelectAllBooks" @input="toSelectAll">
        </div>
      </div>
      <div class="row">
        <div class="col-md-2 col-md-offset-10">
          <button class="btn btn-warning" @click="deleteSelectedBook">
            <i class="fas fa-trash-alt"></i> Delete Selected</button>
        </div>
      </div>
    </div>
    <app-book v-for="(book,index) in filteredBooks" :key="book.id" :book="book" :index="index" :inputToSelectAllBooks="inputToSelectAllBooks"></app-book>
  </div>
</template>

<script>
  import Book from "./Book.vue";
  export default {
    data() {
      return {
        sortTitleValue: false,
        sortDescriptionValue: false,
        filtredBookInputs: "",
        inputToSelectAllBooks: false,
      };
    },
    components: {
      appBook: Book
    },
    mounted() {
      this.$store.dispatch("setBooksRates");
    },
    computed: {
      books() {
        return this.$store.getters.books;
      },
      filteredBooks() {
        return this.books.filter(element => {
          return (
            element.title
            .toLowerCase()
            .indexOf(this.filtredBookInputs.toLowerCase()) > -1 ||
            element.description
            .toLowerCase()
            .indexOf(this.filtredBookInputs.toLowerCase()) > -1
          );
        });
      },
    },
    methods: {
      sortByTitle(value) {
        if (!value) {
          this.$store.dispatch("sortByTitle", value);
        } else {
          this.$store.dispatch("sortByTitle", value);
        }
      },
      sortByDescription(value) {
        if (!value) {
          this.$store.dispatch("sortByDescription", value);
        } else {
          this.$store.dispatch("sortByDescription", value);
        }
      },
      deleteSelectedBook() {
        this.$store.dispatch("deleteSelectedBook");
      },
      toSelectAll() {
        this.$store.dispatch('selectHeadCheckedInput', !this.inputToSelectAllBooks)
      },
    },
  };

</script>


<style scoped>
  .row-margin-top {
    margin-top: 10px;
  }
  .input-filter-margin-bottom {
    margin-bottom: 20px;
  }
  .margin-block {
    margin: 20px;
  }
  .input-select-all-inputs {
    width: 18px;
    height: 18px;
  }
</style>
