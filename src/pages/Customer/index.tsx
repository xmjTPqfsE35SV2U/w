
import React, { useRef, useState } from 'react'
import { Button, Dropdown, Flex, Space } from 'antd';
import { Tabs } from 'antd'
import './index.scss'
import styled from 'styled-components'
import Icon, { ImportOutlined } from '@ant-design/icons'; 
import { history } from '@umijs/max';
import {useIntl, useModel } from '@umijs/max';
import CustmoerListAjax from './CustomerListAjax';

interface MenuItem {  
  key: string;  
  label: React.ReactNode;  
  onClick?: () => void; // 可选的点击事件处理函数  
}  
  
interface MenuProps {  
  items: MenuItem[];  
}  
  
const MenuComponent: React.FC<MenuProps> = ({ items }) => {  
  // 假设你有一个已有的函数或组件，这里我们模拟一个函数  
  const handleLianHuoDanClick = () => {  
    // 这里可以调用已有的组件或执行任何逻辑  
    console.log('练货单被点击了');  
    // 例如，你可以控制一个状态来显示Popup组件  
  };  
  
  // 你可以在这里预处理items，为特定的项添加事件处理函数，但通常直接在渲染时处理更简单  
  
  return (  
    <div>  
      {items.map(item => (  
        <div key={item.key} onClick={item.onClick}>  
          {item.label}  
        </div>  
      ))}  
      {/* 如果有需要，你可以在这里根据状态渲染Popup组件 */}  
    </div>  
  );  
};  



export default function orders() {

  const intl = useIntl();
const aItems: MenuProps['items'] = [
  {
    key: '1',
    label:intl.formatMessage({id:'orderlist.picking.list'}),

  },
  {
    key: '2',
    label: intl.formatMessage({id:'orderlist.shipping.list'}),
  },
  {
    key: '3',
    label: intl.formatMessage({id:'orderlist.order.detail'}),
  },
  {
    key: '4',
    label: intl.formatMessage({id:'orderlist.order.report'}),
  },
];


  return (
    
   
    <div className='create-warp-flex' style={{
      width: "100%"
    }}>
      <div className="create-warp">
        <div className='create-title'>
          <div className='create-title-left'>
            <h3 style={{
              position: 'relative',
              top: 10,
              display: 'inline-block',
            }}>客户</h3>
            <ImportOutlined style={{
              position: 'relative',
              top: -24,
              left: -10,


            }} />
            <div style={{
              position: 'relative',
              top: -44,
              left: 130,
            }}>

              <Dropdown menu={{ items: aItems }} >
                <a onClick={(e) => e.preventDefault()} style={{ color: '#242833' }}>
                  <Space>
                  {intl.formatMessage({ id:'orderlist.import.orders'})}
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          
          <div className='"button-container"'>
            < Button 
              onClick={() => {  }}
              style={{
              
                backgroundColor: 'WHITE',
                marginRight: '12px',
                width: "90px", height: "36px", fontSize: "14px",
           
              }}>
               其他操作
            </Button>

            <Button type="primary"
              onClick={() => { history.push('/orders/draftOrders/add') }}
              style={{
             
                width: "88px", height: "36px", fontSize: "16px",background:'#356DFF',

              }}>
               添加客户
            </Button>

          </div>
          
        </div>







        
        <div className='create-content'>
       
        <div  >
<CustmoerListAjax/>
</div>
          <Tabs
            defaultActiveKey='1'
           
          />
      
        </div>
      </div>
     
     





      </div>

  )


}
















