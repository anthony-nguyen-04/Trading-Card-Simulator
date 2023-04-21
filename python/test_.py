
import pytest #pytest has the network testing stuff, so it is used instead of unittest
#import sys

#from pathlib import Path
from flaskServer import create_app

#client = app.test_client

#5 hours, and these fixtures never worked right for me
'''@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    yield app

@pytest.fixture
def client(app):
    return app.test_client()'''

#This creates an app and client fixture without running a real server.
#Future Troy: LIES ALL LIES

#By the way, test_ must be at the start of every file and function used as a test
def test_simple():#FIVE HOURS TO FIGURE THIS OUT. THIS WILL BE THE ONLY UNIT TEST. IT'S FASTER TO CHECK BY HAND
    #print(client)
    app = create_app()
    response = app.test_client().get("/test")#FUNCTION OBJECT DOESN'T HAVE ATTRIBUTE GET, STUPID FIXTURES
    print(response.data)
    assert response.data == b'is it working' #The b attached indicates html.... I think
    
results = pytest.main()
print(results)


#print(sys.path)

