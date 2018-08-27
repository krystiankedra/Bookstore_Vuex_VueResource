<template>
    <div class="page-header">
        <h1>Error <small>When You Add New Book, You must fill input with Title and Description.</small></h1>
        <button class="btn btn-danger" @click="navigationToNewBook">Try again</button>
    </div>
</template>

<script>
export default {
    methods: {
        navigationToNewBook() {
            this.$router.push('newBook')
        }
    }
}
</script>
