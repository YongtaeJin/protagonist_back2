<template>
    <div>
        Tet <br />
    
        {{ this.$vuetify.breakpoint.xs }}
        <br>

        {{ this.App.drawer }}
    </div>
</template>

<script>
export default {
    name :"ShopArgeeMag",
	title : "사업협약서관리",
    data() {
        return {
            drawer : false,
        }
    }
}
</script>

<style>

</style>