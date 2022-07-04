const ALL_ROVERS = ["curiosity", "spirit", "opportunity", "perseverance"];

export function checkNames(name: string) {
    return !(name in ALL_ROVERS);
}