// src/utils/WebSocketManager.tsx
import { Client } from "@stomp/stompjs";

export class WebSocketManager {
    private client: Client | null = null;
    private token: string;
    private onMessageReceived: (message: string) => void;

    constructor(token: string, onMessageReceived: (message: string) => void) {
        this.token = token;
        this.onMessageReceived = onMessageReceived;
    }

    connect() {
        if (!this.token) {
            console.error("No token provided for WebSocket.");
            return;
        }

        this.client = new Client({
            brokerURL: `ws://localhost:4040/ws?token=${this.token}`,
            connectHeaders: {
                'Authorization': `Bearer ${this.token}`,
            },
            reconnectDelay: 5000,
        });

        this.client.onConnect = () => {
            console.log("WebSocket connected.");
            this.client?.subscribe("/topic/public", (message) => {
                this.onMessageReceived(message.body);
            });
        };

        this.client.onStompError = (frame) => {
            console.error("STOMP error:", frame);
        };

        this.client.activate();
    }

    sendMessage(destination: string, body: any) {
        if (this.client?.connected) {
            const message = JSON.stringify(body); // 메시지를 직렬화
            console.log(`Sending message to ${destination}:`, message); // 보낸 메시지 로그

            this.client.publish({
                destination,
                body: message,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
            });
        } else {
            console.error("WebSocket is not connected.");
        }
    }

    disconnect() {
        this.client?.deactivate();
        console.log("WebSocket disconnected.");
    }
}
