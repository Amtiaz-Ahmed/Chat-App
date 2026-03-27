import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GroupModel = runtime.Types.Result.DefaultSelection<Prisma.$GroupPayload>;
export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null;
    _avg: GroupAvgAggregateOutputType | null;
    _sum: GroupSumAggregateOutputType | null;
    _min: GroupMinAggregateOutputType | null;
    _max: GroupMaxAggregateOutputType | null;
};
export type GroupAvgAggregateOutputType = {
    id: number | null;
    createdBy: number | null;
};
export type GroupSumAggregateOutputType = {
    id: number | null;
    createdBy: number | null;
};
export type GroupMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    createdBy: number | null;
    createdAt: Date | null;
};
export type GroupMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    createdBy: number | null;
    createdAt: Date | null;
};
export type GroupCountAggregateOutputType = {
    id: number;
    name: number;
    createdBy: number;
    createdAt: number;
    _all: number;
};
export type GroupAvgAggregateInputType = {
    id?: true;
    createdBy?: true;
};
export type GroupSumAggregateInputType = {
    id?: true;
    createdBy?: true;
};
export type GroupMinAggregateInputType = {
    id?: true;
    name?: true;
    createdBy?: true;
    createdAt?: true;
};
export type GroupMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdBy?: true;
    createdAt?: true;
};
export type GroupCountAggregateInputType = {
    id?: true;
    name?: true;
    createdBy?: true;
    createdAt?: true;
    _all?: true;
};
export type GroupAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput | Prisma.GroupOrderByWithRelationInput[];
    cursor?: Prisma.GroupWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GroupCountAggregateInputType;
    _avg?: GroupAvgAggregateInputType;
    _sum?: GroupSumAggregateInputType;
    _min?: GroupMinAggregateInputType;
    _max?: GroupMaxAggregateInputType;
};
export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
    [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGroup[P]> : Prisma.GetScalarType<T[P], AggregateGroup[P]>;
};
export type GroupGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithAggregationInput | Prisma.GroupOrderByWithAggregationInput[];
    by: Prisma.GroupScalarFieldEnum[] | Prisma.GroupScalarFieldEnum;
    having?: Prisma.GroupScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GroupCountAggregateInputType | true;
    _avg?: GroupAvgAggregateInputType;
    _sum?: GroupSumAggregateInputType;
    _min?: GroupMinAggregateInputType;
    _max?: GroupMaxAggregateInputType;
};
export type GroupGroupByOutputType = {
    id: number;
    name: string;
    createdBy: number;
    createdAt: Date;
    _count: GroupCountAggregateOutputType | null;
    _avg: GroupAvgAggregateOutputType | null;
    _sum: GroupSumAggregateOutputType | null;
    _min: GroupMinAggregateOutputType | null;
    _max: GroupMaxAggregateOutputType | null;
};
type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GroupGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GroupGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GroupGroupByOutputType[P]>;
}>>;
export type GroupWhereInput = {
    AND?: Prisma.GroupWhereInput | Prisma.GroupWhereInput[];
    OR?: Prisma.GroupWhereInput[];
    NOT?: Prisma.GroupWhereInput | Prisma.GroupWhereInput[];
    id?: Prisma.IntFilter<"Group"> | number;
    name?: Prisma.StringFilter<"Group"> | string;
    createdBy?: Prisma.IntFilter<"Group"> | number;
    createdAt?: Prisma.DateTimeFilter<"Group"> | Date | string;
    members?: Prisma.GroupMemberListRelationFilter;
    messages?: Prisma.MessageListRelationFilter;
};
export type GroupOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    members?: Prisma.GroupMemberOrderByRelationAggregateInput;
    messages?: Prisma.MessageOrderByRelationAggregateInput;
    _relevance?: Prisma.GroupOrderByRelevanceInput;
};
export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.GroupWhereInput | Prisma.GroupWhereInput[];
    OR?: Prisma.GroupWhereInput[];
    NOT?: Prisma.GroupWhereInput | Prisma.GroupWhereInput[];
    name?: Prisma.StringFilter<"Group"> | string;
    createdBy?: Prisma.IntFilter<"Group"> | number;
    createdAt?: Prisma.DateTimeFilter<"Group"> | Date | string;
    members?: Prisma.GroupMemberListRelationFilter;
    messages?: Prisma.MessageListRelationFilter;
}, "id">;
export type GroupOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.GroupCountOrderByAggregateInput;
    _avg?: Prisma.GroupAvgOrderByAggregateInput;
    _max?: Prisma.GroupMaxOrderByAggregateInput;
    _min?: Prisma.GroupMinOrderByAggregateInput;
    _sum?: Prisma.GroupSumOrderByAggregateInput;
};
export type GroupScalarWhereWithAggregatesInput = {
    AND?: Prisma.GroupScalarWhereWithAggregatesInput | Prisma.GroupScalarWhereWithAggregatesInput[];
    OR?: Prisma.GroupScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GroupScalarWhereWithAggregatesInput | Prisma.GroupScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Group"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Group"> | string;
    createdBy?: Prisma.IntWithAggregatesFilter<"Group"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Group"> | Date | string;
};
export type GroupCreateInput = {
    name: string;
    createdBy: number;
    createdAt?: Date | string;
    members?: Prisma.GroupMemberCreateNestedManyWithoutGroupInput;
    messages?: Prisma.MessageCreateNestedManyWithoutGroupInput;
};
export type GroupUncheckedCreateInput = {
    id?: number;
    name: string;
    createdBy: number;
    createdAt?: Date | string;
    members?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutGroupInput;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutGroupInput;
};
export type GroupUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.GroupMemberUpdateManyWithoutGroupNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutGroupNestedInput;
};
export type GroupUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.GroupMemberUncheckedUpdateManyWithoutGroupNestedInput;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutGroupNestedInput;
};
export type GroupCreateManyInput = {
    id?: number;
    name: string;
    createdBy: number;
    createdAt?: Date | string;
};
export type GroupUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GroupNullableScalarRelationFilter = {
    is?: Prisma.GroupWhereInput | null;
    isNot?: Prisma.GroupWhereInput | null;
};
export type GroupOrderByRelevanceInput = {
    fields: Prisma.GroupOrderByRelevanceFieldEnum | Prisma.GroupOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type GroupCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GroupAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
};
export type GroupMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GroupMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type GroupSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdBy?: Prisma.SortOrder;
};
export type GroupScalarRelationFilter = {
    is?: Prisma.GroupWhereInput;
    isNot?: Prisma.GroupWhereInput;
};
export type GroupCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.GroupCreateWithoutMessagesInput, Prisma.GroupUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.GroupCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.GroupWhereUniqueInput;
};
export type GroupUpdateOneWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.GroupCreateWithoutMessagesInput, Prisma.GroupUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.GroupCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.GroupUpsertWithoutMessagesInput;
    disconnect?: Prisma.GroupWhereInput | boolean;
    delete?: Prisma.GroupWhereInput | boolean;
    connect?: Prisma.GroupWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GroupUpdateToOneWithWhereWithoutMessagesInput, Prisma.GroupUpdateWithoutMessagesInput>, Prisma.GroupUncheckedUpdateWithoutMessagesInput>;
};
export type GroupCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.GroupCreateWithoutMembersInput, Prisma.GroupUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.GroupCreateOrConnectWithoutMembersInput;
    connect?: Prisma.GroupWhereUniqueInput;
};
export type GroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.GroupCreateWithoutMembersInput, Prisma.GroupUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.GroupCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.GroupUpsertWithoutMembersInput;
    connect?: Prisma.GroupWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GroupUpdateToOneWithWhereWithoutMembersInput, Prisma.GroupUpdateWithoutMembersInput>, Prisma.GroupUncheckedUpdateWithoutMembersInput>;
};
export type GroupCreateWithoutMessagesInput = {
    name: string;
    createdBy: number;
    createdAt?: Date | string;
    members?: Prisma.GroupMemberCreateNestedManyWithoutGroupInput;
};
export type GroupUncheckedCreateWithoutMessagesInput = {
    id?: number;
    name: string;
    createdBy: number;
    createdAt?: Date | string;
    members?: Prisma.GroupMemberUncheckedCreateNestedManyWithoutGroupInput;
};
export type GroupCreateOrConnectWithoutMessagesInput = {
    where: Prisma.GroupWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupCreateWithoutMessagesInput, Prisma.GroupUncheckedCreateWithoutMessagesInput>;
};
export type GroupUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.GroupUpdateWithoutMessagesInput, Prisma.GroupUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.GroupCreateWithoutMessagesInput, Prisma.GroupUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.GroupWhereInput;
};
export type GroupUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.GroupWhereInput;
    data: Prisma.XOR<Prisma.GroupUpdateWithoutMessagesInput, Prisma.GroupUncheckedUpdateWithoutMessagesInput>;
};
export type GroupUpdateWithoutMessagesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.GroupMemberUpdateManyWithoutGroupNestedInput;
};
export type GroupUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.GroupMemberUncheckedUpdateManyWithoutGroupNestedInput;
};
export type GroupCreateWithoutMembersInput = {
    name: string;
    createdBy: number;
    createdAt?: Date | string;
    messages?: Prisma.MessageCreateNestedManyWithoutGroupInput;
};
export type GroupUncheckedCreateWithoutMembersInput = {
    id?: number;
    name: string;
    createdBy: number;
    createdAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutGroupInput;
};
export type GroupCreateOrConnectWithoutMembersInput = {
    where: Prisma.GroupWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupCreateWithoutMembersInput, Prisma.GroupUncheckedCreateWithoutMembersInput>;
};
export type GroupUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.GroupUpdateWithoutMembersInput, Prisma.GroupUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.GroupCreateWithoutMembersInput, Prisma.GroupUncheckedCreateWithoutMembersInput>;
    where?: Prisma.GroupWhereInput;
};
export type GroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.GroupWhereInput;
    data: Prisma.XOR<Prisma.GroupUpdateWithoutMembersInput, Prisma.GroupUncheckedUpdateWithoutMembersInput>;
};
export type GroupUpdateWithoutMembersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUpdateManyWithoutGroupNestedInput;
};
export type GroupUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdBy?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutGroupNestedInput;
};
export type GroupCountOutputType = {
    members: number;
    messages: number;
};
export type GroupCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | GroupCountOutputTypeCountMembersArgs;
    messages?: boolean | GroupCountOutputTypeCountMessagesArgs;
};
export type GroupCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupCountOutputTypeSelect<ExtArgs> | null;
};
export type GroupCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupMemberWhereInput;
};
export type GroupCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type GroupSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    members?: boolean | Prisma.Group$membersArgs<ExtArgs>;
    messages?: boolean | Prisma.Group$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.GroupCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["group"]>;
export type GroupSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
};
export type GroupOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdBy" | "createdAt", ExtArgs["result"]["group"]>;
export type GroupInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | Prisma.Group$membersArgs<ExtArgs>;
    messages?: boolean | Prisma.Group$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.GroupCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $GroupPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Group";
    objects: {
        members: Prisma.$GroupMemberPayload<ExtArgs>[];
        messages: Prisma.$MessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        createdBy: number;
        createdAt: Date;
    }, ExtArgs["result"]["group"]>;
    composites: {};
};
export type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GroupPayload, S>;
export type GroupCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GroupCountAggregateInputType | true;
};
export interface GroupDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Group'];
        meta: {
            name: 'Group';
        };
    };
    findUnique<T extends GroupFindUniqueArgs>(args: Prisma.SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GroupFindFirstArgs>(args?: Prisma.SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GroupFindManyArgs>(args?: Prisma.SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GroupCreateArgs>(args: Prisma.SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GroupCreateManyArgs>(args?: Prisma.SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends GroupDeleteArgs>(args: Prisma.SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GroupUpdateArgs>(args: Prisma.SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GroupDeleteManyArgs>(args?: Prisma.SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GroupUpdateManyArgs>(args: Prisma.SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends GroupUpsertArgs>(args: Prisma.SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma.Prisma__GroupClient<runtime.Types.Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GroupCountArgs>(args?: Prisma.Subset<T, GroupCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GroupCountAggregateOutputType> : number>;
    aggregate<T extends GroupAggregateArgs>(args: Prisma.Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>;
    groupBy<T extends GroupGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GroupGroupByArgs['orderBy'];
    } : {
        orderBy?: GroupGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GroupFieldRefs;
}
export interface Prisma__GroupClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    members<T extends Prisma.Group$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Group$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    messages<T extends Prisma.Group$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Group$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GroupFieldRefs {
    readonly id: Prisma.FieldRef<"Group", 'Int'>;
    readonly name: Prisma.FieldRef<"Group", 'String'>;
    readonly createdBy: Prisma.FieldRef<"Group", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Group", 'DateTime'>;
}
export type GroupFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where: Prisma.GroupWhereUniqueInput;
};
export type GroupFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where: Prisma.GroupWhereUniqueInput;
};
export type GroupFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput | Prisma.GroupOrderByWithRelationInput[];
    cursor?: Prisma.GroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupScalarFieldEnum | Prisma.GroupScalarFieldEnum[];
};
export type GroupFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput | Prisma.GroupOrderByWithRelationInput[];
    cursor?: Prisma.GroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupScalarFieldEnum | Prisma.GroupScalarFieldEnum[];
};
export type GroupFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput | Prisma.GroupOrderByWithRelationInput[];
    cursor?: Prisma.GroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupScalarFieldEnum | Prisma.GroupScalarFieldEnum[];
};
export type GroupCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GroupCreateInput, Prisma.GroupUncheckedCreateInput>;
};
export type GroupCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GroupCreateManyInput | Prisma.GroupCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GroupUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GroupUpdateInput, Prisma.GroupUncheckedUpdateInput>;
    where: Prisma.GroupWhereUniqueInput;
};
export type GroupUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GroupUpdateManyMutationInput, Prisma.GroupUncheckedUpdateManyInput>;
    where?: Prisma.GroupWhereInput;
    limit?: number;
};
export type GroupUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where: Prisma.GroupWhereUniqueInput;
    create: Prisma.XOR<Prisma.GroupCreateInput, Prisma.GroupUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GroupUpdateInput, Prisma.GroupUncheckedUpdateInput>;
};
export type GroupDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
    where: Prisma.GroupWhereUniqueInput;
};
export type GroupDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GroupWhereInput;
    limit?: number;
};
export type Group$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupMemberSelect<ExtArgs> | null;
    omit?: Prisma.GroupMemberOmit<ExtArgs> | null;
    include?: Prisma.GroupMemberInclude<ExtArgs> | null;
    where?: Prisma.GroupMemberWhereInput;
    orderBy?: Prisma.GroupMemberOrderByWithRelationInput | Prisma.GroupMemberOrderByWithRelationInput[];
    cursor?: Prisma.GroupMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GroupMemberScalarFieldEnum | Prisma.GroupMemberScalarFieldEnum[];
};
export type Group$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GroupDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GroupSelect<ExtArgs> | null;
    omit?: Prisma.GroupOmit<ExtArgs> | null;
    include?: Prisma.GroupInclude<ExtArgs> | null;
};
export {};
