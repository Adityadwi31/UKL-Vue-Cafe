<template>
    <div class="body">
    <div class="bill-container">
        <div class="bill-header">
            <h1>Cafe Bill</h1>
        </div>
        <div class="bill-info">
            <p><strong>Date/Time:</strong> {{ tgl }}</p>
            <p><strong>CashierS:</strong> {{ kasir }} </p>
        </div>
        <div class="bill-items">
            <div class="item">
                <span><strong>Menu</strong></span>
                <span><strong>Price</strong></span>
                <span><strong>Quantity</strong></span>
                <span><strong>Total</strong></span>
            </div>
            <div class="item" v-for="(data, nomor) in data_transaksi" :key="nomor">
                <span>{{ data.nama_menu }}</span>
                <span>{{ data.harga }}</span>
                <span>{{ data.total_pesanan }}</span>
                <span>{{ data.total_harga }}</span>
                
            </div>

            <div class="total">
                <span>Total Amount: </span>
                <span>{{ total }}</span>
            </div>
        </div>
        <div class="print-button">
            <button @click="print()">Print Bill</button>
        </div>
    </div>
</div>
</template>
  
<style scoped>
.body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.bill-container {
    width: 100%;
    max-width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.bill-header {
    text-align: center;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
}

.bill-info {
    text-align: left;
    margin-bottom: 15px;
}

.bill-items {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}

.item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.total {
    font-weight: bold;
    margin-top: 10px;
}

.print-button {
    text-align: center;
    margin-top: 15px;
}
</style>


<script>
import axios from "axios";

export default {
  data() {
    return {
      data_transaksi: {},
      total : '',
      kasir: localStorage.getItem('nama'),
      tgl: new Date(),
    };
  },
  mounted() {
    this.getdata(this.$route.params.id);
    this.gettotal(this.$route.params.id);
  },
  methods: {
    getdata(id) {
      axios
        .get("http://localhost:8000/api/gethistori/" + id)
        .then(({ data }) => {
          console.log(data);
          this.data_transaksi = data;
        });
    },
    gettotal(id){
      axios
        .get("http://localhost:8000/api/total/" + id)
        .then(({ data }) => {
          console.log(data);
          this.total = data;
        });
    },
    print() {
      window.print();
      setTimeout(() => {
        location.href = "/transaksi";
      }, 1200);
      
    },
  },
};
</script>


  