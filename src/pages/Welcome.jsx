import React, { Component } from 'react';
import styles from './welcome.less';
import { Card, DatePicker } from 'antd';
import Highcharts from 'highcharts';
const { RangePicker } = DatePicker;

export default class Welcome extends Component {
  componentDidMount = () => {
    Highcharts.chart("container", {
      chart: {
        type: 'line'
      },
      title: {
        text: '订单和商家数据'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: ['9月13日', '9月14日', '9月15日', '9月16日', '9月17日', '9月18日',
          '9月19日', '9月20日', '9月21日', '9月22日', '9月23日', '9月24日']
      },
      yAxis: {
        title: {
          text: ''
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: '当日发布订单量',
        marker: {
          symbol: 'square'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: '当日注册商家数',
        marker: {
          symbol: 'diamond'
        },
        data: [
          3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
    });
  }
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.card}>
          <Card style={{ width: 220, backgroundColor: "#27A9E3" }}>
            <p>今日放单商家数：320家</p>
            <p>今日注册商家数：28家</p>
            <p>总注册商家数：32家</p>
          </Card>
          <Card style={{ width: 220, backgroundColor: "#28B779" }}>
            <p>今日放单量：320单</p>
            <p>进行中刷单：28单</p>
            <p>待接订单量：32单</p>
          </Card>
          <Card style={{ width: 220, backgroundColor: "#FFB748" }}>
            <p>总注册推广员：320人</p>
            <p>总推广订单：28单</p>
            <p>总推广分成：32</p>
          </Card>
          <Card style={{ width: 220, backgroundColor: "#2255A4" }}>
            <p>今日收入：320元</p>
            <p>待结算收入：28元</p>
            <p>累计结算收入：32元</p>
          </Card>
        </div>
        <div className={styles.time}>
          <RangePicker />
        </div>
        <div id="container" style={{ minWidth: 400, height: 400 }}></div>
      </div >
    )
  }
}
