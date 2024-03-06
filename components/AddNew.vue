<script setup>
import { z } from "zod";

const schema = toTypedSchema(
  z.object({
    billingName: z.string().min(5, "Required field"),
    billingStreet: z.string().min(10, "Required field"),
    billingZipCode: z.number().min(4, "Required field"),
    billingCity: z.string().min(3, "Required field"),
    deliveryName: z
      .string()
      .min(5, "Required field")
      .default("Kiszállítási név"),
    deliveryStreet: z
      .string()
      .min(10, "Required field")
      .default("Kiszállítási u. 1."),
    deliveryZipCode: z.number().min(4, "Required field").default(9888),
    deliveryCity: z
      .string()
      .min(3, "Required field")
      .default("Kiszállítóváros"),
  })
);
const { errors, defineField, handleSubmit } = useForm({
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

const sameDeliveryAddress = ref(false);

const addNewRow = handleSubmit(async (values) => {
  if (!sameDeliveryAddress.value) {
    await $fetch("/api/addresses", {
      method: "post",
      body: values,
    });
  } else {
    await $fetch("/api/addresses", {
      method: "post",
      body: {
        billingName: values.billingName,
        billingStreet: values.billingStreet,
        billingZipCode: values.billingZipCode,
        billingCity: values.billingCity,
        deliveryName: values.billingName,
        deliveryStreet: values.billingStreet,
        deliveryZipCode: values.billingZipCode,
        deliveryCity: values.billingCity,
      },
    });
  }
});
</script>

<template>
  <div class="address-add">
    <h2>Add new address</h2>
    <form @submit.prevent="addNewRow">
      <div class="new-address-container">
        <div class="new-address-type-section">
          <h3>Billing address</h3>

          <label for="billingName">Full name:</label>
          <InputText
            id="billingName"
            v-model="billingName"
            v-bind="billingNameAttrs"
            :invalid="errors.billingName" />
          <p v-if="errors.billingName" class="p-error">
            {{ errors.billingName }}
          </p>

          <label for="billingStreet">Street and house number:</label>
          <InputText
            id="billingStreet"
            v-model="billingStreet"
            v-bind="billingStreetAttrs"
            :invalid="errors.billingStreet" />
          <p v-if="errors.billingStreet" class="p-error">
            {{ errors.billingStreet }}
          </p>

          <label for="billingZipCode">Zip code:</label>
          <InputNumber
            id="billingZipCode"
            v-model="billingZipCode"
            v-bind="billingZipCodeAttrs"
            :invalid="errors.billingZipCode"
            :useGrouping="false"
            :min="1000"
            :max="9999" />
          <p v-if="errors.billingZipCode" class="p-error">
            {{ errors.billingZipCode }}
          </p>

          <label for="billingCity">City:</label>
          <InputText
            id="billingCity"
            v-model="billingCity"
            v-bind="billingCityAttrs"
            :invalid="errors.billingCity" />
          <p v-if="errors.billingCity" class="p-error">
            {{ errors.billingCity }}
          </p>
        </div>
        <div class="new-address-type-section">
          <div class="deliveryoption">
            <h3>Delivery address</h3>

            <label for="sameDeliveryAddress">
              <Checkbox
                binary
                variant="filled"
                v-model="sameDeliveryAddress"
                id="sameDeliveryAddress" />
              Same as Billing address</label
            >
          </div>

          <label for="deliveryName">Full name:</label>
          <InputText
            v-if="!sameDeliveryAddress"
            id="deliveryName"
            v-model="deliveryName"
            v-bind="deliveryNameAttrs"
            :invalid="errors.deliveryName" />
          <InputText
            v-else
            id="deliveryName"
            v-model="billingName"
            v-bind="billingNameAttrs"
            :modelValue="billingName"
            :invalid="errors.billingStreet"
            disabled />
          <p v-if="errors.deliveryName" class="p-error">
            {{ errors.deliveryName }}
          </p>

          <label for="deliveryStreet">Street and house number:</label>
          <InputText
            v-if="!sameDeliveryAddress"
            id="deliveryName"
            v-model="deliveryStreet"
            v-bind="deliveryStreetAttrs"
            :invalid="errors.deliveryStreet" />
          <InputText
            v-else
            id="deliveryName"
            v-model="billingStreet"
            v-bind="billingStreetAttrs"
            :invalid="errors.billingStreet"
            disabled />
          <p v-if="errors.deliveryStreet" class="p-error">
            {{ errors.deliveryStreet }}
          </p>

          <label for="deliveryZipCode">Zip code:</label>
          <InputNumber
            v-if="!sameDeliveryAddress"
            id="deliveryZipCode"
            v-model="deliveryZipCode"
            v-bind="deliveryZipCodeAttrs"
            :invalid="errors.deliveryZipCode"
            :disabled="sameDeliveryAddress"
            :useGrouping="false"
            :min="1000"
            :max="9999" />
          <InputNumber
            v-else
            id="deliveryZipCode"
            v-model="billingZipCode"
            v-bind="billingZipCodeAttrs"
            :invalid="errors.billingZipCode"
            disabled
            :useGrouping="false" />
          <p v-if="errors.deliveryZipCode" class="p-error">
            {{ errors.deliveryZipCode }}
          </p>

          <label for="deliveryCity">City:</label>
          <InputText
            v-if="!sameDeliveryAddress"
            id="deliveryName"
            v-model="deliveryCity"
            v-bind="deliveryCityAttrs"
            :invalid="errors.deliveryCity" />
          <InputText
            v-else
            id="deliveryName"
            v-model="billingCity"
            v-bind="billingCityAttrs"
            :invalid="errors.billingCity"
            disabled />
          <p v-if="errors.deliveryCity" class="p-error">
            {{ errors.deliveryCity }}
          </p>
        </div>
      </div>
      <Button type="submit">Add</Button>
    </form>
  </div>
</template>

<style>
.new-address-container {
  display: flex;
  flex-direction: row;
  gap: 3rem;
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

.p-error {
  margin-block: -0.5rem;
  margin-left: 0.75rem;
}

.p-label {
  margin-left: 5rem;
}

.deliveryoption {
  display: flex;
  gap: 1rem;
}
</style>
