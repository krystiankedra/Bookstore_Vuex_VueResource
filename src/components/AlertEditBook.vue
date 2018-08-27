<template>
  <div class="page-header">
    <h1>Error
      <small>When editing a book, complete the new Title, Description and Rate.</small>
    </h1>
    <button class="btn btn-danger" @click="navigationToBooks">Try again</button>
  </div>
</template>

<script>
  export default {
    methods: {
      navigationToBooks() {
        this.$router.push('books')
      }
    }
  }

</script>
