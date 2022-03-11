<template>
    <div class="axios">
        <button @click="request"> axios</button>
        <div>{{ name }}</div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            name:''
        }
    },
    methods: {
        request() {
            this.$http.get("/data").then((res) => {
                console.log(res);
                this.name = res.data.name
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
