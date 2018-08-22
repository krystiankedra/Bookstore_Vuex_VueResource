<template>
 <div class="col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <span>ID: {{book.id}}</span>
        </div>
      <div class="panel-body">
        <p>Title: {{book.title}}</p>
        <p class="text-justify">Index: {{index}}</p>
        <p class="text-justify">Description: {{book.description}}</p>
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
      showEdit: false,
      newTitle: "",
      newDescription: ""
    };
  },
  props: ["book", "index"],
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
        index: this.index
      };
      this.$store.dispatch("updateBook", Editedbook);
      this.newTitle = "";
      this.newDescription = "";
      this.showEdit = false;
    }
  }
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
