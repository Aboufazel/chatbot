const StaticMessageCard = ({data , ...props}) => {

    return(
        <div {...props} className={`flex flex-row w-full items-center
         p-16 rounded-4 cursor-pointer bg-skyBlue-50/50 border border-skyBlue-700/50`}>
            {data.text}
        </div>
    )
}


export default StaticMessageCard;
