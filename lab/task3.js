function task3(lastName) {
    return lastName.split("").sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join("");
}
