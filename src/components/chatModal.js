import RevModal from "./revModal";
import RevButton from "./revButton";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import {useState} from "react";
import StaticMessageCard from "./staticMessageCard";
import {sendAiMessage} from "../api/apiConfig";

const ChatModal = ({state , stateFn}) => {
    let userStorageData = JSON.parse(localStorage.getItem("userStorage"))
    let chatId = JSON.parse(localStorage.getItem("ChatID"));
    const [messages, setMessages] = useState([
        {
            message: "سلام به دستیار روال خوش آمدید",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);

    const [staticMsg, setStaticMsg] = useState("");
    const [isTyping, setIsTyping] = useState(false)
    const [showStaticMsg, setShowStaticMsg] = useState(true);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages

        const apiRequestBody = {
            "Type": "Public",
            "Sender_Name": userStorageData.Sender_Name,
            "UserQuestion": staticMsg,
            "UserID": userStorageData.UserID,
            "PlanID": userStorageData.PlanID,
            "AppName": userStorageData.AppName,
            "ChatID": chatId?.ChatID,
            "Device": userStorageData.Device,
        }

        await sendAiMessage(apiRequestBody).then((res) => {
            if (chatId.ChatID === null){
                localStorage.setItem('ChatID' , JSON.stringify({
                    'ChatID': res.data?.result,
                }))
            }
            setMessages([...chatMessages, {
                message: res?.data?.value,
                sender: "ChatGPT"
            }]);
        }).finally(()=> {
            setStaticMsg("")
            setIsTyping(false)
        });
    }

    const TitleSection = ()=>{
        return(
            <div className={'flex flex-row justify-end w-full pl-32 items-center'}>
                <div className={'text-labelDesk w-full'}>
                    دستیار پشتیبان
                </div>
                <RevButton onClick={()=>{
                    setShowStaticMsg(true)
                }} size={'mid'} light={true}>
                    درخواست جدید
                </RevButton>
            </div>
        )
    }


    const manageHandelChange = (e)=>{
        setStaticMsg(e)
    }

    const staticMessage = [
        {text:'پیام ۱'},
        {text:'پیام ۲'},
        {text:'پیام ۳'},
        {text:'پیام ۴'},
        {text:'پیام ۵'},
    ]
    return(
        <RevModal state={state}
                  stateFn={stateFn}
                  className={'pt-8 px-16 pb-32'}
                  title={<TitleSection/>}>
            <MainContainer style={{height: '50vh' , padding:'8px' , borderRadius: '8px'}}
                           dir="rtl"
                           className="text-right font-sans rtl">
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={isTyping ? <TypingIndicator color={'#265588'}
                            content={<p className={'text-skyBlue-700 font-medium text-labelSmallDesk font-sans mr-8'}>{'در حال تایپ'}</p>} /> : null}
                    >
                        {messages.map((message, i) => (
                            <Message model={{
                                message: message.message,
                                sentTime: message.time,
                                sender: message.sender,
                                direction: message.sender === "user" ? "incoming" : "outgoing",
                                position: "single",
                            }} className={'font-sans'}  key={i} />
                        ))}
                    </MessageList>

                    <MessageInput
                        value={isTyping ? '' : staticMsg}
                        onChange={(e)=>manageHandelChange(e)}
                        attachButton={false}
                        placeholder="پیام خود را بنویسید..."
                        onSend={handleSend}
                        className="font-iransans"
                    />
                </ChatContainer>
            </MainContainer>
            {
                showStaticMsg &&
                    <div className={'flex flex-col w-full gap-8 mt-24'}>
                        {
                            staticMessage.map((message, index) => (
                                <StaticMessageCard onClick={()=>{
                                    setStaticMsg(message.text)
                                    setShowStaticMsg(false)
                                }} key={'static-message-card'+index}
                                                   data={message}/>
                            ))
                        }
                    </div>
            }
        </RevModal>
    )
}

export default ChatModal;
