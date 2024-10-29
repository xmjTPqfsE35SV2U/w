import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Form, InputNumber, InputNumberProps, Row, Tooltip } from "antd"
import styled from "styled-components"
import newStore from "@/store/newStore";
import { valueType } from "antd/es/statistic/utils";
import { values } from 'lodash';

const priceOnChange: InputNumberProps['onChange'] = (value) => {
    newStore.setPrice(value==null?0:value);
};
const originPriceOnChange: InputNumberProps['onChange'] = (value) => {
    newStore.setOriginPrice(value==null?0:value);
};
const costPriceOnChange: InputNumberProps['onChange'] = (value) => {
    newStore.setCostPrice(value==null?0:value);

};



export default function PriceOrTransactionCard() {
    return (
        <Scoped>
            <Card title='价格/交易'>
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item 
                            required
                            label={
                                <>
                                    售价
                                    <Tooltip title="这里是关于用户名的额外信息">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } name='price' className="price-item">
                                <InputNumber<number>
                                    prefix="US$"
                                    defaultValue={1000}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={priceOnChange}
                                    className="ant-input"
                                />
                            </Form.Item>
                        </Col>

                        <Col offset={2} span={11}>
                            <Form.Item label={
                                <>
                                    原价
                                    <Tooltip title="这里是关于用户名的额外信息">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } name='originPrice' className="price-item">
                                <InputNumber<number>
                                    prefix="US$"
                                    defaultValue={1000}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={originPriceOnChange}
                                    className="ant-input"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label={
                                <>
                                    成本价
                                    <Tooltip title="这里是关于用户名的额外信息">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } name='costPrice' className="price-item">
                                <InputNumber<number>
                                    prefix="US$"
                                    defaultValue={1000}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={costPriceOnChange}
                                    className="ant-input"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <Form.Item label={
                                <>
                                    利润
                                    <Tooltip title="这里是关于用户名的额外信息">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } name='price' className="price-item">
                                <InputNumber
                                    prefix="US$"
                                    defaultValue={'--'}
                                    className="ant-input"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label={
                                <>
                                    利润率
                                    <Tooltip title="这里是关于用户名的额外信息">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } name='price' className="price-item">
                                <InputNumber
                                    suffix="%"
                                    defaultValue={'--'}
                                    className="ant-input"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        valuePropName="checked"
                        wrapperCol={{
                            span: 5,
                        }}
                        name="needTaxes">
                        <Checkbox onChange={(e)=>{
                            newStore.setInventoryTracking(e.target.value)
                        }}>开启库存追踪</Checkbox>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


const Scoped = styled.div`
.ant{
    &-card{
        &-head-title{
            font-weight: 400;
        }
        &-body{
            padding-bottom: 0;
        }
        label{
            font-weight: 600;
        }
    }
    &-checkbox-wrapper{
        span{
            font-weight: 400;
        }
    }
    &-input{
            width: 100%;
            height: 36px;


            &-number-input-wrap{
                height:36px;
                display:flex;
                align-content: center;

            }
            &-number-input{
                position:relative;
                top: -1px;
            }
    }
}

`

