import React from 'react';
import styles from './newsCenter.less'
import { Input, Button, Table, Select, Icon, Modal } from 'antd'
import dateParse from '@/filter/index'
import { connect } from 'dva'
import NewsForm from './newsForm'
const { Option } = Select
class NewsCenter extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      putForm: {},
      form: {
        page: 0,
        pageSize: 6,
        siteId: 2,
      },
      visible: false
    })
  }
  toEdit = (record) => {
    var two = record.receiver.split(',');
    record.receiver = two;
    this.setState({
      visible: true,
      putForm: record
    });
  }
  getForm = (form) => {
    this.newsForm = form
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.newsForm.validateFields((err, values) => {
      if (!err) {
        values.receiver = values.receiver.toString();
        values.siteId = 2;
        // console.log('Received values of form: ', values);
        this.props.dispatch({ type: 'newsCenter/fetchAddNews', payload: { forms: values, page: this.state.form } })
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
  toDelete = (record) => {
    this.props.dispatch({ type: 'newsCenter/fetchDeleteNews', payload: { page: this.state.form, forms: { id: record.id } } })
  }
  changePage = (page, pageSize) => {
    this.props.dispatch({ type: 'newsCenter/fetchNews', payload: { page: page - 1, pageSize: 6, siteId: 2, } });
    this.setState({
      ...this.state.form,
      page: page - 1
    })
  }
  componentWillMount = () => {
    this.props.dispatch({ type: 'newsCenter/fetchNews', payload: this.state.form })
  }
  selectChange = (attr, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [attr]: value
      }
    })
  }
  inputChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        title: e.target.value
      }
    })
  }
  toSearch = () => {
    this.props.dispatch({ type: 'newsCenter/fetchNews', payload: this.state.form })
  }
  changeStatus = (record) => {
    if (record.status === '已发布') {
      this.props.dispatch({ type: 'newsCenter/fetchChangeStatus', payload: { page: this.state.form, forms: { id: record.id, status: '未发布' } } })
    } else {
      this.props.dispatch({ type: 'newsCenter/fetchChangeStatus', payload: { page: this.state.form, forms: { id: record.id, status: '已发布' } } })
    }
  }
  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        align: 'center',

      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'status',
      },
      {
        title: '通知人群',
        align: 'center',
        dataIndex: 'receiver',
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime',
        render: (text, record) => {
          return (
            <div>{dateParse(text)}</div>
          )
        }
      },
      {
        title: '发布时间',
        align: 'center',
        dataIndex: 'publishTime',
        render: (text, record) => {
          return (
            <div>{dateParse(text)}</div>
          )
        }
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => {
          if (record.status == "已发布") {
            return (
              <div>
                <Icon type="edit" title="编辑" style={{ marginRight: '5px' }} onClick={this.toEdit.bind(this, record)} />
                <Icon type="close-circle" title="取消发布" onClick={this.changeStatus.bind(this, record)} style={{ marginRight: '5px', color: 'red' }} />
                <Icon type="delete" title="删除" onClick={this.toDelete.bind(this, record)} />
              </div>
            )
          } else {
            return (
              <div>
                <Icon type="edit" title="编辑" style={{ marginRight: '5px' }} onClick={this.toEdit.bind(this, record)} />
                <Icon type="check-circle" title="发布" onClick={this.changeStatus.bind(this, record)} style={{ marginRight: '5px', color: 'green' }} />
                <Icon type="delete" title="删除" onClick={this.toDelete.bind(this, record)} />
              </div>
            )
          }
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>消息管理</div>
        <div className={styles.content_add}>
          <Button type="primary" onClick={this.showModal}>新增</Button>
        </div>
        <div className={styles.content_search}>
          <Input placeholder="公告标题" onChange={this.inputChange} />
          <Select placeholder="状态" style={{ width: 150 }} onChange={this.selectChange.bind(this, 'status')} >
            <Option value="未发布">未发布</Option>
            <Option value="已发布">已发布</Option>
          </Select>
          <Select placeholder="通知人群" style={{ width: 150 }} onChange={this.selectChange.bind(this, 'receiver')} >
            <Option value="推广员">推广员</Option>
            <Option value="商家">商家</Option>
          </Select>
          <Button type="primary" onClick={this.toSearch}>搜索</Button>
        </div>
        <div className={styles.content_content}>
          <Table size="small"
            rowKey="id" pagination={
              {
                total: this.props.newsCenter.total,
                pageSize: 6,
                onChange: this.changePage
              }
            } columns={columns} dataSource={this.props.newsCenter.newsData} bordered />
        </div>
        <Modal
          title="消息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <NewsForm initData={this.state.putForm} ref={this.getForm} />
        </Modal>
      </div>
    )
  }
}

export default connect(state => state)(NewsCenter);