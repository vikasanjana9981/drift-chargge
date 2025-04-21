const getDays = (interval: string | null, count: number): number => {
    switch (interval) {
        case 'DAY': return count;
        case 'WEEK': return count * 7;
        case 'MONTH': return count * 30;
        case 'YEAR': return count * 365;
        default: return 0;
    }
};


const getMaxDeliveryCount = (billingDays: number, deliveryUnit: string | null): number => {
    if (!deliveryUnit) return 0;
    const daysPerUnit = {
        DAY: 1,
        WEEK: 7,
        MONTH: 30,
        YEAR: 365,
    }[deliveryUnit] || 1;

    return Math.floor((billingDays - 1) / daysPerUnit);
};

const validatePlanBeforeApiCall = (plan: any) => {
    const errors: string[] = [];

    

    return errors;
};


const sellingPlanValidators = {
    getDays,
    getMaxDeliveryCount,
    validatePlanBeforeApiCall
}
export default sellingPlanValidators