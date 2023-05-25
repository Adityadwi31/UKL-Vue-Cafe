<template>
  <div >
    <!-- Header -->

    <header class="header">
      <div class="container">
        <div class="row">
          <div class="col">
            <div
              class="header_content d-flex flex-row align-items-center justify-content-start"
            >
              <div class="logo">
                <a href="#">
                  <div>The Venue</div>
                  <div>restaurant</div>
                </a>
              </div>
              <nav class="main_nav">
                <ul
                  class="d-flex flex-row align-items-center justify-content-start"
                >
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a></li>
                  <li><a href="/manager">home</a></li>
                  <li><a href="/alltransaksi">All Transaksi</a></li>
                  <li><a href="/profit">Profit</a></li>
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

    <div
      class="hamburger_bar trans_400 d-flex flex-row align-items-center justify-content-start"
    >
      <div class="hamburger">
        <div
          class="menu_toggle d-flex flex-row align-items-center justify-content-start"
        >
          <span>menu</span>
          <div class="hamburger_container">
            <div class="menu_hamburger">
              <div
                class="line_1 hamburger_lines"
                style="transform: matrix(1, 0, 0, 1, 0, 0)"
              ></div>
              <div
                class="line_2 hamburger_lines"
                style="visibility: inherit; opacity: 1"
              ></div>
              <div
                class="line_3 hamburger_lines"
                style="transform: matrix(1, 0, 0, 1, 0, 0)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu -->

    <div class="menu trans_800">
      <div
        class="menu_content d-flex flex-column align-items-center justify-content-center text-center"
      >
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
      <div
        class="parallax_background parallax-window"
        data-parallax="scroll"
        data-image-src="images/menu.jpg"
        data-speed="0.8"
      ></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <!-- get -->
                <div class="container-xxl py-5">
                  <div class="container">
                    <div class="row mt-3">
                      <div class="col">
                        <input
                          type="date"
                          class="form-control"
                          v-model="cari_tgl"
                        />
                      </div>
                      <div class="col">
                        <input
                          type="month"
                          class="form-control"
                          v-model="cari_bulan"
                        />
                      </div>
                      <div class="col">
                        <input
                          type="submit"
                          @click="getdate"
                          class="btn btn-outline-warning"
                        />
                      </div>
                    </div>

                    <div class="card mt-4">
                      <div class="card-header">Penghasilan</div>
                      <div class="card-body">
                        <h5 class="card-title" v-if="this.cari_bulan">
                          Pendapatan bulan {{ cari_bulan }} Adalah Rp.{{
                            profitbulan
                          }}
                        </h5>
                        <p class="card-text" v-if="this.cari_tgl">
                          Pendapatan Tanggal {{ cari_tgl }} Adalah Rp.{{
                            profithari
                          }}
                        </p>
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
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
// import Chart from "chart.js/auto";

export default {
  data() {
    return {
      cari_bulan: "",
      cari_tgl: "",
      profitbulan: "",
      profithari: "",
      datamenu: {},
    };
  },
  mounted() {
    // this.getdate();
    // axios
    //   .get("http://localhost:8000/api/getmenu")
    //   .then((response) => {
    //     console.log(response);
    //     const data = response.data.map((item) => item.jumlah_pesan);
    //     const nama = response.data.map((item) => item.nama_menu);

    //     let colors = [];
    //     for (let i = 0; i < data.length; i++) {
    //       let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    //       colors.push(color);
    //     }

    //     const chartData = {
    //       labels: nama,
    //       datasets: [
    //         {
    //           data: data,
    //           backgroundColor: colors,
    //         },
    //       ],
    //     };

    //     new Chart(document.getElementById("piechart"), {
    //       type: "pie",
    //       labels: "Data Menu",
    //       data: chartData,
    //       options: {
    //         responsive: true,
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  computed: {},
  methods: {
    getdate() {
      if (this.cari_bulan) {
        axios
          .get("http://localhost:8000/api/getmonth/" + this.cari_bulan)
          .then(({ data }) => {
            console.log(data);
            this.profitbulan = data;
          });
      }

      if (this.cari_tgl) {
        axios
          .get("http://localhost:8000/api/getday/" + this.cari_tgl)
          .then(({ data }) => {
            console.log(data);
            this.profithari = data;
          });
      }
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
