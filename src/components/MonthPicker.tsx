import { ReactNode, useEffect } from "react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

function getMonthsArray() {
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i + 1, 0).toLocaleDateString("DK", { month: "short" });
    });

    return months;
}

interface IMonthPickerHeadProps {
    month: string;
    year: number;
    modalState: {
        isOpenMonthPicker: boolean;
        setIsOpenMonthPicker: Dispatch<SetStateAction<boolean>>;
    };
}

function MonthPickerHeader({ month, year, modalState }: IMonthPickerHeadProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <div className="text-lg text-next-blue font-bold mb-2">Vælg måned</div>
                <button onClick={() => modalState.setIsOpenMonthPicker(!modalState.isOpenMonthPicker)} className="btn-blue bg-next-blue">{month}. {year}</button>
            </div>
        </div>
    );
}

interface IMonthPickerModalProps {
    months: string[];
    year: number;
    dateStates: {
        selectedMonth: number;
        selectedYear: number;
        setSelectedMonth: Dispatch<SetStateAction<number>>;
        setSelectedYear: Dispatch<SetStateAction<number>>;
    };
}

function MonthPickerModal({ months, year, dateStates }: IMonthPickerModalProps) {
    console.log(months)
    return (
        <Modal>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-next-darker-orange bg-next-blue shadow-lg">
                <div className="text-lg font-bold mb-4 flex flex-row justify-center items-center">
                    <FaArrowCircleLeft onClick={() => dateStates.setSelectedYear(dateStates.selectedYear - 1)} className="mr-2 hover:cursor-pointer" />
                    <div>{year}</div>
                    <FaArrowCircleRight onClick={() => dateStates.setSelectedYear(dateStates.selectedYear + 1)} className="ml-2 hover:cursor-pointer" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {months.map((month, index) => (
                        <Month key={index} month={month} monthNumeric={index + 1} isActive={!!(dateStates.selectedMonth === index + 1)} setSelectedMonth={dateStates.setSelectedMonth} />
                    ))}
                </div>
            </div>
        </Modal>
    )
}

interface IMonthProps {
    month: string;
    monthNumeric: number;
    isActive: boolean;
    setSelectedMonth: Dispatch<SetStateAction<number>>;
}

function Month({ month, monthNumeric, isActive, setSelectedMonth }: IMonthProps) {
    return (
        <>
            {isActive && <div className="text-center text-next-blue bg-next-darker-orange rounded-lg p-1 hover:cursor-pointer">{month}</div>}
            {!isActive && <div onClick={() => setSelectedMonth(monthNumeric)} className="text-center text-next-darker-orange bg-next-blue rounded-lg p-1 hover:cursor-pointer hover:text-next-blue hover:bg-next-darker-orange">{month}</div>}
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

interface IMonthPickerProps {
    dateStates: {
        selectedMonth: number;
        selectedYear: number;
        setSelectedMonth: Dispatch<SetStateAction<number>>;
        setSelectedYear: Dispatch<SetStateAction<number>>;
    };
}

function MonthPicker({ dateStates }: IMonthPickerProps) {
    const [isOpenMonthPicker, setIsOpenMonthPicker] = useState(false);
    useEffect(() => {
        dateStates.setSelectedMonth(dateStates.selectedMonth);
        dateStates.setSelectedYear(dateStates.selectedYear);
    }, [dateStates.selectedMonth, dateStates.selectedYear]);
    const months = getMonthsArray();
    const modalState = { isOpenMonthPicker, setIsOpenMonthPicker }

    return (
        <div className="flex flex-col items-start">
            <MonthPickerHeader month={months[dateStates.selectedMonth - 1]} year={dateStates.selectedYear} modalState={modalState} />
            {isOpenMonthPicker && (
                <MonthPickerModal months={months} year={dateStates.selectedYear} dateStates={dateStates} />)
            }
        </div>
    );
}

export default MonthPicker