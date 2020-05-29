const url = 'http://localhost:3000';

enum ApiRoutes {
  GET = 'peek',
  POST = 'set-env',
}

export const api = { url, routes: ApiRoutes };
