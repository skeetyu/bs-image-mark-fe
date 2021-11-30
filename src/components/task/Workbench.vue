<template>
    <div class="workbench">
        <el-container>
            <el-header>
                <el-menu class="markmenu" mode="horizontal" text-color="#222" active-text-color="coral">
                    <el-menu-item>
                        <el-button type="primary" plain size="small">一个按钮</el-button>
                    </el-menu-item>
                    <el-menu-item>
                        <el-button type="primary" plain size="small">两个按钮</el-button>
                    </el-menu-item>
                    <el-menu-item>
                        <el-button type="primary" plain size="small">三个按钮</el-button>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <canvas id="mycanvas" width="940" height="570">
                <img src="../../assets/jingling2.jpg" alt="标注图片">
                </canvas>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Workbench',
        data () {
            return {
                imgUrl: ''
            }
        }
    }
</script>

<style scoped>
    .workbench{
        position: fixed;
        left: 180px;
        top: 80px;
    }

    .markmenu{
        /* position: fixed;
        top: 80px;
        left: 180px; */
        z-index: 5;
        width: 1000px;
        height: 60px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 10px #cac6c6;
    }

    /* .board{
       top:80px;
    }

    .picture {
        width: 230px;
        height: 172px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
    } */

    img {
        width: 230px;
        height: 172px;
        /*margin: 0 auto;*/
    }

    /* .title {
        font-size: 14px;
        text-align: center;
    } */
</style>
