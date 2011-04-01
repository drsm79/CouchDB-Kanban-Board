#!/usr/bin/env python2.6
"""
Create a state document for each state in trac and create a story document for each ticket.
"""

import xmlrpclib
import urllib2
import urllib
import getpass
import logging
import json
from optparse import OptionParser

class HTTPSBasicTransport(xmlrpclib.SafeTransport):
    """
    Transport that uses urllib2 so that we can do Basic authentication.

    Based upon code at http://bytes.com/topic/python/answers/509382-solution-xml-rpc-over-proxy
    """

    def __init__(self, username, pw, realm, verbose = None, use_datetime=0):
        self.__username = username
        self.__pw = pw
        self.__realm = realm
        self.verbose = verbose
        self._use_datetime = use_datetime

    def request(self, host, handler, request_body, verbose):
        url='https://'+host+handler
        if verbose or self.verbose:
            print "ProxyTransport URL: [%s]"%url

        request = urllib2.Request(url)
        request.add_data(request_body)
        # Note: 'Host' and 'Content-Length' are added automatically
        request.add_header("User-Agent", self.user_agent)
        request.add_header("Content-Type", "text/xml") # Important

        # setup basic authentication
        authhandler = urllib2.HTTPBasicAuthHandler()
        authhandler.add_password(self.__realm, url, self.__username, self.__pw)
        opener = urllib2.build_opener(authhandler)

        #proxy_handler=urllib2.ProxyHandler()
        #opener=urllib2.build_opener(proxy_handler)
        f=opener.open(request)
        return(self.parse_response(f))

def do_options():
    op = OptionParser()

    op.add_option("-v", "--verbose",
              dest="verbose",
              action="store_true",
              default=False,
              help="Be more verbose")

    op.add_option("-d", "--debug",
              dest="debug",
              action="store_true",
              default=False,
              help="Print debugging statements and keep a record of the patchset in /tmp")

    op.add_option("-u", "--username",
              dest="username",
              help="Your username, default is %s" % getpass.getuser(),
              default=getpass.getuser())

    op.add_option("-t", "--ticket",
              dest="ticket",
              help="The id of the ticket")

    op.add_option("--server",
              dest="server",
              default="https://svnweb.cern.ch/no_sso/trac/CMSDMWM/login/xmlrpc",
              help="The trac server to use.")

    op.add_option("--realm",
              dest="realm",
              default="Subversion at CERN",
              help="The HTTP auth realm")

    op.add_option("-a", "--get-all",
              dest="all",
              default=False,
              help="Get all tickets instead of just those owned by the specified user, defaults to false")

    op.add_option("-c", "--couchurl",
              dest="couchurl",
              default="http://localhost:5984/kanban",
              help="URL of the kanban database, default is http://localhost:5984/kanban")

    options, args = op.parse_args()

    log_level = logging.WARNING
    if options.verbose:
        log_level = logging.INFO
    if options.debug:
        log_level = logging.DEBUG
    logging.basicConfig(level=log_level)
    logger = logging.getLogger('submit_patch')

    logger.info('options: %s, args: %s' % (options, args))

    return options, args, logger

def parse_ticket(trac_ticket):
    """
    Turn the ticket into a story document, with the same id
    """
    ticket = {
       "_id": 'trac_ticket/%s' % trac_ticket[0],
       "story_state": str(trac_ticket[3]['status']).title()[0],
       "story_tags": trac_ticket[3]['keywords'].split(),
       "story_name": str(trac_ticket[3]['summary']),
       "story_description": trac_ticket[3]['description']
    }
    if trac_ticket[3]['milestone']:
        ticket["story_tags"].append(trac_ticket[3]['milestone'])
    return ticket

def get_tickets(server, query="status!=closed"):
    multicall = xmlrpclib.MultiCall(server)
    for ticket in server.ticket.query(query):
        multicall.ticket.get(ticket)
    return map(parse_ticket, multicall())

if __name__ == "__main__":
    options, args, logger = do_options()
    password = getpass.getpass()
    transport = HTTPSBasicTransport(options.username, password, options.realm)
    server = xmlrpclib.ServerProxy(options.server, transport=transport)

    data_for_couch = []

    colour_schemes = [
            {"background-color": "#FFFF00", "color": "#000000"},
            {"background-color": "#FFC300", "color": "#000000"},
            {"background-color": "#B5DBFF", "color": "#000000"},
            {"background-color": "#A5C700", "color": "#ffffff"},
            {"background-color": "#9CCFFF", "color": "#000000"},
    ]

    c = 0
    shortcuts = []
    for state in server.ticket.status.getAll():
        data_for_couch.append({
           "state_shortcut": state.title()[0],
           "state_name": state.title(),
           "state_position": len(state),
           "state_colours": colour_schemes[c]
        })
        data_for_couch.append({
           "state_shortcut": '%s_Q' % state.title()[0],
           "state_name": '%s Ready' % state.title(),
           "state_position": len(state) - 1,
           "state_colours": {"background-color": "#F0F0F0", "color": "#606060"}
        })
        c += 1
        if c > len(colour_schemes):
            c = 0

    query = ""
    if not options.all:
        query = "status!=closed&owner=%s" % options.username
    data_for_couch.extend(get_tickets(server, query))
    data_for_couch = json.dumps({"docs":data_for_couch})

    url  = '%s/_bulk_docs/' % options.couchurl

    headers = {"Content-type": "application/json",
                "Accept": "application/json"}
    req = urllib2.Request(url, data_for_couch, headers)
    fd = urllib2.urlopen(req)
    fd.read()
    fd.close()
