"use client";

import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { useEffect, useState } from "react";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export default function ConnectWallet() {
    const [mounted, setMounted] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    const handleConnect = () => {
        showConnect({
            appDetails: {
                name: "StackerDraw",
                icon: window.location.origin + "/favicon.ico",
            },
            redirectTo: "/",
            onFinish: () => {
                window.location.reload();
            },
            userSession,
        });
    };

    const handleDisconnect = () => {
        userSession.signUserOut();
        setUserData(null);
    };

    if (!mounted) return <button className="rounded-full bg-gray-200 h-10 px-4">Loading...</button>;

    if (userData) {
        return (
            <div className="flex gap-4 items-center">
                <span className="text-sm font-mono truncate max-w-[150px]">
                    {userData.profile.stxAddress.testnet}
                </span>
                <button
                    onClick={handleDisconnect}
                    className="rounded-full bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600 transition"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            className="rounded-full bg-orange-500 text-white px-6 py-2 font-bold hover:bg-orange-600 transition shadow-lg"
        >
            Connect Wallet
        </button>
    );
}
