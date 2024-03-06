<script setup>
const { status, data, signIn, signOut } = useAuth();
const { data: addresses, refresh } = await useFetch("/api/addresses");
</script>

<template>
  <main>
    <div class="address-list">
      <h2>List of addresses</h2>
      <ScrollPanel style="max-width: 100%">
        <DataTable :value="addresses">
          <Column field="id" header="ID"></Column>
          <Column field="billingName" header="Name"></Column>
          <Column field="billingStreet" header="Street"></Column>
          <Column field="billingZipCode" header="Zip code"></Column>
          <Column field="billingCity" header="City"></Column>
          <Column field="deliveryName" header="Delivery name"></Column>
          <Column field="deliveryStreet" header="Delivery street"></Column>
          <Column field="deliveryZipCode" header="Delivery zip code"></Column>
          <Column field="deliveryCity" header="Delivery city"></Column>
        </DataTable>
      </ScrollPanel>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
}
</style>
