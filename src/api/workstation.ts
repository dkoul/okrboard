import { getUri, postUri } from '../utils/fetch';

export async function getAllWorkstations(): Promise<any> {
  const uri = 'http://abhiskum-rdu-2.usersys.redhat.com:8181/okr/api/departments';
  return await getUri<any>(uri);
}

export async function addWorkstation(payload): Promise<any> {
    const uri = 'http://abhiskum-rdu-2.usersys.redhat.com:8181/okr/api/departments';
    return await postUri<any>(uri, payload);
}

export async function createObjective(payload): Promise<any> {
    const uri = 'http://abhiskum-rdu-2.usersys.redhat.com:8181/okr/api/objectives';
    return await postUri<any>(uri, payload);
}
