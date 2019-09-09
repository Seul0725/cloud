import React from 'react';
import styles from './businessManage.less';
import { connect } from 'dva';
import { Button, Table, Icon, Input } from 'antd';

class BusinessManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        page: 0,
        pageSize: 6,
      },
      visible: false
    }
  }
  componentDidMount = () => {
    this.props.dispatch({ type: 'business/fetchBusines', payload: this.state.form })
  }
  pageChange = (page, pageSize) => {
    this.props.dispatch({ type: 'business/fetchBusines', payload: { page: page - 1, pageSize: 6 } });
    this.setState({
      ...this.state.form,
      page: page - 1
    })
  }
  changeInput = (attr, e) => {
    this.setState({
      form: {
        ...this.state.form,
        [attr]: e.target.value
      }
    })
  }
  toSearch = () => {
    this.props.dispatch({ type: 'business/fetchBusines', payload: this.state.form })
  }
  render() {
    const columns = [
      {
        title: '商家ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
        align: 'center',
      },
      {
        title: '手机',
        dataIndex: 'telephone',
        align: 'center',
      },
      {
        title: '推广员ID',
        dataIndex: 'agentId',
        align: 'center',
      },
      {
        title: '商家状态',
        dataIndex: 'status',
        align: 'center',
      },
      {
        title: '站点ID',
        dataIndex: 'siteId',
        align: 'center',
      },
    ];
    return (
      <div className={styles.content}>
        <p className={styles.title}>商户管理</p>
        <div className={styles.content_title}></div>
        <div className={styles.content_search}>
          <Input placeholder="推广员ID" onChange={this.changeInput.bind(this, 'id')} />
          <Input placeholder="手机号" onChange={this.changeInput.bind(this, 'telephone')} />
          <Input placeholder="QQ" onChange={this.changeInput.bind(this, 'qq')} />
          <Button icon="search" type="primary" onClick={this.toSearch}>搜索</Button>
        </div>
        <div className={styles.content_table}>
          <Table rowKey="id" size="small"
            pagination={
              {
                total: this.props.business.total,
                pageSize: 6,
                onChange: this.pageChange
              }
            }
            bordered columns={columns} dataSource={this.props.business.businesData} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(BusinessManage);