import { ReactNode } from "react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { getMonthsArray } from "../helpers/getMonthsArray";

interface IMonthPickerProps {
    dateStates: {
        setMonth: Dispatch<SetStateAction<number>>;
        setYear: Dispatch<SetStateAction<number>>;
        month: number;
        year: number;
    };
}

interface IMonthPickerHeadProps extends IMonthPickerProps {
    modalState: {
        isOpenMonthPicker: boolean;
        setIsOpenMonthPicker: Dispatch<SetStateAction<boolean>>;
    };
    monthString: string;
}

function MonthPickerHeader({ dateStates, modalState, monthString }: IMonthPickerHeadProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <div className="text-lg text-next-blue font-bold mb-2">Vælg måned</div>
                <button onClick={() => modalState.setIsOpenMonthPicker(!modalState.isOpenMonthPicker)} className="btn-blue bg-next-blue">{monthString}. {dateStates.year}</button>
            </div>
        </div>
    );
}

interface IMonthPickerModalProps extends IMonthPickerProps {
    months: string[];
    modalState: {
        isOpenMonthPicker: boolean;
        setIsOpenMonthPicker: Dispatch<SetStateAction<boolean>>;
    };
}

function MonthPickerModal({ dateStates, modalState, months }: IMonthPickerModalProps) {
    return (
        <Modal>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-next-darker-orange bg-next-blue shadow-lg">
                <div className="text-lg font-bold mb-4 flex flex-row justify-center items-center">
                    <FaArrowCircleLeft onClick={() => dateStates.setYear(dateStates.year - 1)} className="mr-2 hover:cursor-pointer" />
                    <div>{dateStates.year}</div>
                    <FaArrowCircleRight onClick={() => dateStates.setYear(dateStates.year + 1)} className="ml-2 hover:cursor-pointer" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {months.map((monthString, index) => (
                        <Month key={index} dateStates={dateStates} modalState={modalState} isActive={!!(dateStates.month === index + 1)} monthNumber={index + 1} monthString={monthString} />
                    ))}
                </div>
            </div>
        </Modal>
    )
}

interface IMonthProps extends IMonthPickerProps {
    modalState: {
        isOpenMonthPicker: boolean;
        setIsOpenMonthPicker: Dispatch<SetStateAction<boolean>>;
    };
    isActive: boolean;
    monthString: string;
    monthNumber: number;
}

function Month({ dateStates, modalState, isActive, monthString, monthNumber }: IMonthProps) {
    function handleClick() {
        modalState.setIsOpenMonthPicker(!modalState.isOpenMonthPicker);
        dateStates.setMonth(monthNumber);

    }
    return (
        <>
            {isActive && <div className="text-center text-next-blue bg-next-darker-orange rounded-lg p-1 hover:cursor-pointer">{monthString}</div>}
            {!isActive && <div onClick={handleClick} className="text-center text-next-darker-orange bg-next-blue rounded-lg p-1 hover:cursor-pointer hover:text-next-blue hover:bg-next-darker-orange">{monthString}</div>}
        </>
    );
}

function Modal({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-center absolute top-20 border-next-darker-orange border-[1.5px]">
            <div className="bg-next-blue rounded-md relative z-10">
                {children}
            </div>
        </div>
    );
}

function MonthPicker({ dateStates }: IMonthPickerProps) {
    const [isOpenMonthPicker, setIsOpenMonthPicker] = useState(false);
    const modalState = { isOpenMonthPicker, setIsOpenMonthPicker }
    const months = getMonthsArray();

    return (
        <div className="flex flex-col items-start">
            <MonthPickerHeader dateStates={dateStates} modalState={modalState} monthString={months[dateStates.month - 1]} />
            {isOpenMonthPicker && (
                <MonthPickerModal dateStates={dateStates} modalState={modalState} months={months} />)
            }
        </div>
    );
}

export default MonthPicker;