<script setup>
definePageMeta({
  auth: false,
});

const { status } = useAuth();

import Fuse from "fuse.js";

const { data: addresses, refresh } = await useFetch("/api/addresses");
const selectedAddress = ref([]);
const searchPattern = ref("");
const results = ref([]);
const fuseOptions = {
  minMatchCharLength: 2,
  keys: [
    "id",
    "billingName",
    "billingStreet",
    "billingZipCode",
    "billingCity",
    "deliveryName",
    "deliveryStreet",
    "deliveryZipCode",
    "deliveryCity",
  ],
};
const fuse = new Fuse(addresses.value, fuseOptions);

watch(
  [searchPattern, addresses],
  () => {
    if (searchPattern.value.length > 1) {
      const rawResults = fuse.search(searchPattern.value);
      results.value = rawResults.map((address) => address.item);
    } else {
      results.value = addresses.value;
    }
  },
  { immediate: true }
);

async function deleteRows(values) {
  await $fetch("/api/addresses", {
    method: "delete",
    body: values,
  });
  selectedAddress.value = [];
  refresh();
}
</script>

<template>
  <main>
    <div class="address-list">
      <h2>List of addresses</h2>
      <div class="control">
        <Button
          v-if="selectedAddress.length > 0"
          severity="danger"
          @click="deleteRows(selectedAddress)"
          >Delete selected ({{ selectedAddress.length }})</Button
        >
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search"> </InputIcon>
          <InputText id="searchPattern" type="text" v-model="searchPattern" />
        </IconField>
        <Button label="Clear" @click="searchPattern = ''" />
      </div>
      <ScrollPanel style="max-width: 100vw">
        <DataTable
          v-model:selection="selectedAddress"
          :value="results"
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]">
          <Column
            v-if="status === 'authenticated'"
            selectionMode="multiple"
            headerStyle="width: 3rem"></Column>
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

.control {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
