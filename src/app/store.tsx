
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { MainReducer } from "../components/MainReducer";
import { AuthReducer } from "../components/Auth/AuthReducer";
import { TestOfStudentReducer } from "../components/ReviewTest/TestOfStudentReducer";
import { TakeTestReducer } from "../components/StudentSide/TakeTest/TakeTestReducer";
import { CreateTestReducer } from "../components/TeacherSide/CreateTest/CreateTestReducer";

const mainPersistConfig = {
  key: 'main',
  storage,
  whitelist: ['selectedSubjectId', 'editPage', 'createTestPage', 'studentName', 'testOfStudentPage', 'selectedTest', 'editTestPage', 'userRole', 'allSubjects']
}

const newTestPersistConfig = {
  key: 'createTest',
  storage,
}

const testPersistConfig = {
  key: 'testOfStudent',
  storage,
}

const takeTestPersistConfig = {
  key: 'takeTest',
  storage,
}

const authPersistConfig = {
  key: 'auth',
  storage,

}

export const store = configureStore({
  reducer: {
      auth: persistReducer(authPersistConfig, AuthReducer),
      main: persistReducer(mainPersistConfig, MainReducer),
      createTest: persistReducer(newTestPersistConfig, CreateTestReducer),
      testOfStudent: persistReducer(testPersistConfig, TestOfStudentReducer),
      takeTest: persistReducer(takeTestPersistConfig, TakeTestReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
