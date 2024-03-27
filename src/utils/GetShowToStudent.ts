export const getShowToStudentName = (showToStudent: number | undefined) => {
    switch (showToStudent) {
        case 0:
            return SetManually;
        case 1:
            return AfterSubmission;
        default: return "";
    }
}

export const parseShowToStudentToFrontend = (showToStudent: string) => {
    switch (showToStudent) {
        case "SetManually":
            return 0;
        case "AfterSubmission":
            return 1;
        default: return "";
    }
}

export const SetManually = "Set manually";
export const AfterSubmission = "After submission";