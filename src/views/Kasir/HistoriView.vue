<template>
  <div class="body bagian-print">
    <div id="nota" class="mt-3">
      <div>
        <b>Cafe Wikusama</b><br />
        <small
          >Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa
          Timur 65139 <br />
          IG: @WikusamaCafe <br />
          jadwal Cafe : <br>
          Senin 06.00–16.00 <br />
          Selasa 06.00–16.00 <br />
          Rabu 06.00–16.00 <br />
          Kamis 06.00–16.00 <br />
          Jumat 06.00–16.00 <br />
          Sabtu Tutup <br />
          Minggu Tutup <br />
        </small>

        <div class="container">
          <table class="mt-3 table table-hover table-striped">
            <thead>
              <tr class="bg-light text-dark">
                <td>No</td>
                <td>Menu</td>
                <td>Jumlah</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, nomor) in data_transaksi" :key="nomor">
                <td>{{ nomor + 1 }}</td>
                <td>{{ data.nama_menu }}</td>
                <td>{{ data.total_pesanan }}</td>
                <td>{{ data.total_harga }}</td>
              </tr>
              <span
                style="text-decoration: underline; color: blue; cursor: pointer"
                @click="print()"
                class="bagian-nonprint"
                >Print</span
              >
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  .bagian-print {
    display: block !important;
  }

  .bagian-nonprint {
    display: none !important;
  }
}

#nota {
  width: 12cm;
  height: 18cm;
  background-color: #ffffff;
  border: 1px solid #000000;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.note {
  margin-left: 4%;
  margin-right: 35%;
  margin-top: 65%;
  border: 1px solid black;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data_transaksi: {},
    };
  },
  mounted() {
    this.getdata(this.$route.params.id);
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
    print() {
      window.print();
      setTimeout(() => {
        location.href = "/transaksi";
      }, 1200);
    },
  },
};
</script>
