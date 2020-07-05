import { getUri } from '../utils/fetch';
export async function getAllWorkstations(): Promise<any> {
  const uri = 'http://abhiskum-rdu-2.usersys.redhat.com:8181/departments/';
  // addQueryParamsToUri(uri, Env.strataHeaders);
  console.log(' getAllWorkstations call');
  return await getUri<any>(uri);
}
