"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const create_group_dto_1 = require("./dto/create-group.dto");
const send_group_message_dto_1 = require("./dto/send-group-message.dto");
const groups_service_1 = require("./groups.service");
let GroupsController = class GroupsController {
    groupsService;
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    createGroup(req, dto) {
        return this.groupsService.createGroup(req.user.userId, dto);
    }
    getMyGroups(req) {
        return this.groupsService.getMyGroups(req.user.userId);
    }
    getGroupMessages(req, id) {
        return this.groupsService.getGroupMessages(req.user.userId, id);
    }
    sendGroupMessage(req, id, dto) {
        return this.groupsService.sendGroupMessage(req.user.userId, id, dto);
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getMyGroups", null);
__decorate([
    (0, common_1.Get)(':id/messages'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupMessages", null);
__decorate([
    (0, common_1.Post)(':id/messages'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, send_group_message_dto_1.SendGroupMessageDto]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "sendGroupMessage", null);
exports.GroupsController = GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map