import { createServer } from 'node:net'
import { createServer as createViteServer } from 'vite'

function openPort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer()
    server.unref()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()

      if (!address || typeof address === 'string') {
        server.close()
        reject(new Error('layout_audit_port_unavailable'))
        return
      }

      server.close((error) =>
        error ? reject(error) : resolvePort(address.port),
      )
    })
  })
}

export async function startStaticStorybook(root) {
  const port = await openPort()
  const baseUrl = `http://127.0.0.1:${port}`
  const server = await createViteServer({
    appType: 'spa',
    configFile: false,
    logLevel: 'error',
    root,
    server: { host: '127.0.0.1', port, strictPort: true },
  })

  await server.listen()

  return { baseUrl, close: () => server.close() }
}
