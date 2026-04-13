Software Requirements Specification (SRS) Project: WhatsApp-like Chat
Backend

1.  Introduction Purpose: The purpose of this system is to build a
    real-time messaging backend similar to WhatsApp supporting:

-   One-to-one messaging
-   Group chats
-   Message status (sent/delivered/read)
-   Media messages
-   Video and audio calling

The system will provide REST APIs and WebSocket services to allow client
applications to communicate in real time.

2.  Overall System Description The system is a backend service
    responsible for:

-   Authentication
-   Messaging
-   Group management
-   Real-time events
-   Video call signaling

Video streaming will be implemented using WebRTC while the backend works
as a signaling server.

Architecture: Client Application | REST API + WebSocket | NestJS Backend
| Database

3.  Functional Requirements

3.1 Authentication Features: - User registration - Login - JWT
authentication - Logout

API examples: POST /auth/register POST /auth/login GET /users/profile

3.2 User Management The system should allow users to manage their
profile.

Features: - Update profile - Upload profile picture - Online/offline
status - Search users

User Table Structure: users id name email password profile_picture
status created_at

3.3 One-to-One Chat Users should be able to send and receive messages in
real time.

WebSocket event example: send_message { senderId receiverId message }

Messages Table: messages id sender_id receiver_id content type status
created_at

3.4 Message Status Each message must support the following statuses: -
sent - delivered - seen

Events: message_delivered message_seen

3.5 Group Chat Users can create and manage chat groups.

Features: - Create group - Add members - Remove members - Leave group -
Send group messages

Database Tables:

groups id name created_by created_at

group_members group_id user_id role

3.6 Media Messaging Users should be able to send: - Images - Videos -
Documents

Files will be stored in cloud storage (example: Amazon S3).

Message types: text image video file

3.7 Online and Offline Status The system should track user presence.

Events: user_online user_offline

3.8 Typing Indicator Users should see when another user is typing.

Events: typing_start typing_stop

3.9 Video Calling Video calls will be implemented using WebRTC.

Backend responsibilities: - Handle call signaling - Exchange offer and
answer - Exchange ICE candidates

Call Flow: 1. User A initiates call call_user

2.  Server sends incoming call notification incoming_call

3.  Caller sends WebRTC offer webrtc_offer

4.  Receiver responds with answer webrtc_answer

5.  Both users exchange ICE candidates ice_candidate

After signaling, the video stream connects peer-to-peer.

4.  Non-Functional Requirements

Performance: - Support thousands of concurrent connections - Real-time
messaging latency under 500ms

Scalability: - Use Redis for Socket.IO scaling - Horizontal scaling of
NestJS instances

Security: - JWT authentication - Password hashing - Rate limiting -
Input validation

Availability: - High uptime - Load balancer - Multiple backend instances

5.  System Architecture

Main Modules: - Auth Module - Users Module - Chat Module - Groups
Module - Messages Module - Calls Module - WebSocket Gateway

Technology Stack: Backend: NestJS Socket.IO

Communication: REST API WebSocket

Video: WebRTC

Database: MongoDB or SQL

Caching: Redis

6.  Future Enhancements

-   Push notifications
-   End-to-end encryption
-   Voice messages
-   Message reactions
-   Message deletion
-   Call recording
-   Chat search




i want to make this just backend only help me to do it