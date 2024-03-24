export interface GetAttemptsDescDto {
    submittedTestResults: TestResultPreview[];
    currentTestAttempt?: TestAttemptPreview | null;
    numberOfAvailableTestAttempts: number;
}

interface TestResultPreview {
    id: number;
    showToStudent: boolean;
    startTime: Date;
    endTime: Date;
    totalPoints: number | null;
    grade: number | null;
    requireTeacherReview: boolean;
}

interface TestAttemptPreview {
    id: number;
    startTime: Date;
    endTime: Date;
}