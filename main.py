import inquirer
from app.lib.audiobookbay import search_for_book, get_book_magnet
from app.modules.transmission import Transmission


def main():
    torrent_client = Transmission()
    torrent_client.get_token()

    query = inquirer.prompt([
        inquirer.Text('query',
                      message="Search query")
    ])['query']

    print('Please wait while we get you the results.')

    result = search_for_book(query)

    print(result)

    books_found = result['results']

    if not result['status']:
        return

    choices = list(
        map(
            lambda book: f'{book["book_name"]} - {book["book_format"]} - {book["book_size"]}',
            books_found
        )
    )
    choice = inquirer.prompt([
        inquirer.List(
            'choice',
            message=f"Results for {query}",
            choices=choices
        )
    ])['choice']

    selected_book = books_found[choices.index(choice)]
    selected_book_url = selected_book['book_url']

    print('Please wait while we grab the magnet url.')

    magnet_uri = get_book_magnet(selected_book_url)['magnet_uri']
    torrent_client.add_torrent(magnet_uri)

    print('Torrent has been added to the selected torrent client.')


main()
