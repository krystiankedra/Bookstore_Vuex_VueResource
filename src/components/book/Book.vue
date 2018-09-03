<template>
  <div class="col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <p v-show="showAverage">Average: {{filteredRates, getHeadInput}}</p>
        <p>
          <strong>Title:</strong> {{book.title}}
          <input type="checkbox" class="pull-right input-select-all-inputs" v-model="checkedBookInput" @input="selectCheckedBook(book.id)">
        </p>
      </div>
      <div class="panel-body">
        <p class="text-justify">
          <strong>Description:</strong> {{book.description}}</p>
        <img :src="'/src/assets/' + bookPhoto">
        <p><strong>Rate:</strong></p>
        <star-rating v-model="average" :increment="0.01" :border-width="3" :star-size="35" :read-only="true" class="custom-text"
          :show-rating="isNaN(average) ? false : true"></star-rating>
        <div class="panel-footer">
          <div class="pull-left">
            <button class="btn btn-danger" @click="deleteBook(book.id)">
              <i class="fas fa-trash"></i> Delete Book</button>
          </div>
          <div class="pull-right">
            <button class="btn btn-success" @click="showEditGroup">
              <i class="fas fa-user-edit"></i> Edit Book</button>
          </div>
          <div v-if="showEdit" class="ownModal" :class="[showEdit ? 'showMyModal' : '']">
            <div class="myModalContent">
              <span class="close-button" @click="showEditGroup"><i class="fas fa-times"></i></span>
              <label class="label-margin-top">Title:</label>
              <input class="form-control" :placeholder="book.title" v-model="newTitle">
              <label class="label-margin-top">Description:</label>
              <textarea class="form-control settings-text-area" :placeholder="book.description" v-model="newDescription" rows="10" cols="5"></textarea>
              <label class="label-margin-top">New Rate:</label>
              <star-rating v-model="newRate" :increment="0.5" :border-width="3" :star-size="35" class="custom-text"></star-rating>
              <button class="btn btn-primary margin-button-top margin-button-bottom pull-right" @click="editBook(book.id)">
                <i class="fas fa-cloud"></i> Save</button>
              <div class="alert alert-success alert-margin" v-if="newTitle.length > 0">
                <span>New Title is correct
                  <i class="fas fa-thumbs-up"></i>
                </span>
              </div>
              <div class="alert alert-success alert-margin" v-if="newDescription.length > 0">
                <span>New Description is correct
                  <i class="fas fa-thumbs-up"></i>
                </span>
              </div>
              <div class="alert alert-success alert-margin" v-if="newRate > 0">
                <span>New Rate is correct
                  <i class="fas fa-thumbs-up"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  export default {
    components: {
      'star-rating': StarRating
    },
    data() {
      return {
        showAverage: false,
        average: null,
        showEdit: false,
        newTitle: "",
        newDescription: "",
        checkedBookInput: false,
        newRate: null,
        bookPhoto: 'bookPhoto.png',
      };
    },
    props: ["book", "index", "inputToSelectAllBooks"],
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
      editBook(bookId) {
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
          this.$router.push('alertEditBook')
        } else {
          this.$store.dispatch("editBook", Editedbook);
          this.newTitle = "";
          this.newDescription = "";
          this.newRate = null;
          this.showEdit = false;
        }
      },
      selectCheckedBook(bookId) {
        this.checkedBookInput = !this.checkedBookInput;
        const bookSelected = {
          bookId: bookId,
          index: this.index,
          checked: this.checkedBookInput,
        }
        this.$store.dispatch('selectCheckedBook', bookSelected)
      }
    },
    computed: {
      filteredRates() {
        return this.$store.getters.rates.filter(element => {
          if (element.book == this.book.id) {
            this.average = element.sum / element.rates
          }
        })
      },
      getHeadInput() {
        if (this.$store.getters.inputToSelectAll) {
          this.checkedBookInput = true;
          const bookSelected = {
            bookId: this.book.id,
            index: this.index,
            checked: this.checkedBookInput,
          }
          setTimeout(() => {
            this.$store.dispatch('selectAllInputsChecked', bookSelected)
          }, 10);
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
    width: 14px;
    height: 14px;
  }

  .custom-text {
    font-weight: bold;
    font-size: 1.9em;
    border: 1px solid #cfcfcf;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    color: #999;
    background: #fff;
  }

  .margin-button-bottom {
    margin-bottom: 15px;
  }

  .ownModal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  }

  .myModalContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem 1.5rem;
    width: 50%;
    border-radius: 0.5rem;
  }

  .close-button {
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    background-color: lightgray;
  }

  .close-button:hover {
    background-color: darkgray;
  }

  .showMyModal {
    z-index: 1;
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  }

  .settings-text-area {
    resize: none;
  }

  .label-margin-top {
    margin-top: 10px;
  }

  .alert-margin {
    margin-top: 10px;
    margin-bottom: 0;
  }
</style>
