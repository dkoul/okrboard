import { getUri, postUri } from '../utils/fetch';

const prefixUrl = 'http://abhiskum-rdu-2.usersys.redhat.com:8181/okr/api';

export async function getAllWorkstations(): Promise<any> {
  const uri = `${prefixUrl}/departments`;
  return await getUri<any>(uri);
}

export async function addWorkstation(payload): Promise<any> {
  const uri = `${prefixUrl}/departments`;
  return await postUri<any>(uri, payload);
}

export async function createObjective(payload): Promise<any> {
  const uri = `${prefixUrl}/objectives`;
  return await postUri<any>(uri, payload);
}

export async function getObjectives(): Promise<any> {
  const uri = `${prefixUrl}/objectives`;
  return await getUri<any>(uri);
}

export async function createKeyResult(payload): Promise<any> {
  const uri = `${prefixUrl}/keyresults`;
  return await postUri<any>(uri, payload);
}

export async function getKeyResult(): Promise<any> {
  const uri = `${prefixUrl}/keyresults`;
  return await getUri<any>(uri);
}
