import SimpleHTTPServer, SocketServer


PORT = 8000

handler = SimpleHTTPServer.SimpleHTTPRequestHandler
#handler.extensions_map.update({
#    '.pandaapp': 'application/x-web-app-manifest+json'
#})

httpd = SocketServer.TCPServer(("", PORT), handler)

print "Waiting for panda lovers on port %s" % PORT
httpd.serve_forever()
