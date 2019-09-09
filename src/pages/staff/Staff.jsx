import React from 'react';
import styles from './staff.less';
import { connect } from 'dva';
import router from 'umi/router'
import { Input, Select, Button, Table, Pagination, Icon } from 'antd';
const { Option } = Select;

class Staff extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        page: 0,
        pageSize: 6
      }
    }
  }
  toLogs = (record) => {
    router.push({
      pathname: '/staff/logDetails',
      params: record
    });
  }
  componentDidMount = () => {
    this.props.dispatch({ type: 'staff/fetchStaff', payload: this.state.form })
  }
  pageChange = (page, pageSize) => {
    this.props.dispatch({ type: 'staff/fetchStaff', payload: { page: page - 1, pageSize: 6 } });
    this.setState({
      form: {
        ...this.state.form,
        page: page - 1
      }
    })
  }
  changeStatus = (record) => {
    if (record.enabled) {
      this.props.dispatch({ type: 'staff/fetchChangeStatus', payload: { form: this.state.form, forms: { id: record.id, enabled: false } } })
    } else {
      this.props.dispatch({ type: 'staff/fetchChangeStatus', payload: { form: this.state.form, forms: { id: record.id, enabled: true } } })
    }
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
  statusSearch = (value) => {
    this.setState({
      form: {
        ...this.state.form,
        enabled: value
      }
    })
  }
  // 搜索
  toSearch = () => {
    // console.log(this.state.form)
    this.props.dispatch({ type: 'staff/fetchStaff', payload: this.state.form });
  }

  render() {
    const columns = [
      {
        title: '员工ID',
        dataIndex: 'id',
        align: 'center',
        render: text => <a>{text}</a>,
      },
      {
        title: '所属分站',
        dataIndex: 'siteVM.name',
        align: 'center',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: '真实姓名',
        dataIndex: 'realname',
        align: 'center',
      },
      {
        title: '手机号',
        dataIndex: 'telephone',
        align: 'center',
      },
      {
        title: 'QQ号',
        dataIndex: 'qq',
        align: 'center',
      },
      {
        title: '上次登录时间',
        dataIndex: 'lastLoginTime',
        align: 'center',
      },
      {
        title: '上次登录IP',
        dataIndex: 'lastLoginIp',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: '',
        align: 'center',
        render: (text, record) => {
          if (record.enabled) {
            return <div>正常</div>
          } else {
            return <div>停用</div>
          }
        }
      },
      {
        title: '操作',
        dataIndex: '',
        align: 'center',
        render: (text, record) => {
          if (record.enabled) {
            return (
              <div>
                <Icon type="check-circle" title="启用" onClick={this.changeStatus.bind(this, record)} style={{ color: 'green', marginRight: '5px' }} />
                <Icon type="file-text" title="查看日志" onClick={this.toLogs.bind(this, record)} />
              </div>
            );
          } else {
            return (
              <div>
                <Icon type="stop" title="禁用" onClick={this.changeStatus.bind(this, record)} style={{ color: 'red', marginRight: '5px' }} />
                <Icon type="file-text" title="查看日志" onClick={this.toLogs.bind(this, record)} />
              </div>
            );
          }
        }
      },
    ];
    return (
      <div className={styles.content}>
        <p className={styles.title}>员工管理</p>
        <div className={styles.content_title}></div>
        <div className={styles.content_search}>
          <Input placeholder="员工ID" onChange={this.changeInput.bind(this, "id")} />
          <Input placeholder="用户名" onChange={this.changeInput.bind(this, "username")} />
          <Input placeholder="手机号" onChange={this.changeInput.bind(this, "telephone")} />
          <Select placeholder="状态" onChange={this.statusSearch} style={{ width: 120, marginRight: '0.5em' }} >
            <Option value="1">正常</Option>
            <Option value="0">停用</Option>
          </Select>
          <Button icon="search" type="primary" onClick={this.toSearch}>搜索</Button>
        </div>
        <div className={styles.content_table}>
          <Table rowKey="id" size="small"

            pagination={
              {
                total: this.props.staff.total,
                pageSize: 6,
                onChange: this.pageChange
              }
            }
            bordered columns={columns} dataSource={this.props.staff.staffData} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Staff);