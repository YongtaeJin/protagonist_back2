<template>
    <v-container fluid>     
        <v-toolbar >
            <v-toolbar-title>사용자 관리</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>       
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mr-2" @click="openDialog()">사용자 추가</v-btn>
        </v-toolbar>
    </v-container>
</template>

<script>
export default {
    name: "SysUsers",
}
</script>

<style>

</style>