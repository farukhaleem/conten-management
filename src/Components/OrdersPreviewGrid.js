import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getOrderDetails } from './../Services/getOrdersService';
import ViewOrderModal from './ViewOrderModal';

export default function OrdersPreviewGrid() {

  let [order, setOrder] = useState([]);
  const [pageSize, setPageSize] = useState(20);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  useEffect(() => {

      async function fetchData() {
        const orderData = await getOrderDetails(localStorage.getItem('id'), localStorage.getItem('token'));
        setOrder(orderData);
      }
      fetchData();
    }, [])

  const columns = [
    { field: 'date', headerName: 'Date', flex:1, },
    { field: 'id', headerName: 'Order ID', flex:1, },
    { field: 'topic', headerName: 'Topic', flex:3, 
      renderCell: (params) => {
        return(
          <span
              dangerouslySetInnerHTML={{
                  __html: `${params.row.topic}`
              }}
          />
        );
      }
    },
    { field: 'payNow', headerName: 'Pay Now', flex:1, 
      renderCell: (params) => {
        return(
          <strong>
              <ViewOrderModal orderId={params.row.payNow}/>
          </strong>
        )
      }
    },
  ];
  let rows = [];
  if(order){
    rows = order.map((orderItem)=>{
      return{
          date : orderItem.date,
          id : orderItem.order_code+orderItem.order_id,
          paperType : orderItem.paper_type_caption,
          topic : orderItem.topic ,
          payNow : orderItem.order_id,        
      };
    })
  }

  return (
    <div style={{ height: 'calc(100vh - 202px)', width: 'auto', background: '#fff' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            pagination 
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            rowsPerPageOptions={[20, 50, 100 ]}/>
        </div>
      </div>
    </div>
  );
}
