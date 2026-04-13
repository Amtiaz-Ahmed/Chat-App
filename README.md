# Chat App (NestJS + Socket.IO + WebRTC Audio)

Realtime chat application with:
- JWT authentication
- One-to-one messaging
- Group messaging
- Message status (`sent`, `delivered`, `read`)
- Presence (`online` / `offline`)
- Browser-to-browser audio calling (WebRTC + Socket.IO signaling)

## Tech Stack

- Backend: NestJS, Prisma, Socket.IO
- Frontend: Vanilla HTML/CSS/JS (served from `public/`)
- Database: MySQL (via Prisma schema)

## Features

### Authentication
- Register and login with JWT.
- Passwords are hashed with bcrypt.

### Presence
- Socket auto-connects after login and session restore.
- User status becomes:
  - `online` on socket connect
  - `offline` on socket disconnect (when all user sockets are gone)
- Presence updates are pushed using `presence:changed`.

### Direct Messaging
- Send direct messages in realtime.
- Auto message status logic:
  - receiver offline -> `sent`
  - receiver online but not active in that chat -> `delivered`
  - receiver active in that chat -> `read`

### Group Messaging
- Create groups with member IDs.
- Load your groups and group messages.
- Send group messages in realtime.
- Group members list shows online/offline status.

### Audio Calling
- Audio-only calling (no video).
- Signaling events: `call:start`, `call:accept`, `call:reject`, `call:offer`, `call:answer`, `call:ice-candidate`, `call:end`.
- WebRTC media path with STUN (`stun.l.google.com:19302`).

## Project Structure

- `src/auth` - login/register/JWT
- `src/users` - profiles and user listing (with status)
- `src/messages` - direct chat, status logic, socket gateway
- `src/groups` - groups and group chat APIs
- `public/` - simple frontend demo UI

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment (example)

```env
DATABASE_URL="mysql://user:password@localhost:3306/chat_db"
JWT_SECRET="change_me"
PORT=3000
```

3. Run migrations / generate Prisma client as needed for your local setup.

4. Start development server

```bash
npm run start:dev
```

5. Open browser

```text
http://localhost:3000
```

## How to Test Quickly

1. Open two browser windows (or two different browser profiles).
2. Register/login as two users.
3. Direct chat:
   - click a user in sidebar
   - send messages
   - verify status changes (`sent` / `delivered` / `read`)
4. Group chat:
   - create group with user IDs
   - load group messages
   - verify member online/offline badges
5. Audio call:
   - user A enters user B ID and starts call
   - user B accepts
   - allow microphone permissions on both sides

