import { useEffect, useState } from "react";
import useAlertStore from "../store/alertStore.js";
import { CircleCheck, CircleX } from "lucide-react";

const alertTypes = {
  success: {
    icon: <CircleCheck className="w-5 h-5 text-white" />,
    textColor: "text-white",
    bgColor: "bg-green-600",
  },
  error: {
    icon: <CircleX className="w-5 h-5 text-white" />,
    textColor: "text-white",
    bgColor: "bg-red-600",
  },
};

const Alert = () => {
  const { alert, type, setAlert } = useAlertStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setVisible(true);
      const timer1 = setTimeout(() => setVisible(false), 2000);
      const timer2 = setTimeout(() => setAlert(null, null), 2400);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [alert, setAlert]);

  if (!alert) return null;

  const { icon, textColor, bgColor } = alertTypes[type] || alertTypes.error;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 rounded-2xl py-3 px-5 flex items-center gap-3 ${bgColor} shadow-lg transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {icon}
      <span className={`font-medium ${textColor}`}>{alert}</span>
    </div>
  );
};

export default Alert;
