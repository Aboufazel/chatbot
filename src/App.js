import './App.css';
import AutoDrawer from "./components/autoDrawer";
import RevButton from "./components/revButton";
import {useState} from "react";
import {formatNumbers} from "./fnLibraray";

function App() {
    let chatId = JSON.parse(localStorage.getItem("ChatID"));
    let userStorageData = JSON.parse(localStorage.getItem("userStorage"))
    const [data , setData] = useState(userStorageData !== null ? userStorageData : '')

    const inputsData = [
        {label: 'Sender_Name'},
        {label: 'UserID'},
        {label: 'PlanID'},
        {label: 'AppName'},
        {label: 'Device'},
    ]


    const chatIdData = [
        {label: 'ChatID'},
    ]

    const handelSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("userStorage", JSON.stringify({
            'Sender_Name':data.Sender_Name,
            'UserID':formatNumbers(data.UserID),
            'PlanID':data.PlanID,
            'AppName':data.AppName,
            'Device':data.Device,
            'ChatID':data.ChatID ? data.ChatID : null,
        }))
        localStorage.setItem("ChatID", JSON.stringify({
            'ChatID':data.ChatID ? data.ChatID : null,
        }))
        setData('')
    }
    return (
        <div className={'flex flex-col w-screen h-screen'}>
            <form onSubmit={(e) => {
                handelSubmit(e)
            }} className={'flex flex-col gap-16 p-16'}>
                {
                    inputsData.map((item , index) => (
                        <div key={'inputs-data' + item.label + index.toString()}
                             className={'flex flex-col gap-8 w-full'}>
                            <label>{item.label}</label>
                            <input id={item.label}
                                   name={item.label}
                                   defaultValue={userStorageData ? userStorageData[item.label] : ''}
                                   onChange={(e) =>
                                       setData(prev => ({
                                           ...prev,
                                           [item.label]: e.target.value
                                       }))
                                   }
                                   className={'p-12 rounded-4'}/>
                        </div>
                    ))
                }
                {
                    chatIdData.map((item , index) => (
                        <div key={'chat-id0-inputs-data' + item.label + index.toString()}
                             className={'flex flex-col gap-8 w-full'}>
                            <label>{item.label}</label>
                            <input id={item.label}
                                   name={item.label}
                                   defaultValue={chatId?.ChatID}
                                   onChange={(e) =>
                                       setData(prev => ({
                                           ...prev,
                                           [item.label]: e.target.value
                                       }))
                                   }
                                   className={'p-12 rounded-4'}/>
                        </div>
                    ))
                }

                <RevButton color={'n0Border'} type={'submit'}>
                    ثبت
                </RevButton>
            </form>
            <AutoDrawer/>
        </div>
    );
}

export default App;
