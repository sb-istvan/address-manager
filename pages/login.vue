<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn } = useAuth();

const username = ref("");
const password = ref("");

function signInWithCredentials(credentials: any) {
  try {
    signIn("credentials", credentials);
  } catch (error) {
    console.error(error);
  }
}

function signInWithGitHub() {
  try {
    signIn("github");
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <h2>Sign in</h2>
  <div class="signin">
    <div></div>
    <form @submit.prevent="signInWithGitHub">
      <Button label="Sign in with GitHub" type="submit">
        <i
          class="pi pi-github"
          style="font-size: 1.5rem; margin-right: 1ch"></i>
        Sign in with GitHub</Button
      >
    </form>
    <p>or</p>
  </div>
  <form
    class="signin"
    @submit.prevent="signInWithCredentials({ username, password })">
    <label for="username">Username:</label>
    <InputText id="username" type="text" v-model="username" />

    <label for="password">Password:</label>
    <InputText id="password" type="password" v-model="password" />

    <Button label="Sign in" type="submit" />
  </form>
</template>

<style scoped>
.signin {
  display: grid;
  grid-template-columns: 5rem 14rem;
  align-items: center;
  gap: 1rem;
}

.signin > button {
  grid-column-start: 2;
  justify-self: start;
  margin-bottom: 1rem;
}

.signin > p {
  grid-column-start: 2;
  justify-self: center;
  margin-bottom: 2rem;
  font-weight: bold;
}
</style>
