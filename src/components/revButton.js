const RevButton = ({children ,
                       color='primary' ,
                       size='auto' ,
                       type='button' ,
                       disable=false,
                       light=false,
                       cls='',
                       ...props}) => {
    const sizes = {
        full:'text-bodyDesk px-12 py-14 w-full min-h-[54px]',
        auto:'text-bodyDesk px-24 py-14 min-h-[47px] w-auto',
        half:'text-bodyDesk px-8 py-14 w-[50%] min-h-[54px]',
        mid:'text-labelSmallDesk p-8 min-w-max max-w-full min-h-[38px]',
        small:'text-labelSmallDesk p-8 min-w-max max-w-full min-h-[38px]',
        micro:'text-labelExtraSmallDesk p-4 min-h-[20px] max-w-[40px]',
    }

    const colors ={
        primary:`${disable ? 'bg-skyBlue-700/40' : light? 'bg-skyBlue-300 border-[0.5px] border-skyBlue-700 text-skyBlue-900' : 'bg-skyBlue-700'} text-neutral-0`,
        light:`${disable ? 'bg-skyBlue-300/40' :'bg-skyBlue-300'} text-skyBlue-900`,
        n0:`${disable ? 'bg-neutral-0/40 text-neutral-900/40' :'bg-neutral-0 text-neutral-900'}`,
        n0Light:`${disable ? 'bg-neutral-0/40 text-neutral-900/40' :'bg-neutral-0/20 text-neutral-0'}`,
        n0Border:`${disable ? 'bg-neutral-0/40 text-neutral-900/40 border-[0.5px] border-neutral-950/40' :'text-neutral-900 border-[0.5px] border-neutral-950 bg-neutral-0'}`,
        danger:`${disable ? 'bg-red-600/40 text-neutral-0' : light ? 'bg-red-100 text-error-700' : 'bg-error-700 text-neutral-0'}`,
        success:`${disable ? 'bg-emerald-600/40' :'bg-emerald-600'} text-neutral-0`,
        secondary:`${disable ? 'bg-other-secondary/40' :'bg-other-secondary'} text-other-tertiary`,
        Tertiary:`text-neutral-0 ${disable ? 'bg-other-tertiary/40' : 'bg-other-tertiary'}`,
        warning:'bg-warning-800 text-neutral-0'
    }


    return(
        <button {...props} type={type} className={`rounded-4  ${colors[color]} ${sizes[size]} ${cls}`}>
            {children}
        </button>
    )
}

export default RevButton;
