import React from "react";
import { useAuth } from "../context/NewAuthContext";
import { Package, ChevronDown, ChevronUp, MapPin, Truck } from "lucide-react";
import { Title } from "../components/Title";
import { useCartContext } from "../context/CartContext";

const Orders = () => {
  const { user, apiCall, logout } = useAuth();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [expandedOrder, setExpandedOrder] = React.useState(null);
  const { extraCharge } = useCartContext();

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) {
        setError("No user data available");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await apiCall(`/api/v1/orders/${user._id}`, {
          method: "GET",
        });

        if (response.success) {
          setOrders(response.orders);
        } else {
          throw new Error(response.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Orders fetch error:", err);

        // Handle specific error cases
        if (err.message.includes("token")) {
          setError("Session expired. Please login again.");
          logout(); // Assuming you have access to the logout function
        } else {
          setError(err.message || "Error connecting to server");
        }

        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      created: "bg-gray-100 text-gray-800",
      payment_pending: "bg-yellow-100 text-yellow-800",
      payment_failed: "bg-red-100 text-red-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-blue-200 text-blue-900",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-200 text-red-900",
      disputed: "bg-orange-100 text-orange-800",
      refunded: "bg-purple-100 text-purple-800",
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  // Calculate price information for an order
  const calculatePriceInfo = (order) => {
    // Get shipping fee based on payment method
    const shipping = order.paymentMethod === "COD" ? 50 : 0;

    // Calculate subtotal (total amount minus shipping)
    const subtotal = order.totalAmount - shipping;

    // Calculate total number of items
    const totalItems = order.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Calculate total discount (extraCharge per item * number of items)
    const discount = extraCharge * totalItems;

    // Calculate original price (subtotal + discount)
    const originalPrice = subtotal + discount;

    // Calculate discount percentage
    const discountPercentage =
      originalPrice > 0 ? Math.round((discount / originalPrice) * 100) : 0;

    return {
      originalPrice,
      discount,
      discountPercentage,
      subtotal,
      shipping,
      totalItems,
    };
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg">
        <div className="p-6">
          <div className="flex items-center text-2xl justify-between mb-6">
            <Title text1={"MY"} text2={" ORDERS"} />
            <div className="flex items-center space-x-2">
              <p className="text-sm font-bold">{orders.length}</p>
              <Package className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {error && (
            <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4 flex flex-col-reverse">
              {orders.map((order) => {
                // Calculate price information for each order
                const priceInfo = calculatePriceInfo(order);

                return (
                  <div
                    key={order._id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order._id ? null : order._id
                        )
                      }
                    >
                      <div className="space-y-1">
                        <p className="font-medium">Order ID: {order.orderId}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                        {expandedOrder === order._id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {expandedOrder === order._id && (
                      <div className="p-4 border-t bg-gray-50">
                        <div className="space-y-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="font-medium text-gray-700 mb-3">
                              Order Items
                            </h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={item._id}
                                  className="flex justify-between items-center bg-white p-3 rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium">
                                      {item.productName}
                                    </p>
                                    <div className="text-sm text-gray-500 space-y-1">
                                      <p>Quantity: {item.quantity}</p>
                                      <p>
                                        Size: {item.size}, Color: {item.color}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-medium">
                                    {formatCurrency(item.price)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Delivery Address */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <MapPin className="h-5 w-5 text-gray-400" />
                              <h4 className="font-medium text-gray-700">
                                Delivery Address
                              </h4>
                            </div>
                            <div className="bg-white p-3 rounded-lg space-y-1">
                              <p className="font-medium">
                                {order.deliveryAddress.fullName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.deliveryAddress.doorNo},{" "}
                                {order.deliveryAddress.street}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.deliveryAddress.city},{" "}
                                {order.deliveryAddress.state} -{" "}
                                {order.deliveryAddress.pincode}
                              </p>
                              <p className="text-sm text-gray-600">
                                Phone: {order.deliveryAddress.phone}
                              </p>
                              <p className="text-sm text-gray-600">
                                Email: {order.deliveryAddress.email}
                              </p>
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Truck className="h-5 w-5 text-gray-400" />
                              <h4 className="font-medium text-gray-700">
                                Order Summary
                              </h4>
                            </div>
                            <div className="bg-white p-3 rounded-lg space-y-2">
                              {/* Order type and IDs */}
                              {/* Payment Method */}
                              <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>Payment Method</span>
                                <span>
                                  {order.paymentMethod === "COD"
                                    ? "Cash on Delivery"
                                    : "Online Payment"}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>Order ID</span>
                                <span>{order.qikinkOrderId}</span>
                              </div>
                              {order.awbNo && (
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>AWB Number</span>
                                  <span>{order.awbNo}</span>
                                </div>
                              )}
                              {order.razorpayOrderId && (
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>RazorPay OrderId</span>
                                  <span>{order.razorpayOrderId}</span>
                                </div>
                              )}
                              {order.paymentId && (
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>RazorPay Payment Id</span>
                                  <span>{order.paymentId}</span>
                                </div>
                              )}

                              {/* Price breakdown */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
