<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>

<template>
  <Header />
  <LoginForm />
</template>

<style>
body {
  margin-inline: 1rem;
}
</style>
