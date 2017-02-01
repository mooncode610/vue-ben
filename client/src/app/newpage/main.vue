
<script>
  import { mapActions, mapState } from 'vuex'
  import axios from 'axios'

  export default {
    /**
    * Components name to be displayed on
    * Vue.js Devtools
    */
    name: 'CcCategories',

    data: function(){
      return {
        jdata: [], 
        selectedID: null, 
        Title: null,
        Body: null,
        editID: null,
        editTitle: null,
        editBody: null,
        canvasshow: false,
        editshow: false
      }
    },

    methods: {
      EditItem(index, title, body) {
        this.editshow = true
        this.editID = index
        this.editTitle = title
        this.editBody = body
        console.log(index, title, body)
      },

      CancelEdit() {
        this.editshow = false
      },

      SaveEdit() {
        this.editshow = false
        let vuecomp = this
        let url = 'http://jsonplaceholder.typicode.com/posts/' + this.editID
        axios({
          method: 'put',
          url: url,
          data: {
            title: vuecomp.editTitle,
            body: vuecomp.editBody
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      DeleteItem(index, rows) {
        console.log(index);
        let vuecomp = this
        let url = 'http://jsonplaceholder.typicode.com/posts/' + index
        axios({
          method: 'delete',
          url: url,
          data: {
            title: vuecomp.Title,
            body: vuecomp.Body
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        rows.splice(index, 1);
      },

      GetRequest(url, vuecomp) {
        console.log(url)
        vuecomp.canvasshow = true
        axios.get(url)
          .then(function (response) {
            console.log(response.data);
            vuecomp.canvasshow = false
            if (response.data.constructor === Array) {
              vuecomp.jdata = response.data
            } else {
              vuecomp.jdata = new Array(response.data)
            }
            // this.jdata = response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      GetAllData() {
        this.canvasshow = true
        let vuecomp = this
        let url     = 'http://jsonplaceholder.typicode.com/posts/'
        this.selectedID = null;
        this.Title = null;
        this.Body = null;
        this.GetRequest(url, vuecomp)
      },

      GetByID() {
        this.canvasshow = true
        let vuecomp = this
        let url     = 'http://jsonplaceholder.typicode.com/posts/' + vuecomp.selectedID
        this.GetRequest(url, vuecomp)
      },

      CreateItem() {
        console.log(this.Title)
        if (this.Title == null || this.Body == null) {
          alert('Please fill Title and Body inputbox...')
        } else {
          let vuecomp = this
          let url = 'http://jsonplaceholder.typicode.com/posts/'
          axios({
            method: 'post',
            url: url,
            data: {
              title: vuecomp.Title,
              body: vuecomp.Body
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },

      test() {
        this.editshow = true
      }
    },
  }
</script>

<template>
  <div>
    <div class="row">
      <div id="canvas" v-show="canvasshow"></div>
      <div id="canvas" v-show="editshow">
        <div id="editForm">
          <p>TITLE</p>
          <input type="text" v-model="editTitle" class="title"><br>
          <p>BODY</p>
          <input type="text" v-model="editBody" class="body"><br>
          <button @click="SaveEdit" type="default" id="allbut">Save</button>
          <button @click="CancelEdit" type="default" id="allbut">Cancel</button>
        </div>
      </div>
      <div>
        <h1>This is New Page from <b>Jacob</b></h1>
        <h2>Data Source : <b><i>jsonplaceholder.typicode.com/posts</i></b></h2>
        <form id="createForm">
          <input type="text" v-model="Title" class="title" placeholder="Title"><br>
          <textarea type="text" v-model="Body" clas="body" placeholder="Body"></textarea><br>
          <button @click="CreateItem" type="default" id="allbut">Create</button>
        </form>
        <div>
          <button @click="GetAllData" type="default" id="allbut">Get All</button>
          <span>Get by ID...</span>
          <input v-on:change="GetByID" type="number" min="1" max="100" v-model="selectedID">
          <el-table
            :data="jdata"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="title"
              label="Title"
              width="180">
            </el-table-column>
            <el-table-column
              prop="body"
              label="Body">
            </el-table-column>
            <el-table-column
              label=""
              width="50">
              <template scope="scope">
                <el-button
                  @click="EditItem(scope.row.id, scope.row.title, scope.row.body)"
                  type="text"
                  size="small">
                  Edit
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              label=""
              width="70">
              <template scope="scope">
                <el-button
                  @click.native.prevent="DeleteItem(scope.row.id-1, jdata)"
                  type="text"
                  size="small">
                  Remove
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 100;
  }
  #createForm {
    background: #eee;
    padding: 20px;
    width: 400px;
    height: 145px;
    margin: 20px 0;
  }
  #createForm * {
    width: 100%;
  }
  #editForm {
    background: #eee;
    float: left;
    padding: 20px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  #allbut {
    float: right;
  }
  tbody {
    text-align: left;
  }
</style>
