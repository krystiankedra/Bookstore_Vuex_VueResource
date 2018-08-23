<template>
 <div class="col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <p v-show="showAverage">Average: {{filteredRates}}</p>
        <span>ID: {{book.id}}</span> <input type="checkbox" class="pull-right" v-model="checkedBookInput" @input="checkedBook(book.id)">
        </div>
      <div class="panel-body">
        <p>Title: {{book.title}}</p>
        <p class="text-justify">Index: {{index}}</p>
        <p class="text-justify">Description: {{book.description}}</p>
        <p class="text-justify">Average: {{average}}</p>
      <div class="panel-footer">
        <div class="pull-left">
            <button class="btn btn-danger" @click="deleteBook(book.id)">Delete Book</button>
        </div>
        <div class="pull-right">
            <button class="btn btn-success" @click="showEditGroup">Edit Book</button>
        </div>
        <div v-if="showEdit" class="form-group margin-edit-group">
          <label>Title:</label> <input class="form-control" v-model="newTitle">
          <label>Description:</label> <textarea class="form-control" v-model="newDescription" rows="4" cols="50"></textarea>
          <label>New Rate:</label><input type="number" class="form-control" v-model="newRate">
          <button class="btn btn-primary margin-button-top" @click="saveEditedData(book.id)">Save</button>
        </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showAverage: false,
      average:null,
      showEdit: false,
      newTitle: "",
      newDescription: "",
      checkedBookInput: false,
      newRate:null,
    };
  },
  props: ["book", "index",],
  methods: {
    deleteBook(bookId) {
      const book = {
        bookId: bookId,
        index: this.index
      };
      this.$store.dispatch("deleteBook", book);
    },
    showEditGroup() {
      this.showEdit = !this.showEdit;
    },
    saveEditedData(bookId) {
      const Editedbook = {
        title: this.newTitle,
        description: this.newDescription,
        bookId: bookId,
        index: this.index,
        newRate: this.newRate,
      };
      if (this.newTitle == '' ||
       this.newDescription == '' ||
        this.newRate == '' ||
         this.newRate > 5 ||
          this.newRate < 0) {
        alert('Fill Title, Description or fill up correctly Rate')
      } else {
        this.$store.dispatch("updateBook", Editedbook);
        this.newTitle = "";
        this.newDescription = "";
        this.newRate = null;
        this.showEdit = false;
      }
    },
    checkedBook(bookId) {
      this.checkedBookInput = !this.checkedBookInput;
      const checkedBookDelete = {
        bookId: bookId,
        index: this.index,
        checked: this.checkedBookInput,
      }
      this.$store.dispatch('checkedBooks', checkedBookDelete)
    }
  },
  computed: {
    rates() {
      return this.$store.getters.rates
    },
    filteredRates() {
      return this.rates.filter(element => {
        if(element.book == this.book.id) {
        this.average = element.sum / element.rates
        }
      })
      return this.average;
    }
  },

};
</script>



<style scoped>
.margin-edit-group {
  margin-top: 40px;
}
.margin-button-top {
  margin-top: 10px;
}
</style>
