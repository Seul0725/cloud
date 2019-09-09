import React from 'react';
import { connect } from 'dva';
import styles from './shopManage.less';
import { Input, Select, Button, Table, Pagination, Icon } from 'antd';
const { Option } = Select;

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        page: 0,
        pageSize: 6
      }
    }
  }
  componentWillMount = () => {
    this.props.dispatch({ type: 'shopManage/fetchShop', payload: this.state.form })
  }
  pageChange = (page, pageSize) => {
    this.props.dispatch({ type: 'shopManage/fetchShop', payload: { page: page - 1, pageSize: 6 } });
    this.setState({
      form: {
        ...this.state.form,
        page: page - 1
      }
    })
  }
  changeInput = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        businesId: e.target.value
      }
    })
  }
  toSearch = () => {
    this.props.dispatch({ type: 'shopManage/fetchShop', payload: this.state.form })
  }
  selectChange = (attr, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [attr]: value
      }
    })
  }
  render() {
    const columns = [
      {
        title: '店铺ID',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: '商家ID',
        dataIndex: 'businesId',
        align: 'center',
      },
      {
        title: '商家手机号',
        dataIndex: 'telephone',
        align: 'center',
      },
      {
        title: '店铺名称',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '旺旺ID',
        dataIndex: 'wwid',
        align: 'center',
      },
      {
        title: '所属平台',
        dataIndex: 'platform',
        align: 'center',
      },
      {
        title: '注册时间',
        dataIndex: 'bindTime',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: '',
        align: 'center',
        render: (text, record) => {
          if (record.status == '正常') {
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
          if (record.status == '正常') {
            return (
              <div>
                <Icon type="stop" title="停用" style={{ color: 'red', marginRight: '5px' }} />
              </div>
            );
          } else {
            return (
              <div>
                <Icon type="check-circle" title="启用" style={{ color: 'green', marginRight: '5px' }} />
              </div>
            );
          }
        }
      },
    ];
    return (
      <div className={styles.content}>
        <p className={styles.title}>店铺管理</p>
        <div className={styles.content_title}></div>
        <div className={styles.content_search}>
          <Input placeholder="商家ID" onChange={this.changeInput} />
          <Select placeholder="所属平台" onChange={this.selectChange.bind(this, 'platform')} style={{ width: 120, marginRight: '0.5em' }} >
            <Option value="天猫">天猫</Option>
          </Select>
          <Button icon="search" type="primary" onClick={this.toSearch}>搜索</Button>
        </div>
        <div className={styles.content_table}>
          <Table rowKey="id" size="small"
            pagination={
              {
                total: this.props.shopManage.total,
                pageSize: 6,
                onChange: this.pageChange
              }
            }
            bordered columns={columns} dataSource={this.props.shopManage.shopData} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Shop);