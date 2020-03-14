<template>
  <div>
    <div class="container">
      <h1>Library Books</h1>
      <div class="container__grid">
        <article class="container__grid--p" v-for="(book, index) in books" :key="index">
          <div class="container__grid--p__inner">
            <img :src="book.volumeInfo.imageLinks.thumbnail" :alt="book.volumeInfo.title" />
            <div class="description">
              <h2>{{ book.volumeInfo.title }}</h2>
              <p class="author">
                <span v-if="!book.volumeInfo.authors">No authors to display</span>
                <span v-else>
                  By
                  <span v-for="(author, index) in book.volumeInfo.authors" :key="index">
                    {{
                    index + 1 !== book.volumeInfo.authors.length && index + 1 !== book.volumeInfo.authors.length-1 ? author + ', ' : index + 1 == book.volumeInfo.authors.length && index+1 !== 1 ? ' and ' + author : author
                    }}
                  </span>
                </span>
              </p>
              <p class="published">
                <span v-if="!book.volumeInfo.publishedDate">No date to display</span>
                <span v-else>{{ book.volumeInfo.publishedDate }}</span>
              </p>
              <!-- <v-clamp autoresize :max-lines="6">
                {{
                book.volumeInfo.description
                }}
              </v-clamp>-->
            </div>
          </div>
          <div class="container__grid--p__button">
            <button class="edit">Edit</button>
            <button class="view" @click="viewMore(book.id)">View</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import VClamp from "vue-clamp";

const API =
  "https://www.googleapis.com/books/v1/volumes?q=vue&key=AIzaSyCnqAY4B3OfL7C3xgvBaXeYsMHThNZkJBY";

export default {
  components: {
    // VClamp
  },
  data() {
    return {
      books: [],
      title: ""
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      axios
        .get(API)
        .then(res => {
          this.books = res.data.items;
          console.log(this.books);
        })
        .catch(err => {
          console.log(err);
        });
    },
    viewMore(id) {
      this.$router.push("/books/" + id);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 60rem;
  margin: 5rem auto;
  padding: 0 1.5rem;

  h1 {
    text-align: center;
    margin-bottom: 3.5rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;

    @media (max-width: 60rem) {
      grid-template-columns: 1fr;
    }

    &--p {
      overflow: hidden;
      background-color: #fff;
      padding: 1.5rem 1.85rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 6px 6px rgba(0, 0, 0, 0.09);
      border-radius: 8px;

      &__inner {
        display: flex;
        flex-direction: row;
        align-items: center;

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
          h2 {
            font-weight: 900;
            margin-bottom: 0.5rem;
          }
          font-size: 0.9em;

          .author {
            margin-bottom: 0.95rem;
            font-weight: 700;
          }
        }
      }

      &__button {
        margin-top: 2rem;
        display: flex;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;

        & > * {
          flex: 1;
          transition: 0.5s;
        }

        button {
          border: 0;
          box-shadow: none;
          cursor: pointer;
          padding: 0.75rem 1.5rem;
        }

        .edit {
          background-color: #fff;
          border-top: 1px solid #222;
          border-bottom: 1px solid #222;
          border-left: 1px solid #222;

          &:hover {
            background-color: #ddd;
          }
        }

        .view {
          font-weight: bold;
          background-color: #2c3e50;
          color: #fff;

          &:hover {
            background-color: #7da1c5;
          }
        }
      }
    }
  }
}
</style>
