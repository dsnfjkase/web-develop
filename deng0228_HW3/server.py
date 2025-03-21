from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import unquote_plus


def get_body_params(body):
    if not body:
        return {}
    parameters = body.split("&")

    # split each parameter into a (key, value) pair, and escape both
    def split_parameter(parameter):
        k, v = parameter.split("=", 1)
        k_escaped = unquote_plus(k)
        v_escaped = unquote_plus(v)
        return k_escaped, v_escaped

    body_dict = dict(map(split_parameter, parameters))
    print(f"Parsed parameters as: {body_dict}")
    # return a dictionary of the parameters
    return body_dict


def submission_to_table(item):
    """TODO: Takes a dictionary of form parameters and returns an HTML table row
       The HTML row will be in the same format as a row on your schedule

    An example input dictionary might look like: 
    {
     'event': 'Sleep',
     'day': 'Sun',
     'start': '01:00',
     'end': '11:00', 
     'phone': '1234567890', 
     'location': 'Home',
     'url': 'https://example.com'
    }
    """
    return ("<tr><td>" + item['event'] + "</td>" + "<td>" + item['day'] + "</td>" + "<td>" + item['start'] + "</td>" + 
            "<td>" + item['end'] + "</td>" + "<td>" + item['phone'] + "</td>" + "<td>" + item['location'] + "</td>" +
            "<td>" + item['url'] + "</td></tr>")
    


# NOTE: Please read the updated function carefully, as it has changed from the
# version in the previous homework. It has important information in comments
# which will help you complete this assignment.
def handle_req(url, body=None):
    """
    The url parameter is a *PARTIAL* URL of type string that contains the path
    name and query string.

    If you enter the following URL in your browser's address bar:
    `http://localhost:4131/myform.html?name=joe` then the `url` parameter will have
    the value "/MyForm.html?name=joe"

    This function should return two strings in a list or tuple. The first is the
    content to return, and the second is the content-type.
    """

    # Get rid of any query string parameters
    url, *_ = url.split("?", 1)
    # Parse any form parameters submitted via POST
    parameters = get_body_params(body)

    if url == "/myschedule.html":
        return open("static/html/myschedule.html").read(), "text/html"
    if url == "/myform.html":
        return open("static/html/myform.html").read(), "text/html"
    elif url == "/aboutme.html":
        return open("static/html/aboutme.html").read(), "text/html"
    elif url == "/img/gophers-mascot.png":
        return open("static/img/gophers-mascot.png", "br").read(), "image/png"
    elif url == "/stock.html":
        return open("static/html/stock.html").read(), "text/html"
    # NOTE: The files you return will likely be different for your server, but the code to
    # show you examples of how yours may look. You will need to change the paths
    # to match the files you want to serve. Before you do that, make sure you
    # understand what the code is doing, specifically with the MIME types and
    # opening some files in binary mode, i.e. `open(..., "br")`.
    elif url == "/css/myschedule.css":
        return open("static/css/myschedule.css").read(), "text/css"
    elif url == "/css/stock.css":
        return open("static/css/stock.css").read(), "text/css"
    elif url == "/css/myform.css":
        return open("static/css/myform.css").read(), "text/css"
    elif url == "/css/stock.css":
        return open("static/css/stock.css").read(), "text/css"
    elif url == "/css/aboutme.css":
        return open("static/css/aboutme.css").read(), "text/css"
    elif url == "/css/event.css":
        return open("static/css/event.css").read(), "text/css"
    elif url == "/js/myschedule.js":
        return open("static/js/myschedule.js").read(), "text/javascript"
    elif url == "/js/stock.js":
        return open("static/js/stock.js").read(), "text/javascript"
    elif url == "/js/map.js":
        return open("static/js/map.js").read(), "text/javascript"
    elif url == "/js/aboutme.js":
        return open("static/js/aboutme.js").read(), "text/javascript"
    elif url == "/img/keller.jpg":
        return open("static/img/keller.jpg", "br").read(), "image/jpg"
    elif url == "/img/Anderson.jpg":
        return open("static/img/Anderson.jpg", "br").read(), "image/jpg"
    elif url == "/img/carlson.jpg":
        return open("static/img/carlson.jpg", "br").read(), "image/jpg"
    elif url == "/img/Normandale.jpg":
        return open("static/img/Normandale.jpg", "br").read(), "image/jpg"
    elif url == "/img/amundson.jpg":
        return open("static/img/amundson.jpg", "br").read(), "image/jpg"
    elif url == "/img/Goldy.png":
        return open("static/img/Goldy.png", "br").read(), "image/png"


    # TODO: Add update the HTML below to match your other pages and
    # implement the `submission_to_table`.
    elif url == "/EventLog.html":
        return (
            """
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title> Event Submission </title>
                <link rel="stylesheet" type="text/css" href="css/event.css">
            </head>
            <body>
                <header>
                  <nav>
                    <table>
                        <thead>
                            <tr>
                                <th><a href="http://localhost:4131/myschedule.html">MySchedule</a></th>
                                <th><a href="http://localhost:4131/myform.html">FormInput</a></th>
                                <th><a href="http://localhost:4131/aboutme.html">AboutMe</a></th>
                            </tr>
                        </thead>
                    </table>
                    </nav>
                </header>
                <h1> My New Events </h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Day</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                        """
            + submission_to_table(parameters)
            + """
                        </tbody>
                    </table>
                </div>
            </body>
            </html>""",
            "text/html; charset=utf-8",
        )
    else:
        return open("static/html/404.html").read(), "text/html; charset=utf-8"


# Don't change content below this. It would be best if you just left it alone.


class RequestHandler(BaseHTTPRequestHandler):
    def __c_read_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        body = str(body, encoding="utf-8")
        return body

    def __c_send_response(self, message, response_code, headers):
        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        # Send the first line of response.
        self.protocol_version = "HTTP/1.1"
        self.send_response(response_code)

        # Send headers (plus a few we'll handle for you)
        for key, value in headers.items():
            self.send_header(key, value)
        self.send_header("Content-Length", len(message))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()

        # Send the file.
        self.wfile.write(message)

    def do_GET(self):
        # Call the student-edited server code.
        message, content_type = handle_req(self.path)

        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        self.__c_send_response(
            message,
            200,
            {
                "Content-Type": content_type,
                "Content-Length": len(message),
                "X-Content-Type-Options": "nosniff",
            },
        )

    def do_POST(self):
        body = self.__c_read_body()
        message, content_type = handle_req(self.path, body)

        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        self.__c_send_response(
            message,
            200,
            {
                "Content-Type": content_type,
                "Content-Length": len(message),
                "X-Content-Type-Options": "nosniff",
            },
        )


def run():
    PORT = 4131
    print(f"Starting server http://localhost:{PORT}/")
    server = ("", PORT)
    httpd = HTTPServer(server, RequestHandler)
    httpd.serve_forever()


run()
