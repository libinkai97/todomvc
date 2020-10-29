<template>
  <div id="app">
    <section class="todoapp"> 
        <AddTodo @addTodo="addTodo"></AddTodo>
      <section class="main" style="">
        <input type="checkbox" class="toggle-all" 
        :checked="isAllDone" @click="toggelAllTodo(!isAllDone)">
        <ul class="todo-list">
          <ListTodo v-for="(item, index) in filterTodo" 
          :todo="item" 
          :delTodo="delTodo"
          :toggleTodo="toggleTodo"
          :editTodo="editTodo"></ListTodo>
        </ul>
      </section>
      <footer class="footer" style="">
        <span class="todo-count"><strong>{{unDoneNumber}}</strong> items left</span>
        <ul class="filters">
          <li><a href="" class="{selected:visibility=='all'}" @click.prevent="changeVisibility('all')">all</a></li>
          <li><a href="" class="{selected:visibility=='active'}" @click.prevent="changeVisibility('active')">active</a></li>
          <li><a href="" class="{selected:visibility=='completed'}" @click.prevent="changeVisibility('completed')">completed</a></li>
        </ul>
        <button class="clear-completed" v-show="todos.length>unDoneNumber" @click="delDone">clear completed</button>
      </footer>
    </section>
  </div>
</template>

<script>
import ListTodo from "./components/ListTodo";
import AddTodo from "./components/AddTodo";
import localStroge from "./utils/localStroge";
require("./assets/todo-mvc.css");
export default {
  name: "App",
  data() {
    // return {
    //   todos: [
    //     { text: "学习vue", done: false },
    //     { text: "学习reach", done: true },
    //     { text: "学习小程序", done: false },
    //     { text: "学习uniapp", done: false },
    //   ],
    //   visibility:"all"
    // };
    return localStroge.get()
  },
  computed:{
    isAllDone(){
      let rs = this.todos.every(item=>item.done == true)
      return rs;
    },
    unDoneNumber(){
      let n=0;
      this.todos.forEach(item=>{
        if(item.done == false) n++;
      })
      return n
    },
    filterTodo(){
      if(this.visibility == "all"){
        return this.todos
      }else if(this.visibility == "active"){
        return this.todos.filter(item=>item.done == false)
      }else if(this.visibility == "completed"){
        return this.todos.filter(item=>item.done == true)
      }
    }
  },
  methods:{
    addTodo(todo){
      this.todos.push(todo);
      localStroge.save({todos:this.todos,visibility:this.visibility})
    },
    delTodo(todo){
      let index = this.todos.findIndex(item=>item==todo);
      if(index != -1){
        this.todos.splice(index,1)
      }
    },
    toggleTodo(todo){
      // console.log("toggleTodo")
      let index = this.todos.findIndex(item=>item==todo);
      this.todos[index].done = !todo.done;
    },
    toggleAllTodo(flag){
      this.todos.forEach(item => item.done = flag);
    },
    delDone(){
      let rs = this.todos.filter(item=>item.done == false)
      this.todos = rs;
    },
    changeVisibility(v){
      this.visibility = v;
    },
    editTodo(obj){
      // console.log(obj)
      let index = this.todos.findIndex(item=>item==obj.todo);
      if(index != -1){
        this.todos[index].text = obj.txt;
      }
    }
  },
  watch:{
    deep:true,
    todos(){
      localStroge.save({todos:this.todos,visibility:this.visibility})
    },
    visibility(){
      localStroge.save({todos:this.todos,visibility:this.visibility})
    },
  },
  components: {
    ListTodo,AddTodo
  },
};
</script>