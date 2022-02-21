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

export const MAIN_LINK = 'https://rs-lang-project.herokuapp.com';
type secondFetchParams = object | null;
async function getResponse<T>(url: string, obj: secondFetchParams = null): Promise<T> {
  let result;

  if (obj !== null) {
    result = await fetch(url, obj);
  } else {
    result = await fetch(url);
  }

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  const fromJson = await result.json();
  return fromJson;
}
/**
* WORDS BLOCK
*/

/** example:
* getAllWords(0, 0)
* .then((data: Array<AllWords>) => console.log(data));
*/
export async function getAllWords(group = 0, page = 0): Promise<Array<Word>> {
  const res = await getResponse<Promise<Array<Word>>>(`${MAIN_LINK}/words?group=${group}&page=${page}`);
  return res;
}

/**
* example:
* getWord('5e9f5ee35eb9e72bc21af4a0')
* .then((data: Word) => console.log(data));
*/
export async function getWord(id: string): Promise<Word> {
  const res = await getResponse<Promise<Word>>(`${MAIN_LINK}/words/${id !== '' ? id : '5e9f5ee35eb9e72bc21af4a0'}`);
  return res;
}

/**
* USER BLOCK

* example:
* createUser({
*  name: 'test3',
*  email: 'test3@gmail.com',
*  password: 'testtest111',
* }).then((data: NewUserResponse) => console.log(data));
*/
export async function createUser(params: NewUser): Promise<NewUserResponse> {
  const res = await getResponse<Promise<NewUserResponse>>(`${MAIN_LINK}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  return res;
}

/**
*  example:
*  getUser(id,token)
*  .then((data: NewUser) => console.log(data));
*/
export async function getUser(id: string, token: string): Promise<NewUser> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<NewUser>>(`${MAIN_LINK}/users/${id}`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
* example:
* updateUser({
* email: 'testtest@qwe.com',
* password: 'test1234',
* }, '5e9f5ee35eb9e72bc21af4a0', token).then((data: UpdateUser) => console.log(data));
*/
export async function updateUser(params: UpdateUser, id: string, token: string): Promise<NewUser> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const res = await getResponse<Promise<NewUser>>(`${MAIN_LINK}/users/${id}`, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });
  return res;
}

/**
* example:
* deleteUser('5e9f5ee35eb9e72bc21af4a0', token)
* .then((data: boolean) => console.log(data === true));
*/
export async function deleteUser(id: string, token: string): Promise<boolean> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<boolean>>(`${MAIN_LINK}/users/${id}`, {
    method: 'DELETE',
    headers: recHeaders,
  });
  return res;
}

/**
* example:
*  getNewUserTokens('5e9f5ee35eb9e72bc21af4a0', token)
* .then(((data: GetNewUserTokens) => console.log(data)));
*/
export async function getNewUserTokens(id: string, token: string): Promise<GetNewUserTokens> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<GetNewUserTokens>>(`${MAIN_LINK}/users/${id}`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
* USERS/WORDS BLOCK

* example:
* getAllUserWords('5e9f5ee35eb9e72bc21af4a0', token)
*  .then(((data: Array<UserWord>) => console.log(data)));
*/
export async function getAllUserWords(id: string, token: string): Promise<Array<UserWord>> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<Array<UserWord>>>(`${MAIN_LINK}/users/${id}/words`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
* example:
* createUserWord({
*  difficulty: 'qwerty',
*  optional: {},
* }, '5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
*  .then((data: UserWord) => console.log(data));
*/
export async function createUserWord(params: UserWord, id: string, wordId: string, token: string): Promise<UserWord> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const res = await getResponse<Promise<UserWord>>(`${MAIN_LINK}/users/${id}/words/${wordId}`, {
    method: 'POST',
    headers: recHeaders,
    body: JSON.stringify(params),
  });
  return res;
}

/**
* example:
*  getUserWords('5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
*  .then((data: UserWord) => console.log(data));
 */
export async function getUserWords(id: string, wordId: string, token: string): Promise<UserWord> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<UserWord>>(`${MAIN_LINK}/users/${id}/words/${wordId}`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
* example:
* updateUserWord({
*  difficulty: 'qwerty',
*  optional: {},
* }, '5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
*  .then((data: UserWord) => console.log(data));
*/
export async function updateUserWord(params: UserWord, id: string, wordId: string, token: string): Promise<UserWord> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const res = await getResponse<Promise<UserWord>>(`${MAIN_LINK}/users/${id}/words/${wordId}`, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });
  return res;
}

/**
* example:
* deleteUserWord('5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', token)
* .then((data: boolean) => console.log(data === true));
*/
export async function deleteUserWord(id: string, wordId: string, token: string): Promise<boolean> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<boolean>>(`${MAIN_LINK}/users/${id}/words/${wordId}`, {
    method: 'DELETE',
    headers: recHeaders,
  });
  return res;
}

/**
*USERS/AGGREGATED-WORDS BLOCK

*example:
*getAllUserAggregatedWords('5e9f5ee35eb9e72bc21af4a0', 'token', '1', '1', '20', 'filter')
*.then((data: Array<Word>) => console.log(data));
*/
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
  const res = await getResponse<Promise<Array<Word>>>(url, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
 * example:
 * getUserAggregatedWords('5e9f5ee35eb9e72bc21af4a0', '5e9f5ee35eb9e72bc21af4a0', 'token')
 * .then((data: Word) => console.log(data));
 */
export async function getUserAggregatedWords(
  id: string,
  wordId: string,
  token: string,
): Promise<Word> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<Word>>(`${MAIN_LINK}/users/${id}/aggregatedWords/${wordId}`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
 * USERS/STATISTIC BLOCK

 * example:
 * getStatistics('5e9f5ee35eb9e72bc21af4a0', 'token')
 * .then((data: Statistik) => console.log(data));
 */
export async function getStatistics(id: string, token: string): Promise<Statistik> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<Statistik>>(`${MAIN_LINK}/users/${id}/statistics`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
 * example:
 * updateStatistics({
 * learnedWords: 12
 * optional: {}
 * }, '5e9f5ee35eb9e72bc21af4a0', token).then((data: Statistik) => console.log(data));
 */
export async function updateStatistics(params: Statistik, id: string, token: string): Promise<Statistik> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const res = await getResponse<Promise<Statistik>>(`${MAIN_LINK}/users/${id}/statistics`, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });
  return res;
}

/**
 * USERS/SETTING BLOCK

 * example:
 * getSettings('5e9f5ee35eb9e72bc21af4a0', 'token')
 * .then((data: Setting) => console.log(data));
 */
export async function getSettings(id: string, token: string): Promise<Setting> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  const res = await getResponse<Promise<Setting>>(`${MAIN_LINK}/users/${id}/settings`, {
    method: 'GET',
    headers: recHeaders,
  });
  return res;
}

/**
 * example:
 * updateSettings({
 * learnedWords: 12
 * optional: {}
 * }, '5e9f5ee35eb9e72bc21af4a0', token).then((data: Setting) => console.log(data));
 */
export async function updateSettings(params: Setting, id: string, token: string): Promise<Setting> {
  const recHeaders = new Headers();
  recHeaders.set('authorization', `Bearer ${token}`);
  recHeaders.set('Content-Type', 'application/json');
  const res = await getResponse<Promise<Setting>>(`${MAIN_LINK}/users/${id}/settings`, {
    method: 'PUT',
    headers: recHeaders,
    body: JSON.stringify(params),
  });
  return res;
}

/**
 * SIGN IN BLOCK

 * example:
 * !!!Logins a user and returns a JWT-token!!!
 * signIn({
 *   email: 'test3@gmail.com',
 *   password: 'testtest111',
 * }).then((data: SignInResult) => console.log(data));
 */
export async function signIn(params: SignIn): Promise<SignInResult> {
  const res = await getResponse<Promise<SignInResult>>(`${MAIN_LINK}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  return res;
}
