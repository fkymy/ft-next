export default async function fetchJson(...args: [input: RequestInfo, init?: RequestInit | undefined]) {
  try {
    const res = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    const err: any = new Error(res.statusText);
    err.response = res;
    err.data = data;
    throw err;
  } catch (err) {
    if (!err.data) {
      err.data = { message: err.message };
    }
    throw err;
  }
}