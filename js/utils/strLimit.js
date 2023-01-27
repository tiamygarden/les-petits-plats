export default (description, amount) => {
    if (description) {
        return description.length >= amount ? description.slice(0, amount) + '...' : description;
    }

    return '';
}
