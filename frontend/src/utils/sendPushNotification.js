export async function sendPushNotification(data) {
    const apiKey = import.meta.env.VITE_ONESIGNAL_REST_API_KEY;
    // const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;

    if (!apiKey) {
        console.error("OneSignal API key is missing.");
        return;
    }

    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: `Basic ${apiKey}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(
            "https://onesignal.com/api/v1/notifications",
            options
        );
        const responseData = await response.json();
        console.log("Notification sent");
    } catch (error) {
        console.error("Error sending notification: ", error);
    }
}
