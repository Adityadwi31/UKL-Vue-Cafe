<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="header_content d-flex flex-row align-items-center justify-content-start">
              <div class="logo">
                <a href="#">
                  <div>Wikusama</div>
                  <div>Cafe</div>
                </a>
              </div>
              <nav class="main_nav">
                <ul class="d-flex flex-row align-items-center justify-content-start">
                  <li><router-link to="/kasir">home</router-link></li>
                  <li><router-link to="/keranjang">on going</router-link></li>
                  <li><router-link to="/transaksi">transaksi</router-link></li>
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

    <div class="menu trans_800">
      <div class="menu_content d-flex flex-column align-items-center justify-content-center text-center">
        <ul>
          <li><a href="/kasir">home</a></li>
          <li><a href="/keranjang">on going</a></li>
          <li><a href="/transaksi">transaksi</a></li>
          <li><a href="/histori">histori</a></li>
        </ul>
      </div>
      <div class="menu_reservations_phone ml-auto">
        Reservations: +34 586 778 8892
      </div>
    </div>

    <div class="home">
      <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src="/images/home.jpg"
        data-speed="0.8"></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title">
                  <h1>Ongoing</h1>
                </div>
                <div class="container-xxl py-5">
                  <div class="container">
                    <input type="number" class="form-control mb-4" v-model="cari_meja" placeholder="Cari nomor meja..."
                      autocomplete="off" />
                    <div class="row g-4">
                      <div data-bs-toggle="modal" data-bs-target="#finish" @click="handleclick(meja)"
                        class="col-lg-3 col-sm-6 wow fadeInUp" v-for="meja in filter_ongoing" :key="meja.id_meja"
                        data-wow-delay="0.3s">
                        <div class="service-item rounded pt-3 text-light">
                          <div class="p-4">
                            <i class="fa fa-3x fa-utensils text-primary mb-4 text"></i>
                            <h5>Meja : {{ meja.nomor_meja }}</h5>
                            <p>
                              <span v-if="meja.status == 'digunakan'" class="badge bg-danger">Di Gunakan</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal fade" id="finish" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          SELESAIKAN TRANSAKSI
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form @submit.prevent="selesaitransaksi">
                        <div class="modal-body">
                          <span style="font-family: 'Times New Roman', Times, serif">ATAS NAMA:
                            <b>{{ detail_ongoing.nama_pelanggan }}</b>
                          </span>
                          <br />
                          <span style="font-family: 'Times New Roman', Times, serif">TOTAL HARGA: <b>{{ totalharga }}</b>
                          </span>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Selesai
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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

export default {
  data() {
    return {
      ongoing: {},
      totalharga: "",
      detail_ongoing: {},
      cari_meja: "",
    };
  },
  mounted() {
    this.getongoing();
    this.gettotalharga();
  },
  computed: {
    filter_ongoing() {
      let filtered = this.ongoing;
      if (this.cari_meja) {
        filtered = filtered.filter((meja) =>
          meja.nomor_meja
            .toString()
            .toLowerCase()
            .includes(this.cari_meja.toLowerCase())
        );
      }
      return filtered;
    },
  },

  methods: {
    getongoing() {
      axios.get("http://localhost:8000/api/ongoing").then(({ data }) => {
        console.log(data);
        this.ongoing = data;
      });
    },
    handleclick(meja) {
      this.getdetailtransaksi(meja);
      this.gettotalharga(meja);
    },
    getdetailtransaksi(meja) {
      axios
        .get("http://localhost:8000/api/ongoing_transaksi/" + meja.id_meja)
        .then(({ data }) => {
          console.log(data);
          this.detail_ongoing = data;
        });
    },
    gettotalharga(meja) {
      axios
        .get("http://localhost:8000/api/totalharga/" + meja.id_meja)
        .then(({ data }) => {
          console.log(data);
          this.totalharga = data;
        });
    },
    selesaitransaksi() {
      swal({
        icon: "warning",
        title: "Complete the transaction?",
        dangerMode: true,
        buttons: true,
      }).then((response) => {
        if (response) {
          axios
            .put(
              "http://localhost:8000/api/done/" +
              this.detail_ongoing.id_meja,
              this.detail_ongoing.id_meja
            )
            .then((response) => {
              console.log(response);
              swal({
                icon: "success",
                title: "Success",
              });
              setTimeout(() => {
                location.href =
                  "/nota/" + this.detail_ongoing.id_keranjang;
              }, 1200);
            })
            .catch((error) => {
              console.log(error);
              swal({
                title: "Failed",
                icon: "error",
              });
            });
        }
      });
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
