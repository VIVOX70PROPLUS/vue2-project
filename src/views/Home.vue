<template>
  <el-row>
    <el-col :span="8"
            style="padding-right: 10px">
      <!--      左侧上边卡片     -->
      <el-card class="box-card">
        <!-- 卡片上面部分 -->
        <div class="user">
          <img src="../assets/images/user.png"
               alt="用户">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <!-- 卡片上面部分 -->
        <!-- 卡片下面部分 -->
        <div class="login-info">
          <p>上次登录时间:<span>2022-12-21</span></p>
          <p>上次登录地点:<span>汕头</span></p>
        </div>
        <!-- 卡片下面部分 -->
      </el-card>
      <!--      左侧上边卡片      -->
      <!--      左侧下边卡片      -->
      <el-card style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column v-for="(item, i) in Object.keys(tableData[0])"
                           :key="item"
                           :prop="item"
                           :label="tableLabel[i]">
          </el-table-column>

        </el-table>
      </el-card>
      <!--   左侧下边卡片   -->
    </el-col>
    <el-col :span="16"
            style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData"
                 :key="item.name"
                 :body-style="{display: 'flex', padding: 0}">
          <i class="icon"
             :class="`el-icon-${item.icon}`"
             :style="{background: item.color}"></i>
          <div class="detail">
            <p class="price">￥{{item.value}}</p>
            <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 360px">
        <!-- 折线图 -->
        <div ref="echarts1"
             style="height: 360px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2"
               style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3"
               style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api'
// import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [1],
      tableLabel: ["课程", "今日购买", "本月购买", "总购买"],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ]
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData, orderData, userData, videoData } = data.data
      this.tableData = tableData
      // 基于准备好的dom，初始化echarts实例
      var echarts1 = echarts.init(this.$refs.echarts1);
      const xAxis = Object.keys(orderData.data[0]);
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 堆叠折线图'
        },
        tooltip: {},
        legend: {
          data: xAxis
        },
        xAxis: {
          data: orderData.date
        },
        yAxis: {},
        series: []
      };
      xAxis.forEach(key => {
        option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(option);

      //柱状图
      var echarts2 = echarts.init(this.$refs.echarts2)
      var option2 = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }
        ]
      }
      echarts2.setOption(option2)

      //饼状图
      var echarts3 = echarts.init(this.$refs.echarts3)
      var option3 = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ]
      }
      echarts3.setOption(option3)
    })
  }
}
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 80px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30px;
      line-height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>