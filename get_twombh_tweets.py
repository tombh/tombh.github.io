import tweepy
import json

class MyModelParser(tweepy.parsers.ModelParser):
    def parse(self, method, payload):
        result = super(MyModelParser, self).parse(method, payload)
        result._payload = json.loads(payload)
        return result

# == OAuth Authentication ==
#
# This mode of authentication is the new preferred way
# of authenticating with Twitter.

# The consumer keys can be found on your application's Details
# page located at https://dev.twitter.com/apps (under "OAuth settings")
consumer_key = "eRbk9uW4hr1K1b1YxOE5g"
consumer_secret = "CNpEUAaAgtCAkOxZ5lWUjxzhwPbzYywB1p2OJycic"

# The access tokens can be found on your applications's Details
# page located at https://dev.twitter.com/apps (located
# under "Your access token")
access_token = "33468211-EAuFiWQgJEb5twCSpCI9LnWCBN8vfDUnKeI3DzbU"
access_token_secret = "RuTVuDtDBZTfHDwwo5ch4xrdejFWlhqsq9rfkjCMw"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth, parser=MyModelParser())

# If the authentication was successful, you should
# see the name of the account print out
results = api.user_timeline(count=50)
print json.dumps(results._payload)
