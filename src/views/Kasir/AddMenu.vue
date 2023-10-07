<template>
  <div class="super_container">
    <!-- Header -->

    <header class="header">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="header_content d-flex flex-row align-items-center justify-content-start">
              <div class="logo">
                <a href="#">
                  <div>The Venue</div>
                  <div>restaurant</div>
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
          <li><a href="/kasir">home</a></li>
          <li><a href="/keranjang">cart</a></li>
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
      <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src="/images/home.jpg"
        data-speed="0.8"></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title">
                  <h1>The Menu</h1>
                </div>
              </div>
              <input type="text" class="form-control mb-4" v-model="carimenu" placeholder="Search menu..." />
              <!-- <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
                <div class="row g-4 mb-5" v-for="menu in filter_menu" :key="menu.id_menu">
                  <div class="col-lg-6">
                    <div class="d-flex align-items-center">
                      <img class="flex-shrink-0 img-fluid rounded" :src="'http://localhost/api_cafe/public/images/' + menu.foto
                        " alt="" style="width: 80px" />
                      <div class="w-100 d-flex flex-column text-start ps-4">
                        <h5 class="d-flex justify-content-between border-bottom pb-2">
                          <span style="color: white" class="ai-font-bold">{{ menu.nama_menu }}
                            <button class="btn btn-outline-primary text" data-bs-toggle="modal" @click="getdetail(menu)"
                              data-bs-target="#addmenu">
                              <i class="bi bi-cart-plus-fill">pesan</i>
                            </button></span>

                          <span class="text-light">Rp.{{ menu.harga }}</span>
                        </h5>
                        <small class="fst-italic text-light">{{ menu.jenis }} , {{ menu.deskripsi }} </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->

              <div class="cart-menu">
                <div class="container">
                  <div class="row g-4 mb-5" v-for="menu in filter_menu" :key="menu.id_menu">
                    <div class="col-12">
                      <div class="d-flex align-items-center">
                        <img class="flex-shrink-0 img-fluid rounded"
                          :src="'http://localhost/api_cafe/public/images/' + menu.foto" alt="" style="width: 150px" />
                        <div class="w-100 d-flex flex-column text-start ps-4">
                          <h5 class="d-flex justify-content-between border-bottom pb-2">
                            <span style="color: white" class="ai-font-bold">{{ menu.nama_menu }}
                              <button class="btn btn-outline-success text" data-bs-toggle="modal" @click="getdetail(menu)"
                                data-bs-target="#addmenu">
                                <i class="bi bi-cart-plus-fill" style="color: white;">pesan</i>
                              </button></span>

                            <span class="text-light">Rp.{{ menu.harga }}</span>
                          </h5>
                          <small class="fst-italic text-light">{{ menu.jenis }} , {{ menu.deskripsi }} </small>
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
    </div>
    <div class="modal fade" id="addmenu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">ADD MENU</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="addtocart">
            <div class="modal-body">
              <label for="nama">Nama:</label>
              <input type="text" class="form-control" v-model="detailmenu.nama_menu" />
              <input type="hidden" v-model="detailmenu.id_menu" />

              <label for="jumlah">Jumlah:</label>
              <input type="number" class="form-control" v-model="jumlah" required />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">Add to cart</button>
            </div>
          </form>
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
      menu: {},
      datamenu: {},
      detailmenu: {
        nama: "",
        id_menu: "",
      },
      jumlah: "",
      foto: "",
      image: "",
      carimenu: "",
    };
  },
  mounted() {
    this.getmenu();
    this.getdetail();
    this.getcart();
  },
  computed: {
    filter_menu() {
      let filter_data = this.datamenu;
      if (this.carimenu) {
        filter_data = filter_data.filter((menu) =>
          menu.nama_menu
            .toString()
            .toLowerCase()
            .includes(this.carimenu.toLowerCase())
        );
      }
      return filter_data;
    },
  },
  methods: {
    getmenu() {
      axios.get("http://localhost:8000/api/getmenu").then(({ data }) => {
        this.datamenu = data;
      });
    },
    getdetail(menu) {
      axios
        .get("http://localhost:8000/api/getmenu/" + menu.id_menu)
        .then((response) => {
          console.log(response);
          this.detailmenu.id_menu = response.data[0].id_menu;
          this.detailmenu.nama_menu = response.data[0].nama_menu;
          this.detailmenu.jenis = response.data[0].jenis;
          this.detailmenu.harga = response.data[0].harga;
        });
    },
    addtocart() {
      let datamenu = {
        id_menu: this.detailmenu.id_menu,
        total_pesanan: this.jumlah,
      };

      axios
        .post("http://localhost:8000/api/pesan", datamenu)
        .then((response) => {
          console.log(response);
          swal({
            icon: "success",
            title: "success",
            button: true,
          });
          setTimeout(() => {
            location.href = "/transaksi";
          }, 1100);
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

<style>
.cart-menu {
  max-height: 300px;
  overflow-y: auto;
}
</style>