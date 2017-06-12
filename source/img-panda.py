import socket

HOST, PORT = '', 8080

listen = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listen.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
listen.bind((HOST, PORT))
listen.listen(1)
print 'Waiting for panda lovers on port %s' % PORT
while True:
    client_connection, client_address = listen.accept()
    requst = client_connection.recv(1024)
    print requst

    http_response = """\
HTTP/1.1 200 OK

Panda is here!
"""

    client_connection.sendall(http_response)
    client_connection.close()
