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
                  <div>Cafe</div>
                </a>
              </div>
              <nav class="main_nav">
                <ul class="d-flex flex-row align-items-center justify-content-start">
                  <li> <router-link to="/admin">home</router-link></li>
                  <li> <router-link to="/CURDmeja">meja</router-link></li>
                  <li> <router-link to="/CURDmenu">menu</router-link></li>
                  <li> <router-link to="/CURDuser">user</router-link></li>
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
      <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src="images/menu.jpg"
        data-speed="0.5"></div>
      <div class="home_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_content text-center">
                <div class="home_subtitle page_subtitle">Wikusama Cafe</div>
                <div class="home_title">
                  <h1>Manage user</h1>
                </div>
                <div>
                  <button type="button" class="btn btn-outline-light mt-2" data-bs-toggle="modal" data-bs-target="#adduser">
                    Add User
                  </button>
                </div>
                <div><br></div>
                <!-- getuser -->
                <div class="table-responsive table-container" style="overflow: auto;">
                <table class="table table-transparent">
                  <thead>
                    <tr class="table-secondary text-dark">
                      <th>NO</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Gender</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-light" v-for="(user, nomor) in datauser" :key="nomor">
                      <td>{{ nomor + 1 }}</td>
                      <td>{{ user.nama }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.role }}</td>
                      <td>{{ user.gender }}</td>
                      <td>
                        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#edituser"
                          @click="getdetail(user)">
                          Ubah
                        </button>
                        I
                        <button type="button" class="btn btn-danger btn btn-ouline" @click="deleteuser(user)">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <!-- Button trigger modal -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal add -->
    <div class="modal fade" id="adduser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">ADD USER</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <form @submit.prevent="adduser">
            <div class="modal-body">
              <label for="nama">Nama User</label>
              <input type="text" class="form-control" v-model="user.nama" placeholder="Masukkan nama..." />

              <label for="email">Email</label>
              <input type="email" class="form-control" v-model="user.email" placeholder="Masukkan email..." />

              <label for="password">password</label>
              <input type="password" class="form-control" v-model="user.password" placeholder="Masukkan password..." />

              <label for="gender">Gender:</label>
              <select v-model="user.gender" id="" class="form-control">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>

              <label for="role">Role:</label>
              <select v-model="user.role" id="" class="form-control">
                <option value="admin">admin</option>
                <option value="kasir">kasir</option>
                <option value="manager">manager</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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
    <!-- end modal add-->

    <!-- modal update -->
    <div class="modal fade" id="edituser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <form @submit.prevent="edituser">
            <div class="modal-body">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" v-model="edit.nama" required autocomplete="off">

              <label for="email">Email</label>
              <input type="email" class="form-control" v-model="edit.email" required autocomplete="off" />

              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="edit.password" placeholder="isi untuk update password lama/ tidak perlu isi jika ingin password tetap"/>

              <label for="gender">Gender</label>
              <select class="form-control" v-model="edit.gender" required id="gender">
                <option value="L">laki-laki</option>
                <option value="P">Perempuan</option>
              </select>

              <label for="role">Role</label>
              <select class="form-control" v-model="edit.role" required id="role">
                <option value="kasir">Kasir</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button class="btn btn-primary" type="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- end modal update -->
  </div>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert'

export default {
  data() {
    return {
      user: {},
      datauser: {},
      edit: {
        nama: "",
      },
    };
  },
  mounted() {
    this.getuser();
  },
  methods: {
    getuser() {
      axios.get("http://localhost:8000/api/getuser").then(({ data }) => {
        console.log(data);
        this.datauser = data;
      });
    },

    getdetail(user) {
      axios
        .get("http://localhost:8000/api/getuser/" + user.id_user)
        .then((response) => {
          console.log(response);
          this.edit.id_user = response.data[0].id_user;
          this.edit.nama = response.data[0].nama;
          this.edit.email = response.data[0].email;
          this.edit.gender = response.data[0].gender;
          this.edit.role = response.data[0].role;
        });
    },

    adduser() {
      axios
        .post("http://localhost:8000/api/createuser", this.user)
        .then((response) => {
          console.log(response);
          alert("Berhasil Tambah user");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },

    edituser() {
      axios
        .put(
          "http://localhost:8000/api/updateuser/" + this.edit.id_user,
          this.edit
        )
        .then((response) => {
          console.log(response);
          alert("Berhasil edit user");
          setTimeout(() => {
            location.reload();
          }, 1200);
        });
    },

    deleteuser(user) {
      axios
        .delete("http://localhost:8000/api/deleteuser/" + user.id_user)
        .then((response) => {
          console.log(response);
          alert("Berhasil delete user");
          setTimeout(() => {
            location.reload();
          }, 1200);
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
          localStorage.removeItem("nama");
          localStorage.removeItem("id_user");
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
  .table-container {
    max-height: 320px;
    overflow-y: auto; 
  }
 
.form-control::placeholder {
  font-size: 10px; 
  color: #888; 
}

</style>


