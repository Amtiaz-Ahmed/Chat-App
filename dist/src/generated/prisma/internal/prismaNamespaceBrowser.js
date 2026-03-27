"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMemberOrderByRelevanceFieldEnum = exports.GroupOrderByRelevanceFieldEnum = exports.MessageOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.SortOrder = exports.GroupMemberScalarFieldEnum = exports.GroupScalarFieldEnum = exports.MessageScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Message: 'Message',
    Group: 'Group',
    GroupMember: 'GroupMember'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    profilePicture: 'profilePicture',
    status: 'status',
    createdAt: 'createdAt'
};
exports.MessageScalarFieldEnum = {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    groupId: 'groupId',
    content: 'content',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt'
};
exports.GroupScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
};
exports.GroupMemberScalarFieldEnum = {
    groupId: 'groupId',
    userId: 'userId',
    role: 'role'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.UserOrderByRelevanceFieldEnum = {
    name: 'name',
    email: 'email',
    password: 'password',
    profilePicture: 'profilePicture',
    status: 'status'
};
exports.MessageOrderByRelevanceFieldEnum = {
    content: 'content',
    type: 'type',
    status: 'status'
};
exports.GroupOrderByRelevanceFieldEnum = {
    name: 'name'
};
exports.GroupMemberOrderByRelevanceFieldEnum = {
    role: 'role'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map