<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });
</script>

<template>
  <pre>{{ token }}</pre>
</template>
