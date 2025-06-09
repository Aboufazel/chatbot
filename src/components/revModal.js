import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CloseCircle } from 'iconsax-react'

const RevModal = ({
                      state,
                      stateFn,
                      children,
                      title = null,
                      className = 'pt-32 px-16 pb-16',
                  }) => {
    return (
        <Transition appear show={state} as={Fragment}>
            <Dialog as="div" className="dir:rtl relative z-10" onClose={stateFn}>
                {/* بک‌گراند تار */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-neutral-900/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    {/* موقعیت‌دهی به modal */}
                    <div
                        className="flex min-h-full items-center justify-center p-4 text-center
                       sm:items-center sm:justify-center
                       max-sm:items-end max-sm:justify-center"
                    >
                        {/* ترنزیشن پنل اصلی */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-8 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-8 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={`
                  w-full transform overflow-hidden bg-neutral-0 ${className} text-right transition-all shadow-lg
                  sm:max-w-md sm:rounded-8
                  max-sm:rounded-t-2xl max-sm:max-w-full max-sm:w-full max-sm:h-[100dvh] max-sm:overflow-y-auto
                `}
                            >
                                {/* دکمه بستن برای موبایل */}
                                <button
                                    onClick={stateFn}
                                    className="absolute z-30 top-12 left-12 sm:hidden"
                                    aria-label="بستن"
                                >
                                    <CloseCircle color={'#757575'} size={'24'} />
                                </button>

                                {title !== null && (
                                    <Dialog.Title className="text-titleDesk font-medium mb-24 leading-6 text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                )}

                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default RevModal
