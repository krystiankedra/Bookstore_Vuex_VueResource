<template>
    <div class="row row-margin-top">
      <div class="col-md-12 margin-block">
        <div class="row">
          <div class="col-md-4">
            <input type="text" v-model="filtredBookInputs" class="form-control input-filter-margin-bottom" placeholder="Search...">
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" 
              :class="[sortTitleValue ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']" 
              @click="sortTitle(sortTitleValue = !sortTitleValue)">Sort Title</button>
            </div>
          <div class="col-md-2">
            <button class="btn btn-primary" 
              :class="[sortDescriptionValue ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']" 
              @click="sortDescription(sortDescriptionValue = !sortDescriptionValue)">Sort Description</button>
          </div>
          <div class="col-md-2">
            <button class="btn btn-warning"
              @click="deleteSelectedBooks"><i class="fas fa-trash-alt"></i>Delete Selected</button>
          </div>
          <div class="col-md-2">
            <input class="form-control"
              type="checkbox"
              v-model="inputToSelectAllBooks"
              @input="toSelectAll">Select All
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
    this.$store.dispatch("loadBooks");
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
    sortTitle(value) {
      if (!value) {
        this.$store.dispatch("sortTitle", value);
      } else {
        this.$store.dispatch("sortTitle", value);
      }
    },
    sortDescription(value) {
      if (!value) {
        this.$store.dispatch("sortDescription", value);
      } else {
        this.$store.dispatch("sortDescription", value);
      }
    },
    deleteSelectedBooks() {
      this.$store.dispatch("deleteSelectedBooks");
    },
    toSelectAll() {
      this.$store.dispatch('toSelectAll' ,!this.inputToSelectAllBooks)
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
</style>



