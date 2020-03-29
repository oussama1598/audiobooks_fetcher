import requests
from bs4 import BeautifulSoup


class Transmission:
    def __init__(self):
        self.id = None
        self.options = {
            'host': '127.0.0.1',
            'port': 9091,
        }

        self.RPC_URI = f'http://{self.options["host"]}:{self.options["port"]}/transmission/rpc/'

    def get_token(self):
        request = requests.post(self.RPC_URI)

        if request.status_code != 409:
            return

        parsed_html = BeautifulSoup(request.text, 'html.parser')
        code = parsed_html.find('code').text.split(':')[1].strip()

        self.id = code

    def add_torrent(self, magnet, output_dir=False):
        request = requests.post(
            self.RPC_URI,
            headers={
                'X-Transmission-Session-Id': self.id
            },
            json={
                'method': 'torrent-add',
                'arguments': {
                    'download-dir': output_dir,
                    'filename': magnet,
                    'paused': False
                }
            }
        )

        return request.status_code == 200
