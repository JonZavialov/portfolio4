class ChatRoom extends Window {
    constructor() {
        super('Chat Room', 'chatRoom', true, 'assets/images/icons/people.png');
        this.generateElement(this.getHTML());
    }

    getHTML() {
        return "chat room"
    }
}

function openChatRoom() {
    const chatRoom = new ChatRoom();
    chatRoom.render()
}