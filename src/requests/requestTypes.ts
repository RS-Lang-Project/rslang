export interface Word {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export interface NewUser {
  name: string,
  email: string,
  password: string
}

export interface NewUserResponse {
  email: string
  id: string
  name: string
}

export interface UpdateUser {
  email: string,
  password: string
}

export interface GetNewUserTokens {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}

export interface UserWord {
  id?: string,
  wordId?: string,
  difficulty: string,
  optional: object
}

export interface Statistik{
  learnedWords: number,
  optional: object
}

export interface Setting {
  wordsPerDay: number,
  optional: object
}

export interface SignIn {
  email: string,
  password: string
}

export interface SignInResult {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}
