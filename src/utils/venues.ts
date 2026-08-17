const VENUE_SHORT: Record<string, string> = {
    "Nucleic Acids Research": "Nucleic Acids Res.",
    "Chemical Science": "Chem. Sci.",
    "Nature Protocols": "Nat. Protoc.",
    "Briefings in Bioinformatics": "Brief. Bioinform.",
    "Communications Chemistry": "Commun. Chem.",
    Bioinformatics: "Bioinformatics",
    Database: "Database",
    "BMC Bioinformatics": "BMC Bioinformatics",
    Research: "Research",
    "Systems Engineering and Electronics": "Syst. Eng. Electron.",
    "Proceedings of the AAAI Conference on Artificial Intelligence (AAAI-26)":
        "AAAI",
};

export function shortVenue(journal?: string): string {
    if (!journal) return "";
    return VENUE_SHORT[journal] ?? journal;
}

export function yearFromDate(dateValue?: string): string {
    if (!dateValue) return "";
    const match = String(dateValue).match(/\d{4}/);
    return match ? match[0] : "";
}
