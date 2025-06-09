import React, {useEffect, useState} from "react";
import ChatModal from "./chatModal";

export default function AutoDrawer() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openChatModal , setOpenChatModal] = useState(false);

    const manageOpenChatModal = () => {
      setOpenChatModal(!openChatModal)
    }

    useEffect(() => {
        // باز شدن خودکار هنگام لود
        setTimeout(() => {
            setIsExpanded(true);
        }, 500)

        // بعد از 5 ثانیه خودش جمع بشه
        const timer = setTimeout(() => {
            setIsExpanded(false);
        }, 5000);

        // پاک کردن تایمر در صورت نیاز
        return () => clearTimeout(timer);
    }, []);

    return (
        <React.Fragment>
            <div
                onClick={()=>{
                    manageOpenChatModal()
                }}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`
        fixed bottom-[60px] left-0 cursor-pointer
        flex flex-row items-center gap-16 
        bg-skyBlue-700 p-16 rounded-r-88 
        transition-all duration-700 ease-in-out 
        ${isExpanded ? "w-[150px]" : "w-54"}
      `}
            >
                <div className="flex items-center justify-center w-32 h-32">
                    <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                        <rect width="48" height="48" fill="#5B91CC" rx="8"></rect>
                        <path
                            fill="#fff"
                            d="M13.334 24.427h10.449v10.24h-10.45zM24.218 13.334h10.449v11.093c0 5.655-4.678 10.24-10.45 10.24z"
                        />
                    </svg>
                </div>
                <p
                    className={`
                        transition-opacity duration-500 delay-200 
                        text-bodyDesk font-bold text-neutral-0 whitespace-nowrap
                         ${isExpanded ? "opacity-100" : "opacity-0"}`}
                >
                    دستیار روال
                </p>
            </div>

            <ChatModal state={openChatModal} stateFn={manageOpenChatModal}/>
        </React.Fragment>
    );
}
