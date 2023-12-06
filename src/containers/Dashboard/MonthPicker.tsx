import { ReactNode } from "react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { getMonthsArray } from "../../helpers/getMonthsArray";

interface IMonthPickerStatesProps {
    monthPickerStates: {
        month: number;
        year: number;
        showStatisticsTable: boolean;
        setMonth: Dispatch<SetStateAction<number>>;
        setYear: Dispatch<SetStateAction<number>>;
        setShowStatisticsTable: Dispatch<SetStateAction<boolean>>;
    };
}

interface IMonthPickerProps extends IMonthPickerStatesProps {
    modalState: {
        isOpenMonthPicker: boolean;
        selectedYearInModal: number;
        setIsOpenMonthPicker: Dispatch<SetStateAction<boolean>>;
        setSelectedYearInModal: Dispatch<SetStateAction<number>>;
    };
}

interface IMonthPickerHeadProps extends IMonthPickerProps {
    monthString: string;
}

function MonthPickerHeader({ monthPickerStates, modalState, monthString }: IMonthPickerHeadProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <div className="text-lg text-next-blue font-bold mb-2">Vælg måned</div>
                <button onClick={() => modalState.setIsOpenMonthPicker(!modalState.isOpenMonthPicker)} className="btn-blue bg-next-blue">{monthString} {monthPickerStates.year}</button>
            </div>
        </div>
    );
}

interface IMonthPickerModalProps extends IMonthPickerProps {
    months: string[];
}

function MonthPickerModal({ monthPickerStates, modalState, months }: IMonthPickerModalProps) {
    return (
        <Modal>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-next-darker-orange bg-next-blue shadow-lg">
                <div className="text-lg font-bold mb-4 flex flex-row justify-center items-center">
                    <FaArrowCircleLeft onClick={() => modalState.setSelectedYearInModal(modalState.selectedYearInModal - 1)} className="mr-2 hover:cursor-pointer" />
                    <div>{modalState.selectedYearInModal}</div>
                    <FaArrowCircleRight onClick={() => modalState.setSelectedYearInModal(modalState.selectedYearInModal + 1)} className="ml-2 hover:cursor-pointer" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {months.map((monthString, index) => (
                        <Month key={index} monthPickerStates={monthPickerStates} modalState={modalState} isActive={!!(monthPickerStates.month === index + 1 && monthPickerStates.year === modalState.selectedYearInModal)} monthNumber={index + 1} monthString={monthString} />
                    ))}
                </div>
            </div>
        </Modal>
    )
}

interface IMonthProps extends IMonthPickerProps {
    isActive: boolean;
    monthString: string;
    monthNumber: number;
}

function Month({ monthPickerStates, modalState, isActive, monthString, monthNumber }: IMonthProps) {
    function handleClick() {
        monthPickerStates.setShowStatisticsTable(false);
        modalState.setIsOpenMonthPicker(!modalState.isOpenMonthPicker);
        monthPickerStates.setYear(modalState.selectedYearInModal);
        monthPickerStates.setMonth(monthNumber);
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

function MonthPicker({ monthPickerStates }: IMonthPickerStatesProps) {
    const [isOpenMonthPicker, setIsOpenMonthPicker] = useState(false);
    const [selectedYearInModal, setSelectedYearInModal] = useState(monthPickerStates.year);
    const modalState = { isOpenMonthPicker, selectedYearInModal, setIsOpenMonthPicker, setSelectedYearInModal }
    const months = getMonthsArray();

    return (
        <div className="flex flex-col items-start">
            <MonthPickerHeader monthPickerStates={monthPickerStates} modalState={modalState} monthString={months[monthPickerStates.month - 1]} />
            {isOpenMonthPicker && (
                <MonthPickerModal monthPickerStates={monthPickerStates} modalState={modalState} months={months} />)
            }
        </div>
    );
}

export default MonthPicker;