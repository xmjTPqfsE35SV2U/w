import { ArrowLeftOutlined, CopyOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Form, Input, message, Select, TableProps, Tooltip } from 'antd'
import styled from 'styled-components';
import qs from 'qs';
import { Divider } from 'antd';
import { history, useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { getOrderDetail } from '@/services/y2/order';
import OrdersShippedCard from './OrdersShippedCard';
import AbstractCard from './AbstractCard';
import CustomsInformation from './CustomsInformation';
import FraudAnalysis from './FraudAnalysis';
import OrdersIdCard from './OrdersIdCard';
import OrdersLabelCard from './OrdersLabelCard';
import OrdersNotesCard from './OrdersNotesCard';
import OrdersPaidCard from './OrdersPaidCard';
import OrdersTimeline from './OrdersTimeline';

interface OrderDetail {
  id: string; // 订单ID
  date_purchased: string; // 订单日期
  orders_status_id: string; // 订单状态
  delivery_status_id: string; // 发货状态
  payment_status_id: string; // 支付状态
  orders_name: string;
  orders_price: string;
  orders_total: string;
  orders_num: string;
  shipping_cost: string;
  delivery_name: string;
  email: string;
  tel: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postcode: string;
  productinfo: productinfo[]; // 添加 productinfo 字段
  customer_name:string;
  customer_firstname:string;
}

interface productinfo {
  id: string;
  orders_id: string;
  product_id: string;
  productModel: string;
  productImage: string;
  productName: string;
  productNum: string;
  product_prid: string;
  productOption: null | any;
}
function OrderDetail() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetail | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { orderId } = useParams<{ orderId: string }>();
  const intl = useIntl();
  const translateStatus = (key: string) => {
    return intl.formatMessage({ id: key });
  };

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      try {
        const response = await getOrderDetail(orderId);
        setOrder(response.data);
        console.log(34);
      } catch (error) {
        console.error('Failed to fetch order:', error);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    }
    console.log(1111111111111111);
    console.log('orderId:', orderId);
    fetchOrder();

  }, [orderId]);

  return (
    <Scoped>
      <div className='mc-layout-wrap'>
        <div className="mc-layout">
          <div className="mc-header">
            <div className="mc-header-left">
              <div className="mc-header-left-secondary" onClick={() => {
                history.push('/orders/manages')
              }}>
                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
              </div>
              <div className="mc-header-left-content">

                <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', margin: '10px' }}>
                  {orderId}
                  <Tooltip title="复制">
                    <CopyOutlined style={{ margin: '10px' }} />
                  </Tooltip>
                  <div className='wrap'>
                  </div>
                  <div className="oval-shape" style={{ fontSize: '12px', marginLeft: '10px', color: '#474F5E' }}>
                    {order && translateStatus(`order.status.name_${order.orders_status_id}`)}
                  </div>
                  <div className="oval-shape" style={{ fontSize: '12px', marginLeft: '10px', color: '#474F5E' }}>
                    {order && translateStatus(`order.status.name_${order.payment_status_id}`)}
                  </div>
                  <div className="oval-shape" style={{ fontSize: '12px', marginLeft: '10px', color: '#474F5E' }}>
                    {order && translateStatus(`order.status.name_${order.delivery_status_id}`)}
                  </div>
                </div>
                <div className="mc-time" style={{ fontSize: '14px', color: '#474F5E' }}>
                  {order?.date_purchased} {intl.formatMessage({ id: 'order.detail.dowloadvia' })}
                </div>
              </div>
            </div>
            <div className='mc-header-right' style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', // 添加这一行以垂直居中对齐
              margin: '10px'
            }}>
              <Button className="my-button"
                style={{
                  backgroundColor: 'WHITE',
                  marginRight: '12px',
                  width: "90px",
                  height: "36px",
                  fontSize: "14px",
                }}>
                {intl.formatMessage({ id: 'order.detail.return' })}
              </Button>
              <Button className='my-button'
                style={{
                  marginRight: '12px',
                  backgroundColor: 'white',
                  width: "118px",
                  height: "36px",
                  fontSize: "14px",
                }}>
                {intl.formatMessage({ id: 'order.detail.refund' })}
              </Button>
              <Select className='selector'
                style={{
                  height: "36px", // 统一Select组件的高度
                  fontSize: "14px", // 确保字体大小一致
                }}
                defaultValue={intl.formatMessage({ id: 'order.detail.more' })} />
              <Button className='my-button'
                style={{
                  marginLeft: '12px',
                  backgroundColor: 'white',
                  width: "118px",
                  height: "36px",
                  fontSize: "14px",
                }}>
                <LeftOutlined />
              </Button>
              <Button className='my-button'
                style={{
                  marginLeft: '12px',
                  backgroundColor: 'white',
                  width: "118px",
                  height: "36px",
                  fontSize: "14px",
                }}>
                <RightOutlined />
              </Button>
            </div>
          </div>
          <div className='mc-layout-main'>
            <div className='mc-layout-content'>

              <OrdersShippedCard order={order} productinfo={order?.productinfo} /> {/* 传递 productinfo */}
              <OrdersPaidCard order={order} />
              {order && <OrdersTimeline order={order} />}

            </div>
            <div className='mc-layout-extra'>
              <OrdersNotesCard />
              <CustomsInformation order={order} />
              <OrdersIdCard order={order} />
              <FraudAnalysis />
              <AbstractCard />
              <OrdersLabelCard />
            </div>
          </div>
          <Divider />

        </div>
      </div>
    </Scoped>
  );
}

export default observer(OrderDetail);

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 600px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
    
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 40px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;

            display: flex;
            justify-content: space-between;
            align-content: center;
    
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
    
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
    
                &-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
    
            &-right {
                display: flex;
                align-items: center;
                width: 40px;
                > .selector{
                    height: 36px;
                }
            }
        }

        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }

        &-content {
            flex: 9;
            min-width: 400px;

            display: flex;
            flex-direction: column;
            gap:20px

        }

        &-extra {
            flex:1;
            min-width: 180px;
            display: flex;
            flex-direction: column;
            gap:20px;

            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        }
       
    }
}
a{
  font-weight: 400
}
`// function setOrder(data: any) {


function setOrder(response: any) {
    throw new Error('Function not implemented.');
}
//   throw new Error('Function not implemented.');
// }

