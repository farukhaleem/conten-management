import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getOrder } from './../Services/getOrdersService';
import Button from '@material-ui/core/Button';
// import Alert from '@material-ui/lab/Alert';

export default function TrackOrderItem(props) {
  let [order, setOrder] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  let orderValue = [];
  let order_id = props.orderId.split("-100");
  orderValue[0] = order_id['1'];

  useEffect(() => {
    async function fetchData() {
      const orderData = await getOrder(orderValue);
      setOrder(orderData);
    }
    fetchData();
  }, orderValue)

  let status_lable;
  let status_class;

  const columns = [
    { field: 'date', headerName: 'Date', width: 200, },
    { field: 'id', headerName: 'Order ID', width: 200, },
    {
      field: 'topic', headerName: 'Topic', width: 400,
      renderCell: (params) => {
        return (
          <span
            dangerouslySetInnerHTML={{
              __html: `${params.row.topic}`
            }}
          />
        );
      }
    },
    {
      field: 'payNow', headerName: 'Pay Now', width: 200,
      renderCell: (params) => {
        if(parseInt(params.row.remaining) <= 0){
          return(
            <Button
              variant="contained"
              size="small"
              disabled
            >
              Paid
            </Button>
          )
        }
        return (
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="small"
            >
              <a 
                style={{ color: '#fff' }} 
                rel="noreferrer noopener" 
                target="_blank" 
                href={'/api/payment-proceed.php?token='+localStorage.getItem('token')+'&order_id='+params.row.payNow+'&user_token='+localStorage.getItem('user_token')+'&domain_token='+localStorage.getItem('domain_token')}
                className="nav-link">
                Pay Now
              </a>
            </Button>
          </strong>
        )
      }
    },
    { field: 'paperType', headerName: 'Paper Type', width: 200, },
    {
      field: 'order_status', headerName: 'Order Status', width: 200,
      renderCell: (params) => {

        switch (params.row.order_status) {

          case "Pending": status_lable = "Pending"; status_class = "pending"; break;
          case "In Progress": status_lable = "In Progress"; status_class = "in-progress"; break;
          case "Deleiver to PCM": status_lable = "Deleiver to PCM"; status_class = "deleiver-to-pcm"; break;
          case "Draft Delivered": status_lable = "Draft Delivered"; status_class = "draft-completed"; break;
          case "Under QA": status_lable = "Under QA"; status_class = "under-qa"; break;
          case "Revision": status_lable = "Revised"; status_class = "revised"; break;
          case "Completed": status_lable = "Completed"; status_class = "completed"; break;
          case "Refunded": status_lable = "Refunded"; status_class = "refunded"; break;
          case "closed": status_lable = "Closed"; status_class = "closed"; break;
          case "deliver to sales": status_lable = "Delivered to Sales"; status_class = "delivered"; break;
          case "Request to Start": status_lable = "Request to Start"; status_class = "request_start"; break;
          case "Writer Assigned": status_lable = "Writer Assigned"; status_class = "writer_assigned"; break;
          default: status_class = "danger";

        }

        return (<span
          variant="contained"
          className={`${status_class} token`}
          size="small"
        >
          {status_lable}
        </span>
        );
      },
    },
    { field: 'totalPayment', headerName: 'Total Payment', width: 200, },
    { field: 'paid', headerName: 'Paid', width: 200, },
    { field: 'remaining', headerName: 'Remaining Amount', width: 200, },
  ];
  let rows = [];
  if (order) {
    rows = order.map((orderItem) => {
      return {
        date: orderItem.date,
        id: orderItem.order_code + orderItem.order_id,
        paperType: orderItem.paper_type_caption,
        topic: orderItem.topic,
        payNow: orderItem.order_id,
        remaining: orderItem.remaining + ' ' + orderItem.currency_code,
        order_status: orderItem.order_status,
        totalPayment: orderItem.total_payment + ' ' + orderItem.currency_code,
        paid: orderItem.total_paid + ' ' + orderItem.currency_code,
      };
    })
  }
  
  // if (props.orderId === '') {
  //   return '';
  // } else if (order === null) {
  //   return (
  //     <Alert 
  //       style={
  //         { border: '1px solid #edc6c1' }
  //       } 
  //       severity="error"
  //     >
  //       Order not found.
  //     </Alert>
  //   );
  // } else {

    return (
      <div style={{ height: 'calc(100vh - 275px)', width: 'auto', background: '#fff' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              rowsPerPageOptions={[5, 10, 20, 50, 100]} />
          </div>
        </div>
      </div>
    );
  // }
}