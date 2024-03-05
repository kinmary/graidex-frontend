export interface GetAttemptsDescDto {
    submittedTestResults: TestResultPreview[];
    currentTestAttempt?: TestAttemptPreview | null;
    numberOfAvailableTestAttempts: number;
}

interface TestResultPreview {
    id: number;
    canReview: boolean;
    startTime: Date;
    endTime: Date;
    totalPoints: number | null;
    grade: number | null;
}

interface TestAttemptPreview {
    id: number;
    startTime: Date;
    endTime: Date;
}