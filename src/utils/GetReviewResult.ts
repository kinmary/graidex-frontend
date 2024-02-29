export const getReviewResultName = (reviewResult: number) => {
    switch (reviewResult) {
        case 0:
            return SetManually;
        case 1:
            return AfterSubmission;
        case 2:
            return AfterAutoCheck;
    }
}

export const parseReviewResultToFrontend = (reviewResult: string) => {
    switch (reviewResult) {
        case "SetManually":
            return 0;
        case "AfterSubmission":
            return 1;
        case "AfterAutoCheck":
            return 2;
    }
}

export const SetManually = "Set manually";
export const AfterSubmission = "After submission";
export const AfterAutoCheck = "After auto check";