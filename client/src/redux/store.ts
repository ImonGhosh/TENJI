import { articleApi } from "@/services/ArticleApi";
import { bookApi } from "@/services/BookApi";
import { caseApi } from "@/services/CaseApi";
import { citationsApi } from "@/services/CitationsApi";
import { referenceApi } from "@/services/ReferenceApi";
import { userApi } from "@/services/UsersApi";
import { articleReducer } from "@/slices/ArticleSlice";
import { caseReducer } from "@/slices/CaseSlice";
import { citationsReducer } from "@/slices/CitationsSlice";
import { formReducer } from "@/slices/FormSlice";
import { languageReducer } from "@/slices/LanguageSlice";
import { referenceReducer } from "@/slices/ReferenceSlice";
import { searchBarReducer } from "@/slices/SearchBarSlice";
import { appTourReducer } from "@/slices/AppTourSlice";
import { commonApi } from "@/services/CommonApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "@/slices/UserInfoSlice";

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [caseApi.reducerPath]: caseApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [referenceApi.reducerPath]: referenceApi.reducer,
    [citationsApi.reducerPath]: citationsApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    articles: articleReducer,
    userInfo: userReducer,
    cases: caseReducer,
    references: referenceReducer,
    searchBar: searchBarReducer,
    form: formReducer,
    language: languageReducer,
    citations: citationsReducer,
    appTour: appTourReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articleApi.middleware,
      caseApi.middleware,
      bookApi.middleware,
      referenceApi.middleware,
      citationsApi.middleware,
      commonApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
