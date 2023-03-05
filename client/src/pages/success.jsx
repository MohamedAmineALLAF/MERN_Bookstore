import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import { Col, Row } from 'antd';
import React from 'react';

function Success() {
    return ( 
        <Row justify='center' style={{
            paddingTop:200,
            paddingBottom:130,
            textAlign: 'center'
            
        }}>

            <Col lg={12}>
                <CheckCircleOutlined style={{
                    color:'#81b71a',
                    fontSize:70

                }} />
                <h3   style={{
                    paddingTop:40
                }}>Your order has been successfully placed</h3>
                
                <Button
                
                href="/"
                
                sx={{ fontWeight: 500, marginTop:2  }}
              >
               Back to home page
              </Button>
            </Col>

        </Row>
     );
}

export default Success;
