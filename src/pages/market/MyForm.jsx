import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const { TextArea } = Input;
class MyForm extends Component {
    
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
          };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="用户名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="微信号">
                        {getFieldDecorator('wxid')(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="手机号">
                        {getFieldDecorator('telephone', {
                            rules: [{ required: true, message: 'Please input your telephone!' }],
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="QQ">
                        {getFieldDecorator('qq', {
                            rules: [{ required: true, message: 'Please input your QQ!' }],
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="登录密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input type="password" />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('comment', {
                        })(
                            <TextArea rows={4} placeholder="请输入备注" />
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const mapPropsToFields=(props)=>{
    // console.log(props)
    var obj = {};
    for (var key in props.initData) {
        var val = props.initData[key];
        obj[key] = Form.createFormField({ value: val })
    }
    return obj;
}
export default Form.create({mapPropsToFields})(MyForm);