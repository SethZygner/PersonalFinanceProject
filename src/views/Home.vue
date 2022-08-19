
<script setup>

import {ref} from "vue";

let salary = ref("");
let hours = ref("");
let gross = ref(0.0);
let afterTax = ref(0.0);
let bills = ref("");


function getSalary(){
  gross.value = 0.0;
  console.log(salary.value, hours.value)
  if (salary.value && hours.value){

    if(hours.value >= 40){
      let overtime = parseFloat(hours.value)-40;
      gross.value += parseFloat(salary.value) * 40 + (overtime * (salary.value*1.5));


    }else{
      gross.value += salary.value*hours.value
    }

    afterTax.value = gross.value * .83;



  }
}


</script>

<template>

  <div class="container-fluid mx-auto mt-5 text-center row">
    <div class="col">
      <h3>Salary</h3>
      <input type="number" placeholder="Enter Salary" v-model="salary">
      <h3>Enter Hours</h3>
      <input type="number" placeholder="Enter Hours" v-model="hours">
      <h3>Enter Bill Amount</h3>
      <input type="number" placeholder="Enter Bills" v-model="bills">
      <br>
      <button @click="getSalary" class="btn mt-5">Get Amount</button>
    </div>

    <div class="col" v-if="gross">
      <h4>Gross</h4>
      <h6>Gross Weekly Pay: ${{gross.toFixed(2)}}</h6>
      <h6>Gross Monthly Pay: ${{(gross*4).toFixed(2)}}</h6>
      <h6>Gross Yearly Pay: ${{(gross*48).toFixed(2)}}</h6>
      <br>
      <h4>Tax</h4>
      <h6>Weekly Pay: ${{(gross*.83).toFixed(2)}}</h6>
      <h6>Monthly Pay: ${{(gross*.83*4).toFixed(2)}}</h6>
      <h6>Yearly Pay: ${{(gross*.83*48).toFixed(2)}}</h6>
      <br>
      <h4>Bills</h4>
      <h6>Bill Amount: ${{bills}}</h6>
      <h6>Monthly Pay After Bills: ${{((gross*.83*4)-bills).toFixed(2)}}</h6>

    </div>

  </div>

</template>

<style scoped>

</style>
