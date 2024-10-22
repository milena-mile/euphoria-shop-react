import Loading from '../../../../components/Loading/Loading';
import { OrderData } from '../../../CartCheckout/types';
import { RootState } from '../../../../store/store';
import { useSelector } from 'react-redux';

const Orders = (props: {orders: OrderData[] | []}) => {
    const orders = props.orders;
    const loadingStatus = useSelector((state: RootState) => state.user.userLoadingStatus);

    return (
        <>
            {loadingStatus === "loading" && <Loading />}
            {(loadingStatus === "idle" && orders) && (
                <section className="b-orders">
                    <h1 className="b-info_title">My Orders</h1>
                    {orders.map(order => (
                        <div className="b-orders_item" key={order.id}>
                            <div className="b-orders_info">
                                <span className="b-orders_id">Order no: #{order.id}</span>
                                <span className="b-orders_date"><strong>Order Date: </strong>{order.orderDate}</span>
                                <span className="b-orders_date delivery"><strong>Estimated Delivery Date: </strong>{order.deliveryDate}</span>
                                <span className="b-orders_status"><strong>Order Status: </strong>{order.orderStatus}</span>
                                <span className="b-orders_status payment"><strong>Payment Method: </strong>{order.paymentMethod}</span>
                            </div>
                            <div className="b-orders_products">
                                {order.clothes.map(item => (
                                    <div className="b-orders_products-item" key={`${item.name}-${item.color}-${item.size}`}>
                                        <div className="b-orders_item-image">
                                            <img src={item.photo} alt={item.name} />
                                        </div>
                                        <div className="b-orders_details">
                                            <span className="b-orders_name">{item.name}</span>
                                            <span className="b-orders_param"><strong>Color:</strong> {item.color}</span>
                                            <span className="b-orders_quantity"><strong>Qty:</strong> {item.quantity}</span>
                                            <span className="b-orders_price"><strong>Total:</strong> ${(item.price - (item.price * item.sale / 100)).toFixed(2)}</span> 
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </>
    )
}

export default Orders;