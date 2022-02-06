import {
  Word,
  NewUser,
  NewUserResponse,
  UpdateUser,
  GetNewUserTokens,
  UserWord,
  Statistik,
  Setting,
  SignIn,
  SignInResult,
} from './requestTypes';

const MAIN_LINK = 'https://rs-lang-project.herokuapp.com';

// _______________________________________________________________________________________________________________
// Read it!!!
// First you need is CREATE USER, then SIGN IN(get a token) and then you can do ALL ELSE FUNCTIONS(with user token)
// _______________________________________________________________________________________________________________

// WORDS BLOCK

// example:
// getAllWords(0, 0)
// .then((data: Array<AllWords>) => console.log(data));
export async function getAllWords(group = 0, page = 0): Promise<Array<Word>> {
  const url = `${MAIN_LINK}/words?group=${group}&page=${page}`;
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// getWord('5e9f5ee35eb9e72bc21af4a0')
// .then((data: Word) => console.log(data));
export async function getWord(id: string): Promise<Word> {
  const url = `${MAIN_LINK}/words/${id !== '' ? id : '5e9f5ee35eb9e72bc21af4a0'}`;
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// USER BLOCK

// example:
// createUser({
//   name: 'test3',
//   email: 'test3@gmail.com',
//   password: 'testtest111',
// }).then((data: NewUserResponse) => console.log(data));
export async function createUser(params: NewUser): Promise<NewUserResponse> {
  const url = `${MAIN_LINK}/users`;
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// getUser(id,token)
// .then((data: NewUser) => console.log(data));
export async function getUser(id: string, token: string): Promise<NewUser> {
  const url = `${MAIN_LINK}/users/${id}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// updateUser({
//   email: 'testtest@qwe.com',
//   password: 'test1234',
// }, '5e9f5ee35eb9e72bc21af4a0', token).then((data: UpdateUser) => console.log(data));
export async function updateUser(params: UpdateUser, id: string, token: string): Promise<NewUser> {
  const url = `${MAIN_LINK}/users/${id}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const result = await fetch(url, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// deleteUser('5e9f5ee35eb9e72bc21af4a0', token)
// .then((data: boolean) => console.log(data === true));
export async function deleteUser(id: string, token: string): Promise<boolean> {
  const url = `${MAIN_LINK}/users/${id}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'DELETE',
    headers: recHeaders,
  });

  if (!result.ok && result.status !== 204) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return true;
}

// example:
// getNewUserTokens('5e9f5ee35eb9e72bc21af4a0', token)
//   .then(((data: GetNewUserTokens) => console.log(data)));
export async function getNewUserTokens(id: string, token: string): Promise<GetNewUserTokens> {
  const url = `${MAIN_LINK}/users/${id}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// USERS/WORDS BLOCK

// example:
// getAllUserWords('5e9f5ee35eb9e72bc21af4a0', token)
//   .then(((data: Array<UserWord>) => console.log(data)));
export async function getAllUserWords(id: string, token: string): Promise<Array<UserWord>> {
  const url = `${MAIN_LINK}/users/${id}/words`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// createUserWord({
//   difficulty: 'qwerty',
//   optional: {},
// }, '5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
//   .then((data: UserWord) => console.log(data));
export async function createUserWord(params: UserWord, id: string, wordId: string, token: string): Promise<UserWord> {
  const url = `${MAIN_LINK}/users/${id}/words/${wordId}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const result = await fetch(url, {
    method: 'POST',
    headers: recHeaders,
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// getUserWords('5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
//   .then((data: UserWord) => console.log(data));
export async function getUserWords(id: string, wordId: string, token: string): Promise<UserWord> {
  const url = `${MAIN_LINK}/users/${id}/words/${wordId}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// updateUserWord({
//   difficulty: 'qwerty',
//   optional: {},
// }, '5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
//   .then((data: UserWord) => console.log(data));
export async function updateUserWord(params: UserWord, id: string, wordId: string, token: string): Promise<UserWord> {
  const url = `${MAIN_LINK}/users/${id}/words/${wordId}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const result = await fetch(url, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// deleteUserWord('5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
// .then((data: boolean) => console.log(data === true));
export async function deleteUserWord(id: string, wordId: string, token: string): Promise<boolean> {
  const url = `${MAIN_LINK}/users/${id}/words/${wordId}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'DELETE',
    headers: recHeaders,
  });

  if (!result.ok && result.status !== 204) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return true;
}

// USERS/AGGREGATED-WORDS BLOCK

// example:
// getAllUserAggregatedWords('5e9f5ee35eb9e72bc21af4a0', 'token', '1', '1', '20', 'filter')
// .then((data: Array<Word>) => console.log(data));
export async function getAllUserAggregatedWords(
  id: string,
  token: string,
  group = '',
  page = '',
  wordsPerPage = '',
  filter = '',
): Promise<Array<Word>> {
  const url = `${MAIN_LINK}/users/${id}/aggregatedWords?
  ${group === '' ? '' : `group=${group}&`}
  ${page === '' ? '' : `page=${page}&`}
  ${wordsPerPage === '' ? '' : `wordsPerPage=${wordsPerPage}&`}
  ${filter === '' ? '' : `filter=${filter}`}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// getUserAggregatedWords('5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', 'token')
// .then((data: Word) => console.log(data));
export async function getUserAggregatedWords(
  id: string,
  wordId: string,
  token: string,
): Promise<Word> {
  const url = `${MAIN_LINK}/users/${id}/aggregatedWords/${wordId}`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// USERS/STATISTIC BLOCK

// example:
// getStatistics('5e9f5ee35eb9e72bc21af4a0', 'token')
// .then((data: Statistik) => console.log(data));
export async function getStatistics(id: string, token: string): Promise<Statistik> {
  const url = `${MAIN_LINK}/users/${id}/statistics`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// updateStatistics({
//   learnedWords: 12
//   optional: {}
// }, '5e9f5ee35eb9e72bc21af4a0', token).then((data: Statistik) => console.log(data));
export async function updateStatistics(params: Statistik, id: string, token: string): Promise<Statistik> {
  const url = `${MAIN_LINK}/users/${id}/statistics`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const result = await fetch(url, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// USERS/SETTING BLOCK

// example:
// getSettings('5e9f5ee35eb9e72bc21af4a0', 'token')
// .then((data: Setting) => console.log(data));
export async function getSettings(id: string, token: string): Promise<Setting> {
  const url = `${MAIN_LINK}/users/${id}/settings`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const result = await fetch(url, {
    method: 'GET',
    headers: recHeaders,
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// example:
// updateSettings({
//   learnedWords: 12
//   optional: {}
// }, '5e9f5ee35eb9e72bc21af4a0', token).then((data: Setting) => console.log(data));
export async function updateSettings(params: Setting, id: string, token: string): Promise<Setting> {
  const url = `${MAIN_LINK}/users/${id}/settings`;
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const result = await fetch(url, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}

// SIGN IN BLOCK

// example:
// !!!Logins a user and returns a JWT-token!!!
// signIn({
//   email: 'test3@gmail.com',
//   password: 'testtest111',
// }).then((data: SignInResult) => console.log(data));
export async function signIn(params: SignIn): Promise<SignInResult> {
  const url = `${MAIN_LINK}/signin`;
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}
