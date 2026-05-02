export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // For directory paths, try index.html directly first
    if (path.endsWith('/')) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = path + 'index.html';
      const r = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      if (r.status !== 404 && r.status !== 403) return r;
    }

    // Try original request
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 && response.status !== 403) return response;

    // Fallback: try /path/index.html
    if (!path.includes('.')) {
      const clean = path.endsWith('/') ? path : path + '/';
      const indexUrl = new URL(request.url);
      indexUrl.pathname = clean + 'index.html';
      const r2 = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      if (r2.status !== 404 && r2.status !== 403) return r2;
    }

    return response;
  }
};