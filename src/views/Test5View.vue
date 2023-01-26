<template>
    <div>
        Chart.js
        <div style="width: 800px;"><canvas id="acquisitions"></canvas></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data: ['1', '3', '5', '7', '9']
            }
        },
        mounted(){
            this.reduce()
            this.forOf()
            this.for()
        },
        methods: {
            reduce(){
                const sum = this.data.reduce((acc, element) =>
                    acc + parseInt(element), 0);
                console.log('reduce() = ', sum)
            },
            forOf(){
                let sum = 0;
                for (const element of this.data) {
                    sum += parseInt(element);
                }
                console.log('forOf() = ', sum)
            },
            for(){
                let sum = 0;
                for (let i = 0; i < this.data.length; i++) {
                    sum += parseInt(this.data[i]);
                }
                console.log('for() = ', sum)
            }
        },
    }

</script>

<style lang="scss" scoped>

</style>