<script setup>
import { z } from "zod";

const schema = toTypedSchema(
  z.object({
    billingName: z.string().min(5, "Required"),
    billingStreet: z.string().min(10, "Required"),
    billingZipCode: z.number().min(4, "Required"),
    billingCity: z.string().min(3, "Required"),
    deliveryName: z.string().min(5, "Required"),
    deliveryStreet: z.string().min(10, "Required"),
    deliveryZipCode: z.number().min(4, "Required"),
    deliveryCity: z.string().min(3, "Required"),
  })
);
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
});

const [billingName, billingNameAttrs] = defineField("billingName");
const [billingStreet, billingStreetAttrs] = defineField("billingStreet");
const [billingZipCode, billingZipCodeAttrs] = defineField("billingZipCode");
const [billingCity, billingCityAttrs] = defineField("billingCity");
const [deliveryName, deliveryNameAttrs] = defineField("deliveryName");
const [deliveryStreet, deliveryStreetAttrs] = defineField("deliveryStreet");
const [deliveryZipCode, deliveryZipCodeAttrs] = defineField("deliveryZipCode");
const [deliveryCity, deliveryCityAttrs] = defineField("deliveryCity");

const { data: addressList, refresh } = await useFetch("/api/addresses");
const sameDeliveryAddress = ref(false);

// @TODO: fix "same delivery address" checkbox function
//
// const formDataBilling = computed(() => ({
//   billingName: values.billingName,
//   billingStreet: values.billingStreet,
//   billingCity: values.billingCity,
//   billingZipCode: values.billingZipCode,
// }));

// const formDataDelivery = ref({
//   deliveryName: values.deliveryName,
//   deliveryStreet: values.deliveryStreet,
//   deliveryCity: values.deliveryCity,
//   deliveryZipCode: values.deliveryZipCode,
// });

// const formDataDeliveryStash = ref({ ...formDataDelivery.value });

// function toggleSameDeliveryAddress() {
//   if (sameDeliveryAddress.value) {
//     formDataDelivery.value = formDataDeliveryStash.value;
//   } else {
//     formDataDelivery.value = {
//       deliveryName: values.deliveryName,
//       deliveryStreet: values.deliveryStreet,
//       deliveryCity: values.deliveryCity,
//       deliveryZipCode: values.deliveryZipCode,
//     };
//   }
// }

const addNewRow = handleSubmit(async (values) => {
  await $fetch("/api/addresses", {
    method: "post",
    body: values,
  });
  refresh();
});
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
              <InputText
                id="billingName"
                v-model="billingName"
                v-bind="billingNameAttrs"
                :invalid="errors.billingName" />
              <label for="billingName">Full name</label>
            </FloatLabel>
            <p v-if="errors.billingName" class="p-error">
              {{ errors.billingName }}
            </p>
            <FloatLabel>
              <InputText
                id="billingStreet"
                v-model="billingStreet"
                v-bind="billingStreetAttrs" />
              <label for="billingStreet">Street and house number</label>
            </FloatLabel>
            <p v-if="errors.billingStreet" class="p-error">
              {{ errors.billingStreet }}
            </p>
            <FloatLabel>
              <InputNumber
                id="billingZipCode"
                v-model="billingZipCode"
                v-bind="billingZipCodeAttrs"
                :useGrouping="false"
                :min="1000"
                :max="9999" />
              <label for="billingZipCode">Zip code</label>
            </FloatLabel>
            <p v-if="errors.billingZipCode" class="p-error">
              {{ errors.billingZipCode }}
            </p>
            <FloatLabel>
              <InputText
                id="billingCity"
                v-model="billingCity"
                v-bind="billingCityAttrs" />
              <label for="billingCity">City</label>
            </FloatLabel>
            <p v-if="errors.billingCity" class="p-error">
              {{ errors.billingCity }}
            </p>
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
                id="deliveryName"
                v-model="deliveryName"
                v-bind="deliveryNameAttrs"
                :invalid="errors.deliveryName"
                :disabled="sameDeliveryAddress" />
              <label for="deliveryName">Full name</label>
            </FloatLabel>
            <p v-if="errors.deliveryName" class="p-error">
              {{ errors.deliveryName }}
            </p>
            <FloatLabel>
              <InputText
                id="deliveryStreet"
                v-model="deliveryStreet"
                v-bind="deliveryStreetAttrs"
                :disabled="sameDeliveryAddress" />
              <label for="deliveryStreet">Street and house number</label>
            </FloatLabel>
            <p v-if="errors.deliveryStreet" class="p-error">
              {{ errors.deliveryStreet }}
            </p>
            <FloatLabel>
              <InputNumber
                id="deliveryZipCode"
                v-model="deliveryZipCode"
                v-bind="deliveryZipCodeAttrs"
                :disabled="sameDeliveryAddress"
                :useGrouping="false"
                :min="1000"
                :max="9999" />
              <label for="deliveryZipCode">Zip code</label>
            </FloatLabel>
            <p v-if="errors.deliveryZipCode" class="p-error">
              {{ errors.deliveryZipCode }}
            </p>
            <FloatLabel>
              <InputText
                id="deliveryCity"
                v-model="deliveryCity"
                v-bind="deliveryCityAttrs"
                :disabled="sameDeliveryAddress" />
              <label for="deliveryCity">City</label>
            </FloatLabel>
            <p v-if="errors.deliveryCity" class="p-error">
              {{ errors.deliveryCity }}
            </p>
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

.p-error {
  margin-block: -0.5rem;
  margin-left: 0.75rem;
}
</style>
