import { Badge } from "@/components/ui/badge";
import { assets } from "@/constants";
import getNotifications from "@/services/notifications/get-notifications";
import useActions from "@/store/actions";
import useAppSelectors from "@/store/use-app-selectors";

import * as React from "react";
import { useQuery } from "react-query";

export default React.memo(function Notifications() {
  const { notifications } = useAppSelectors("notification");
  const [showIndicator, setShowIndicator] = React.useState(false);

  const { notification } = useActions();

  useQuery(["notifications"], () => getNotifications({}), {
    onSuccess(data) {
      notification.addNotification(data);
    },
  });

  const openNotifications = () => {
    notification.changeNotificationDialog({ type: "notifications" });
  };

  React.useMemo(() => {
    setShowIndicator(notifications.some((item) => !item.read_at));
  }, [notifications]);

  return (
    <button
      onClick={openNotifications}
      className="button-ghost relative flex size-10 items-center justify-center rounded-full bg-primary-100 p-2.5"
    >
      {showIndicator && (
        <Badge className="absolute right-0 top-0 !size-2.5 rounded-full bg-error-200 p-0" />
      )}
      <img src={assets.notification_icon_01} alt="notification-icon" />
    </button>
  );
});
