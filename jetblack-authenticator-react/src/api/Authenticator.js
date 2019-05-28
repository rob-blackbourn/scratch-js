import type { RequestInfo, RequestInit, Response } from 'flow';

export default class Authenticator {
  constructor (host: string, path: string) {
    this.host = host
    this.path = path
  }

  requestAuthentication () {
    const { protocol, href } = window.location
    const url = `${protocol}//${this.host}${this.path}?redirect=${href}`
    window.location.replace(url)
  }

  async fetch (input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    const response = await fetch(input, init)
    if (response.status === 401) {
      this.requestAuthentication()
    }
    return response
  }
}
