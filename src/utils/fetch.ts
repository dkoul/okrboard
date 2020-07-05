import includes from 'lodash/includes';

export function getUri<T>(uri): Promise<T> {
  const params: RequestInit = {
    method: 'GET'
  };
  // mergeRequestOptions(params, baseParams);
  // extraParams && mergeRequestOptions(params, extraParams);
  return callFetchAndHandleJwt(uri, params);
}

export function postUri<T>(uri, body?: any): Promise<T> {
  const params: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  };
  // mergeRequestOptions(params, baseParams);
  // extraParams && mergeRequestOptions(params, extraParams);
  return callFetchAndHandleJwt(uri, params);
}

export function putUri<T>(uri, body: any): Promise<T> {
  const params: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return callFetchAndHandleJwt(uri, params);
}

export function patchUri<T>(uri, body: any): Promise<T> {
  const params: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return callFetchAndHandleJwt(uri, params);
}

export function deleteUri<T>(uri, extraParams?: RequestInit): Promise<T> {
  const params: RequestInit = {
    method: 'DELETE'
  };
  return callFetchAndHandleJwt(uri, params);
}

async function callFetchAndHandleJwt<T>(uri, params: RequestInit): Promise<T> {
  // params.headers['Authorization'] = '';
  return fetchURIWithParams<T>(uri, params);
}

async function fetchURIWithParams<T>(uri, params: RequestInit): Promise<T> {
  try {
    const response = await fetch(uri.toString(), params);
    return responseHandler<T>(response) as Promise<T>;
  } catch (error) {
    return Promise.reject(error);
  }
}

function responseHandler<T>(response: Response): Promise<T | string> {
  try {
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && includes(contentType, 'json')) {
        return response
          .json()
          .then(j => Promise.resolve(j))
          .catch(e => Promise.resolve({}));
      } else if (contentType && includes(contentType, 'text')) {
        return response.text();
      } else {
        // Defaulting to text if content type cannot be determined
        // https://github.com/github/fetch/issues/268#issuecomment-176544728
        return response
          .text()
          .then(j => Promise.resolve(j ? JSON.parse(j) : {}))
          .catch(e => Promise.resolve({}));
      }
    }
  } catch (error) {
    console.log('error calling api', error);
  }
}
