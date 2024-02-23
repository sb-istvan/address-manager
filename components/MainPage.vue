<script setup>
const { data: addressList, refresh } = await useFetch("/api/addresses");
const sameDeliveryAddress = ref(false);

const formDataBilling = ref({
  name: "Default László",
  street: "Mindegy u. 11.",
  city: "Bárholfalva",
  zipCode: 9911,
});

const formDataDelivery = ref({
  deliveryName: "Valamelyik Zsolt",
  deliveryStreet: "Kiszállítós utca 12.",
  deliveryCity: "Eger",
  deliveryZipCode: 3300,
});

const formDataDeliveryStash = ref({ ...formDataDelivery.value });

function toggleSameDeliveryAddress() {
  if (sameDeliveryAddress.value) {
    formDataDelivery.value = formDataDeliveryStash.value;
  } else {
    formDataDelivery.value = {
      deliveryName: formDataBilling.value.name,
      deliveryStreet: formDataBilling.value.street,
      deliveryCity: formDataBilling.value.city,
      deliveryZipCode: formDataBilling.value.zipCode,
    };
  }
}

async function addNewRow() {
  await $fetch("/api/addresses", {
    method: "post",
    body: {
      ...formDataBilling.value,
      ...formDataDelivery.value,
    },
  });
  refresh();
}
</script>

<template>
  <h1>Address Manager</h1>
  <div class="wrapper">
    <div class="address-add">
      <h2>Add new address</h2>
      <form @submit.prevent="addNewRow">
        <div class="new-address-container">
          <div class="new-address-type-section">
            <h3>Billing address</h3>
            <FloatLabel>
              <InputText id="name" v-model="formDataBilling.name" />
              <label for="name">Full name</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="street" v-model="formDataBilling.street" />
              <label for="street">Street and house number</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="city" v-model="formDataBilling.city" />
              <label for="city">City</label>
            </FloatLabel>
            <FloatLabel>
              <InputText id="zipCode" v-model="formDataBilling.zipCode" />
              <label for="zipCode">Zip code</label>
            </FloatLabel>
          </div>
          <div class="new-address-type-section">
            <h3>Delivery address</h3>
            <div>
              <Checkbox
                binary
                variant="filled"
                v-model="sameDeliveryAddress"
                @click="toggleSameDeliveryAddress"
                id="sameDeliveryAddress" />
              <label for="sameDeliveryAddress"> Same as Billing address</label>
            </div>
            <FloatLabel>
              <InputText
                id="name"
                v-model="formDataDelivery.deliveryName"
                :disabled="sameDeliveryAddress" />
              <label for="name">Delivery full name</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="street"
                v-model="formDataDelivery.deliveryStreet"
                :disabled="sameDeliveryAddress" />
              <label for="street">Delivery street and house number</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="city"
                v-model="formDataDelivery.deliveryCity"
                :disabled="sameDeliveryAddress" />
              <label for="city">Delivery city</label>
            </FloatLabel>
            <FloatLabel>
              <InputText
                id="zipCode"
                v-model="formDataDelivery.deliveryZipCode"
                :disabled="sameDeliveryAddress" />
              <label for="zipCode">Delivery zip code</label>
            </FloatLabel>
          </div>
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
    <div class="address-list">
      <h2>List of addresses</h2>
      <ScrollPanel style="max-width: 100vw">
        <DataTable :value="addressList">
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="street" header="Street"></Column>
          <Column field="zipCode" header="Zip code"></Column>
          <Column field="city" header="City"></Column>
          <Column field="deliveryName" header="Delivery name"></Column>
          <Column field="deliveryStreet" header="Delivery street"></Column>
          <Column field="deliveryZipCode" header="Delivery zip code"></Column>
          <Column field="deliveryCity" header="Delivery city"></Column>
        </DataTable>
      </ScrollPanel>
    </div>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
}
.new-address-container {
  display: flex;
  flex-direction: column;
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

.p-float-label {
  margin-top: 1.25rem;
}
</style>
