<template>
  <div>
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
                  <li><a href="/kasir">home</a></li>
                  <li><a href="/keranjang">on going</a></li>
                  <li><a href="/transaksi">transaksi</a></li>
                  <li><a href="#">histori</a></li>
                  <a href="/menu"
                    ><button class="btn btn-outline-light mb-4 mt-4">
                      pesan
                    </button></a
                  >
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
          <li><a href="/kasir">home</a></li>
          <li><a href="/keranjang">cart</a></li>
          <li><a href="/transaksi">transaksi</a></li>
          <li><a href="/histori">histori</a></li>
        </ul>
      </div>
      <div class="menu_reservations_phone ml-auto">
        Reservations: +62 812 5294 1705
      </div>
    </div>

    <!-- Home -->

    <div class="home">
      <div
        class="parallax_background parallax-window"
        data-parallax="scroll"
        data-image-src="images/blog.jpg"
        data-speed="0.8"
      ></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title"><h1>Transaksi</h1></div>
                <!-- get -->
                <table class="table table-transparent">
                  <thead>
                    <tr class="table-secondary text-dark">
                      <th>NO</th>
                      <th>Menu</th>
                      <th>Jumlah</th>
                      <th>Total harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="text-light"
                      v-for="(menu, nomor) in cart"
                      :key="nomor"
                    >
                      <td>{{ nomor + 1 }}</td>
                      <td>{{ menu.nama_menu }}</td>
                      <td>{{ menu.total_pesanan }}</td>
                      <td>{{ menu.total_harga }}</td>
                      <td>
                        <button
                          class="btn btn-outline-danger"
                          @click="hapus(menu)"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  class="btn btn-outline-light mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#checkout"
                >
                  Check Out
                </button>
                <!--  -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- NEW TRANSAKSI -->
    <div
      class="modal fade"
      id="checkout"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Check Out</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="checkoutnow">
            <div class="modal-body">
              <label for="user">Kasir:</label>
              <select
                required
                class="form-control"
                v-model="checkout.id_user"
                id="user"
              >
                <option
                  v-for="nama in kasir"
                  :key="nama.id_user"
                  :value="nama.id_user"
                >
                  {{ nama.nama }}
                </option>
              </select>

              <label for="meja">Meja</label>
              <select
                required
                class="form-control"
                v-model="checkout.id_meja"
                id="meja"
              >
                <option
                  v-for="nomor in meja"
                  :key="nomor.id_meja"
                  :value="nomor.id_meja"
                >
                  {{ nomor.nomor_meja }}
                </option>
              </select>

              <label for="nama">Pelanggan:</label>
              <input
                type="text"
                class="form-control"
                v-model="checkout.nama_pelanggan"
                required
                autocomplete="off"
                placeholder="Masukkan nama pelanggan..."
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Check Out</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- END NEW TRANSAKSI -->
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data() {
    return {
      cart: {},
      kasir: {},
      meja: {},
      checkout: {},
    };
  },
  mounted() {
    this.getcart();
    this.getkasir();
    this.getmeja();
  },
  methods: {
    getkasir() {
      axios.get("http://localhost:8000/api/getkasir").then(({ data }) => {
        console.log(data);
        this.kasir = data;
      });
    },

    getmeja() {
      axios.get("http://localhost:8000/api/getmejakosong").then(({ data }) => {
        console.log(data);
        this.meja = data;
      });
    },
    
    getcart() {
      axios.get("http://localhost:8000/api/getcart").then(({ data }) => {
        console.log(data);
        this.cart = data;
      });
    },
    checkoutnow() {
      swal({
        title: "Are you sure?",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((checkout) => {
        if (checkout) {
          axios
            .put("http://localhost:8000/api/checkout", this.checkout)
            .then((response) => {
              console.log(response);
              swal({
                icon: "success",
                title: "Success",
              });
              setTimeout(() => {
                location.reload();
              }, 1200);
            })
            .catch((error) => {
              console.log(error);
              swal({
                title: "Failed Check Out",
                icon: "error",
                button: true,
              });
            });
        }
      });
    },
    hapus(menu) {
      axios.delete(
        "http://localhost:8000/api/deletetransaksi/" + menu.id_transaksi
      ).then((response) => {
          console.log(response);
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },
    // logout() {
    //   swal({
    //     icon: "warning",
    //     title: "Ingin Log Out?",
    //     dangerMode: true,
    //     buttons: true,
    //   }).then((response) => {
    //     if (response) {
    //       localStorage.removeItem("role");
    //       localStorage.removeItem("token");
    //       swal({
    //         icon: "success",
    //       });
    //       setTimeout(() => {
    //         location.href = "/";
    //       }, 1200);
    //     }
    //   });
    // },
  },
};
</script>