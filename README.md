Steps for Running the application:

git clone https://github.com/nagaaditya/sampleAngular2.git

npm install

json-server is fake REST API to test applications. It is very easy to install and use it with few steps. 

Step-1: Open the command prompt and run the following command.

npm install -g json-server Now we are ready with json-server . 

Step-2: Create a db.json file in a directory. In our demo we will perform operations on articles with three fields that are id, title and category. 

Step-3: Now we need to run the json-server. Go to the directory where db.json file is lying and then run following command.

json-server --watch db.json 

Step-4: In this way, we are ready to use json-server with following URLs.

http://localhost:3000/articles 

npm start

http://localhost:3001
