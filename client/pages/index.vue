<template>
  <section class="container">
    <div>
      <b-button>Button</b-button>
      <b-button variant="danger">Button</b-button>
      <b-button variant="success">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
    </div>
    <code>
      {{ res }}
    </code>
    <button @click="getRes">Get Res</button>
  </section>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  asyncData({ app, params, error }) {
    // return axios.get("http://localhost:3000/api/v1/res").then(res => {
    //   return { res: res.data };
    // });

    return {};
  },
  methods: {
    getRes() {
      return axios.get("http://localhost:3000/api/v1/res").then(res => {
        this.res = res.data;
      });
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 20px;
}

.movie img {
  width: 300px;
  height: 445px;
}

.movie h2 {
  margin-top: 5px;
}

button {
  margin-top: 15px;
  cursor: pointer;
}
</style>
