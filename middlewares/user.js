module.exports = {
    sortTheChatOverTime: async (chats) => {
        for (let i = 0; i < chats.length; i++)
            for (let j = 0; j < chats.length - i - 1; j++) {
                if (chats[j].data.time > chats[j + 1].data.time) {
                    let temp = chats[j];
                    chats[j] = chats[j + 1]
                    chats[j + 1] = temp
                }

                console.log(chats[j].data.time)
            }
        return chats
    }
}