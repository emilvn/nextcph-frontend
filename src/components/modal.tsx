import type { ReactNode } from "react"

function Modal({ children }: { children: ReactNode }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center mt-20 mx-20">
            <div className="bg-black bg-opacity-50 absolute inset-0 backdrop-blur-md"></div>
            <div className="bg-white p-8 rounded-md relative z-10 max-h-[800px] overflow-y-auto overscroll-none">
                {children}
            </div>
        </div>
    )
}

export default Modal