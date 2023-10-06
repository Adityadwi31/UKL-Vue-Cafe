<template>
  <div class="super_container">
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
                  <div>Wikusama</div>
                  <div>Cafe</div>
                </a>
              </div>
              <nav class="main_nav">
                <ul
                  class="d-flex flex-row align-items-center justify-content-start"
                >
                  <li><router-link to="/keranjang">home</router-link></li>
                  <li><router-link to="/kasir">on going</router-link></li>
                  <li><router-link to="/transaksi">transaksi</router-link></li>
                  <li><a href="#" @click="logout">Logout</a></li>


                </ul>
              </nav>
              <div class="reservations_phone ml-auto">
                Reservations: +64 586 778 8892
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
          <li><a href="/kasir">home</a></li>
          <!-- <li><a href="/menu">menu</a></li> -->
          <li><a href="/keranjang">on going</a></li>
          <li><a href="/transaksi">transaksi</a></li>
          <li><a href="/histori">histori</a></li>
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
        data-image-src="/images/home.jpg"
        data-speed="0.8"
      ></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title">
                  <h1>An Extraordinery Experience</h1>
                </div>
                <div class="home_text ml-auto mr-auto">
                  <p>
                    Dana tipis tapi pengen jajan makanan enak? Langsung aja cus
                    cek menu Cafe kita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll_icon"></div>
    </div>

    <!-- Intro -->

    <div class="intro">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="intro_content">
              <div class="intro_subtitle page_subtitle">Detail Projek</div>
              <div class="intro_title"><h2>UKL Kasir Kafe Projek</h2></div>
              <div class="intro_text">
                <p>
                  berencana membuat sistem kasir. Sistem terdiri dari 3 jenis
                  user yaitu kasir, manajer dan admin. Kasir akan melayani
                  pemesanan dan memberikan nomor meja sebagai identitas untuk
                  memudahkan pelayan mengantarkan pesanan. Pelanggan akan
                  membayar di kasir sebelum meninggalkan cafe. Cafe hanya
                  menerima pembayaran secara tunai. Jika pelanggan memesan
                  makanan/minuman tambahan, pelanggan harus menuju ke kasir dan
                  kasir dapat menambahkan data pemesanan. Manajer Cafe bertugas
                  untuk memonitoring data transaksi
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-4 col-md-6 intro_col">
                <div class="intro_image">
                  <img
                    src="images/intro_1.jpg"
                    alt="https://unsplash.com/@quanle2819"
                  />
                </div>
              </div>
              <div class="col-xl-4 col-md-6 intro_col">
                <div class="intro_image">
                  <img
                    src="images/intro_2.jpg"
                    alt="https://unsplash.com/@fabmag"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Video -->

    <div class="video_section">
      <div
        class="background_image"
        style="background-image: url(images/video.jpg)"
      ></div>
      <div
        class="video_section_content d-flex flex-column align-items-center justify-content-center text-center"
      >
        <div class="video_section_title">Food for the soul</div>
        <div class="video_section_icon">
          <a
            class="vimeo video_button"
            href="https://player.vimeo.com/video/99340873?autoplay=1&loop=1&title=0&autopause=0"
            ><i class="fa fa-play" aria-hidden="true"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import Chart from "chart.js/auto";

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
    this.getdate();
    axios
      .get("http://localhost:8000/api/getmenu")
      .then((response) => {
        console.log(response);
        const data = response.data.map((item) => item.jumlah_pesan);
        const nama = response.data.map((item) => item.nama_menu);

        let colors = [];
        for (let i = 0; i < data.length; i++) {
          let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
          colors.push(color);
        }

        const chartData = {
          labels: nama,
          datasets: [
            {
              data: data,
              backgroundColor: colors,
            },
          ],
        };

        new Chart(document.getElementById("piechart"), {
          type: "pie",
          labels: "Data Menu",
          data: chartData,
          options: {
            responsive: true,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

