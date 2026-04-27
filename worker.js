export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Try original request first
    let response = await env.ASSETS.fetch(request);

    // If 404 and path is a directory (ends with /), try index.html
    if (response.status === 404) {
      if (path.endsWith('/')) {
        const indexUrl = new URL(request.url);
        indexUrl.pathname = path + 'index.html';
        response = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      }
      // If path has no trailing slash, try adding / and index.html
      if (response.status === 404 && !path.endsWith('/') && !path.includes('.')) {
        const indexUrl = new URL(request.url);
        indexUrl.pathname = path + '/index.html';
        response = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      }
    }

    return response;
  }
};