<script setup lang="ts">
const { status, data, signOut } = useAuth();
</script>

<template>
  <header>
    <h1>Address Manager</h1>
    <div class="authentication">
      <template v-if="status === 'authenticated'">
        <p>Signed in as {{ data?.user?.name }}</p>
        <Button @click="signOut({ callbackUrl: '/' })">Sign Out</Button>
      </template>
      <p v-else>Not signed in – <nuxt-link to="/login">Sign In</nuxt-link></p>
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
  gap: 1rem;
}
</style>
