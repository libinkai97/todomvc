<template>
  <li class="todo" :class="{completed:todo.done,editing:isEdit}">
    <div class="view">
      <input type="checkbox" class="toggle" 
      style="border:2px solid #ccc; border-radius:50%"
      @click=toggleTodo(todo)>
      <label @dblclick="isEdit=true">{{todo.text}}</label>
      <button class="destroy" @click="delTodo(todo)"></button>
    </div>
    <input type="text" class="edit" v-show="isEdit" :value="todo.text"
           @keydown.enter="finishEdit(todo)" @blur="finishEdit(todo)" ref="content">
  </li>
</template>

<script>
export default {
    name:"ListTodo",
    data(){
      return{
        isEdit:false,
      }
    },
    props:{
        todo:{
            type:Object,
            require:true
        },
        delTodo:{
          type:Function,
        },
        toggleTodo:{
          type:Function,
        },
        editTodo:{
          type:Function,
        }
    },
    methods:{
      finishEdit(todo){
        let newText = this.$refs.content.value.trim();
        this.editTodo({todo,txt:newText})
        this.isEdit = false;
      }
    }
}
</script>