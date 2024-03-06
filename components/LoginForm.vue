<script setup lang="ts">
const { signIn } = useAuth();

const username = ref("");
const password = ref("");

function signInWithCredentials(username, password) {
  try {
    signIn("credentials", { username, password }, { callbackUrl: "/" });
    console.log("logged in!");
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <h2>Sign in</h2>
  <form
    class="signin"
    @submit.prevent="signInWithCredentials(username, password)">
    <label for="username">Username:</label>
    <InputText id="username" type="text" v-model="username" />

    <label for="password">Password:</label>
    <InputText id="password" type="password" v-model="password" />

    <Button type="submit">Sign In</Button>
  </form>
</template>

<style scoped>
form.signin {
  display: grid;
  grid-template-columns: 5rem 12rem;
  align-items: center;
  gap: 1rem;
}

form.signin > button {
  grid-column-start: 2;
  justify-self: start;
}
</style>
