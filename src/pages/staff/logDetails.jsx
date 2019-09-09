import React, { Component } from 'react';
import styles from './staff.less';
import router from 'umi/router';
import { Row, Col } from 'antd'

export default class logDetails extends Component {
    toStaff = (e) => {
        e.preventDefault();
        router.push('/staff');
    }
    render() {
        const { params } = this.props.location;
        return (
            <div className={styles.content}>
                <p className={styles.title}>日志
                 <a onClick={this.toStaff} style={{ float: 'right', fontSize: '14px' }}>返回</a>
                </p>
                <div className={styles.content_title}></div>
                <div className={styles.inner}>
                    <p>【基本信息】</p>
                    <Row>
                        <Col span={8} offset={4}>
                            推广员ID：{params.id}
                        </Col>
                        <Col span={8} offset={4}>
                            用户名：{params.username}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
