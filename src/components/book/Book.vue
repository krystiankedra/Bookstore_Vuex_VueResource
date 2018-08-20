<template>
 <div class="col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">ID: {{book.id}}</div>
      <div class="panel-body">
        <p>Title: {{book.title}}</p>
        <p class="text-justify">Index: {{index}}</p>
        <p class="text-justify">Description: {{book.description}}</p>
      <div class="panel-footer">
        <div class="pull-left">
            <button class="btn btn-danger" @click="deleteBook(book.id)">Delete Book</button>
        </div>
        <div class="pull-right">
            <button class="btn btn-success">Edit Book</button>
        </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['book', 'index'],
  methods: {
    deleteBook(bookId) {
      const book = {
        bookId: bookId,
        index: this.index
      }
      this.$store.dispatch('deleteBook', book);
    }
  }
}
</script>



