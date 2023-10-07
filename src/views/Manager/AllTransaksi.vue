<template>
  <div>
    <!-- Header -->

    <header class="header">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="header_content d-flex flex-row align-items-center justify-content-start">
              <div class="logo">
                <a href="#">
                  <div>Wikusama</div>
                  <div>cafe</div>
                </a>
              </div>
              <nav class="main_nav">
                <ul class="d-flex flex-row align-items-center justify-content-start">
                  <li><router-link to="#"></router-link></li>
                  <li><router-link to="#"></router-link></li>
                  <li><router-link to="/manager">Home</router-link></li>
                  <li><router-link to="/alltransaksi">History</router-link></li>
                  <li><router-link to="/profit">Profit</router-link></li>
                  <li><a href="#" @click="logout">Logout</a></li>
                </ul>
              </nav>
              <div class="reservations_phone ml-auto">
                Reservations: +34 586 778 8892
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Hamburger -->

    <div class="hamburger_bar trans_400 d-flex flex-row align-items-center justify-content-start">
      <div class="hamburger">
        <div class="menu_toggle d-flex flex-row align-items-center justify-content-start">
          <span>menu</span>
          <div class="hamburger_container">
            <div class="menu_hamburger">
              <div class="line_1 hamburger_lines" style="transform: matrix(1, 0, 0, 1, 0, 0)"></div>
              <div class="line_2 hamburger_lines" style="visibility: inherit; opacity: 1"></div>
              <div class="line_3 hamburger_lines" style="transform: matrix(1, 0, 0, 1, 0, 0)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu -->

    <div class="menu trans_800">
      <div class="menu_content d-flex flex-column align-items-center justify-content-center text-center">
        <ul>
          <li><a href="/manager">home</a></li>
          <li><a href="/alltransaksi">All Transaksi</a></li>
          <li><a href="/profit">Profit</a></li>
        </ul>
      </div>
      <div class="menu_reservations_phone ml-auto">
        Reservations: +34 586 778 8892
      </div>
    </div>

    <!-- Home -->

    <div class="home">
      <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src="images/blog.jpg"
        data-speed="0.8"></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title">
                  <h1>History</h1>
                </div>
                <!-- get -->
                <div class="container-xxl py-5">
                  <div class="container">
                    {{ role }}
                    <div class="row mt-2">
                      <div class="col">
                        <input type="text" class="form-control" v-model="cari_kasir" autocomplete="off"
                          placeholder="Cari nama kasir">
                      </div>
                      <div class="col">
                        <input type="date" class="form-control" v-model="tgl_transaksi">
                      </div>
                    </div>

                    <div class="card mt-4" v-for="t in filterdata" :key="t.id_history">
                      <div class="card-header">
                        Transaksi pada tanggal {{ t.tgl_transaksi }}
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">Pelanggan atas nama {{ t.nama_pelanggan }}</h5>
                        <p class="card-text">Di layani oleh kasir {{ t.nama }}</p>
                        <a href="#" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#detail"
                          @click="getfunction(t)">Lihat Pesanan</a>
                      </div>
                    </div>


                  </div>
                </div>
                <!-- end get -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DETAIL -->
    <div class="modal fade" id="detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">HITORY</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-transparent">
              <thead class="bg-light text dark">
                <tr class="table-secondary text-dark">
                  <th>No</th>
                  <th>Menu</th>
                  <th>Jumlah</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, nomor) in detail" :key="nomor">
                  <td>{{ nomor + 1 }}</td>
                  <td>{{ t.nama }}</td>
                  <td>{{ t.total_pesanan }}</td>
                  <td>{{ t.total_harga }}</td>
                </tr>
              </tbody>
            </table>
            <p>
              Total Harga: <b>{{ total }}</b>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END DETAIL -->
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data() {
    return {
      alltransaction: {},
      cari_kasir: "",
      detail: {},
      total: "",
      tgl_transaksi: '',
      role: ''
    };
  },
  mounted() {
    this.gettransaksi();
    this.gettotal();
  },

  computed: {
    filterdata() {
      let filterdata = this.alltransaction;
      if (this.cari_kasir) {
        filterdata = filterdata.filter((transaksi) =>
          transaksi.nama
            .toString()
            .toLowerCase()
            .includes(this.cari_kasir.toLowerCase())
        )
      }

      if (this.cari_kasir) {
        filterdata = filterdata.filter(transaksi => transaksi.nama.toString().toLowerCase().includes(this.cari_kasir.toLowerCase()))
      }

      if (this.tgl_transaksi) {
        const filteredData = filterdata.filter((t) => t.tgl_transaksi.includes(this.tgl_transaksi));
        if (filteredData.length === 0) {
          swal({
            title: "Kafe lagi sepi 🥲",
            icon: "info",
          });
        }
        return filteredData;
      }

      return filterdata;
    },
  },


methods: {

  showInfoPopup() {
    swal({
      title: "Cafe lagi sepi pada waktu itu",
      icon: "info",
    });

    // Setelah 1 detik, tutup pop-up
    setTimeout(() => {
      swal.close();
    }, 1000);
  },


  gettransaksi() {
    axios.get("http://localhost:8000/api/gethistori").then(({ data }) => {
      console.log(data);
      this.alltransaction = data;
    });
  },
  getfunction(histori) {
    this.gettotal(histori);
    this.getdetail(histori);
  },
  gettotal(histori) {
    axios
      .get("http://localhost:8000/api/total/" + histori.id_keranjang)
      .then(({ data }) => {
        console.log(data);
        this.total = data;
      });
  },
  getdetail(histori) {
    axios
      .get("http://localhost:8000/api/gethistori/" + histori.id_keranjang)
      .then(({ data }) => {
        console.log(data);
        this.detail = data;
      });
  },

  gethistory() {
    axios.get('http://localhost:8000/api/gethistory')
      .then(
        ({ data }) => {
          console.log(data)
          this.datatransaksi = data
        }
      )
  },

  logout() {
    swal({
      icon: "warning",
      title: "Ingin Log Out?",
      dangerMode: true,
      buttons: true,
    }).then((response) => {
      if (response) {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("id_user");
        localStorage.removeItem("nama");
        swal({
          icon: "success",
          button: false,
        });
        setTimeout(() => {
          location.href = "/";
        }, 1200);
      }
    });
  },
},
};
</script>
