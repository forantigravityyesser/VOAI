"use client";

import React, { useState } from "react";
import { User, Key, Bell, Monitor } from "lucide-react";
import SettingsView from "../components/settings-view";

export default function SettingsContainer() {
  const [activeTab, setActiveTab] = useState("profile");

  const [alerts, setAlerts] = useState({
    critical: true,
    warehouse: true,
    reports: false
  });

  const [tgConnected, setTgConnected] = useState(false);
  const [showTgCode, setShowTgCode] = useState(false);

  const tabs = [
    { id: "profile", label: "Профиль и Защита", icon: User },
    { id: "api", label: "Интеграция WB API", icon: Key },
    { id: "notifications", label: "Алерты и Уведомления", icon: Bell },
    { id: "appearance", label: "Интерфейс", icon: Monitor },
  ];

  return (
    <SettingsView 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabs={tabs}
      alerts={alerts}
      setAlerts={setAlerts}
      tgConnected={tgConnected}
      setTgConnected={setTgConnected}
      showTgCode={showTgCode}
      setShowTgCode={setShowTgCode}
    />
  );
}
