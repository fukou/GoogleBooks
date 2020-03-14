<template>
  <div>
    <div class="container__details">
      <router-link to="/">
        <button class="back" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="butt"
            stroke-linejoin="arcs"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg> Back to list of books
        </button>
      </router-link>
      <div class="container__details--book">
        <div class="container__details--book__p">
          <img
            :src="booksDetail.volumeInfo.imageLinks.thumbnail"
            :alt="booksDetail.volumeInfo.title"
          />
          <div class="description">
            <h1>{{booksDetail.volumeInfo.title}}</h1>
            <p class="author">
              <span v-if="!booksDetail.volumeInfo.authors">No authors to display</span>
              <span v-else>
                By
                <span v-for="(author, index) in booksDetail.volumeInfo.authors" :key="index">
                  {{
                  index + 1 !== booksDetail.volumeInfo.authors.length && index + 1 !== booksDetail.volumeInfo.authors.length-1 ? author + ', ' : index + 1 == booksDetail.volumeInfo.authors.length && index+1 !== 1 ? ' and ' + author : author
                  }}
                </span>
              </span>
            </p>
            <p class="published">
              <span v-if="!booksDetail.volumeInfo.publishedDate">Published date is unavailable</span>
              <span v-else>{{ booksDetail.volumeInfo.publishedDate }}</span>
            </p>
          </div>
        </div>
        <p v-if="!booksDetail.volumeInfo.description">No descriptions to display</p>
        <p v-else v-html="
      booksDetail.volumeInfo.description
      "></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      booksDetail: []
    };
  },
  mounted() {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes/" +
          this.id +
          "?key=AIzaSyCnqAY4B3OfL7C3xgvBaXeYsMHThNZkJBY"
      )
      .then(response => {
        this.booksDetail = response.data;
        console.log(this.booksDetail);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
button.back {
  border: 0;
  box-shadow: none;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  margin-bottom: 2.5rem;
  font-weight: bold;
  background-color: #2c3e50;
  color: #fff;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;

  svg {
    vertical-align: middle;
    margin-right: 0.5rem;
  }
}

.container__details {
  max-width: 50rem;
  margin: 3.5rem auto;
  padding: 0 1.5rem;

  @media (max-width: 60rem) {
    font-size: 14px;
  }

  &--book {
    background-color: #fff;
    padding: 1.85rem 2.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 6px 6px rgba(0, 0, 0, 0.09);
    border-radius: 8px;

    &__p {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 1.5rem 0 3.5rem 0;

      @media (max-width: 60rem) {
        flex-direction: column;
      }

      img {
        margin-right: 2.5em;
        height: 200px;

        @media (max-width: 60rem) {
          height: auto;
          margin: 1.5rem auto 2.5rem auto;
        }
      }

      .description {
        h1 {
          font-weight: 900;
        }
        .author {
          font-weight: 700;
        }
      }
    }
  }
}
</style>