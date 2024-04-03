import React, { useState, useEffect } from "react";
import { RiNotificationBadgeFill, RiNotificationBadgeLine } from "react-icons/ri";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";

interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get("http://localhost:3001/api/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        console.log(response);
        setNotifications(response.data.notifications || []); 
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Something went wrong.");
        console.error("Error fetching notifications:", error);
        setLoading(false);
      });
  }, []);

  const filteredNotifications = filter
    ? notifications.filter((notification) => notification.read === (filter === "read"))
    : notifications;

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-semibold text-header mb-4 text-center mt-5">
        Notifications
      </h1>
      <div className="flex justify-end mb-4">
        <button
          className={`mr-2 ${filter === null ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded`}
          onClick={() => setFilter(null)}
        >
          All
        </button>
        <button
          className={`mr-2 ${filter === "unread" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} px-4 py-2 rounded`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
      </div>
      <hr />
      {loading ? (
        <div className='flex justify-center items-center h-screen'>
          <Oval color='gray' secondaryColor='true' width={60} height={60} />
          <div className='ml-2'>Notifications are Loading...</div>
        </div>
      ) : filteredNotifications && filteredNotifications.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <p>No New notifications</p>
        </div>
      ) : (
        <div className="flex flex-col mt-5">
          {filteredNotifications && filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={` shadow rounded-lg w-full p-4 mb-4 ${
                notification.read ? "bg-gray-300" : "bg-white"
              }`}
            >
              <div className="flex items-center">
                {notification.read ? (
                  <RiNotificationBadgeLine size={20} />
                ) : (
                  <RiNotificationBadgeFill size={20} />
                )}
                <span className="ml-2">{notification.message}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
