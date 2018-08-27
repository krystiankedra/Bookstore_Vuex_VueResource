<template>
    <div class="page-header">
        <h1>Error <small>When You Edit Book, You must fill input with New Title, Description and Rate</small></h1>
        <button class="btn btn-danger" @click="navigationToBooks">Try again</button>
    </div>
</template>

<script>
export default {
    methods: {
        navigationToNewBook() {
            this.$router.push('books')
        }
    }
}
</script>
