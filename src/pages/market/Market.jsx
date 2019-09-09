import React from 'react';
import styles from './market.less';
import { Input, Button, Table, Icon, Modal } from 'antd';
import parseDate from '@/filter';
import { connect } from 'dva';
import MyForm from './MyForm';
import router from 'umi/router'

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        page: 0,
        pageSize: 6
      },
      visible: false,
      title: '',
      putForm: {},
      id: 0
    }
  }
  toTabs = (record, e) => {
    e.preventDefault();
    router.push({ pathname: '/market/tabs', params: record });
  }
  showModal = () => {
    this.setState({
      visible: true,
      title: '新增',
      putForm: {}
    });
  };
  toEdit = (record) => {
    this.setState({
      visible: true,
      title: '修改',
      putForm: record,
      id: record.id
    });
  }
  getForm = (form) => {
    this.form = form;
  }
  handleOk = e => {
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        values.roleId = 1;
        if (this.state.id) {
          values.id = this.state.id;
        }
        console.log(values, this.state.form);
        this.props.dispatch({ type: 'market/saveMarket', payload: { forms: values, page: this.state.form } })
      }
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount = () => {
    // console.log(this.state.form)
    this.props.dispatch({ type: 'market/fetchMarket', payload: this.state.form });
  }
  pageChange = (page, pageSize) => {
    this.props.dispatch({ type: 'market/fetchMarket', payload: { page: page - 1, pageSize: 6 } });
    this.setState({
      form: {
        ...this.state.form,
        page: page - 1
      }
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
    this.props.dispatch({ type: 'market/fetchMarket', payload: this.state.form });
  }
  render() {
    const columns = [
      {
        title: '推广员ID',
        dataIndex: 'id',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <a href="" onClick={this.toTabs.bind(this, record)}>{text}</a>
            </div>
          )
        }
      },
      {
        title: '用户名',
        dataIndex: 'username',
        align: 'center',
      },
      {
        title: '手机',
        dataIndex: 'telephone',
        align: 'center',
      },
      {
        title: 'QQ',
        dataIndex: 'qq',
        align: 'center',
      },
      {
        title: '微信',
        dataIndex: 'wxid',
        align: 'center',
      },
      {
        title: '账户余额',
        dataIndex: 'accountCapital',
        align: 'center',
      },
      {
        title: '订单分成比例',
        dataIndex: 'ratio',
        align: 'center',
      },
      {
        title: '上次登录时间',
        dataIndex: 'lastLoginTime',
        align: 'center',
        render: (text) => {
          return <div>{parseDate(text)}</div>
        }
      },
      {
        title: '状态',
        dataIndex: '',
        align: 'center',
        render: (text, record) => {
          if (record.enabled) {
            return <div><Icon type="smile" /> 正常</div>
          } else {
            return <div><Icon type="meh" /> 停用</div>
          }
        }
      },
      {
        title: '备注',
        dataIndex: 'comment',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: '',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Icon type="edit" title="编辑" onClick={this.toEdit.bind(this, record)} />
              <Icon type="transaction" title="结算" style={{ color: 'red', marginLeft: '5px' }} />
            </div>
          )
        }
      },
    ];
    return (
      <div className={styles.content}>
        <p className={styles.title}>推广员管理</p>
        <div className={styles.content_title}></div>
        <div className={styles.content_search}>
          <Input placeholder="推广员ID" onChange={this.changeInput.bind(this, 'id')} />
          <Input placeholder="手机号" onChange={this.changeInput.bind(this, 'telephone')} />
          <Input placeholder="用户名" onChange={this.changeInput.bind(this, 'username')} />
          <Input placeholder="QQ" onChange={this.changeInput.bind(this, 'qq')} />
          <Button icon="search" type="primary" onClick={this.toSearch}>搜索</Button>
        </div>
        <Button type="primary" onClick={this.showModal} style={{ float: 'left' }}>新增</Button>
        <div className={styles.content_table}>
          <Table rowKey="id" size="small"
            pagination={
              {
                total: this.props.market.total,
                pageSize: 6,
                onChange: this.pageChange
              }
            }
            bordered columns={columns}
            dataSource={this.props.market.marketData}
          />
        </div>
        <Modal
          title={this.state.title + '推广员信息'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <MyForm initData={this.state.putForm} ref={this.getForm} />
        </Modal>
      </div>
    )
  }
}

export default connect(state => state)(Market);