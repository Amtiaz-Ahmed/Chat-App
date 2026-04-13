const API_BASE = window.location.origin;

const state = {
  token: localStorage.getItem('chat_token') || '',
  user: JSON.parse(localStorage.getItem('chat_user') || 'null'),
  socket: null,
  call: {
    peerId: null,
    pendingCallerId: null,
    pc: null,
    localStream: null,
    pendingIceCandidates: [],
  },
};

const el = {
  sessionLabel: document.getElementById('sessionLabel'),
  logoutBtn: document.getElementById('logoutBtn'),
  signupForm: document.getElementById('signupForm'),
  loginForm: document.getElementById('loginForm'),
  receiverId: document.getElementById('receiverId'),
  loadConversationBtn: document.getElementById('loadConversationBtn'),
  loadInboxBtn: document.getElementById('loadInboxBtn'),
  refreshUsersBtn: document.getElementById('refreshUsersBtn'),
  conversation: document.getElementById('conversation'),
  inbox: document.getElementById('inbox'),
  usersList: document.getElementById('usersList'),
  messageInput: document.getElementById('messageInput'),
  sendMessageBtn: document.getElementById('sendMessageBtn'),
  groupNameInput: document.getElementById('groupNameInput'),
  groupMemberIdsInput: document.getElementById('groupMemberIdsInput'),
  createGroupBtn: document.getElementById('createGroupBtn'),
  loadGroupsBtn: document.getElementById('loadGroupsBtn'),
  activeGroupId: document.getElementById('activeGroupId'),
  loadGroupMessagesBtn: document.getElementById('loadGroupMessagesBtn'),
  refreshGroupMembersBtn: document.getElementById('refreshGroupMembersBtn'),
  groupMessageInput: document.getElementById('groupMessageInput'),
  sendGroupMessageBtn: document.getElementById('sendGroupMessageBtn'),
  groupsList: document.getElementById('groupsList'),
  groupMembersList: document.getElementById('groupMembersList'),
  groupMessagesList: document.getElementById('groupMessagesList'),
  callTargetUserId: document.getElementById('callTargetUserId'),
  startAudioCallBtn: document.getElementById('startAudioCallBtn'),
  acceptCallBtn: document.getElementById('acceptCallBtn'),
  rejectCallBtn: document.getElementById('rejectCallBtn'),
  endCallBtn: document.getElementById('endCallBtn'),
  callStatus: document.getElementById('callStatus'),
  remoteAudio: document.getElementById('remoteAudio'),
  logs: document.getElementById('logs'),
};

el.callStatus.value = 'Idle';

function log(msg) {
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  el.logs.textContent = `${line}\n${el.logs.textContent}`;
}

function updateSessionUi() {
  if (!state.user || !state.token) {
    el.sessionLabel.textContent = 'Not logged in';
    return;
  }
  el.sessionLabel.textContent = `Logged in: ${state.user.name} (#${state.user.id})`;
}

function saveSession(token, user) {
  state.token = token;
  state.user = user;
  localStorage.setItem('chat_token', token);
  localStorage.setItem('chat_user', JSON.stringify(user));
  updateSessionUi();
  wireSocket();
}

function clearSession() {
  state.token = '';
  state.user = null;
  localStorage.removeItem('chat_token');
  localStorage.removeItem('chat_user');
  if (state.socket) {
    state.socket.disconnect();
    state.socket = null;
  }
  resetCallState(false);
  updateSessionUi();
}

async function api(path, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

function renderList(container, items, format) {
  container.innerHTML = '';
  if (!items.length) {
    container.innerHTML = '<div class="list-item">No data</div>';
    return;
  }
  for (const item of items) {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.textContent = format(item);
    container.appendChild(div);
  }
}

function statusBadge(status) {
  const safe = status === 'online' ? 'online' : 'offline';
  return `<span class="status-pill status-${safe}">${safe}</span>`;
}

function renderUsersList(users) {
  el.usersList.innerHTML = '';
  if (!users.length) {
    el.usersList.innerHTML = '<div class="list-item">No users</div>';
    return;
  }

  for (const user of users) {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `#${user.id} ${user.name} ${statusBadge(user.status)}`;
    div.style.cursor = 'pointer';
    div.title = 'Click to chat';
    div.addEventListener('click', () => {
      el.receiverId.value = String(user.id);
      loadConversation();
    });
    el.usersList.appendChild(div);
  }
}

function renderGroupMembers(group) {
  el.groupMembersList.innerHTML = '';
  const members = group?.members ?? [];
  if (!members.length) {
    el.groupMembersList.innerHTML = '<div class="list-item">No group members</div>';
    return;
  }

  for (const member of members) {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `#${member.user.id} ${member.user.name} ${statusBadge(member.user.status)}`;
    el.groupMembersList.appendChild(div);
  }
}

function wireSocket() {
  if (!state.token) {
    log('Login first to connect socket.');
    return;
  }

  if (state.socket) {
    state.socket.disconnect();
  }

  state.socket = io(API_BASE, {
    auth: { token: state.token },
  });

  state.socket.on('connect', () => {
    log(`Socket connected (${state.socket.id})`);
    loadUsers();
    loadGroups();
  });
  state.socket.on('disconnect', () => log('Socket disconnected'));
  state.socket.on('chat:connected', (data) =>
    log(`chat:connected userId=${data.userId}`),
  );
  state.socket.on('presence:changed', () => {
    loadUsers();
    loadGroupMembers();
  });
  state.socket.on('message:new', (message) => {
    log(`message:new id=${message.id} from=${message.senderId} to=${message.receiverId}`);
    const receiverId = Number(el.receiverId.value);
    if (
      Number.isInteger(receiverId) &&
      (message.senderId === receiverId || message.receiverId === receiverId)
    ) {
      loadConversation();
    }
    loadInbox();
    loadUsers();
  });
  state.socket.on('message:status:updated', (message) => {
    log(`message:status:updated id=${message.id} status=${message.status}`);
    loadInbox();
    loadUsers();
  });
  state.socket.on('group:message:new', (message) => {
    log(`group:message:new id=${message.id} group=${message.groupId} sender=${message.senderId}`);
    const activeGroupId = Number(el.activeGroupId.value);
    if (Number.isInteger(activeGroupId) && message.groupId === activeGroupId) {
      loadGroupMessages();
    }
    loadGroupMembers();
  });
  state.socket.on('call:incoming', ({ fromUserId }) => {
    state.call.pendingCallerId = fromUserId;
    setCallStatus(`Incoming call from user ${fromUserId}`);
    log(`Incoming audio call from user ${fromUserId}`);
  });
  state.socket.on('call:ringing', ({ targetUserId }) => {
    setCallStatus(`Ringing user ${targetUserId}...`);
    log(`Calling user ${targetUserId}`);
  });
  state.socket.on('call:accepted', async ({ byUserId }) => {
    try {
      state.call.peerId = byUserId;
      setCallStatus(`Call accepted by user ${byUserId}, connecting...`);
      await ensurePeerConnection(byUserId);
      const offer = await state.call.pc.createOffer();
      await state.call.pc.setLocalDescription(offer);
      state.socket.emit('call:offer', { toUserId: byUserId, offer });
      log(`Sent offer to user ${byUserId}`);
    } catch (error) {
      log(`Offer error: ${error.message}`);
      resetCallState();
    }
  });
  state.socket.on('call:rejected', ({ byUserId }) => {
    log(`Call rejected by user ${byUserId}`);
    setCallStatus(`Rejected by user ${byUserId}`);
    resetCallState(false);
  });
  state.socket.on('call:offer', async ({ fromUserId, offer }) => {
    try {
      state.call.peerId = fromUserId;
      await ensurePeerConnection(fromUserId);
      await state.call.pc.setRemoteDescription(new RTCSessionDescription(offer));
      await flushPendingIceCandidates();
      const answer = await state.call.pc.createAnswer();
      await state.call.pc.setLocalDescription(answer);
      state.socket.emit('call:answer', { toUserId: fromUserId, answer });
      setCallStatus(`In call with user ${fromUserId}`);
      log(`Received offer and sent answer to user ${fromUserId}`);
    } catch (error) {
      log(`Handle offer error: ${error.message}`);
      resetCallState();
    }
  });
  state.socket.on('call:answer', async ({ fromUserId, answer }) => {
    try {
      if (!state.call.pc) return;
      await state.call.pc.setRemoteDescription(new RTCSessionDescription(answer));
      await flushPendingIceCandidates();
      setCallStatus(`In call with user ${fromUserId}`);
      log(`Received answer from user ${fromUserId}`);
    } catch (error) {
      log(`Handle answer error: ${error.message}`);
    }
  });
  state.socket.on('call:ice-candidate', async ({ candidate }) => {
    try {
      if (!state.call.pc || !candidate) return;
      if (!state.call.pc.remoteDescription) {
        state.call.pendingIceCandidates.push(candidate);
        return;
      }
      await state.call.pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      log(`ICE candidate error: ${error.message}`);
    }
  });
  state.socket.on('call:ended', ({ byUserId }) => {
    log(`Call ended by user ${byUserId}`);
    setCallStatus(`Call ended by user ${byUserId}`);
    resetCallState(false);
  });
}

function setCallStatus(text) {
  el.callStatus.value = text;
}

async function ensurePeerConnection(peerId) {
  if (state.call.pc) {
    return state.call.pc;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  state.call.localStream = stream;

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
  });
  state.call.pc = pc;
  state.call.peerId = peerId;

  for (const track of stream.getTracks()) {
    pc.addTrack(track, stream);
  }

  pc.ontrack = (event) => {
    const [remoteStream] = event.streams;
    if (remoteStream) {
      el.remoteAudio.srcObject = remoteStream;
      el.remoteAudio
        .play()
        .then(() => log('Remote audio playing'))
        .catch((error) => log(`Remote audio play blocked: ${error.message}`));
    }
  };

  pc.onicecandidate = (event) => {
    if (event.candidate && state.socket && state.call.peerId) {
      state.socket.emit('call:ice-candidate', {
        toUserId: state.call.peerId,
        candidate: event.candidate.toJSON(),
      });
    }
  };

  pc.onconnectionstatechange = () => {
    if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
      setCallStatus('Call disconnected');
      resetCallState(false);
    }
  };

  return pc;
}

function resetCallState(resetStatus = true) {
  if (state.call.pc) {
    state.call.pc.close();
    state.call.pc = null;
  }
  if (state.call.localStream) {
    for (const track of state.call.localStream.getTracks()) {
      track.stop();
    }
    state.call.localStream = null;
  }
  if (el.remoteAudio.srcObject) {
    el.remoteAudio.srcObject = null;
  }
  state.call.peerId = null;
  state.call.pendingCallerId = null;
  state.call.pendingIceCandidates = [];
  if (resetStatus) {
    setCallStatus('Idle');
  }
}

async function flushPendingIceCandidates() {
  if (!state.call.pc || !state.call.pendingIceCandidates.length) {
    return;
  }
  for (const candidate of state.call.pendingIceCandidates) {
    await state.call.pc.addIceCandidate(new RTCIceCandidate(candidate));
  }
  state.call.pendingIceCandidates = [];
}

async function loadConversation() {
  try {
    const receiverId = Number(el.receiverId.value);
    if (!Number.isInteger(receiverId)) {
      throw new Error('Enter valid receiver user id');
    }
    const data = await api(`/messages/direct/${receiverId}`);
    renderList(
      el.conversation,
      data,
      (m) => `#${m.id} ${m.sender?.name || m.senderId}: ${m.content} [${m.status}]`,
    );
    if (state.socket && state.socket.connected) {
      state.socket.emit('chat:active', { peerId: receiverId });
    }
    log(`Loaded conversation with user ${receiverId}`);
  } catch (error) {
    log(`Conversation error: ${error.message}`);
  }
}

async function loadInbox() {
  try {
    const data = await api('/messages/inbox');
    renderList(
      el.inbox,
      data,
      (m) => `#${m.id} ${m.sender?.name || m.senderId} -> ${m.receiver?.name || m.receiverId}: ${m.content}`,
    );
    log('Loaded inbox');
  } catch (error) {
    log(`Inbox error: ${error.message}`);
  }
}

async function loadUsers() {
  try {
    const users = await api('/users');
    renderUsersList(users);
  } catch (error) {
    log(`Users error: ${error.message}`);
  }
}

async function loadGroups() {
  try {
    const groups = await api('/groups');
    renderList(
      el.groupsList,
      groups,
      (group) => `#${group.id} ${group.name} (${group.members.length} members)`,
    );
    const activeGroupId = Number(el.activeGroupId.value);
    if (Number.isInteger(activeGroupId)) {
      const active = groups.find((group) => group.id === activeGroupId);
      if (active) {
        renderGroupMembers(active);
      }
    }
    log(`Loaded ${groups.length} groups`);
  } catch (error) {
    log(`Load groups error: ${error.message}`);
  }
}

async function loadGroupMembers() {
  try {
    const groupId = Number(el.activeGroupId.value);
    if (!Number.isInteger(groupId)) {
      el.groupMembersList.innerHTML = '<div class="list-item">Select a group to view members</div>';
      return;
    }
    const groups = await api('/groups');
    const group = groups.find((item) => item.id === groupId);
    if (!group) {
      throw new Error('Group not found in your list');
    }
    renderGroupMembers(group);
  } catch (error) {
    log(`Group members error: ${error.message}`);
  }
}

async function loadGroupMessages() {
  try {
    const groupId = Number(el.activeGroupId.value);
    if (!Number.isInteger(groupId)) {
      throw new Error('Enter valid group id');
    }
    const messages = await api(`/groups/${groupId}/messages`);
    renderList(
      el.groupMessagesList,
      messages,
      (m) => `#${m.id} ${m.sender?.name || m.senderId}: ${m.content}`,
    );
    await loadGroupMembers();
    log(`Loaded messages for group ${groupId}`);
  } catch (error) {
    log(`Load group messages error: ${error.message}`);
  }
}

el.signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('signupName').value.trim(),
    email: document.getElementById('signupEmail').value.trim(),
    password: document.getElementById('signupPassword').value,
  };
  try {
    const res = await api('/auth/register', 'POST', payload);
    saveSession(res.accessToken, res.user);
    log(`Signup success as ${res.user.name} (#${res.user.id})`);
  } catch (error) {
    log(`Signup failed: ${error.message}`);
  }
});

el.loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    email: document.getElementById('loginEmail').value.trim(),
    password: document.getElementById('loginPassword').value,
  };
  try {
    const res = await api('/auth/login', 'POST', payload);
    saveSession(res.accessToken, res.user);
    log(`Login success as ${res.user.name} (#${res.user.id})`);
  } catch (error) {
    log(`Login failed: ${error.message}`);
  }
});

el.logoutBtn.addEventListener('click', () => {
  clearSession();
  log('Logged out');
});

el.loadConversationBtn.addEventListener('click', loadConversation);
el.loadInboxBtn.addEventListener('click', loadInbox);
el.refreshUsersBtn.addEventListener('click', loadUsers);

el.sendMessageBtn.addEventListener('click', async () => {
  try {
    const receiverId = Number(el.receiverId.value);
    const content = el.messageInput.value.trim();
    if (!Number.isInteger(receiverId)) throw new Error('Enter valid receiver user id');
    if (!content) throw new Error('Message is empty');
    if (!state.socket || !state.socket.connected) throw new Error('Socket not connected');

    state.socket.emit(
      'message:send',
      { receiverId, content, type: 'text' },
      (ack) => {
        if (ack?.ok) {
          log(`Message sent id=${ack.message.id}`);
          el.messageInput.value = '';
          loadConversation();
          loadInbox();
        } else {
          log(`Send failed: ${ack?.error || 'Unknown error'}`);
        }
      },
    );
  } catch (error) {
    log(`Send error: ${error.message}`);
  }
});

el.createGroupBtn.addEventListener('click', async () => {
  try {
    const name = el.groupNameInput.value.trim();
    if (!name) throw new Error('Group name is required');

    const memberIdsRaw = el.groupMemberIdsInput.value
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
    const memberIds = memberIdsRaw.map((part) => Number(part));
    if (memberIds.some((id) => !Number.isInteger(id))) {
      throw new Error('Member IDs must be comma-separated numbers');
    }

    const group = await api('/groups', 'POST', { name, memberIds });
    el.activeGroupId.value = String(group.id);
    log(`Group created id=${group.id} name=${group.name}`);
    loadGroups();
    loadGroupMessages();
  } catch (error) {
    log(`Create group error: ${error.message}`);
  }
});

el.loadGroupsBtn.addEventListener('click', loadGroups);
el.loadGroupMessagesBtn.addEventListener('click', loadGroupMessages);
el.refreshGroupMembersBtn.addEventListener('click', loadGroupMembers);

el.sendGroupMessageBtn.addEventListener('click', async () => {
  try {
    const groupId = Number(el.activeGroupId.value);
    const content = el.groupMessageInput.value.trim();
    if (!Number.isInteger(groupId)) throw new Error('Enter valid group id');
    if (!content) throw new Error('Group message is empty');
    if (!state.socket || !state.socket.connected) throw new Error('Socket not connected');

    state.socket.emit('group:message:send', { groupId, content, type: 'text' }, (ack) => {
      if (ack?.ok) {
        log(`Group message sent id=${ack.message.id} group=${ack.message.groupId}`);
        el.groupMessageInput.value = '';
        loadGroupMessages();
      } else {
        log(`Group send failed: ${ack?.error || 'Unknown error'}`);
      }
    });
  } catch (error) {
    log(`Group send error: ${error.message}`);
  }
});

el.startAudioCallBtn.addEventListener('click', () => {
  try {
    const targetUserId = Number(el.callTargetUserId.value);
    if (!Number.isInteger(targetUserId)) throw new Error('Enter valid target user id');
    if (!state.socket || !state.socket.connected) throw new Error('Socket not connected');
    state.call.peerId = targetUserId;
    state.socket.emit('call:start', { targetUserId, mode: 'audio' }, (ack) => {
      if (!ack?.ok) {
        setCallStatus(`Call failed: ${ack?.error || 'Unknown error'}`);
        log(`Call start failed: ${ack?.error || 'Unknown error'}`);
        resetCallState(false);
      }
    });
  } catch (error) {
    log(`Start call error: ${error.message}`);
  }
});

el.acceptCallBtn.addEventListener('click', async () => {
  try {
    if (!state.socket || !state.socket.connected) throw new Error('Socket not connected');
    if (!state.call.pendingCallerId) throw new Error('No incoming call');
    const callerId = state.call.pendingCallerId;
    state.call.peerId = callerId;
    state.socket.emit('call:accept', { fromUserId: callerId });
    setCallStatus(`Accepted call from user ${callerId}`);
  } catch (error) {
    log(`Accept call error: ${error.message}`);
  }
});

el.rejectCallBtn.addEventListener('click', () => {
  try {
    if (!state.socket || !state.socket.connected) throw new Error('Socket not connected');
    if (!state.call.pendingCallerId) throw new Error('No incoming call');
    const callerId = state.call.pendingCallerId;
    state.socket.emit('call:reject', { fromUserId: callerId });
    setCallStatus(`Rejected call from user ${callerId}`);
    state.call.pendingCallerId = null;
  } catch (error) {
    log(`Reject call error: ${error.message}`);
  }
});

el.endCallBtn.addEventListener('click', () => {
  try {
    if (state.socket && state.socket.connected && state.call.peerId) {
      state.socket.emit('call:end', { toUserId: state.call.peerId });
    }
    resetCallState();
    log('Call ended');
  } catch (error) {
    log(`End call error: ${error.message}`);
  }
});

updateSessionUi();
if (state.token && state.user) {
  log(`Session restored for ${state.user.name} (#${state.user.id})`);
  wireSocket();
  loadUsers();
  loadGroups();
}
