<script setup>


import {reactive, ref} from "vue";


//Inputs
let HourlyWageInput = ref(undefined);
let HoursWorkedInput = ref(undefined);
let TaxesInput = ref(undefined);
let SavingsPercent = ref(undefined);
let TimePeriodWeeksInput = ref(undefined);
let TimePeriodMonthsInput = ref(undefined);
let BillNameInput = ref("");
let BillAmountInput = ref(undefined);


//Results
let GrossPay = ref(0.00);
let GrossPayAfterTax = ref(0.00);
let GrossPayAfterBills = ref(0.00);
let GrossPayOvertime = ref(0.00);
let HoursWorked = ref(0);
let OvertimeHoursWorked = ref(0);
let GrossPayTimePeriod = ref(0.00);
let GrossPayTimePeriodAfterTax = ref(0.0);
let TimePeriodMonths = ref(0);
let TimePeriodWeeks = ref(0);

let TotalBillAmount = ref(0.00);
let GrossPayAfterBillsAndTax = ref(0.00);
let MonthlyBills = reactive([]);


//Functions
function ClearResultFields(){
  GrossPay.value = 0.00;
  GrossPayAfterTax.value = 0.00;
  GrossPayAfterBills.value = 0.00;
  GrossPayOvertime.value = 0.00;
  HoursWorked.value = 0.00;
  OvertimeHoursWorked.value = 0.00;
  GrossPayTimePeriod.value = 0.00;
  GrossPayTimePeriodAfterTax.value = 0.00;
  TimePeriodMonths.value = 0;
  TimePeriodWeeks.value = 0;
  TotalBillAmount.value = 0.00;
  GrossPayAfterBillsAndTax.value = 0.00;

}

function GetGrossPay(){
  if(HourlyWageInput.value && HoursWorkedInput.value){

    ClearResultFields();

    if(HoursWorkedInput.value > 40){
      HoursWorked.value = 40;
      OvertimeHoursWorked.value = HoursWorkedInput.value - 40;
    }else{
      HoursWorked.value = HoursWorkedInput.value;
    }


    GrossPay.value = HoursWorked.value*HourlyWageInput.value;

    if(OvertimeHoursWorked.value){
      GrossPay.value += (OvertimeHoursWorked.value*(HourlyWageInput.value*1.5));
    }

    if(TaxesInput.value){
      let Taxes = (100-(TaxesInput.value))/100;
      GrossPayAfterTax.value = Taxes*GrossPay.value;
    }

    if(TimePeriodMonthsInput.value || TimePeriodWeeksInput.value){
      TimePeriod();
    }

    if(MonthlyBills.length){
      BillsEquation();
    }


  }
}

function TimePeriod(){


  if(TimePeriodMonthsInput.value){
    GrossPayTimePeriod.value += (TimePeriodMonthsInput.value*4)*GrossPay.value;
    GrossPayTimePeriodAfterTax.value += (TimePeriodMonthsInput.value*4)*GrossPayAfterTax.value;
    TimePeriodMonths.value = TimePeriodMonthsInput.value;

  }

  if(TimePeriodWeeksInput.value){
    GrossPayTimePeriod.value += TimePeriodWeeksInput.value*GrossPay.value;
    GrossPayTimePeriodAfterTax.value += TimePeriodWeeksInput.value*GrossPayAfterTax.value;
    TimePeriodWeeks.value = TimePeriodWeeksInput.value;
  }

}

function AddBill(){
  if(BillNameInput.value && BillAmountInput.value){

    let BillObject = {
      Name: BillNameInput.value,
      Amount: BillAmountInput.value
    }

    MonthlyBills.push(BillObject);

    BillNameInput.value = "";
    BillAmountInput.value = undefined;

    BillsEquation();
  }
}

function RemoveFromBill(index){
  MonthlyBills.splice(index, 1);
  BillsEquation();

}

function BillsEquation(){
  TotalBillAmount.value = 0.00;

  MonthlyBills.forEach((bill)=>{
    if(TimePeriodMonths.value){
      TotalBillAmount.value += bill.Amount*TimePeriodMonths.value;
    }

    if(TimePeriodWeeks.value % 4 === 0){
      TotalBillAmount.value += bill.Amount*(TimePeriodWeeks.value/4);
    }
  })

  GrossPayAfterBillsAndTax.value = GrossPayTimePeriodAfterTax.value - TotalBillAmount.value;
}

</script>



<template>

  <div class="container-fluid" id="All-Content">

    <div class="row justify-content-evenly">

      <div class="col-md-4 text-center">
        <h5 class="mt-4">Hourly Wage</h5>
        <input type="number" class="simple-input my-2" placeholder="Enter Hourly Wage" v-model="HourlyWageInput">
        <h5 class="mt-4">Hours Worked</h5>
        <input type="number" class="simple-input my-2" placeholder="Enter Hours Worked" v-model="HoursWorkedInput">
        <h5 class="mt-4">Taxes (%)</h5>
        <input type="number" class="simple-input my-2" placeholder="Enter Taxes" v-model="TaxesInput">
        <h5 class="mt-4">Time Period (optional):</h5>
        <div class="d-flex align-items-center justify-content-evenly">
          <input class="col-md-5" type="number" placeholder="Months" v-model="TimePeriodMonthsInput">
          <input class="col-md-5" type="number" placeholder="Weeks" v-model="TimePeriodWeeksInput">
        </div>

        <div @click="GetGrossPay" class="simple-input-md mx-auto mt-4 pt-2 Hover">Get Results</div>
      </div>





      <div class="col-md-4 my-3 text-center">
        <h4 class="mb-3">Monthly Bills</h4>
        <div class="d-flex align-items-center justify-content-evenly">
          <div>
            <h5>Bill Name</h5>
            <input type="text" placeholder="Enter Bill Name" class="simple-input" v-model="BillNameInput">
          </div>
          <div>
            <h5>Bill Amount</h5>
            <input type="number" placeholder="Amount" class="simple-input" v-model="BillAmountInput">
          </div>
        </div>

        <div class="simple-input col-12 pt-2 my-3 mx-auto Hover" @click="AddBill">Enter Bill</div>

        <div id="Shown-Bills">
          <div v-for="bill in MonthlyBills" v-if="MonthlyBills.length" class="text-center">
            <div class="d-flex justify-content-evenly">
              <p class="col-4">{{bill.Name}}</p>
              <p class="col-4">{{bill.Amount}}</p>
              <p class="col-4 P-Hover" @click="RemoveFromBill(MonthlyBills.indexOf(bill))" >X</p>
            </div>
          </div>
        </div>

      </div>





      <div class="col-md-4 my-3 text-center">
        <h3>Results</h3>
        <h5>Gross Pay: ${{GrossPay.toFixed(2)}} /Week</h5>
        <h5>After Tax: ${{GrossPayAfterTax.toFixed(2)}} /Week</h5>
        <div v-if="TimePeriodWeeks || TimePeriodMonths">
          <hr>
          <h3>With Time Period</h3>
          <h4>
            <span v-if="TimePeriodMonths">
            {{TimePeriodMonths}} Months
            </span>

            <span v-if="TimePeriodWeeks && TimePeriodMonths">
              and
            </span>

            <span v-if="TimePeriodWeeks">
              {{TimePeriodWeeks}} Weeks
            </span>
          </h4>

          <p>Gross Pay: ${{GrossPayTimePeriod.toFixed(2)}}</p>
          <p>After Tax: ${{GrossPayTimePeriodAfterTax.toFixed(2)}}</p>

        </div>

        <div v-if="MonthlyBills.length && (TimePeriodWeeks % 4 === 0 || TimePeriodMonths >= 1)">
          <hr>
          <h4>Bills</h4>
          <h5>Bill Amount: ${{TotalBillAmount.toFixed(2)}}</h5>
          <h5>After Tax And Bills: ${{GrossPayAfterBillsAndTax.toFixed(2)}}</h5>
        </div>

      </div>


    </div>


  </div>




</template>



<style scoped>

#All-Content{
  margin-top: 3em;
}

#Shown-Bills{
  min-height: 15em;
  border-left:1px solid #D9D9D9;
  border-right:1px solid #D9D9D9;
}

</style>
