import requests
import json
from bs4 import BeautifulSoup
from torf import Magnet
import inspect

WEBSITE_URL = 'http://audiobookbay.nl/?s='


def parse_books_data(book_el):
    book_post_content_el = book_el.select('.postContent')[0]

    book_name = book_el.select('.postTitle')[0].string

    book_poster_image_el = book_post_content_el.find('img')
    book_poster_image_url = book_poster_image_el['src']

    book_data_url = book_poster_image_el.parent['href']

    books_raw_data = ''.join([str(el) for el in book_post_content_el.select(
        'p')[-1].contents]).split('<br/>')

    books_raw_data = list(map(lambda x: BeautifulSoup(
        x, "html.parser").text, books_raw_data))

    books_format = books_raw_data[1].split('/')[0].split(':')[1].strip()
    books_bitrate = books_raw_data[1].split(
        '/')[1].split(':')[1].strip()

    books_size = books_raw_data[2].split(':')[1].strip()

    return {
        'book_name': book_name,
        'book_url': book_data_url,
        'book_poster_image_url': book_poster_image_url,
        'book_format': books_format,
        'book_bitrate': books_bitrate,
        'book_size': books_size
    }


def generate_magnet_from_data(torrent_hash, trackers):
    return str(Magnet(f'urn:btih:{torrent_hash}', tr=trackers))


def search_for_book(query):
    print(f'{WEBSITE_URL}{query}')
    request = requests.get(f'{WEBSITE_URL}{query}')
    request.encoding = 'utf-8'

    if request.status_code == 200:
        parsed_html = BeautifulSoup(request.text, 'html.parser')

        books_found = parsed_html.select('.post')
        books_found = list(map(parse_books_data, books_found))

        return {
            'status': True,
            'query': query,
            'results': books_found
        }

    return {'status': False}


def get_book_magnet(book_url):
    request = requests.get(book_url)
    request.encoding = 'utf-8'

    if request.status_code == 200:
        parsed_html = BeautifulSoup(request.text, 'html.parser')
        torrent_data_table = parsed_html.select('.torrent_info')[0]
        torrent_data_table_rows = torrent_data_table.select('tr')

        torrent_info_hash = None
        trackers = []

        for torrent_data_table_row in torrent_data_table_rows:
            torrent_data_table_columns = torrent_data_table_row.select('td')

            if len(torrent_data_table_columns) < 2:
                continue

            col_1 = torrent_data_table_columns[0]
            col_2 = torrent_data_table_columns[1]

            if 'Tracker:' in col_1.text:
                trackers.append(col_2.text)

            if 'Info Hash:' in col_1.text:
                torrent_info_hash = col_2.text

        return {
            'torrent_hash': torrent_info_hash,
            'magnet_uri': generate_magnet_from_data(torrent_info_hash, trackers),
            'trackers': trackers,
        }

    return {'status': False}
