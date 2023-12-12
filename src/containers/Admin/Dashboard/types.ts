import { Dispatch, SetStateAction } from 'react';

interface IMonthPickerStates {
    monthPickerStates: {
        month: number;
        year: number;
        showStatisticsTable: boolean;
        setMonth: Dispatch<SetStateAction<number>>;
        setYear: Dispatch<SetStateAction<number>>;
        setShowStatisticsTable: Dispatch<SetStateAction<boolean>>;
    };
}

interface IMonthPicker extends IMonthPickerStates {
    modalState: {
        isOpenMonthPicker: boolean;
        selectedYearInModal: number;
        setIsOpenMonthPicker: Dispatch<SetStateAction<boolean>>;
        setSelectedYearInModal: Dispatch<SetStateAction<number>>;
    };
}

export type { IMonthPickerStates, IMonthPicker }