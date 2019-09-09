import React from 'react';
import styles from './logs.less';
import { connect } from 'dva';
import { Input, Button, Table } from 'antd';
import parseDate from '@/filter'

class Logs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        page: 0,
        pageSize: 6
      }
    }
  }
  componentDidMount = () => {
    this.props.dispatch({ type: 'logs/fetchLogs', payload: this.state.form })
  }
  pageChange = (page, pageSize) => {
    this.props.dispatch({ type: 'logs/fetchLogs', payload: { page: page - 1, pageSize: 6 } });
    this.setState({
      ...this.state.form,
      page: page - 1
    })
  }

  changeInput = (attr, e) => {
    // console.log(e.target.value);
    this.setState({
      form: {
        ...this.state.form,
        [attr]: e.target.value
      }
    })
  }
  // 搜索
  toSearch = () => {
    this.props.dispatch({ type: 'logs/fetchLogs', payload: this.state.form });
  }

  render() {
    const columns = [
      {
        title: '日志ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '操作者ID',
        dataIndex: 'userId',
        align: 'center',
      },
      {
        title: '内容',
        dataIndex: 'actionContent',
        align: 'center',
      },
      {
        title: '操作时间',
        dataIndex: 'actionTime',
        align: 'center',
        render: (text, record) => {
          return <div>{parseDate(text)}</div>
        }
      },
    ];
    return (
      <div className={styles.content}>
        <p className={styles.title}>日志管理</p>
        <div className={styles.content_title}></div>
        <div className={styles.content_search}>
          <Input placeholder="操作者ID" onChange={this.changeInput.bind(this, "userId")} />
          <Button icon="search" type="primary" onClick={this.toSearch}>搜索</Button>
        </div>
        <div className={styles.content_table}>
          <Table rowKey="id" size="small"
            pagination={
              {
                total: this.props.logs.total,
                pageSize: 6,
                onChange: this.pageChange
              }
            }
            bordered columns={columns} dataSource={this.props.logs.logsData} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Logs);