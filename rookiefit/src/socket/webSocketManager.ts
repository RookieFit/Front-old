import { Client } from "@stomp/stompjs";

export class WebSocketManager {
    private client: Client | null = null;
    private token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2Vxd2UiLCJpYXQiOjE3MzMzOTIzNzMsImV4cCI6MTczMzM5NTk3M30.d8Zo5A55jVq40uUqvNIvlVH8JmYTRfI0-8BMHjATCg8";
    private onMessageReceived: (message: string) => void;
    private onChatRoomCreated: (chatRoomId: string) => void;

    constructor(onMessageReceived: (message: string) => void, onChatRoomCreated: (chatRoomId: string) => void) {
        this.onMessageReceived = onMessageReceived;
        this.onChatRoomCreated = onChatRoomCreated;
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
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
        });

        this.client.onConnect = () => {
            console.log("WebSocket connected.");
            this.client?.subscribe("/topic/chatroom", (message) => {
                const chatRoomId = JSON.parse(message.body);
                console.log("Received Chat Room ID:", chatRoomId);
                this.onChatRoomCreated(chatRoomId);

                // 이후 해당 채팅방으로 구독 변경
                this.client?.subscribe(`/topic/${chatRoomId}`, (message) => {
                    // 해당 채팅방에서 오는 메시지를 처리
                    console.log("New message in chat room:", message.body);
                });
            });
        };

        this.client.onStompError = (frame) => {
            console.error("STOMP error:", frame);
        };

        this.client.activate();
    }

    CreateChatRoom = (chatRoomData: any) => {
        if (this.client?.connected) {
            this.client?.publish({
                destination: "/app/createchatroom",
                body: JSON.stringify(chatRoomData),
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
        } else {
            console.log("Not connected to WebSocket server.");
        }
    };

    sendMessage(destination: string, body: any) {
        if (this.client?.connected) {
            const message = JSON.stringify(body);
            console.log(`Sending message to ${destination}:`, message);

            this.client?.publish({
                destination: destination,
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
