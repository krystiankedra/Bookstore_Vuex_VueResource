<template>
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <h3 class="text-center">Application of Books</h3>
      <div class="panel panel-primary">
        <div class="panel-heading text-center">About Application</div>
        <div class="panel-body">The application works on the CRUD principles. It's Web Application. It supports the addition, reading, editing and
          deletion of books.</div>
        <router-link to="/books" tag="button" class="btn btn-primary home-button-margin">Go To Book List</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home-button-margin {
    margin: 10px;
  }
</style>
