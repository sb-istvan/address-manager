<script setup lang="ts">
const { status, data, signOut } = useAuth();
</script>

<template>
  <header>
    <h1>Address Manager</h1>
    <nav>
      <nuxt-link to="/">
        <i class="pi pi-home" style="font-size: 1.5rem; margin-right: 0.5ch"></i
      ></nuxt-link>
      <nuxt-link to="/add">
        <i
          class="pi pi-plus-circle"
          style="font-size: 1.5rem; margin-right: 0.5ch"></i
      ></nuxt-link>
      <div class="authentication">
        <i class="pi pi-user" style="font-size: 1.5rem"></i>
        <template v-if="status === 'authenticated'">
          <p>Signed in as {{ data?.user?.name }}</p>
          <Button @click="signOut({ callbackUrl: '/' })">Sign Out</Button>
        </template>
        <p v-else>Not signed in – <nuxt-link to="/login">Sign In</nuxt-link></p>
      </div>
    </nav>
  </header>
</template>

<style>
header,
nav,
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

nav {
  display: flex;
  gap: 1rem;
}
</style>
