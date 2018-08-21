<template>
<form class="row">
    <div class="container">
    <div class="form-group">
        <label for="title" class="col-2 col-form-label">Title:</label>
    <div class="col-10">
        <input class="form-control" type="text" v-model="book.title">
    </div>
    </div>

    <div class="form-group">
        <label for="lastname" class="col-2 col-form-label">Description:</label>
    <div class="col-10">
        <input class="form-control" type="text" v-model="book.description">
    </div>
    </div>

        <div class="pull-right">
        <button class="btn btn-success" @click.prevent="addBook">Add New Book</button>
        </div>
    </div>

</form>
</template>

<script>
export default {
    data() {
        return {
            book: {
                title: '',
                description: '',
            }
        }
    },
    methods: {
        addBook() {
            console.log(this.book);
            this.$store.dispatch('addBook', this.book);
            this.book.title = '';
            this.book.description = '';
        }
    }
}
</script>


<style scoped>
    form {
        margin-top:10px;
    }
</style>

