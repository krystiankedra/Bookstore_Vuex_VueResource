<template>
    <div class="row row-margin-top">
      <div class="col-md-12 margin-block">
        <div class="row">
          <div class="col-md-6">
            <input type="text" v-model="filtredBookInputs" class="form-control input-filter-margin-bottom" placeholder="Search...">
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" 
              :class="[sortTitleValue ? 'fas fa-arrow-down' : 'fas fa-arrow-up']" 
              @click="sortTitle(sortTitleValue = !sortTitleValue)">Sort Title</button>
            </div>
          <div class="col-md-2">
            <button class="btn btn-primary" 
              :class="[sortDescriptionValue ? 'fas fa-arrow-down' : 'fas fa-arrow-up']" 
              @click="sortDescription(sortDescriptionValue = !sortDescriptionValue)">Sort Description</button>
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary"
              @click="deleteSelectedBooks">Delete Selected</button>
          </div>
        </div>
      </div>
      <app-book v-for="(book,index) in filteredBooks" :key="book.id" :book="book" :index="index"></app-book>
    </div>
</template>

<script>
import Book from "./Book.vue";
export default {
  data() {
    return {
      sortTitleValue: false,
      sortDescriptionValue: false,
      filtredBookInputs: ""
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
    }
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



