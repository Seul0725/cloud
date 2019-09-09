import React, { Component } from 'react';
import styles from './market.less';
import { Tabs, Row, Col, Table } from 'antd';
import router from 'umi/router';
import parseDate from '@/filter'
import { connect } from 'dva';

const { TabPane } = Tabs;

class MarketTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            params: this.props.location.params
        }
    }
    componentDidMount = () => {
        const dataSource = [];
        for (let key in this.state.params) {
            dataSource[key] = this.state.params[key]
        }
        this.setState({
            dataSource: [...this.state.dataSource, dataSource]
        })
    }
    toBack = () => {
        router.push('/market');
    }
    render() {
        const { params } = this.state;
        const columns = [
            {
                title: '订单分成比例',
                dataIndex: 'ratio',
                align: 'center',
            },
            {
                title: '账户余额',
                dataIndex: 'accountCapital',
                align: 'center',
            },
            {
                title: '推广商家数',
                dataIndex: 'allBusinesNum',
                align: 'center',
            },
            {
                title: '累计分成金额',
                dataIndex: 'totalDeposits',
                align: 'center',
            },
        ];
        return (
            <div className={styles.content}>
                <div onClick={this.toBack} style={{ float: 'right', cursor: 'pointer', color: 'skyblue' }}>返回</div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="推广员详情" key="1">
                        <p>【基本信息】</p>
                        <Row>
                            <Col span={8} offset={4}>
                                推广员ID：{params.id}
                            </Col>
                            <Col span={8} offset={4}>
                                用户名：{params.username}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={8} offset={4}>
                                QQ：{params.qq}
                            </Col>
                            <Col span={8} offset={4}>
                                手机号：{params.telephone}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={8} offset={4}>
                                微信号：{params.wxid}
                            </Col>
                            <Col span={8} offset={4}>
                                注册时间：{parseDate(params.registerTime)}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={8} offset={4}>
                                上次登录时间：{params.lastLoginTime}
                            </Col>
                            <Col span={8} offset={4}>
                                备注：{params.comment}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="账户信息" key="2">
                        <Table rowKey="id" size="small"
                            pagination={
                                {
                                    total: 6,
                                    pageSize: 6,
                                    onChange: this.pageChange
                                }
                            }
                            bordered columns={columns}
                            dataSource={this.state.dataSource}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default connect(state => state)(MarketTabs);
