
function IsImagePlain(messageChain) {

    let msg
    messageChainType = messageChain[0].type

    //文字消息
    if (messageChainType == "Plain") {
        msg = messageChain[1].text

    } //图片消息 
    else if (messageChainType == "Image") {
        msg = messageChain[1].url

    } else {
        msg = "none"
    }

    return msg

}



function TypeIs(type, messageChain) {

    let postType = ""
    let message, messageType, uid, gid

    //群消息
    if (type === "GroupMessage") {
        postType = "message"
        message= IsImagePlain(messageChain)
        messageType = "group"

    } //群撤回
    else if (type === "GroupRecallEvent") {
        postType = "notice"
        message= IsImagePlain(messageChain)
        messageType = "group"

    } //群加入
    else if (type === "MemberJoinEvent") {
        postType = "notice"
        message= IsImagePlain(messageChain)
        messageType = "group"

    } //私聊消息
    else if (type === "FriendMessage") {
        postType = "message"
        message= IsImagePlain(messageChain)
        messageType = "private"

    } //私聊撤回
    else if (type === "FriendRecallEvent") {
        postType = "notice"
        message= IsImagePlain(messageChain)
        messageType = "private"

    } //机器人离线
    else if (type === "BotOfflineEventActive") {
        postType = "notice"
        messageType = "private"
    }

}

const questData = {
    postType: "notice",
    message: "group_increase",
    messageType: "group",
    uid,
    gid
}