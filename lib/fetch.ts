type Headers = Record<string, string | null | undefined>

export class Fetch {
  private static fetch = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    headers?: Headers,
    body?: Record<string, unknown> | FormData
  ): {
    json: T
    response: Response
  } => {
    const _headers = {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
      Authorization: `Bearer ${headers?.token}`
    }

    const _body = body instanceof FormData ? body : JSON.stringify(body)

    console.log(`REQUEST: ${url}`, method, _body, _headers)

    const response = await fetch(url, {
      method,
      headers: _headers,
      body: _body
    })

    const json = await response.json()

    console.log(`RESPONSE: ${url}`, json)

    return {
      json,
      response
    }
  }

  public static get = async <T>(url: string, headers?: Headers) =>
    await Fetch.fetch<T>(url, 'GET', headers, undefined)

  public static post = async <T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    headers?: Headers
  ) => await Fetch.fetch<T>(url, 'POST', headers, body)

  public static put = async <T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    headers?: Headers
  ) => await Fetch.fetch<T>(url, 'PUT', headers, body)

  public static delete = async <T>(url: string, headers?: Headers) =>
    await Fetch.fetch<T>(url, 'DELETE', headers, undefined)

  public static patch = async <T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    headers?: Headers
  ) => await Fetch.fetch<T>(url, 'PATCH', headers, body)
}
