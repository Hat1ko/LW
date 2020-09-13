export function task3(lastName: string): string {
    return lastName
        .split("")
        .sort((a, b) => a.toLowerCase()
            .localeCompare(b.toLowerCase()))
        .join("") as string;
}
