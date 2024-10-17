const formatFullDate = (date: Date): string => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    
    return date.toLocaleString('en-US', options);
}

function formatDayDate(date: Date): string {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    date.setDate(date.getDate() + 5);
    
    return date.toLocaleDateString('en-US', options);
}

export { formatDayDate, formatFullDate };