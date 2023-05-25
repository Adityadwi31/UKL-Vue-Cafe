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
                  <div>The Venue</div>
                  <div>restaurant</div>
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
                    data-bs-toggle="modal"
                    data-bs-target="#addmeja"
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
        data-image-src="images/menu.jpg"
        data-speed="0.8"
      ></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title"><h1>Manage Meja</h1></div>
                <!-- get data -->
                <table class="table table-transparent">
                  <thead>
                    <tr class="table-secondary text-dark">
                      <th>NO</th>
                      <th>Nomor meja</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="text-light"
                      v-for="(meja, nomor) in datameja"
                      :key="nomor"
                    >
                      <td>{{ nomor + 1 }}</td>
                      <td>{{ meja.nomor_meja }}</td>
                      <td>{{ meja.status }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#editmeja"
                          @click="getdetail(meja)"
                        >
                          Ubah
                        </button>
                        I
                        <button
                          type="button"
                          class="btn btn-danger btn btn-ouline"
                          @click="deletemeja(meja)"
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
      id="addmeja"
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
          <form @submit.prevent="addmeja">
            <div class="modal-body">
              <label for="nomor_meja">Nomor Meja</label>
              <input
                type="text"
                class="form-control"
                v-model="meja.nomor_meja"
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
    <!-- end add -->

    <!-- EDIT MEJA -->
    <div
      class="modal fade"
      id="editmeja"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">TABLE EDIT</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="saveedit">
            <div class="modal-body">
              <label for="nomor">Nomor Meja: </label>
              <input
                type="number"
                class="form-control"
                v-model="detailmeja.nomor_meja"
                required
              />

              <label for="status">Status: </label>
              <select
                class="form-control"
                v-model="detailmeja.status"
                id="status"
              >
                <option value="kosong">Kosong</option>
                <option value="digunakan">Di Pakai</option>
              </select>
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
    <!-- END EDIT MEJA -->
  </div>
</template>

<script>
import axios from "axios";
// import swal from 'sweetalert'

export default {
  data() {
    return {
      meja: {},
      datameja: {},
      detailmeja: {
        nomor_meja: "",
        status: "",
        id_meja: "",
      },
    };
  },
  mounted() {
    this.getmeja();
  },
  methods: {
    getmeja() {
      axios.get("http://localhost:8000/api/getmeja").then(({ data }) => {
        console.log(data);
        this.datameja = data;
      });
    },

    getdetail(meja) {
      axios
        .get("http://localhost:8000/api/getmeja/" + meja.id_meja)
        .then((response) => {
          console.log(response);
          this.detailmeja.nomor_meja = response.data[0].nomor_meja;
          this.detailmeja.id_meja = response.data[0].id_meja;
          this.detailmeja.status = response.data[0].status;
        });
    },

    addmeja() {
      axios
        .post("http://localhost:8000/api/createmeja", this.meja)
        .then((response) => {
          console.log(response);
          alert("Berhasil Tambah");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },

    saveedit() {
      axios
        .put(
          "http://localhost:8000/api/updatemeja/" + this.detailmeja.id_meja,
          this.detailmeja
        )
        .then((response) => {
          console.log(response);
          alert("Berhasil edit ");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },

    deletemeja(meja) {
      axios
        .delete(
          "http://localhost:8000/api/deletemeja/" + meja.id_meja
        )
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

