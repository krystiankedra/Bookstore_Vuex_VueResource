<template>
 <div class="col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <p v-show="showAverage">Average: {{filteredRates}}</p> 
        <p v-show="showAverage">Average: {{getHeadInput}}</p>
        <span>ID: {{book.id}}</span> <input type="checkbox" class="pull-right input-select-all-inputs" v-model="checkedBookInput" @input="checkedBook(book.id)">
        </div>
      <div class="panel-body">
        <p><strong>Title:</strong> {{book.title}}</p>
        <p class="text-justify">Index: {{index}}</p>
        <p class="text-justify"><strong>Description:</strong> {{book.description}}</p>
        <p class="text-justify"><strong>Average:</strong> {{average == Number(average) ? Number(average.toFixed(2)) : 'No Rate Here'}}</p>
      <div class="panel-footer">
        <div class="pull-left">
            <button class="btn btn-danger" @click="deleteBook(book.id)"><i class="fas fa-trash"></i>Delete Book</button>
        </div>
        <div class="pull-right">
            <button class="btn btn-success" @click="showEditGroup"><i class="fas fa-user-edit"></i>Edit Book</button>
        </div>
        <div v-if="showEdit" class="form-group margin-edit-group">
          <label>Title:</label> <input class="form-control" :placeholder="book.title" v-model="newTitle">
          <label>Description:</label> <textarea class="form-control" :placeholder="book.description" v-model="newDescription" rows="6" cols="50"></textarea>
          <label>New Rate:</label><input type="number" min="1" max="5" :placeholder="average == Number(average) ? Number(average).toFixed(2) : 'No Rate Here'" class="form-control" v-model="newRate">
          <button class="btn btn-primary margin-button-top" @click="saveEditedData(book.id)"><i class="fas fa-cloud"></i>Save</button>
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
      average: {
        type: Number
      },
      showEdit: false,
      newTitle: "",
      newDescription: "",
      checkedBookInput: false,
      newRate:null,
    };
  },
  props: ["book", "index","inputToSelectAllBooks"],
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
      this.$store.dispatch('checkedBook', checkedBookDelete)
    }
  },
  computed: {
    filteredRates() {
      return this.$store.getters.rates.filter(element => {
        if(element.book == this.book.id) {
        this.average = element.sum / element.rates
        }
      })
    },
    getHeadInput() {
      if(this.$store.getters.inputToSelectAll) {
        this.checkedBookInput = true;
        const checkedBookDelete = {
          bookId: this.book.id,
          index: this.index,
          checked: this.checkedBookInput,
        }
        this.$store.dispatch('deleteCheckedAll', checkedBookDelete)
      } else {
        this.checkedBookInput = false;
      }
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

.input-select-all-inputs {
  width:14px;
  height: 14px;
}
</style>
