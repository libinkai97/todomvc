<template>
    <header class="header">
        <h1>todos</h1>
        <input
          type="text"
          v-model="text"
          placeholder="套你猴子"
          class="new-todo"
          @keyup.enter="add"
        />
      </header>
</template>

<script>
export default {
    name:"AddTodo",
    data(){
        return{
            text:""
        }
    },
    methods:{
        add(){
            this.$emit("addTodo",{text:this.text,done:false})
            this.text="";
        }
    }
}
</script>