import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
function FraudAnalysis() {
    const intl = useIntl();
    return (
        <Card  style={{ width: '300px' }} 
        title={
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' ,color:'#474F5E', justifyContent: 'space-between' }}>
           <div>   
               <p style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.fraudanalysis'})}</p> 
               <p style={{fontSize:'14px',color:'#474F5E',margin:'0'}}>{intl.formatMessage({ id:'order.detail.fraudtext'})}</p>
                             </div>
                             </div>
        }
      
    >
       
    </Card>
);
}
export default observer (FraudAnalysis);