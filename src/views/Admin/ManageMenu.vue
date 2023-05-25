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
                  <li><a href="#"></a></li>
                  <li><a href="/admin">home</a></li>
                  <li><a href="/addmenu">menu</a></li>
                  <li><a href="/addmeja">meja</a></li>
                  <li><a href="/adduser">user</a></li>

                  <button
                    type="button"
                    class="btn btn-outline-light"
                    style="font-weight: bold"
                    data-bs-toggle="modal"
                    data-bs-target="#addmenu"
                  >
                    add
                  </button>
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
          <li><a href="/admin">home</a></li>
          <li><a href="/addmenu">menu</a></li>
          <li><a href="/addmeja">meja</a></li>
          <li><a href="/adduser">user</a></li>
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
        data-image-src="images/contact.jpg"
        data-speed="0.8"
      ></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title"><h1>Manage Menu</h1></div>
                <table class="table table-transparent">
                  <thead>
                    <tr class="table-secondary text-dark">
                      <th>No</th>
                      <th>Menu</th>
                      <th>Jenis</th>
                      <th>Deskripsi</th>
                      <th>Foto</th>
                      <th>Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="text-light"
                      v-for="(menu, nomor) in datamenu"
                      :key="nomor"
                    >
                      <td>{{ nomor + 1 }}</td>
                      <td>{{ menu.nama_menu }}</td>
                      <td>{{ menu.jenis }}</td>
                      <td>{{ menu.deskripsi }}</td>
                      <td>
                        <img
                          width="200"
                          :src="
                            'http://localhost/api_cafe/public/images/' +
                            menu.foto
                          "
                          alt=""
                        />
                      </td>
                      <td>{{ menu.harga }}</td>
                      <!-- <td>{{ menu.jumlah_pesan }}</td> -->
                      <td>
                        <button
                          type="button"
                          class="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#editmenu"
                          @click="getdetail(menu)"
                        >
                          Ubah
                        </button>
                        I
                        <button
                          type="button"
                          class="btn btn-danger btn btn-ouline"
                          @click="deletemenu(menu)"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- add -->
    <div
      class="modal fade"
      id="addmenu"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form @submit.prevent="Upload">
            <div class="modal-body">
              <label for="nama">Nama Menu</label>
              <input
                type="text"
                class="form-control"
                v-model="menu.nama_menu"
              />

              <label for="jenis">Jenis:</label>
              <select class="form-control" v-model="menu.jenis">
                <option value="makanan">makanan</option>
                <option value="minuman">minuman</option>
              </select>

              <label for="deskripsi">Deskripsi</label>
              <input
                type="text"
                class="form-control"
                v-model="menu.deskripsi"
              />

              <label for="harga">Harga</label>
              <input type="number" class="form-control" v-model="menu.harga" />

              <label for="formFileSm" class="form-label">Upload Foto</label>
              <input
                class="form-control form-control-sm"
                id="foto"
                type="file"
                @change="UploadFoto($event)"
                required
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
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- edit -->
    <div
      class="modal fade"
      id="editmenu"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form @submit.prevent="editmenu">
            <div class="modal-body">
              <label for="nama_menu">Nama :</label>
              <input
                type="text"
                class="form-control"
                v-model="detailmenu.nama_menu"
                required
                autocomplete="off"
              />

              <label for="jenis">jenis :</label>
              <select
                class="form-control"
                v-model="detailmenu.jenis"
                required
                id="jenis"
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
              </select>

              <label for="deskripsi">Deskripsi:</label>
              <input
                type="text"
                class="form-control"
                v-model="detailmenu.deskripsi"
                required
              />

              <label for="harga">Harga:</label>
              <input
                type="number"
                class="form-control"
                v-model="detailmenu.harga"
                required
              />
              <label for="foto">foto:</label> <br />
              <img
                width="200"
                :src="'http://localhost/api_cafe/public/images/' + this.foto"
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
              <button
                type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#editfoto"
              >
                Update Photo
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- edit -->

    <!-- EDIT FOTO -->
    <div
      class="modal fade"
      id="editfoto"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">UPDATE FOTO</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="savefoto">
            <div class="modal-body">
              <input
                type="file"
                class="form-control"
                @change="updatefoto($event)"
                id="foto"
                required
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- END EDIT FOTO -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: {},
      datamenu: {},
      detailmenu: {},
      foto: "",
      image: "",
    };
  },

  mounted() {
    this.getmenu();
    this.getdetail();
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
          this.foto = response.data[0].foto;
          this.detailmenu.jenis = response.data[0].jenis;
          this.detailmenu.deskripsi = response.data[0].deskripsi;
          this.detailmenu.harga = response.data[0].harga;
        });
    },
    UploadFoto(e) {
      this.foto = e.target.files[0];
    },
    Upload() {
      let form = new FormData();
      form.append("foto", this.foto);
      form.append("nama_menu", this.menu.nama_menu);
      form.append("jenis", this.menu.jenis);
      form.append("deskripsi", this.menu.deskripsi);
      form.append("harga", this.menu.harga);

      axios
        .post("http://localhost:8000/api/createmenu/", form)
        .then((response) => {
          console.log(response);
          alert("Berhasil tambah");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },

    editmenu() {
      axios
        .put(
          "http://localhost:8000/api/updatemenu/" + this.detailmenu.id_menu,
          this.detailmenu
        )
        .then((response) => {
          console.log(response);
          alert("Berhasil edit ");
          setTimeout(() => {
            location.reload();
          }, 1200);
        })
        .catch((error) => {
          console.error(error);
          alert("Gagal edit"); 
        });
    },

      

    updatefoto(e) {
      this.foto = e.target.files[0];
    },

    savefoto() {
      let form = new FormData();
      form.append("foto", this.foto);
      axios
        .post(
          "http://localhost:8000/api/updatefoto/" + this.detailmenu.id_menu,
          form
        )
        .then((response) => {
          console.log(response);
          alert("Berhasil edit ");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },

    deletemenu(menu) {
      axios
        .delete("http://localhost:8000/api/deletemenu/" + menu.id_menu)
        .then((response) => {
          console.log(response);
          alert("Berhasil delete ");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },
  },
};
</script>