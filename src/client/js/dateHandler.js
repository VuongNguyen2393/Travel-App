const isPastDay = (targetDay) => {
    const remainDay = getRemainDays(targetDay);
    return remainDay < 0;
}


const getRemainDays = (inputDate) => {
    const targetDay = new Date(new Date(inputDate).toDateString());
    const today = new Date(new Date().toDateString());
    return (targetDay - today)/(3600000*24);
}

const formatDate = (inputDate) => {
    const targetDay = new Date(new Date(inputDate).toDateString());
    const year = targetDay.getFullYear();
    const month = String(targetDay.getMonth() + 1).padStart(2,'0');
    const day = String(targetDay.getDate()).padStart(2,'0');
    return `${year}-${month}-${day}`;
}

export{isPastDay, getRemainDays, formatDate}