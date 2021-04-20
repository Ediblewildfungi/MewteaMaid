[

    {
        type: "私聊 - 图片",
        data: {
            type: 'FriendMessage',
            messageChain: [
                { type: 'Source', id: 27160, time: 1618687999 },
                {
                    type: 'Image',
                    imageId: '{BA2ABCB2-8BE0-B49D-7C34-D526332580ED}.jpg',
                    url: 'http://c2cpicdw.qpic.cn/offpic_new/1034614154//1034614154-4175537054-BA2ABCB28BE0B49D7C34D526332580ED/0?term=2',
                    path: null
                }
            ],
            sender: { id: 1034614154, nickname: '喵', remark: '' }
        }
    },
    {
        type: "私聊 - 文字",
        data: {
            type: 'FriendMessage',
            messageChain: [
                { type: 'Source', id: 27161, time: 1618688133 },
                { type: 'Plain', text: '2312312' }
            ],
            sender: { id: 1034614154, nickname: '喵', remark: '' }
        }
    },
    {
        type: "私聊 - 撤回",
        data: {
            type: 'FriendRecallEvent',
            authorId: 1034614154,
            messageId: 27162,
            time: 15065,
            operator: 1034614154
        }
    },





    {
        type: "群里 - 文字+图片",
        data: {
            type: 'GroupMessage',
            messageChain: [
                { type: 'Source', id: 464035, time: 1618688191 },
                { type: 'Plain', text: '\nZzz\n' },
                {
                    type: 'Image',
                    imageId: '{9F9B3EE9-3576-9A11-FCBC-3A9BD3ECB69F}.gif',
                    url: 'http://gchat.qpic.cn/gchatpic_new/1034614154/3928399079-2462396580-9F9B3EE935769A11FCBC3A9BD3ECB69F/0?term=2',
                    path: null
                }
            ],
            sender: {
                id: 1034614154,
                memberName: '野生喵',
                permission: 'OWNER',
                group: { id: 438399079, name: '迷途之家~喵茶', permission: 'ADMINISTRATOR' }
            }
        }
    },
    {
        type: "群里 - 图片",
        data: {
            type: 'GroupMessage',
            messageChain: [
                { type: 'Source', id: 1344, time: 1618688238 },
                {
                    type: 'Image',
                    imageId: '{B23FA68A-027A-932C-3E09-2ADAB630612E}.gif',
                    url: 'http://gchat.qpic.cn/gchatpic_new/1034614154/875182235-2779162446-B23FA68A027A932C3E092ADAB630612E/0?term=2',
                    path: null
                }
            ],
            sender: {
                id: 1034614154,
                memberName: '喵',
                permission: 'OWNER',
                group: { id: 875182235, name: '喵茶妹抖测试', permission: 'MEMBER' }
            }
        }
    },
    {
        type: "群里 - 文字",
        data: {
            type: 'GroupMessage',
            messageChain: [
                { type: 'Source', id: 1346, time: 1618688923 },
                { type: 'Plain', text: '文字测试' }
            ],
            sender: {
                id: 1034614154,
                memberName: '喵',
                permission: 'OWNER',
                group: { id: 875182235, name: '喵茶妹抖测试', permission: 'MEMBER' }
            }
        }
    },

    {
        type: "群里 - 撤回",
        data: {
            type: 'GroupRecallEvent',
            authorId: 1034614154,
            messageId: 1346,
            time: 15259,
            group: { id: 875182235, name: '喵茶妹抖测试', permission: 'MEMBER' },
            operator: {
                id: 1034614154,
                memberName: '喵',
                permission: 'OWNER',
                group: { id: 875182235, name: '喵茶妹抖测试', permission: 'MEMBER' }
            }
        }
    },

]