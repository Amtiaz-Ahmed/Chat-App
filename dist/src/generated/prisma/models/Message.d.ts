import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MessageModel = runtime.Types.Result.DefaultSelection<Prisma.$MessagePayload>;
export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _avg: MessageAvgAggregateOutputType | null;
    _sum: MessageSumAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
export type MessageAvgAggregateOutputType = {
    id: number | null;
    senderId: number | null;
    receiverId: number | null;
    groupId: number | null;
};
export type MessageSumAggregateOutputType = {
    id: number | null;
    senderId: number | null;
    receiverId: number | null;
    groupId: number | null;
};
export type MessageMinAggregateOutputType = {
    id: number | null;
    senderId: number | null;
    receiverId: number | null;
    groupId: number | null;
    content: string | null;
    type: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type MessageMaxAggregateOutputType = {
    id: number | null;
    senderId: number | null;
    receiverId: number | null;
    groupId: number | null;
    content: string | null;
    type: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type MessageCountAggregateOutputType = {
    id: number;
    senderId: number;
    receiverId: number;
    groupId: number;
    content: number;
    type: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type MessageAvgAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    groupId?: true;
};
export type MessageSumAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    groupId?: true;
};
export type MessageMinAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    groupId?: true;
    content?: true;
    type?: true;
    status?: true;
    createdAt?: true;
};
export type MessageMaxAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    groupId?: true;
    content?: true;
    type?: true;
    status?: true;
    createdAt?: true;
};
export type MessageCountAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    groupId?: true;
    content?: true;
    type?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type MessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MessageCountAggregateInputType;
    _avg?: MessageAvgAggregateInputType;
    _sum?: MessageSumAggregateInputType;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessage[P]> : Prisma.GetScalarType<T[P], AggregateMessage[P]>;
};
export type MessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithAggregationInput | Prisma.MessageOrderByWithAggregationInput[];
    by: Prisma.MessageScalarFieldEnum[] | Prisma.MessageScalarFieldEnum;
    having?: Prisma.MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _avg?: MessageAvgAggregateInputType;
    _sum?: MessageSumAggregateInputType;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
};
export type MessageGroupByOutputType = {
    id: number;
    senderId: number;
    receiverId: number | null;
    groupId: number | null;
    content: string;
    type: string;
    status: string;
    createdAt: Date;
    _count: MessageCountAggregateOutputType | null;
    _avg: MessageAvgAggregateOutputType | null;
    _sum: MessageSumAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
};
type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageGroupByOutputType[P]>;
}>>;
export type MessageWhereInput = {
    AND?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    OR?: Prisma.MessageWhereInput[];
    NOT?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    id?: Prisma.IntFilter<"Message"> | number;
    senderId?: Prisma.IntFilter<"Message"> | number;
    receiverId?: Prisma.IntNullableFilter<"Message"> | number | null;
    groupId?: Prisma.IntNullableFilter<"Message"> | number | null;
    content?: Prisma.StringFilter<"Message"> | string;
    type?: Prisma.StringFilter<"Message"> | string;
    status?: Prisma.StringFilter<"Message"> | string;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    receiver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    group?: Prisma.XOR<Prisma.GroupNullableScalarRelationFilter, Prisma.GroupWhereInput> | null;
};
export type MessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrderInput | Prisma.SortOrder;
    groupId?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    sender?: Prisma.UserOrderByWithRelationInput;
    receiver?: Prisma.UserOrderByWithRelationInput;
    group?: Prisma.GroupOrderByWithRelationInput;
    _relevance?: Prisma.MessageOrderByRelevanceInput;
};
export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    OR?: Prisma.MessageWhereInput[];
    NOT?: Prisma.MessageWhereInput | Prisma.MessageWhereInput[];
    senderId?: Prisma.IntFilter<"Message"> | number;
    receiverId?: Prisma.IntNullableFilter<"Message"> | number | null;
    groupId?: Prisma.IntNullableFilter<"Message"> | number | null;
    content?: Prisma.StringFilter<"Message"> | string;
    type?: Prisma.StringFilter<"Message"> | string;
    status?: Prisma.StringFilter<"Message"> | string;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
    sender?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    receiver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    group?: Prisma.XOR<Prisma.GroupNullableScalarRelationFilter, Prisma.GroupWhereInput> | null;
}, "id">;
export type MessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrderInput | Prisma.SortOrder;
    groupId?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MessageCountOrderByAggregateInput;
    _avg?: Prisma.MessageAvgOrderByAggregateInput;
    _max?: Prisma.MessageMaxOrderByAggregateInput;
    _min?: Prisma.MessageMinOrderByAggregateInput;
    _sum?: Prisma.MessageSumOrderByAggregateInput;
};
export type MessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.MessageScalarWhereWithAggregatesInput | Prisma.MessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.MessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MessageScalarWhereWithAggregatesInput | Prisma.MessageScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Message"> | number;
    senderId?: Prisma.IntWithAggregatesFilter<"Message"> | number;
    receiverId?: Prisma.IntNullableWithAggregatesFilter<"Message"> | number | null;
    groupId?: Prisma.IntNullableWithAggregatesFilter<"Message"> | number | null;
    content?: Prisma.StringWithAggregatesFilter<"Message"> | string;
    type?: Prisma.StringWithAggregatesFilter<"Message"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Message"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Message"> | Date | string;
};
export type MessageCreateInput = {
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutMessagesSentInput;
    receiver?: Prisma.UserCreateNestedOneWithoutMessagesRecvInput;
    group?: Prisma.GroupCreateNestedOneWithoutMessagesInput;
};
export type MessageUncheckedCreateInput = {
    id?: number;
    senderId: number;
    receiverId?: number | null;
    groupId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageUpdateInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesSentNestedInput;
    receiver?: Prisma.UserUpdateOneWithoutMessagesRecvNestedInput;
    group?: Prisma.GroupUpdateOneWithoutMessagesNestedInput;
};
export type MessageUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    groupId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageCreateManyInput = {
    id?: number;
    senderId: number;
    receiverId?: number | null;
    groupId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageUpdateManyMutationInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    groupId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageListRelationFilter = {
    every?: Prisma.MessageWhereInput;
    some?: Prisma.MessageWhereInput;
    none?: Prisma.MessageWhereInput;
};
export type MessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MessageOrderByRelevanceInput = {
    fields: Prisma.MessageOrderByRelevanceFieldEnum | Prisma.MessageOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type MessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    groupId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    groupId?: Prisma.SortOrder;
};
export type MessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    groupId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    groupId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MessageSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    receiverId?: Prisma.SortOrder;
    groupId?: Prisma.SortOrder;
};
export type MessageCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReceiverInput, Prisma.MessageUncheckedCreateWithoutReceiverInput> | Prisma.MessageCreateWithoutReceiverInput[] | Prisma.MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReceiverInput | Prisma.MessageCreateOrConnectWithoutReceiverInput[];
    createMany?: Prisma.MessageCreateManyReceiverInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReceiverInput, Prisma.MessageUncheckedCreateWithoutReceiverInput> | Prisma.MessageCreateWithoutReceiverInput[] | Prisma.MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReceiverInput | Prisma.MessageCreateOrConnectWithoutReceiverInput[];
    createMany?: Prisma.MessageCreateManyReceiverInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutSenderInput | Prisma.MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReceiverInput, Prisma.MessageUncheckedCreateWithoutReceiverInput> | Prisma.MessageCreateWithoutReceiverInput[] | Prisma.MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReceiverInput | Prisma.MessageCreateOrConnectWithoutReceiverInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutReceiverInput | Prisma.MessageUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: Prisma.MessageCreateManyReceiverInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutReceiverInput | Prisma.MessageUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutReceiverInput | Prisma.MessageUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput> | Prisma.MessageCreateWithoutSenderInput[] | Prisma.MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutSenderInput | Prisma.MessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.MessageCreateManySenderInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutSenderInput | Prisma.MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutReceiverInput, Prisma.MessageUncheckedCreateWithoutReceiverInput> | Prisma.MessageCreateWithoutReceiverInput[] | Prisma.MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutReceiverInput | Prisma.MessageCreateOrConnectWithoutReceiverInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutReceiverInput | Prisma.MessageUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: Prisma.MessageCreateManyReceiverInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutReceiverInput | Prisma.MessageUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutReceiverInput | Prisma.MessageUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type MessageCreateNestedManyWithoutGroupInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutGroupInput, Prisma.MessageUncheckedCreateWithoutGroupInput> | Prisma.MessageCreateWithoutGroupInput[] | Prisma.MessageUncheckedCreateWithoutGroupInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutGroupInput | Prisma.MessageCreateOrConnectWithoutGroupInput[];
    createMany?: Prisma.MessageCreateManyGroupInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUncheckedCreateNestedManyWithoutGroupInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutGroupInput, Prisma.MessageUncheckedCreateWithoutGroupInput> | Prisma.MessageCreateWithoutGroupInput[] | Prisma.MessageUncheckedCreateWithoutGroupInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutGroupInput | Prisma.MessageCreateOrConnectWithoutGroupInput[];
    createMany?: Prisma.MessageCreateManyGroupInputEnvelope;
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
};
export type MessageUpdateManyWithoutGroupNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutGroupInput, Prisma.MessageUncheckedCreateWithoutGroupInput> | Prisma.MessageCreateWithoutGroupInput[] | Prisma.MessageUncheckedCreateWithoutGroupInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutGroupInput | Prisma.MessageCreateOrConnectWithoutGroupInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutGroupInput | Prisma.MessageUpsertWithWhereUniqueWithoutGroupInput[];
    createMany?: Prisma.MessageCreateManyGroupInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutGroupInput | Prisma.MessageUpdateWithWhereUniqueWithoutGroupInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutGroupInput | Prisma.MessageUpdateManyWithWhereWithoutGroupInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: Prisma.XOR<Prisma.MessageCreateWithoutGroupInput, Prisma.MessageUncheckedCreateWithoutGroupInput> | Prisma.MessageCreateWithoutGroupInput[] | Prisma.MessageUncheckedCreateWithoutGroupInput[];
    connectOrCreate?: Prisma.MessageCreateOrConnectWithoutGroupInput | Prisma.MessageCreateOrConnectWithoutGroupInput[];
    upsert?: Prisma.MessageUpsertWithWhereUniqueWithoutGroupInput | Prisma.MessageUpsertWithWhereUniqueWithoutGroupInput[];
    createMany?: Prisma.MessageCreateManyGroupInputEnvelope;
    set?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    disconnect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    delete?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    connect?: Prisma.MessageWhereUniqueInput | Prisma.MessageWhereUniqueInput[];
    update?: Prisma.MessageUpdateWithWhereUniqueWithoutGroupInput | Prisma.MessageUpdateWithWhereUniqueWithoutGroupInput[];
    updateMany?: Prisma.MessageUpdateManyWithWhereWithoutGroupInput | Prisma.MessageUpdateManyWithWhereWithoutGroupInput[];
    deleteMany?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
};
export type MessageCreateWithoutSenderInput = {
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
    receiver?: Prisma.UserCreateNestedOneWithoutMessagesRecvInput;
    group?: Prisma.GroupCreateNestedOneWithoutMessagesInput;
};
export type MessageUncheckedCreateWithoutSenderInput = {
    id?: number;
    receiverId?: number | null;
    groupId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageCreateOrConnectWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput>;
};
export type MessageCreateManySenderInputEnvelope = {
    data: Prisma.MessageCreateManySenderInput | Prisma.MessageCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type MessageCreateWithoutReceiverInput = {
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutMessagesSentInput;
    group?: Prisma.GroupCreateNestedOneWithoutMessagesInput;
};
export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: number;
    senderId: number;
    groupId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageCreateOrConnectWithoutReceiverInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReceiverInput, Prisma.MessageUncheckedCreateWithoutReceiverInput>;
};
export type MessageCreateManyReceiverInputEnvelope = {
    data: Prisma.MessageCreateManyReceiverInput | Prisma.MessageCreateManyReceiverInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutSenderInput, Prisma.MessageUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutSenderInput, Prisma.MessageUncheckedCreateWithoutSenderInput>;
};
export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutSenderInput, Prisma.MessageUncheckedUpdateWithoutSenderInput>;
};
export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutSenderInput>;
};
export type MessageScalarWhereInput = {
    AND?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
    OR?: Prisma.MessageScalarWhereInput[];
    NOT?: Prisma.MessageScalarWhereInput | Prisma.MessageScalarWhereInput[];
    id?: Prisma.IntFilter<"Message"> | number;
    senderId?: Prisma.IntFilter<"Message"> | number;
    receiverId?: Prisma.IntNullableFilter<"Message"> | number | null;
    groupId?: Prisma.IntNullableFilter<"Message"> | number | null;
    content?: Prisma.StringFilter<"Message"> | string;
    type?: Prisma.StringFilter<"Message"> | string;
    status?: Prisma.StringFilter<"Message"> | string;
    createdAt?: Prisma.DateTimeFilter<"Message"> | Date | string;
};
export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutReceiverInput, Prisma.MessageUncheckedUpdateWithoutReceiverInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutReceiverInput, Prisma.MessageUncheckedCreateWithoutReceiverInput>;
};
export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutReceiverInput, Prisma.MessageUncheckedUpdateWithoutReceiverInput>;
};
export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutReceiverInput>;
};
export type MessageCreateWithoutGroupInput = {
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
    sender: Prisma.UserCreateNestedOneWithoutMessagesSentInput;
    receiver?: Prisma.UserCreateNestedOneWithoutMessagesRecvInput;
};
export type MessageUncheckedCreateWithoutGroupInput = {
    id?: number;
    senderId: number;
    receiverId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageCreateOrConnectWithoutGroupInput = {
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateWithoutGroupInput, Prisma.MessageUncheckedCreateWithoutGroupInput>;
};
export type MessageCreateManyGroupInputEnvelope = {
    data: Prisma.MessageCreateManyGroupInput | Prisma.MessageCreateManyGroupInput[];
    skipDuplicates?: boolean;
};
export type MessageUpsertWithWhereUniqueWithoutGroupInput = {
    where: Prisma.MessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.MessageUpdateWithoutGroupInput, Prisma.MessageUncheckedUpdateWithoutGroupInput>;
    create: Prisma.XOR<Prisma.MessageCreateWithoutGroupInput, Prisma.MessageUncheckedCreateWithoutGroupInput>;
};
export type MessageUpdateWithWhereUniqueWithoutGroupInput = {
    where: Prisma.MessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.MessageUpdateWithoutGroupInput, Prisma.MessageUncheckedUpdateWithoutGroupInput>;
};
export type MessageUpdateManyWithWhereWithoutGroupInput = {
    where: Prisma.MessageScalarWhereInput;
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyWithoutGroupInput>;
};
export type MessageCreateManySenderInput = {
    id?: number;
    receiverId?: number | null;
    groupId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageCreateManyReceiverInput = {
    id?: number;
    senderId: number;
    groupId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageUpdateWithoutSenderInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiver?: Prisma.UserUpdateOneWithoutMessagesRecvNestedInput;
    group?: Prisma.GroupUpdateOneWithoutMessagesNestedInput;
};
export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    groupId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    groupId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageUpdateWithoutReceiverInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesSentNestedInput;
    group?: Prisma.GroupUpdateOneWithoutMessagesNestedInput;
};
export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    groupId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    groupId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageCreateManyGroupInput = {
    id?: number;
    senderId: number;
    receiverId?: number | null;
    content: string;
    type?: string;
    status?: string;
    createdAt?: Date | string;
};
export type MessageUpdateWithoutGroupInput = {
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UserUpdateOneRequiredWithoutMessagesSentNestedInput;
    receiver?: Prisma.UserUpdateOneWithoutMessagesRecvNestedInput;
};
export type MessageUncheckedUpdateWithoutGroupInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageUncheckedUpdateManyWithoutGroupInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    senderId?: Prisma.IntFieldUpdateOperationsInput | number;
    receiverId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    groupId?: boolean;
    content?: boolean;
    type?: boolean;
    status?: boolean;
    createdAt?: boolean;
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.Message$receiverArgs<ExtArgs>;
    group?: boolean | Prisma.Message$groupArgs<ExtArgs>;
}, ExtArgs["result"]["message"]>;
export type MessageSelectScalar = {
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    groupId?: boolean;
    content?: boolean;
    type?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type MessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "senderId" | "receiverId" | "groupId" | "content" | "type" | "status" | "createdAt", ExtArgs["result"]["message"]>;
export type MessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sender?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receiver?: boolean | Prisma.Message$receiverArgs<ExtArgs>;
    group?: boolean | Prisma.Message$groupArgs<ExtArgs>;
};
export type $MessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Message";
    objects: {
        sender: Prisma.$UserPayload<ExtArgs>;
        receiver: Prisma.$UserPayload<ExtArgs> | null;
        group: Prisma.$GroupPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        senderId: number;
        receiverId: number | null;
        groupId: number | null;
        content: string;
        type: string;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["message"]>;
    composites: {};
};
export type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessagePayload, S>;
export type MessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
};
export interface MessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Message'];
        meta: {
            name: 'Message';
        };
    };
    findUnique<T extends MessageFindUniqueArgs>(args: Prisma.SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MessageFindFirstArgs>(args?: Prisma.SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MessageFindManyArgs>(args?: Prisma.SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MessageCreateArgs>(args: Prisma.SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MessageCreateManyArgs>(args?: Prisma.SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends MessageDeleteArgs>(args: Prisma.SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MessageUpdateArgs>(args: Prisma.SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MessageUpdateManyArgs>(args: Prisma.SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends MessageUpsertArgs>(args: Prisma.SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma.Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MessageCountArgs>(args?: Prisma.Subset<T, MessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageCountAggregateOutputType> : number>;
    aggregate<T extends MessageAggregateArgs>(args: Prisma.Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>;
    groupBy<T extends MessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MessageGroupByArgs['orderBy'];
    } : {
        orderBy?: MessageGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MessageFieldRefs;
}
export interface Prisma__MessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sender<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receiver<T extends Prisma.Message$receiverArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$receiverArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    group<T extends Prisma.Message$groupArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Message$groupArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MessageFieldRefs {
    readonly id: Prisma.FieldRef<"Message", 'Int'>;
    readonly senderId: Prisma.FieldRef<"Message", 'Int'>;
    readonly receiverId: Prisma.FieldRef<"Message", 'Int'>;
    readonly groupId: Prisma.FieldRef<"Message", 'Int'>;
    readonly content: Prisma.FieldRef<"Message", 'String'>;
    readonly type: Prisma.FieldRef<"Message", 'String'>;
    readonly status: Prisma.FieldRef<"Message", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Message", 'DateTime'>;
}
export type MessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type MessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageCreateInput, Prisma.MessageUncheckedCreateInput>;
};
export type MessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MessageCreateManyInput | Prisma.MessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageUpdateInput, Prisma.MessageUncheckedUpdateInput>;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MessageUpdateManyMutationInput, Prisma.MessageUncheckedUpdateManyInput>;
    where?: Prisma.MessageWhereInput;
    limit?: number;
};
export type MessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageCreateInput, Prisma.MessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MessageUpdateInput, Prisma.MessageUncheckedUpdateInput>;
};
export type MessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where: Prisma.MessageWhereUniqueInput;
};
export type MessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
    limit?: number;
};
export type Message$receiverArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Message$groupArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where?: Prisma.GroupWhereInput;
};
export type MessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
};
export {};
