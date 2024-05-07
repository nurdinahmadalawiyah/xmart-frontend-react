const formatDate = (dateString) => {
    const dateTime = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };
    return dateTime.toLocaleDateString('en-US', options);
};

export default formatDate;