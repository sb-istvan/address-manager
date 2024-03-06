<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();
</script>

<template>
  <header>
    <h1>Address Manager</h1>
    <div class="authentication">
      <template v-if="status === 'authenticated'">
        <p>Logged in as {{ data?.user?.name }}</p>
        <Button @click="signOut({ callbackUrl: '/' })">Sign Out</Button>
      </template>
      <p v-else>Not logged in – <nuxt-link to="/login">Sign In</nuxt-link></p>
    </div>
  </header>
  <nav>
    <nuxt-link to="/">Home (list)</nuxt-link> |
    <nuxt-link to="/add">Add</nuxt-link>
  </nav>
</template>

<style>
header,
.authentication {
  display: flex;
  align-items: center;
}

header {
  justify-content: space-between;
  position: sticky;
  gap: 1rem;
}

.authentication {
  gap: 0.375rem;
}
</style>
