<template>
  <form class="row">
    <div class="container">
      <div class="row">
        <div class="form-group col-md-6">
          <label for="title" class="col-2 col-form-label">Title:</label>
          <div class="col-10">
            <input class="form-control" type="text" v-model="book.title">
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="lastname" class="col-2 col-form-label">Description:</label>
          <div class="col-10">
            <textarea class="form-control settings-text-area" type="text" v-model="book.description" rows="7"></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="pull-right">
          <button class="btn btn-success button-margin" @click.prevent="addNewBook">
            <i class="fas fa-book-open"></i> Add New Book</button>
        </div>
      </div>
      <div class="row">
        <div class="alert alert-success col-md-5 pull-left" v-if="book.title.length > 0">
          <span>Title is correct
            <i class="fas fa-thumbs-up"></i>
          </span>
        </div>
        <div class="alert alert-success col-md-5 pull-right" v-if="book.description.length > 0">
          <span>Description is correct
            <i class="fas fa-thumbs-up"></i>
          </span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        book: {
          title: "",
          description: ""
        }
      };
    },
    methods: {
      addNewBook() {
        if (this.book.title == '' || this.book.description == '') {
          alert('Fill Title and Description')
        } else {
          this.$store.dispatch("addNewBook", this.book)
          this.book.title = ""
          this.book.description = ""
        }
      }
    }
  };

</script>


<style scoped>
  form {
    margin-top: 10px;
  }
  .button-margin {
    margin: 20px;
  }
  .settings-text-area {
    resize: none;
  }
</style>
