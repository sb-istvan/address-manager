<script setup>
const { data } = useFetch("/api/addresses");
const addressList = data;
const sameDeliveryAddress = ref(false);

const formData = ref({
  name: "Bármi Áron",
  street: "Mindegy u. 2.",
  city: "Budapest",
  zipCode: 1165,
});

const formDataDelivery = ref({
  deliveryName: "Vidéki Zsolt",
  deliveryStreet: "Kiszállítós utca 12.",
  deliveryCity: "Eger",
  deliveryZipCode: 3300,
});

const formDataDeliveryTemp = ref({ ...formDataDelivery.value });

function toggleSameDeliveryAddress() {
  if (sameDeliveryAddress.value) {
    formDataDelivery.value = formDataDeliveryTemp.value;
  } else {
    formDataDelivery.value = {
      deliveryName: formData.value.name,
      deliveryStreet: formData.value.street,
      deliveryCity: formData.value.city,
      deliveryZipCode: formData.value.zipCode,
    };
  }
}

async function addNewRow() {
  const updatedListResponse = await $fetch("/api/addresses", {
    method: "post",
    body: {
      ...formData.value,
      ...formDataDelivery.value,
    },
  });
  addressList.value = updatedListResponse;
}
</script>

<template>
  <h1>Address Manager</h1>
  <h2>Add new address</h2>
  <form @submit.prevent="addNewRow">
    <div class="new-address-container">
      <div class="new-address-type-section">
        <h3>Billing address</h3>
        <input v-model="formData.name" />
        <input v-model="formData.street" />
        <input v-model="formData.city" />
        <input v-model="formData.zipCode" />
      </div>
      <div class="new-address-type-section">
        <div class="header-delivery">
          <h3>Delivery address</h3>
          <div>
            <input
              type="checkbox"
              v-model="sameDeliveryAddress"
              @click="toggleSameDeliveryAddress"
              id="sameDeliveryAddress" />
            <label for="sameDeliveryAddress">Same as Billing address</label>
          </div>
        </div>
        <input
          v-model="formDataDelivery.deliveryName"
          :disabled="sameDeliveryAddress" />
        <input
          v-model="formDataDelivery.deliveryStreet"
          :disabled="sameDeliveryAddress" />
        <input
          v-model="formDataDelivery.deliveryCity"
          :disabled="sameDeliveryAddress" />
        <input
          v-model="formDataDelivery.deliveryZipCode"
          :disabled="sameDeliveryAddress" />
      </div>
    </div>
    <button type="submit">Add</button>
  </form>
  <h2>List of addresses</h2>
  <p v-if="addressList.length === 0">No data found. Add your first address!</p>
  <p v-for="item in addressList" :key="item.id">
    [{{ item.id }}] {{ item.name }}, {{ item.street }}, {{ item.zipCode }}
    {{ item.city }} | Delivery address: {{ item.deliveryName }},
    {{ item.deliveryStreet }},
    {{ item.deliveryZipCode }}
    {{ item.deliveryCity }}
  </p>
</template>

<style>
.new-address-container {
  display: flex;
  gap: 1rem;
}

.new-address-type-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding-bottom: 0.5rem;
}

h3 {
  margin-top: 0.5rem;
  margin-bottom: 0rem;
}

.header-delivery {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}
</style>
